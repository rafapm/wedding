const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

function normalizeBaseUrl(url) {
  return url?.replace(/\/$/, '');
}

function getRestUrl(path) {
  return `${normalizeBaseUrl(supabaseUrl)}/rest/v1/${path}`;
}

function getAuthUrl(path) {
  return `${normalizeBaseUrl(supabaseUrl)}/auth/v1/${path}`;
}

async function parseResponse(response) {
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = data?.message || data?.error_description || data?.hint || 'Something went wrong.';
    throw new Error(message);
  }

  return data;
}

async function supabaseFetch(url, { token, headers, ...options } = {}) {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${token || supabaseAnonKey}`,
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  return parseResponse(response);
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

// Ignore cancelled events even if an older database still returns their invitations.
function withoutCancelledEvents(invitation) {
  if (!invitation?.guests) return invitation;
  return {
    ...invitation,
    guests: invitation.guests.map((guest) => ({
      ...guest,
      events: guest.events?.filter((event) => !['after_wedding', 'afterWedding'].includes(event.eventKey)),
    })),
  };
}

export async function lookupInvitation(email, fallbackCode = '') {
  const invitation = await supabaseFetch(getRestUrl('rpc/lookup_invitation'), {
    method: 'POST',
    body: JSON.stringify({
      p_email: normalizeEmail(email),
      p_fallback_code: fallbackCode.trim() || null,
    }),
  });
  return withoutCancelledEvents(invitation);
}

export async function saveRsvp(email, payload, fallbackCode = '') {
  const invitation = await supabaseFetch(getRestUrl('rpc/save_household_rsvp'), {
    method: 'POST',
    body: JSON.stringify({
      p_email: normalizeEmail(email),
      p_fallback_code: fallbackCode.trim() || null,
      p_payload: payload,
    }),
  });
  return withoutCancelledEvents(invitation);
}

export async function signInAdmin(email, password) {
  const data = await supabaseFetch(getAuthUrl('token?grant_type=password'), {
    method: 'POST',
    body: JSON.stringify({ email: normalizeEmail(email), password }),
  });

  return data;
}

export async function loadAdminDashboard(token) {
  return supabaseFetch(getRestUrl('rpc/admin_dashboard'), {
    method: 'POST',
    token,
    body: JSON.stringify({}),
  });
}

export async function updateAdminRsvp(token, payload) {
  return supabaseFetch(getRestUrl('rpc/admin_update_rsvp'), {
    method: 'POST',
    token,
    body: JSON.stringify({ p_payload: payload }),
  });
}
