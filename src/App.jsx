import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Doctors from './pages/Doctors';
import BookAppointment from './pages/BookAppointment';
import MyAppointments from './pages/MyAppointments';
import AdminDashboard from './pages/AdminDashboard';
import AdminDemo from './pages/AdminDemo';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import EmergencyBooking from './pages/EmergencyBooking';
import NotFound from './pages/NotFound';
import { initDB } from './utils/localStorageDB';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // Smooth scroll to top on page change (but not on home page where navbar handles scrolling)
    if (pathname !== '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);
  return null;
};

const App = () => {
  // Initialize mock database on first load
  useEffect(() => {
    initDB();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/book-appointment/:id" element={<BookAppointment />} />
            <Route path="/my-appointments" element={<MyAppointments />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-demo" element={<AdminDemo />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/emergency-booking" element={<EmergencyBooking />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
