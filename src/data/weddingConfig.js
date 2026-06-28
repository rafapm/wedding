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
  },
  schedule: [
    { key: 'welcome', date: 'June 15, 2027', time: 'TBD' },
    { key: 'wedding', date: 'June 16, 2027', time: 'TBD' },
    { key: 'afterWedding', date: 'June 18-19, 2027', time: 'Optional' },
  ],
  registryLinks: [
    { label: 'Registry One', url: '#', visible: false },
    { label: 'Registry Two', url: '#', visible: false },
  ],
  galleryImages: [
    { src: '/images/gallery/fix-0626.jpg', captionKey: 'coupleOne', alt: 'June and Rafael together' },
    { src: '/images/gallery/img-1603.jpeg', captionKey: 'coupleTwo', alt: 'June and Rafael photo' },
    { src: '/images/gallery/fix-0926.jpg', captionKey: 'coupleThree', alt: 'June and Rafael engagement-style photo' },
    { src: '/images/gallery/fix-0711.jpg', captionKey: 'coupleFour', alt: 'June and Rafael candid photo' },
    { src: '/images/gallery/img-5825.jpeg', captionKey: 'coupleFive', alt: 'June and Rafael travel photo' },
    { src: '/images/gallery/fix-0562.jpg', captionKey: 'coupleSix', alt: 'June and Rafael portrait' },
    { src: '/images/gallery/img-1485.jpeg', captionKey: 'coupleSeven', alt: 'June and Rafael memory' },
    { src: '/images/gallery/img-0190.png', captionKey: 'coupleEight', alt: 'June and Rafael moment' },
    { src: '/images/gallery/img-6480.jpeg', captionKey: 'coupleNine', alt: 'June and Rafael together outdoors' },
    { src: '/images/gallery/img-0260.jpeg', captionKey: 'coupleTen', alt: 'June and Rafael celebration photo' },
  ],
};

export const hiddenPages = {
  registry: false,
};
