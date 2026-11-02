-- Preserve past invitations and responses while hiding the cancelled event.
update public.events
set visible = false
where event_key in ('after_wedding', 'afterWedding');

update public.events
set event_name = 'Pre-Wedding Get-Together',
    event_date = null,
    description = 'A tentative, small get-together before the wedding. Date, time, and location to be confirmed.'
where event_key = 'welcome';
