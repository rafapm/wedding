insert into households (id, household_name, primary_email, alternate_emails, fallback_code)
values
  ('11111111-1111-1111-1111-111111111111', 'The Rivera Household', 'alex.rivera@example.com', array['sam.rivera@example.com'], 'RIVERA2027'),
  ('22222222-2222-2222-2222-222222222222', 'Maya Chen', 'maya.chen@example.com', array[]::text[], 'CHEN2027')
on conflict (id) do nothing;

insert into events (id, event_key, event_name, event_date, description, visible, display_order)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'welcome', 'Welcome Event', '2027-06-15', 'A relaxed gathering to begin the celebration.', true, 10),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'wedding', 'Wedding Ceremony & Reception', '2027-06-16', 'Join us at Xalet del Nin for the wedding celebration.', true, 20),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'after_wedding', 'Post-Wedding Celebration', '2027-06-18', 'Optional post-wedding celebration in Ibiza.', true, 30)
on conflict (id) do nothing;

insert into guests (id, household_id, first_name, last_name, email, plus_one_allowed, language_preference)
values
  ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'Alex', 'Rivera', 'alex.rivera@example.com', true, 'en'),
  ('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'Sam', 'Rivera', 'sam.rivera@example.com', false, 'en'),
  ('55555555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222222', 'Maya', 'Chen', 'maya.chen@example.com', false, 'es-MX')
on conflict (id) do nothing;

insert into guest_event_invites (guest_id, event_id)
select g.id, e.id
from guests g
cross join events e
where g.id in ('33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444')
on conflict do nothing;

insert into guest_event_invites (guest_id, event_id)
values
  ('55555555-5555-5555-5555-555555555555', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb')
on conflict do nothing;
