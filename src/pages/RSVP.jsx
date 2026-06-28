import { useMemo, useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { weddingConfig } from '../data/weddingConfig';
import { useTranslation } from '../hooks/useTranslation';
import { isSupabaseConfigured, lookupInvitation, saveRsvp } from '../services/supabaseRsvp';

const emptyResponse = {
  attending: '',
  mealPreference: '',
  dietaryRestrictions: '',
  travelNotes: '',
  arrivalDate: '',
  departureDate: '',
  additionalNotes: '',
};

function buildInitialResponses(invitation) {
  const next = {};
  const plusOnes = {};

  invitation.guests?.forEach((guest) => {
    plusOnes[guest.id] = guest.plusOneName || '';
    next[guest.id] = {};
    guest.events?.forEach((event) => {
      const rsvp = event.rsvp || {};
      next[guest.id][event.id] = {
        attending: typeof rsvp.attending === 'boolean' ? String(rsvp.attending) : '',
        mealPreference: rsvp.mealPreference || '',
        dietaryRestrictions: rsvp.dietaryRestrictions || '',
        travelNotes: rsvp.travelNotes || '',
        arrivalDate: rsvp.arrivalDate || '',
        departureDate: rsvp.departureDate || '',
        additionalNotes: rsvp.additionalNotes || '',
      };
    });
  });

  return { responses: next, plusOnes };
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

export default function RSVP() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [fallbackCode, setFallbackCode] = useState('');
  const [invitation, setInvitation] = useState(null);
  const [responses, setResponses] = useState({});
  const [plusOnes, setPlusOnes] = useState({});
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const hasExistingRsvps = useMemo(() => invitation?.guests?.some((guest) => guest.events?.some((event) => event.rsvp)), [invitation]);

  const handleLookup = async (event) => {
    event.preventDefault();
    setStatus('loading');
    setMessage('');
    setInvitation(null);

    try {
      const result = await lookupInvitation(email, fallbackCode);
      if (!result.found) {
        setStatus('notFound');
        setMessage(t('rsvp.notFound'));
        return;
      }

      const initial = buildInitialResponses(result);
      setInvitation(result);
      setResponses(initial.responses);
      setPlusOnes(initial.plusOnes);
      setStatus('found');
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
    }
  };

  const updateResponse = (guestId, eventId, field, value) => {
    setResponses((current) => ({
      ...current,
      [guestId]: {
        ...current[guestId],
        [eventId]: {
          ...(current[guestId]?.[eventId] || emptyResponse),
          [field]: value,
        },
      },
    }));
  };

  const validate = () => {
    const missing = [];

    invitation.guests?.forEach((guest) => {
      guest.events?.forEach((event) => {
        if (!responses[guest.id]?.[event.id]?.attending) {
          missing.push(`${guest.displayName}: ${event.eventName}`);
        }
      });
    });

    return missing;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const missing = validate();
    if (missing.length) {
      setStatus('found');
      setMessage(t('rsvp.validationMissing'));
      return;
    }

    setStatus('saving');
    setMessage('');

    try {
      const payload = {
        householdId: invitation.household.id,
        guests: invitation.guests.map((guest) => ({
          guestId: guest.id,
          plusOneName: plusOnes[guest.id] || '',
          responses: guest.events.map((rsvpEvent) => ({
            eventId: rsvpEvent.id,
            ...responses[guest.id][rsvpEvent.id],
          })),
        })),
      };

      const saved = await saveRsvp(email, payload, fallbackCode);
      const initial = buildInitialResponses(saved);
      setInvitation(saved);
      setResponses(initial.responses);
      setPlusOnes(initial.plusOnes);
      setStatus('saved');
      setMessage(t('rsvp.success'));
    } catch (error) {
      setStatus('found');
      setMessage(error.message);
    }
  };

  if (!isSupabaseConfigured) {
    return (
      <section className="section">
        <SectionHeader title={t('rsvp.title')} intro={t('rsvp.intro')} />
        <div className="border border-gold/25 bg-white/60 p-8 text-charcoal/75">
          {t('rsvp.notConfigured')}
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <SectionHeader title={t('rsvp.title')} intro={t('rsvp.intro')} />
      <p className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
        {t('rsvp.deadline')}: {weddingConfig.rsvp.deadline}
      </p>

      <form onSubmit={handleLookup} className="border border-gold/25 bg-white/60 p-7 shadow-soft">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <Field label={t('rsvp.emailLabel')}>
            <input
              className="w-full border border-gold/30 bg-ivory px-4 py-3 text-charcoal outline-none focus:border-charcoal"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t('rsvp.emailPlaceholder')}
              required
            />
          </Field>
          <button className="button-dark h-fit" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? t('rsvp.loading') : t('rsvp.lookupButton')}
          </button>
        </div>
        <details className="mt-4 text-sm text-charcoal/65">
          <summary className="cursor-pointer underline-offset-4 hover:underline">{t('rsvp.codeSummary')}</summary>
          <div className="mt-3 max-w-sm">
            <Field label={t('rsvp.codeLabel')}>
              <input
                className="w-full border border-gold/30 bg-ivory px-4 py-3 text-charcoal outline-none focus:border-charcoal"
                value={fallbackCode}
                onChange={(event) => setFallbackCode(event.target.value)}
                placeholder={t('rsvp.codePlaceholder')}
              />
            </Field>
          </div>
        </details>
      </form>

      {message && (
        <div className="mt-6 border border-gold/25 bg-parchment/70 p-5 text-charcoal/75">
          {message}
        </div>
      )}

      {invitation && (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="border border-gold/25 bg-charcoal p-7 text-ivory">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">{t('rsvp.household')}</p>
            <h2 className="mt-3 font-serif text-4xl">{invitation.household.householdName}</h2>
            {hasExistingRsvps && <p className="mt-3 text-ivory/75">{t('rsvp.editNote')}</p>}
          </div>

          {invitation.guests.map((guest) => (
            <article key={guest.id} className="border border-gold/25 bg-white/60 p-7">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">{t('rsvp.guest')}</p>
                  <h3 className="mt-2 font-serif text-4xl">{guest.displayName}</h3>
                </div>
                {guest.plusOneAllowed && (
                  <Field label={t('rsvp.plusOneName')}>
                    <input
                      className="w-full min-w-[260px] border border-gold/30 bg-ivory px-4 py-3 text-charcoal outline-none focus:border-charcoal"
                      value={plusOnes[guest.id] || ''}
                      onChange={(event) => setPlusOnes((current) => ({ ...current, [guest.id]: event.target.value }))}
                      placeholder={t('rsvp.plusOnePlaceholder')}
                    />
                  </Field>
                )}
              </div>

              <div className="mt-6 space-y-5">
                {guest.events.map((rsvpEvent) => {
                  const current = responses[guest.id]?.[rsvpEvent.id] || emptyResponse;
                  const isAttending = current.attending === 'true';

                  return (
                    <div key={rsvpEvent.id} className="border border-gold/20 bg-ivory/70 p-5">
                      <div className="grid gap-4 lg:grid-cols-[1fr_0.7fr]">
                        <div>
                          <h4 className="font-serif text-3xl">{rsvpEvent.eventName}</h4>
                          <p className="mt-2 text-sm uppercase tracking-[0.14em] text-charcoal/55">{rsvpEvent.eventDate || t('common.soon')}</p>
                          {rsvpEvent.description && <p className="mt-3 text-charcoal/70">{rsvpEvent.description}</p>}
                        </div>
                        <fieldset className="flex gap-3 lg:justify-end">
                          <legend className="sr-only">{t('rsvp.attendance')}</legend>
                          {[
                            ['true', t('rsvp.yes')],
                            ['false', t('rsvp.no')],
                          ].map(([value, label]) => (
                            <label key={value} className="flex cursor-pointer items-center gap-2 border border-gold/25 px-4 py-3">
                              <input
                                type="radio"
                                name={`${guest.id}-${rsvpEvent.id}-attending`}
                                value={value}
                                checked={current.attending === value}
                                onChange={(event) => updateResponse(guest.id, rsvpEvent.id, 'attending', event.target.value)}
                                required
                              />
                              <span className="text-sm font-semibold uppercase tracking-[0.14em]">{label}</span>
                            </label>
                          ))}
                        </fieldset>
                      </div>

                      {isAttending && (
                        <div className="mt-5 grid gap-4 md:grid-cols-2">
                          <Field label={t('rsvp.mealPreference')}>
                            <input className="w-full border border-gold/30 bg-white px-4 py-3" value={current.mealPreference} onChange={(event) => updateResponse(guest.id, rsvpEvent.id, 'mealPreference', event.target.value)} />
                          </Field>
                          <Field label={t('rsvp.dietaryRestrictions')}>
                            <input className="w-full border border-gold/30 bg-white px-4 py-3" value={current.dietaryRestrictions} onChange={(event) => updateResponse(guest.id, rsvpEvent.id, 'dietaryRestrictions', event.target.value)} />
                          </Field>
                          <Field label={t('rsvp.arrivalDate')}>
                            <input className="w-full border border-gold/30 bg-white px-4 py-3" type="date" value={current.arrivalDate} onChange={(event) => updateResponse(guest.id, rsvpEvent.id, 'arrivalDate', event.target.value)} />
                          </Field>
                          <Field label={t('rsvp.departureDate')}>
                            <input className="w-full border border-gold/30 bg-white px-4 py-3" type="date" value={current.departureDate} onChange={(event) => updateResponse(guest.id, rsvpEvent.id, 'departureDate', event.target.value)} />
                          </Field>
                          <Field label={t('rsvp.travelNotes')}>
                            <textarea className="min-h-28 w-full border border-gold/30 bg-white px-4 py-3" value={current.travelNotes} onChange={(event) => updateResponse(guest.id, rsvpEvent.id, 'travelNotes', event.target.value)} />
                          </Field>
                          <Field label={t('rsvp.additionalNotes')}>
                            <textarea className="min-h-28 w-full border border-gold/30 bg-white px-4 py-3" value={current.additionalNotes} onChange={(event) => updateResponse(guest.id, rsvpEvent.id, 'additionalNotes', event.target.value)} />
                          </Field>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </article>
          ))}

          <button className="button-dark" type="submit" disabled={status === 'saving'}>
            {status === 'saving' ? t('rsvp.saving') : t('rsvp.submit')}
          </button>
        </form>
      )}
    </section>
  );
}
