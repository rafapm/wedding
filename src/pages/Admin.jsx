import { useMemo, useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { useTranslation } from '../hooks/useTranslation';
import { isSupabaseConfigured, loadAdminDashboard, signInAdmin, updateAdminRsvp } from '../services/supabaseRsvp';

function toCsvValue(value) {
  const safe = value == null ? '' : String(value);
  return `"${safe.replaceAll('"', '""')}"`;
}

function downloadCsv(filename, rows) {
  const csv = rows.map((row) => row.map(toCsvValue).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function flattenRows(households) {
  return households.flatMap((household) =>
    household.guests.flatMap((guest) =>
      guest.rsvps.map((rsvp) => ({
        householdName: household.householdName,
        primaryEmail: household.primaryEmail,
        guestId: guest.id,
        guestName: guest.displayName,
        guestEmail: guest.email,
        plusOneName: guest.plusOneName,
        eventId: rsvp.eventId,
        eventName: rsvp.eventName,
        attending: typeof rsvp.attending === 'boolean' ? (rsvp.attending ? 'Yes' : 'No') : 'Pending',
        mealPreference: rsvp.mealPreference,
        dietaryRestrictions: rsvp.dietaryRestrictions,
        travelNotes: rsvp.travelNotes,
        arrivalDate: rsvp.arrivalDate,
        departureDate: rsvp.departureDate,
        additionalNotes: rsvp.additionalNotes,
        updatedAt: rsvp.updatedAt,
      })),
    ),
  );
}

export default function Admin() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(() => sessionStorage.getItem('jr-admin-token') || '');
  const [dashboard, setDashboard] = useState(null);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const rows = useMemo(() => flattenRows(dashboard?.households || []), [dashboard]);
  const filteredHouseholds = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return dashboard?.households || [];

    return (dashboard?.households || []).filter((household) => (
      household.householdName.toLowerCase().includes(needle)
      || household.primaryEmail.toLowerCase().includes(needle)
      || household.guests.some((guest) => `${guest.displayName} ${guest.email || ''}`.toLowerCase().includes(needle))
    ));
  }, [dashboard, query]);

  const loadDashboard = async (adminToken = token) => {
    setStatus('loading');
    setMessage('');
    try {
      const data = await loadAdminDashboard(adminToken);
      setDashboard(data);
      setStatus('ready');
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const session = await signInAdmin(email, password);
      setToken(session.access_token);
      sessionStorage.setItem('jr-admin-token', session.access_token);
      await loadDashboard(session.access_token);
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
    }
  };

  const handleExport = () => {
    downloadCsv('june-rafael-rsvps.csv', [
      ['Household', 'Primary Email', 'Guest', 'Guest Email', 'Plus One', 'Event', 'Attendance', 'Meal', 'Dietary Restrictions', 'Travel Notes', 'Arrival', 'Departure', 'Additional Notes', 'Updated At'],
      ...rows.map((row) => [row.householdName, row.primaryEmail, row.guestName, row.guestEmail, row.plusOneName, row.eventName, row.attending, row.mealPreference, row.dietaryRestrictions, row.travelNotes, row.arrivalDate, row.departureDate, row.additionalNotes, row.updatedAt]),
    ]);
  };

  const handleSaveSelected = async (event) => {
    event.preventDefault();
    setStatus('saving');
    setMessage('');

    try {
      const updated = await updateAdminRsvp(token, selected);
      setDashboard(updated);
      setSelected(null);
      setStatus('ready');
      setMessage(t('admin.saved'));
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
    }
  };

  if (!isSupabaseConfigured) {
    return (
      <section className="section">
        <SectionHeader title={t('admin.title')} intro={t('admin.intro')} />
        <div className="border border-gold/25 bg-white/60 p-8 text-charcoal/75">{t('admin.notConfigured')}</div>
      </section>
    );
  }

  if (!token || !dashboard) {
    return (
      <section className="section">
        <SectionHeader title={t('admin.title')} intro={t('admin.intro')} />
        <form onSubmit={handleLogin} className="max-w-xl border border-gold/25 bg-white/60 p-7 shadow-soft">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{t('admin.email')}</span>
            <input className="mt-2 w-full border border-gold/30 bg-ivory px-4 py-3" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>
          <label className="mt-4 block">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{t('admin.password')}</span>
            <input className="mt-2 w-full border border-gold/30 bg-ivory px-4 py-3" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </label>
          {message && <p className="mt-4 text-charcoal/70">{message}</p>}
          <button className="button-dark mt-6" type="submit" disabled={status === 'loading'}>{status === 'loading' ? t('admin.loading') : t('admin.login')}</button>
        </form>
      </section>
    );
  }

  return (
    <section className="section">
      <SectionHeader title={t('admin.title')} intro={t('admin.intro')} />
      {message && <div className="mb-6 border border-gold/25 bg-parchment/70 p-5 text-charcoal/75">{message}</div>}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          [t('admin.totalHouseholds'), dashboard.stats.totalHouseholds],
          [t('admin.totalGuests'), dashboard.stats.totalGuests],
          [t('admin.totalInvited'), dashboard.stats.totalInvited],
          [t('admin.pendingGuests'), dashboard.stats.pendingGuests],
        ].map(([label, value]) => (
          <article key={label} className="border border-gold/25 bg-white/60 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{label}</p>
            <p className="mt-3 font-serif text-5xl">{value}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="border border-gold/25 bg-white/60 p-6">
          <h2 className="font-serif text-4xl">{t('admin.eventTotals')}</h2>
          <div className="mt-5 space-y-4">
            {dashboard.events.map((event) => (
              <div key={event.id} className="grid gap-2 border-b border-gold/20 pb-4 md:grid-cols-4">
                <strong>{event.eventName}</strong>
                <span>{t('admin.invited')}: {event.invited}</span>
                <span>{t('admin.attending')}: {event.attending}</span>
                <span>{t('admin.pending')}: {event.pending}</span>
              </div>
            ))}
          </div>
        </article>
        <article className="border border-gold/25 bg-white/60 p-6">
          <h2 className="font-serif text-4xl">{t('admin.mealCounts')}</h2>
          <div className="mt-5 space-y-3">
            {dashboard.mealCounts.map((meal) => (
              <div key={meal.mealPreference} className="flex justify-between border-b border-gold/20 pb-3">
                <span>{meal.mealPreference}</span>
                <strong>{meal.count}</strong>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <label className="block md:min-w-[360px]">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{t('admin.search')}</span>
          <input className="mt-2 w-full border border-gold/30 bg-white px-4 py-3" value={query} onChange={(event) => setQuery(event.target.value)} />
        </label>
        <button className="button-dark" type="button" onClick={handleExport}>{t('admin.exportCsv')}</button>
      </div>

      <div className="mt-8 space-y-5">
        {filteredHouseholds.map((household) => (
          <article key={household.id} className="border border-gold/25 bg-white/60 p-6">
            <h2 className="font-serif text-4xl">{household.householdName}</h2>
            <p className="mt-2 text-charcoal/65">{household.primaryEmail}</p>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="text-xs uppercase tracking-[0.16em] text-gold">
                  <tr>
                    <th className="py-3">{t('admin.guest')}</th>
                    <th>{t('admin.event')}</th>
                    <th>{t('admin.status')}</th>
                    <th>{t('admin.meal')}</th>
                    <th>{t('admin.dietary')}</th>
                    <th>{t('admin.travel')}</th>
                    <th>{t('admin.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {household.guests.flatMap((guest) => guest.rsvps.map((rsvp) => (
                    <tr key={`${guest.id}-${rsvp.eventId}`} className="border-t border-gold/15">
                      <td className="py-3">{guest.displayName}</td>
                      <td>{rsvp.eventName}</td>
                      <td>{typeof rsvp.attending === 'boolean' ? (rsvp.attending ? t('admin.yes') : t('admin.no')) : t('admin.pending')}</td>
                      <td>{rsvp.mealPreference || '-'}</td>
                      <td>{rsvp.dietaryRestrictions || '-'}</td>
                      <td>{rsvp.travelNotes || '-'}</td>
                      <td>
                        <button className="underline-offset-4 hover:underline" type="button" onClick={() => setSelected({ guestId: guest.id, eventId: rsvp.eventId, attending: typeof rsvp.attending === 'boolean' ? String(rsvp.attending) : '', mealPreference: rsvp.mealPreference || '', dietaryRestrictions: rsvp.dietaryRestrictions || '', travelNotes: rsvp.travelNotes || '', arrivalDate: rsvp.arrivalDate || '', departureDate: rsvp.departureDate || '', additionalNotes: rsvp.additionalNotes || '' })}>
                          {t('admin.edit')}
                        </button>
                      </td>
                    </tr>
                  )))}
                </tbody>
              </table>
            </div>
          </article>
        ))}
      </div>

      {selected && (
        <form onSubmit={handleSaveSelected} className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl border border-gold/30 bg-ivory p-6 shadow-soft">
          <h2 className="font-serif text-3xl">{t('admin.editRsvp')}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <select className="border border-gold/30 bg-white px-4 py-3" value={selected.attending} onChange={(event) => setSelected({ ...selected, attending: event.target.value })} required>
              <option value="">{t('admin.pending')}</option>
              <option value="true">{t('admin.yes')}</option>
              <option value="false">{t('admin.no')}</option>
            </select>
            <input className="border border-gold/30 bg-white px-4 py-3" placeholder={t('admin.meal')} value={selected.mealPreference} onChange={(event) => setSelected({ ...selected, mealPreference: event.target.value })} />
            <input className="border border-gold/30 bg-white px-4 py-3" placeholder={t('admin.dietary')} value={selected.dietaryRestrictions} onChange={(event) => setSelected({ ...selected, dietaryRestrictions: event.target.value })} />
            <input className="border border-gold/30 bg-white px-4 py-3" type="date" value={selected.arrivalDate} onChange={(event) => setSelected({ ...selected, arrivalDate: event.target.value })} />
            <input className="border border-gold/30 bg-white px-4 py-3" type="date" value={selected.departureDate} onChange={(event) => setSelected({ ...selected, departureDate: event.target.value })} />
            <input className="border border-gold/30 bg-white px-4 py-3" placeholder={t('admin.travel')} value={selected.travelNotes} onChange={(event) => setSelected({ ...selected, travelNotes: event.target.value })} />
          </div>
          <textarea className="mt-4 min-h-24 w-full border border-gold/30 bg-white px-4 py-3" placeholder={t('admin.additionalNotes')} value={selected.additionalNotes} onChange={(event) => setSelected({ ...selected, additionalNotes: event.target.value })} />
          <div className="mt-4 flex gap-3">
            <button className="button-dark" type="submit" disabled={status === 'saving'}>{t('admin.save')}</button>
            <button className="button-light" type="button" onClick={() => setSelected(null)}>{t('admin.cancel')}</button>
          </div>
        </form>
      )}
    </section>
  );
}
