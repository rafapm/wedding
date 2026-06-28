create extension if not exists pgcrypto;

create table if not exists households (
  id uuid primary key default gen_random_uuid(),
  household_name text not null,
  primary_email text not null,
  alternate_emails text[] not null default '{}',
  fallback_code text unique,
  language_preference text default 'en',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists guests (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  email text,
  plus_one_allowed boolean not null default false,
  plus_one_name text,
  language_preference text default 'en',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  event_key text not null unique,
  event_name text not null,
  event_date date,
  description text,
  visible boolean not null default true,
  display_order integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists guest_event_invites (
  guest_id uuid not null references guests(id) on delete cascade,
  event_id uuid not null references events(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (guest_id, event_id)
);

create table if not exists rsvps (
  id uuid primary key default gen_random_uuid(),
  guest_id uuid not null references guests(id) on delete cascade,
  event_id uuid not null references events(id) on delete cascade,
  attending boolean,
  meal_preference text,
  dietary_restrictions text,
  travel_notes text,
  arrival_date date,
  departure_date date,
  additional_notes text,
  submitted_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (guest_id, event_id)
);

create table if not exists admin_users (
  user_id uuid primary key,
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists rsvp_lookup_attempts (
  id bigint generated always as identity primary key,
  normalized_email text not null,
  matched boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists households_primary_email_idx on households (lower(primary_email));
create index if not exists guests_email_idx on guests (lower(email));
create index if not exists rsvps_guest_event_idx on rsvps (guest_id, event_id);
create index if not exists rsvp_lookup_attempts_email_created_idx on rsvp_lookup_attempts (normalized_email, created_at desc);

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists households_updated_at on households;
create trigger households_updated_at before update on households
for each row execute function set_updated_at();

drop trigger if exists guests_updated_at on guests;
create trigger guests_updated_at before update on guests
for each row execute function set_updated_at();

drop trigger if exists events_updated_at on events;
create trigger events_updated_at before update on events
for each row execute function set_updated_at();

drop trigger if exists rsvps_updated_at on rsvps;
create trigger rsvps_updated_at before update on rsvps
for each row execute function set_updated_at();

create or replace function normalize_email(p_email text)
returns text
language sql
immutable
as $$
  select lower(trim(coalesce(p_email, '')));
$$;

create or replace function is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from admin_users
    where user_id = auth.uid()
  );
$$;

create or replace function find_household_for_lookup(p_email text, p_fallback_code text default null)
returns uuid
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_email text := normalize_email(p_email);
  v_household_id uuid;
begin
  select h.id into v_household_id
  from households h
  where normalize_email(h.primary_email) = v_email
    or exists (select 1 from unnest(h.alternate_emails) email where normalize_email(email) = v_email)
    or exists (select 1 from guests g where g.household_id = h.id and normalize_email(g.email) = v_email)
    or (p_fallback_code is not null and h.fallback_code = trim(p_fallback_code))
  order by h.created_at
  limit 1;

  return v_household_id;
end;
$$;

create or replace function lookup_invitation(p_email text, p_fallback_code text default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text := normalize_email(p_email);
  v_recent_attempts integer;
  v_household_id uuid;
  v_result jsonb;
begin
  if v_email = '' and coalesce(trim(p_fallback_code), '') = '' then
    raise exception 'Please enter the email address where you received your invitation.';
  end if;

  select count(*) into v_recent_attempts
  from rsvp_lookup_attempts
  where normalized_email = v_email
    and created_at > now() - interval '10 minutes';

  if v_recent_attempts >= 20 then
    raise exception 'Too many lookup attempts. Please wait a few minutes and try again.';
  end if;

  v_household_id := find_household_for_lookup(v_email, p_fallback_code);

  insert into rsvp_lookup_attempts (normalized_email, matched)
  values (v_email, v_household_id is not null);

  if v_household_id is null then
    return jsonb_build_object('found', false);
  end if;

  select jsonb_build_object(
    'found', true,
    'household', jsonb_build_object(
      'id', h.id,
      'householdName', h.household_name,
      'primaryEmail', h.primary_email,
      'languagePreference', h.language_preference
    ),
    'guests', coalesce(jsonb_agg(
      jsonb_build_object(
        'id', g.id,
        'firstName', g.first_name,
        'lastName', g.last_name,
        'displayName', trim(g.first_name || ' ' || g.last_name),
        'email', g.email,
        'plusOneAllowed', g.plus_one_allowed,
        'plusOneName', g.plus_one_name,
        'languagePreference', g.language_preference,
        'events', coalesce((
          select jsonb_agg(jsonb_build_object(
            'id', e.id,
            'eventKey', e.event_key,
            'eventName', e.event_name,
            'eventDate', e.event_date,
            'description', e.description,
            'visible', e.visible,
            'displayOrder', e.display_order,
            'rsvp', (
              select jsonb_build_object(
                'attending', r.attending,
                'mealPreference', r.meal_preference,
                'dietaryRestrictions', r.dietary_restrictions,
                'travelNotes', r.travel_notes,
                'arrivalDate', r.arrival_date,
                'departureDate', r.departure_date,
                'additionalNotes', r.additional_notes,
                'updatedAt', r.updated_at
              )
              from rsvps r
              where r.guest_id = g.id and r.event_id = e.id
            )
          ) order by e.display_order)
          from guest_event_invites gei
          join events e on e.id = gei.event_id
          where gei.guest_id = g.id and e.visible = true
        ), '[]'::jsonb)
      )
      order by g.created_at
    ), '[]'::jsonb)
  )
  into v_result
  from households h
  join guests g on g.household_id = h.id
  where h.id = v_household_id
  group by h.id;

  return v_result;
end;
$$;

create or replace function save_household_rsvp(p_email text, p_payload jsonb, p_fallback_code text default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text := normalize_email(p_email);
  v_household_id uuid;
  v_guest jsonb;
  v_response jsonb;
  v_guest_id uuid;
  v_event_id uuid;
begin
  v_household_id := find_household_for_lookup(v_email, p_fallback_code);

  if v_household_id is null then
    raise exception 'We could not find your invitation. Please check the spelling or contact June and Rafael.';
  end if;

  for v_guest in select * from jsonb_array_elements(coalesce(p_payload->'guests', '[]'::jsonb))
  loop
    v_guest_id := (v_guest->>'guestId')::uuid;

    if not exists (select 1 from guests where id = v_guest_id and household_id = v_household_id) then
      raise exception 'Invalid guest for this household.';
    end if;

    update guests
    set plus_one_name = nullif(trim(v_guest->>'plusOneName'), '')
    where id = v_guest_id and plus_one_allowed = true;

    for v_response in select * from jsonb_array_elements(coalesce(v_guest->'responses', '[]'::jsonb))
    loop
      v_event_id := (v_response->>'eventId')::uuid;

      if not exists (
        select 1 from guest_event_invites
        where guest_id = v_guest_id and event_id = v_event_id
      ) then
        raise exception 'Invalid event for this guest.';
      end if;

      insert into rsvps (
        guest_id,
        event_id,
        attending,
        meal_preference,
        dietary_restrictions,
        travel_notes,
        arrival_date,
        departure_date,
        additional_notes,
        submitted_email
      )
      values (
        v_guest_id,
        v_event_id,
        (v_response->>'attending')::boolean,
        nullif(trim(v_response->>'mealPreference'), ''),
        nullif(trim(v_response->>'dietaryRestrictions'), ''),
        nullif(trim(v_response->>'travelNotes'), ''),
        nullif(v_response->>'arrivalDate', '')::date,
        nullif(v_response->>'departureDate', '')::date,
        nullif(trim(v_response->>'additionalNotes'), ''),
        v_email
      )
      on conflict (guest_id, event_id)
      do update set
        attending = excluded.attending,
        meal_preference = excluded.meal_preference,
        dietary_restrictions = excluded.dietary_restrictions,
        travel_notes = excluded.travel_notes,
        arrival_date = excluded.arrival_date,
        departure_date = excluded.departure_date,
        additional_notes = excluded.additional_notes,
        submitted_email = excluded.submitted_email,
        updated_at = now();
    end loop;
  end loop;

  return lookup_invitation(v_email, p_fallback_code);
end;
$$;

create or replace function admin_dashboard()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_result jsonb;
begin
  if not is_admin() then
    raise exception 'Not authorized.';
  end if;

  select jsonb_build_object(
    'stats', jsonb_build_object(
      'totalHouseholds', (select count(*) from households),
      'totalGuests', (select count(*) from guests),
      'totalInvited', (select count(*) from guest_event_invites),
      'totalResponded', (select count(distinct guest_id) from rsvps),
      'pendingGuests', (
        select count(*)
        from guests g
        where exists (select 1 from guest_event_invites gei where gei.guest_id = g.id)
          and not exists (select 1 from rsvps r where r.guest_id = g.id)
      )
    ),
    'events', (
      select coalesce(jsonb_agg(jsonb_build_object(
        'id', e.id,
        'eventKey', e.event_key,
        'eventName', e.event_name,
        'eventDate', e.event_date,
        'visible', e.visible,
        'invited', (select count(*) from guest_event_invites gei where gei.event_id = e.id),
        'attending', (select count(*) from rsvps r where r.event_id = e.id and r.attending = true),
        'declined', (select count(*) from rsvps r where r.event_id = e.id and r.attending = false),
        'pending', (
          select count(*)
          from guest_event_invites gei
          where gei.event_id = e.id
            and not exists (select 1 from rsvps r where r.guest_id = gei.guest_id and r.event_id = e.id)
        )
      ) order by e.display_order), '[]'::jsonb)
      from events e
    ),
    'mealCounts', (
      select coalesce(jsonb_agg(jsonb_build_object('mealPreference', meal_preference, 'count', meal_count)), '[]'::jsonb)
      from (
        select coalesce(nullif(meal_preference, ''), 'Not specified') meal_preference, count(*) meal_count
        from rsvps
        where attending = true
        group by 1
        order by 1
      ) meals
    ),
    'households', (
      select coalesce(jsonb_agg(jsonb_build_object(
        'id', h.id,
        'householdName', h.household_name,
        'primaryEmail', h.primary_email,
        'alternateEmails', h.alternate_emails,
        'guests', (
          select coalesce(jsonb_agg(jsonb_build_object(
            'id', g.id,
            'firstName', g.first_name,
            'lastName', g.last_name,
            'displayName', trim(g.first_name || ' ' || g.last_name),
            'email', g.email,
            'plusOneAllowed', g.plus_one_allowed,
            'plusOneName', g.plus_one_name,
            'rsvps', (
              select coalesce(jsonb_agg(jsonb_build_object(
                'eventId', e.id,
                'eventName', e.event_name,
                'eventKey', e.event_key,
                'invited', gei.event_id is not null,
                'attending', r.attending,
                'mealPreference', r.meal_preference,
                'dietaryRestrictions', r.dietary_restrictions,
                'travelNotes', r.travel_notes,
                'arrivalDate', r.arrival_date,
                'departureDate', r.departure_date,
                'additionalNotes', r.additional_notes,
                'updatedAt', r.updated_at
              ) order by e.display_order), '[]'::jsonb)
              from guest_event_invites gei
              join events e on e.id = gei.event_id
              left join rsvps r on r.guest_id = g.id and r.event_id = e.id
              where gei.guest_id = g.id
            )
          ) order by g.created_at), '[]'::jsonb)
          from guests g
          where g.household_id = h.id
        )
      ) order by h.household_name), '[]'::jsonb)
      from households h
    )
  )
  into v_result;

  return v_result;
end;
$$;

create or replace function admin_update_rsvp(p_payload jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_guest_id uuid := (p_payload->>'guestId')::uuid;
  v_event_id uuid := (p_payload->>'eventId')::uuid;
begin
  if not is_admin() then
    raise exception 'Not authorized.';
  end if;

  if not exists (select 1 from guest_event_invites where guest_id = v_guest_id and event_id = v_event_id) then
    raise exception 'This guest is not invited to that event.';
  end if;

  insert into rsvps (
    guest_id,
    event_id,
    attending,
    meal_preference,
    dietary_restrictions,
    travel_notes,
    arrival_date,
    departure_date,
    additional_notes,
    submitted_email
  )
  values (
    v_guest_id,
    v_event_id,
    nullif(p_payload->>'attending', '')::boolean,
    nullif(trim(p_payload->>'mealPreference'), ''),
    nullif(trim(p_payload->>'dietaryRestrictions'), ''),
    nullif(trim(p_payload->>'travelNotes'), ''),
    nullif(p_payload->>'arrivalDate', '')::date,
    nullif(p_payload->>'departureDate', '')::date,
    nullif(trim(p_payload->>'additionalNotes'), ''),
    'admin'
  )
  on conflict (guest_id, event_id)
  do update set
    attending = excluded.attending,
    meal_preference = excluded.meal_preference,
    dietary_restrictions = excluded.dietary_restrictions,
    travel_notes = excluded.travel_notes,
    arrival_date = excluded.arrival_date,
    departure_date = excluded.departure_date,
    additional_notes = excluded.additional_notes,
    submitted_email = excluded.submitted_email,
    updated_at = now();

  return admin_dashboard();
end;
$$;

alter table households enable row level security;
alter table guests enable row level security;
alter table events enable row level security;
alter table guest_event_invites enable row level security;
alter table rsvps enable row level security;
alter table admin_users enable row level security;
alter table rsvp_lookup_attempts enable row level security;

drop policy if exists "Admins can read households" on households;
create policy "Admins can read households" on households for select using (is_admin());

drop policy if exists "Admins can manage households" on households;
create policy "Admins can manage households" on households for all using (is_admin()) with check (is_admin());

drop policy if exists "Admins can manage guests" on guests;
create policy "Admins can manage guests" on guests for all using (is_admin()) with check (is_admin());

drop policy if exists "Admins can manage events" on events;
create policy "Admins can manage events" on events for all using (is_admin()) with check (is_admin());

drop policy if exists "Admins can manage invites" on guest_event_invites;
create policy "Admins can manage invites" on guest_event_invites for all using (is_admin()) with check (is_admin());

drop policy if exists "Admins can manage rsvps" on rsvps;
create policy "Admins can manage rsvps" on rsvps for all using (is_admin()) with check (is_admin());

drop policy if exists "Admins can read lookup attempts" on rsvp_lookup_attempts;
create policy "Admins can read lookup attempts" on rsvp_lookup_attempts for select using (is_admin());

grant execute on function lookup_invitation(text, text) to anon, authenticated;
grant execute on function save_household_rsvp(text, jsonb, text) to anon, authenticated;
grant execute on function admin_dashboard() to authenticated;
grant execute on function admin_update_rsvp(jsonb) to authenticated;
