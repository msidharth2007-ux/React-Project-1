import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getEmergencyDoctors, bookEmergencyAppointment } from '../utils/localStorageDB';
import { FaExclamationTriangle, FaClock, FaUserMd, FaPhoneAlt, FaStar, FaAmbulance, FaHeartbeat, FaCheckCircle, FaHospital, FaArrowLeft } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Emergency type options
const EMERGENCY_TYPES = [
  "Heart Problem",
  "Accident Injury",
  "Breathing Problem",
  "High Fever",
  "Pregnancy Emergency",
  "Child Emergency",
  "General Emergency",
];

const EmergencyBooking = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Form state
  const [emergencyType, setEmergencyType] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  // Results state
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Booking state
  const [bookedAppointment, setBookedAppointment] = useState(null);
  const [toast, setToast] = useState('');

  // Check login on mount
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);
  // eslint-disable-next-line
  }, []);

  // Live clock — updates every second
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      // Set default selected time to current hour
      if (!selectedTime) {
        const hours = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        setSelectedTime(`${hours}:${mins}`);
      }
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  // eslint-disable-next-line
  }, []);

  // Helper: check if a time string (HH:MM) is between two time strings
  const isTimeBetween = (time, from, to) => {
    return time >= from && time <= to;
  };

  // Search for available emergency doctors
  const handleSearch = () => {
    if (!emergencyType || !selectedTime) return;

    setLoading(true);
    setSearched(false);
    setBookedAppointment(null);

    // Simulate loading delay for realistic feel
    setTimeout(() => {
      const allDoctors = getEmergencyDoctors();

      // Filter doctors: must be available, match emergency type, and time in range
      const filtered = allDoctors.filter(doc =>
        doc.emergencyAvailable &&
        doc.emergencyTypes.includes(emergencyType) &&
        isTimeBetween(selectedTime, doc.availableFrom, doc.availableTo)
      );

      setAvailableDoctors(filtered);
      setLoading(false);
      setSearched(true);
    }, 1500);
  };

  // Book an emergency appointment instantly
  const handleEmergencyBook = (doctor) => {
    if (!user) return;

    const result = bookEmergencyAppointment(user.id, doctor.id, emergencyType, selectedTime);

    if (result.success) {
      setBookedAppointment(result.appointment);
      setToast('🚨 Emergency appointment booked successfully!');
      setTimeout(() => setToast(''), 4000);
    }
  };

  // Navigate away
  const goToHome = () => { window.location.href = '/'; };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ─── Toast notification ─── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-green-500 text-white rounded-xl shadow-2xl font-medium flex items-center gap-2"
          >
            <FaCheckCircle /> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Emergency Alert Banner ─── */}
      <div className="bg-gradient-to-r from-red-600 to-red-500 text-white py-3 text-center text-sm font-medium">
        <div className="flex items-center justify-center gap-2">
          <FaExclamationTriangle className="animate-pulse" />
          EMERGENCY SERVICES — Available 24/7 — Call Ambulance: <span className="font-bold">108</span>
          <FaExclamationTriangle className="animate-pulse" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Go back button */}
        <button onClick={goToHome} className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-600 hover:text-primary hover:bg-white transition-all font-medium mb-6">
          <FaArrowLeft /> Go Back
        </button>

        {/* ─── Page Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <FaHeartbeat className="animate-pulse" /> Emergency Services
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">
            Emergency <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600">Booking</span>
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto">Find and book an emergency doctor instantly. Select your emergency type and we'll match you with the right specialist.</p>
        </motion.div>

        {/* ─── Current Time + Status Badge ─── */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200 px-6 py-3 rounded-2xl shadow-sm flex items-center gap-3">
            <FaClock className="text-primary text-xl" />
            <div>
              <p className="text-xs text-slate-500">Current Time</p>
              <p className="text-lg font-bold text-slate-800 font-mono">{currentTime}</p>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 px-5 py-3 rounded-2xl flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-green-700 font-semibold text-sm">Emergency Doctors Available Now</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ═══ LEFT COLUMN: Search Form ═══ */}
          <div className="lg:col-span-1 space-y-6">
            {/* Emergency Type Selector */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6"
            >
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <FaExclamationTriangle className="text-red-500" /> Select Emergency Type
              </h3>
              <select
                value={emergencyType}
                onChange={(e) => setEmergencyType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-400 text-slate-700"
              >
                <option value="">-- Choose Emergency Type --</option>
                {EMERGENCY_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              {/* Time selector */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-600 mb-2">Emergency Time</label>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>

              {/* Search button */}
              <button
                onClick={handleSearch}
                disabled={!emergencyType || !selectedTime}
                className={`w-full mt-5 py-3.5 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                  emergencyType && selectedTime
                    ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white hover:shadow-xl hover:-translate-y-0.5'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <FaUserMd /> Find Emergency Doctors
              </button>
            </motion.div>

            {/* ─── Emergency Instructions Card ─── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 text-white shadow-lg"
            >
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <FaHospital /> Emergency Instructions
              </h3>
              <ul className="space-y-2 text-sm text-blue-100">
                <li>• Stay calm and describe the situation</li>
                <li>• Select the correct emergency type</li>
                <li>• Note down your token number</li>
                <li>• Proceed to the assigned room directly</li>
                <li>• Carry a valid ID for verification</li>
                <li>• Emergency patients get priority care</li>
              </ul>
            </motion.div>

            {/* ─── Ambulance Contact ─── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl border-2 border-red-200 p-6 text-center"
            >
              <FaAmbulance className="text-4xl text-red-500 mx-auto mb-3" />
              <h4 className="font-bold text-slate-800 mb-1">Need an Ambulance?</h4>
              <p className="text-sm text-slate-500 mb-3">For life-threatening emergencies</p>
              <a href="tel:108" className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition-colors">
                <FaPhoneAlt /> Call 108
              </a>
            </motion.div>
          </div>

          {/* ═══ RIGHT COLUMN: Results ═══ */}
          <div className="lg:col-span-2">
            {/* Loading state */}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl shadow-lg p-16 text-center"
              >
                <div className="w-16 h-16 border-4 border-red-200 border-t-red-500 rounded-full animate-spin mx-auto mb-6"></div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Searching Emergency Doctors...</h3>
                <p className="text-slate-500">Matching specialists for <span className="font-semibold text-red-600">{emergencyType}</span></p>
              </motion.div>
            )}

            {/* Booking confirmation card */}
            {bookedAppointment && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-xl border-2 border-green-200 p-8 mb-6"
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto text-4xl mb-4">
                    <FaCheckCircle />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Emergency Appointment Confirmed!</h3>
                  <p className="text-slate-500 mb-6">Please proceed to the emergency room immediately.</p>

                  {/* Confirmation details grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-red-50 p-4 rounded-xl">
                      <p className="text-xs text-slate-500 mb-1">Token Number</p>
                      <p className="text-xl font-black text-red-600">{bookedAppointment.tokenNumber}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <p className="text-xs text-slate-500 mb-1">Room</p>
                      <p className="text-xl font-black text-blue-600">{bookedAppointment.roomNo}</p>
                    </div>
                    <div className="bg-cyan-50 p-4 rounded-xl">
                      <p className="text-xs text-slate-500 mb-1">Doctor</p>
                      <p className="text-sm font-bold text-cyan-700">{bookedAppointment.doctorName}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <p className="text-xs text-slate-500 mb-1">Contact</p>
                      <p className="text-sm font-bold text-slate-700">{bookedAppointment.phone}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 justify-center">
                    <button onClick={() => window.location.href = '/my-appointments'} className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg transition-all">
                      View My Appointments
                    </button>
                    <button onClick={goToHome} className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-all">
                      Go to Home
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Doctor results list */}
            {!loading && searched && !bookedAppointment && (
              <>
                {availableDoctors.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-2xl shadow-lg p-16 text-center"
                  >
                    <FaExclamationTriangle className="text-5xl text-amber-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-800 mb-2">No Emergency Doctor Available</h3>
                    <p className="text-slate-500 mb-6">No emergency doctor available for this time. Please contact hospital emergency desk.</p>
                    <a href="tel:108" className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition-colors">
                      <FaPhoneAlt /> Call Emergency Desk
                    </a>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-800">
                      {availableDoctors.length} Emergency Doctor{availableDoctors.length > 1 ? 's' : ''} Available
                    </h3>
                    {availableDoctors.map((doctor, index) => (
                      <motion.div
                        key={doctor.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 hover:shadow-xl transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                          {/* Doctor image */}
                          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-red-100 flex-shrink-0">
                            <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                          </div>

                          {/* Doctor info */}
                          <div className="flex-grow">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-lg font-bold text-slate-800">{doctor.name}</h4>
                              <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded-full">EMERGENCY</span>
                            </div>
                            <p className="text-primary font-medium text-sm mb-2">{doctor.specialization}</p>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                              <span className="flex items-center gap-1">
                                <FaStar className="text-amber-500" /> {doctor.rating}
                              </span>
                              <span className="flex items-center gap-1">
                                <FaHospital className="text-slate-400" /> Room: {doctor.roomNo}
                              </span>
                              <span className="flex items-center gap-1">
                                <FaClock className="text-slate-400" /> {doctor.availableFrom} – {doctor.availableTo}
                              </span>
                            </div>
                          </div>

                          {/* Book button */}
                          <div className="flex flex-col items-end gap-2 flex-shrink-0">
                            <button
                              onClick={() => handleEmergencyBook(doctor)}
                              className="px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl font-bold hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"
                            >
                              <FaHeartbeat className="animate-pulse" /> Book Emergency Now
                            </button>
                            <a href={`tel:${doctor.phone}`} className="text-sm text-slate-500 hover:text-red-500 flex items-center gap-1 transition-colors">
                              <FaPhoneAlt /> {doctor.phone}
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Default state — before search */}
            {!loading && !searched && !bookedAppointment && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-sm border border-slate-200 p-16 text-center"
              >
                <FaHeartbeat className="text-6xl text-red-300 mx-auto mb-6 animate-pulse" />
                <h3 className="text-xl font-bold text-slate-700 mb-2">Select Emergency Type to Begin</h3>
                <p className="text-slate-400 max-w-md mx-auto">Choose your emergency type and time from the left panel, then click "Find Emergency Doctors" to see available specialists.</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyBooking;
