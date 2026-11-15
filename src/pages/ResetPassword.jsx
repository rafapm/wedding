import { useEffect, useState } from 'react';
import { requestPasswordReset, resetAdminPassword } from '../services/supabaseRsvp';

export default function ResetPassword() {
  const [callback] = useState(() => new URLSearchParams(window.location.hash.slice(1)));
  const [token, setToken] = useState(() => callback.get('type') === 'recovery' ? callback.get('access_token') || '' : '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [message, setMessage] = useState(() => callback.has('error_description') ? 'This recovery link is invalid or expired. Please request a new one.' : '');

  useEffect(() => {
    // Keep recovery credentials out of browser history and persistent storage.
    window.history.replaceState(null, '', '/reset-password');
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    if (token && password !== confirmation) {
      setMessage('The passwords do not match.');
      return;
    }
    setBusy(true);
    try {
      if (token) {
        await resetAdminPassword(token, password);
        sessionStorage.removeItem('jr-admin-token');
        setToken('');
        setPassword('');
        setConfirmation('');
        setDone(true);
      } else {
        await requestPasswordReset(email);
        setMessage('If this email has an account, a new recovery link will arrive shortly. Please use the newest email.');
      }
    } catch (error) {
      setMessage(error.message || 'Please try again or request a new recovery link.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-ivory px-6 py-20">
      <section className="mx-auto max-w-lg border border-gold/25 bg-white/60 p-8 shadow-soft">
        <p className="mb-4 text-sm tracking-widest">JUNE & RAFAEL</p>
        <h1 className="mb-6 text-3xl">{done ? 'Password Updated' : token ? 'Set Your New Password' : 'Reset Admin Password'}</h1>
        {done ? <p>You can now <a className="underline" href="/admin">sign in to the admin page</a> with your new password.</p> : (
          <form onSubmit={handleSubmit}>
            {token ? <>
              <label className="block">New Password
                <input className="mt-2 mb-5 w-full border border-gold/30 bg-white p-3" type="password" autoComplete="new-password" minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} />
              </label>
              <label className="block">Confirm Password
                <input className="mt-2 mb-5 w-full border border-gold/30 bg-white p-3" type="password" autoComplete="new-password" minLength={8} required value={confirmation} onChange={(event) => setConfirmation(event.target.value)} />
              </label>
            </> : <label className="block">Admin Email
              <input className="mt-2 mb-5 w-full border border-gold/30 bg-white p-3" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>}
            <button className="button-dark" disabled={busy} type="submit">{busy ? 'Please Wait…' : token ? 'Update Password' : 'Send Recovery Link'}</button>
            {message && <p role="status" className="mt-5">{message}</p>}
            {token && <button className="mt-5 block underline" type="button" onClick={() => { setToken(''); setPassword(''); setConfirmation(''); setMessage(''); }}>Request A New Link</button>}
          </form>
        )}
      </section>
    </main>
  );
}
