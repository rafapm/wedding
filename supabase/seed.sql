-- Event setup only. No demo guests, invitation codes, or RSVP responses are seeded.
-- Real guest lists are imported privately from the master spreadsheet.

insert into events (id, event_key, event_name, event_date, description, visible, display_order)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'welcome', 'Pre-Wedding Get-Together', null, 'A tentative, small get-together before the wedding. Date, time, and location to be confirmed.', true, 10),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'wedding', 'Wedding Ceremony & Reception', '2027-06-16', 'Join us at Xalet del Nin for the wedding celebration.', true, 20)
on conflict (id) do nothing;
