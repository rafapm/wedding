export const weddingConfig = {
  password: 'dolmataco',
  couple: {
    firstNames: 'June & Rafael',
    june: 'June',
    rafael: 'Rafael',
  },
  date: '2027-06-16T17:00:00+02:00',
  displayDate: 'June 16, 2027',
  venue: {
    name: 'Xalet del Nin',
    location: 'Barcelona, Spain',
    mapEmbedUrl: '',
  },
  media: {
    heroVideo: '/videos/venue.mp4',
    heroPoster: '/images/venue-poster.jpg',
  },
  rsvp: {
    googleFormEmbedUrl: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true',
    googleFormUrl: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform',
    deadline: 'TBD',
  },
  contact: {
    email: 'hello@example.com',
    plannerEmail: 'planner@example.com',
    phone: '+1 (000) 000-0000',
  },
  schedule: [
    { key: 'welcome', date: 'June 15, 2027', time: 'TBD' },
    { key: 'ceremony', date: 'June 16, 2027', time: 'TBD' },
    { key: 'cocktail', date: 'June 16, 2027', time: 'TBD' },
    { key: 'reception', date: 'June 16, 2027', time: 'TBD' },
    { key: 'brunch', date: 'June 17, 2027', time: 'TBD' },
  ],
  registryLinks: [
    { label: 'Registry One', url: '#', visible: false },
    { label: 'Registry Two', url: '#', visible: false },
  ],
  galleryImages: [
    { src: '/images/gallery/venue-terrace.jpg', captionKey: 'venueTerrace', alt: 'Mediterranean terrace at the venue' },
    { src: '/images/gallery/barcelona-coast.jpg', captionKey: 'barcelonaCoast', alt: 'Barcelona coastline inspiration' },
    { src: '/images/gallery/dinner-table.jpg', captionKey: 'dinnerTable', alt: 'Elegant wedding dinner table inspiration' },
    { src: '/images/gallery/engagement.jpg', captionKey: 'engagement', alt: 'Engagement photo placeholder' },
  ],
  weddingParty: [
    { name: 'Name TBD', roleKey: 'maidOfHonor', photo: '/images/wedding-party/person-1.jpg', bioKey: 'partyBio' },
    { name: 'Name TBD', roleKey: 'bestMan', photo: '/images/wedding-party/person-2.jpg', bioKey: 'partyBio' },
    { name: 'Name TBD', roleKey: 'bridesmaid', photo: '/images/wedding-party/person-3.jpg', bioKey: 'partyBio' },
    { name: 'Name TBD', roleKey: 'groomsman', photo: '/images/wedding-party/person-4.jpg', bioKey: 'partyBio' },
  ],
};

export const hiddenPages = {
  registry: false,
};
