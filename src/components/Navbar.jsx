import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../utils/localStorageDB';
import { FaHospitalSymbol, FaUserCircle, FaBars, FaTimes, FaSignOutAlt, FaTachometerAlt, FaUser } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [toast, setToast] = useState('');


  // Detect scroll for navbar glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ─── Logout handler with toast ───
  const handleLogout = () => {
    logoutUser();
    setMobileOpen(false);
    setToast('Logged out successfully');
    navigate('/');
    // Auto-hide toast after 3 seconds
    setTimeout(() => setToast(''), 3000);
  };

  // ─── Navigation items with their routes ───
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Doctors', path: '/doctors' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/70 backdrop-blur-xl shadow-lg border-b border-white/20'
          : 'bg-white/90 backdrop-blur-md shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">

            {/* ─── Logo ─── */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary cursor-pointer">
                <FaHospitalSymbol className="text-3xl text-secondary" />
                Smart<span className="text-secondary">Care</span>
              </Link>
            </div>

            {/* ─── Desktop Links ─── */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                    location.pathname === link.path ? 'text-primary' : 'text-slate-700 hover:text-primary'
                  }`}
                >
                  {link.label}
                  {/* Animated underline — active or on hover */}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 rounded-full ${
                    location.pathname === link.path ? 'w-3/4' : 'w-0 group-hover:w-3/4'
                  }`}></span>
                </Link>
              ))}

              {/* Emergency Button */}
              <Link
                to="/emergency-booking"
                className={`relative px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 flex items-center gap-1.5 ${
                  location.pathname === '/emergency-booking'
                    ? 'text-red-600 bg-red-50'
                    : 'text-red-500 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                Emergency
              </Link>

              {/* Divider */}
              <div className="w-px h-6 bg-slate-200 mx-2"></div>

              {/* ─── Auth Buttons ─── */}
              {user ? (
                <div className="flex items-center gap-2">
                  <Link
                    to={user.role === 'admin' ? '/admin-dashboard' : '/dashboard'}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      location.pathname.includes('dashboard') ? 'text-primary bg-primary/10' : 'text-slate-700 hover:text-primary hover:bg-slate-50'
                    }`}
                  >
                    <FaTachometerAlt className="text-xs" /> Dashboard
                  </Link>

                  {/* Profile Dropdown */}
                  <div className="relative group">
                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 transition-all focus:outline-none">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium hidden lg:inline">{user.name}</span>
                    </button>
                    <div className="absolute right-0 mt-1 w-52 bg-white/90 backdrop-blur-xl rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-slate-100 transform origin-top-right scale-95 group-hover:scale-100">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                      </div>
                      <Link to="/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                        <FaUser className="text-slate-400" /> Profile
                      </Link>
                      {user.role === 'user' && (
                        <Link to="/my-appointments" className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                          <FaUserCircle className="text-slate-400" /> My Appointments
                        </Link>
                      )}
                      <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                        <FaSignOutAlt /> Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      location.pathname === '/login' ? 'text-primary bg-primary/10' : 'text-slate-700 hover:text-primary hover:bg-slate-50'
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2 rounded-lg text-sm text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-200 font-medium"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* ─── Mobile Hamburger ─── */}
            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
              >
                {mobileOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
              </button>
            </div>

          </div>
        </div>

        {/* ─── Mobile Menu ─── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`block w-full text-left px-4 py-3 rounded-lg transition-colors font-medium ${
                      location.pathname === link.path ? 'text-primary bg-primary/10' : 'text-slate-700 hover:bg-primary/10 hover:text-primary'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Emergency link (mobile) */}
                <Link
                  to="/emergency-booking"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 w-full text-left px-4 py-3 rounded-lg font-bold transition-colors ${
                    location.pathname === '/emergency-booking' ? 'text-red-600 bg-red-50' : 'text-red-500 hover:bg-red-50'
                  }`}
                >
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  Emergency
                </Link>

                <div className="border-t border-slate-100 my-2"></div>

                {user ? (
                  <>
                    <Link
                      to={user.role === 'admin' ? '/admin-dashboard' : '/dashboard'}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 rounded-lg text-slate-700 hover:bg-primary/10 hover:text-primary transition-colors font-medium"
                    >
                      <FaTachometerAlt /> Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 rounded-lg text-slate-700 hover:bg-primary/10 hover:text-primary transition-colors font-medium"
                    >
                      <FaUser /> Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </>
                ) : (
                  <div className="flex gap-2 pt-2">
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1 text-center py-3 rounded-lg text-primary bg-primary/10 font-medium">
                      Login
                    </Link>
                    <Link to="/register" onClick={() => setMobileOpen(false)} className="flex-1 text-center py-3 rounded-lg text-white bg-gradient-to-r from-primary to-secondary font-medium">
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer so content isn't hidden behind fixed navbar */}
      <div className="h-16"></div>

      {/* ─── Toast Notification ─── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-green-500 text-white rounded-xl shadow-xl shadow-green-500/30 font-medium text-sm flex items-center gap-2"
          >
            ✅ {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
