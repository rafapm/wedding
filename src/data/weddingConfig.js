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
    location: 'Vilanova i la Geltru, Barcelona, Spain',
    address: 'Passeig de Salvador Espriu, 1, 08800 Vilanova i la Geltru, Barcelona, Spain',
    addressUrl: 'https://www.google.com/maps/search/?api=1&query=Passeig%20de%20Salvador%20Espriu%201%2C%2008800%20Vilanova%20i%20la%20Geltru%2C%20Barcelona%2C%20Spain',
    websiteUrl: 'https://www.xaletdelnin.com/en.html',
    mapEmbedUrl: 'https://www.google.com/maps?q=Passeig%20de%20Salvador%20Espriu%201%2C%2008800%20Vilanova%20i%20la%20Geltru%2C%20Barcelona%2C%20Spain&output=embed',
  },
  media: {
    heroVideo: '/media/xalet-del-nin.mp4',
    heroPoster: '/images/xalet.jpg',
    venueImage: '/images/xalet.jpg',
    heroVideoClipEndSeconds: 4,
  },
  rsvp: {
    googleFormEmbedUrl: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true',
    googleFormUrl: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform',
    deadline: 'TBD',
  },
  contact: {
    couple: [
      {
        name: 'June Karimli',
        email: 'gunaykarimli94@gmail.com',
        phone: '+1 650 922 4139',
      },
      {
        name: 'Rafael Perez Martinez',
        email: 'rafa.prezz@gmail.com',
        phone: '+1 650-613-9824',
      },
    ],
    planner: {
      name: 'Boda y Miel',
      email: 'info@bodaymiel.com',
      phone: '+34 676 057 565',
    },
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
};

export const hiddenPages = {
  registry: false,
};
