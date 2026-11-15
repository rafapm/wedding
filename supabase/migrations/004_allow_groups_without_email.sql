-- Groups can be invited by a unique fallback code before an email is known.
-- Apply with the non-empty email lookup guard in 003_fix_code_only_lookup.sql.
alter table public.households alter column primary_email drop not null;
