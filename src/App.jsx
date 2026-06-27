import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import PasswordGate from './components/PasswordGate';
import Home from './pages/Home';
import OurStory from './pages/OurStory';
import Schedule from './pages/Schedule';
import Venue from './pages/Venue';
import TravelStay from './pages/TravelStay';
import DressCode from './pages/DressCode';
import Registry from './pages/Registry';
import FAQ from './pages/FAQ';
import RSVP from './pages/RSVP';

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
          <Route path="/things-to-do" element={<Navigate to="/travel-stay" replace />} />
          <Route path="/dress-code" element={<DressCode />} />
          <Route path="/wedding-party" element={<Navigate to="/" replace />} />
          <Route path="/gallery" element={<Navigate to="/our-story" replace />} />
          <Route path="/registry" element={<Registry />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/rsvp" element={<RSVP />} />
          <Route path="/contact" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </PasswordGate>
  );
}
