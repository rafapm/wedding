export const hotels = [
  { id: 'calipolis', name: 'Hotel Calipolis', address: 'Av. Sofia, 2–6 · Sitges', coords: [41.2340891, 1.8043304], website: 'https://www.hotelcalipolis.com/en/' },
  { id: 'terramar', name: 'ME Sitges Terramar', address: 'Passeig Marítim, 80 · Sitges', coords: [41.22533, 1.787509], website: 'https://www.melia.com/en/hotels/spain/sitges/me-sitges-terramar', wedding: 'https://events.melia.com/en/events/me-sitges-terramar/Wedding-Gunay---Rafael' },
  { id: 'mim', name: 'MiM Sitges', address: 'Av. Sofia, 12 · Sitges', coords: [41.2347603, 1.8041102], website: 'https://www.melia.com/en/hotels/spain/sitges/hotel-sitges-0829' },
  { id: 'eurostars', name: 'Eurostars Sitges', address: 'Av. Camí de Miralpeix, 12 · Sitges', coords: [41.22914217, 1.77311532], website: 'https://www.eurostarshotels.com/eurostars-sitges.html' },
];
export const hotelMapLink = (hotel) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${hotel.name}, ${hotel.address}, Spain`)}`;
export const hotelDirections = (hotel, destination) => `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(`${hotel.name}, ${hotel.address}, Spain`)}&destination=${encodeURIComponent(destination)}&travelmode=driving`;
