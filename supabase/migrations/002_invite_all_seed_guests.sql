insert into guest_event_invites (guest_id, event_id)
select g.id, e.id
from guests g
cross join events e
on conflict do nothing;
