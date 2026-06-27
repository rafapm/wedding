import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import PasswordGate from './components/PasswordGate';
import Home from './pages/Home';
import OurStory from './pages/OurStory';
import Schedule from './pages/Schedule';
import Venue from './pages/Venue';
import TravelStay from './pages/TravelStay';
import ThingsToDo from './pages/ThingsToDo';
import DressCode from './pages/DressCode';
import WeddingParty from './pages/WeddingParty';
import Gallery from './pages/Gallery';
import Registry from './pages/Registry';
import FAQ from './pages/FAQ';
import RSVP from './pages/RSVP';
import Contact from './pages/Contact';

export default function App() {
  return (
    <PasswordGate>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/venue" element={<Venue />} />
          <Route path="/travel-stay" element={<TravelStay />} />
          <Route path="/things-to-do" element={<ThingsToDo />} />
          <Route path="/dress-code" element={<DressCode />} />
          <Route path="/wedding-party" element={<WeddingParty />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/registry" element={<Registry />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/rsvp" element={<RSVP />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </PasswordGate>
  );
}
