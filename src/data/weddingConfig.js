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
    deadline: 'TBD',
  },
  contact: {
    couple: [
      {
        name: 'June Karimli',
        email: 'gunaykarimli94@gmail.com',
        phone: '+1 (650)-922-4139',
      },
      {
        name: 'Rafael Perez Martinez',
        email: 'rafa.prezz@gmail.com',
        phone: '+1 (650)-613-9824',
      },
    ],
  },
  schedule: [
    { key: 'welcome', date: 'June 15, 2027', time: 'TBD', location: 'Barcelona area' },
    { key: 'wedding', date: 'June 16, 2027', time: '3:45 PM arrival', location: 'Xalet del Nin' },
    { key: 'afterWedding', date: 'June 18-19, 2027', time: 'Optional', location: 'Ibiza, Spain' },
  ],
  registryLinks: [
    { label: 'Registry One', url: '#', visible: false },
    { label: 'Registry Two', url: '#', visible: false },
  ],
  galleryImages: [
    { src: '/images/gallery/fix-0626.jpg', captionKey: 'engagementMoment', alt: 'June and Rafael engagement moment' },
    { src: '/images/gallery/img-1603.jpeg', captionKey: 'gardenSelfie', alt: 'June and Rafael in a garden' },
    { src: '/images/gallery/fix-0926.jpg', captionKey: 'beachProposal', alt: 'Rafael proposing to June on the beach' },
    { src: '/images/gallery/fix-0711.jpg', captionKey: 'beachPortrait', alt: 'June and Rafael on the beach' },
    { src: '/images/gallery/img-5825.jpeg', captionKey: 'parisMemory', alt: 'June and Rafael in Paris' },
    { src: '/images/gallery/fix-0562.jpg', captionKey: 'beachPortraitTwo', alt: 'June and Rafael beach portrait' },
    { src: '/images/gallery/img-1485.jpeg', captionKey: 'gardenMemory', alt: 'June and Rafael in a garden' },
    { src: '/images/gallery/img-0190.png', captionKey: 'costumeNight', alt: 'June and Rafael in costume' },
    { src: '/images/gallery/img-6480.jpeg', captionKey: 'formalDinner', alt: 'June and Rafael at a formal dinner' },
    { src: '/images/gallery/img-0260.jpeg', captionKey: 'cityCelebration', alt: 'June and Rafael dressed up in the city' },
  ],
};

export const hiddenPages = {
  registry: false,
};
