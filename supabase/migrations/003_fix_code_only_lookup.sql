-- Guard against missing guest emails matching a code-only lookup.
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
  where (v_email <> '' and (normalize_email(h.primary_email) = v_email
    or exists (select 1 from unnest(h.alternate_emails) email where normalize_email(email) = v_email)
    or exists (select 1 from guests g where g.household_id = h.id and normalize_email(g.email) = v_email)
    ))
    or (p_fallback_code is not null and h.fallback_code = trim(p_fallback_code))
  order by h.created_at
  limit 1;

  return v_household_id;
end;
$$;

