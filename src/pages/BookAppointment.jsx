import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDoctors, bookAppointment, getCurrentUser, getBookedSlots } from '../utils/localStorageDB';
import { FaCalendarAlt, FaClock, FaUserMd, FaArrowLeft, FaHome, FaClipboardList, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const BookAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [bookedSlots, setBookedSlots] = useState([]);
  const [success, setSuccess] = useState(false);
  const [notLoggedIn, setNotLoggedIn] = useState(false);

  // Load doctor data only once when page opens
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      setNotLoggedIn(true);
      return;
    }
    const docs = getDoctors();
    const foundDoc = docs.find(d => d.id === parseInt(id));
    if (foundDoc) {
      setDoctor(foundDoc);
    }
    // eslint-disable-next-line
  }, [id]);

  // When date changes, fetch already booked slots for this doctor
  useEffect(() => {
    if (doctor && date) {
      const booked = getBookedSlots(doctor.id, date);
      setBookedSlots(booked);
      setSelectedSlot(''); // Reset selected slot when date changes
    }
  }, [doctor, date]);

  // Redirect if not logged in
  if (notLoggedIn) {
    navigate('/login');
    return null;
  }

  // Handle the booking
  const handleBooking = (e) => {
    e.preventDefault();
    const currentUser = getCurrentUser();
    if (date && selectedSlot && currentUser && doctor) {
      bookAppointment(currentUser.id, doctor.id, date, selectedSlot);
      setSuccess(true);
    }
  };

  // Navigate functions
  const goToHome = () => { window.location.href = '/'; };
  const goToAppointments = () => { window.location.href = '/my-appointments'; };
  const goToDoctors = () => { window.location.href = '/doctors'; };

  if (!doctor) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 mb-4">Doctor not found.</p>
          <button onClick={goToDoctors} className="px-6 py-2 bg-primary text-white rounded-lg">
            Browse Doctors
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 flex flex-col items-center">
      {/* Go Back button */}
      <div className="w-full max-w-4xl mx-4 mb-6">
        <button
          onClick={goToHome}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-600 hover:text-primary hover:bg-white transition-all font-medium"
        >
          <FaArrowLeft /> Go Back
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl mx-4"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Side: Doctor Info */}
          <div className="md:w-1/3 bg-gradient-to-br from-primary to-secondary p-8 text-white flex flex-col justify-center items-center text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 mb-4 shadow-lg">
              <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
            </div>
            <h2 className="text-2xl font-bold mb-1">{doctor.name}</h2>
            <p className="text-cyan-100 mb-4">{doctor.specialty}</p>
            <div className="flex items-center gap-2 text-sm bg-white/10 px-4 py-2 rounded-full mb-4">
              <FaUserMd /> {doctor.experience} Experience
            </div>
            {/* Show availability info */}
            <div className="text-xs text-cyan-100 bg-white/10 px-4 py-2 rounded-lg w-full">
              <p className="font-semibold mb-1">Available Slots:</p>
              <p>{doctor.slots?.length || 0} slots per day</p>
            </div>
          </div>

          {/* Right Side: Booking Form or Success */}
          <div className="md:w-2/3 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Book Appointment</h2>
            
            {success ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-xl text-center"
              >
                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto text-3xl mb-4">
                  ✓
                </div>
                <h3 className="text-xl font-bold mb-2">Appointment Confirmed!</h3>
                <p className="mb-1">Your appointment has been successfully booked.</p>
                <p className="text-sm text-green-600 mb-6">{doctor.name} • {date} • {selectedSlot}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={goToAppointments}
                    className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <FaClipboardList /> View My Appointments
                  </button>
                  <button
                    onClick={goToHome}
                    className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                  >
                    <FaHome /> Go to Home
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-6">
                {/* Step 1: Select Date */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Step 1: Select Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <FaCalendarAlt />
                    </div>
                    <input 
                      type="date" 
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary bg-slate-50"
                    />
                  </div>
                </div>

                {/* Step 2: Select Time Slot (only shows after date is picked) */}
                {date && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Step 2: Select Available Time Slot
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {doctor.slots?.map((slot) => {
                        const isBooked = bookedSlots.includes(slot);
                        const isSelected = selectedSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={isBooked}
                            onClick={() => setSelectedSlot(slot)}
                            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium border-2 transition-all duration-200 ${
                              isBooked
                                ? 'bg-red-50 border-red-200 text-red-400 cursor-not-allowed line-through'
                                : isSelected
                                  ? 'bg-primary/10 border-primary text-primary ring-2 ring-primary/20 scale-105'
                                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-primary hover:bg-primary/5 cursor-pointer'
                            }`}
                          >
                            {isBooked ? (
                              <><FaClock className="text-red-300" /> {slot}</>
                            ) : isSelected ? (
                              <><FaCheckCircle /> {slot}</>
                            ) : (
                              <><FaClock className="text-slate-400" /> {slot}</>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded bg-slate-100 border border-slate-200 inline-block"></span> Available
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded bg-primary/20 border-2 border-primary inline-block"></span> Selected
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded bg-red-50 border border-red-200 inline-block"></span> Booked
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Confirm Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={!date || !selectedSlot}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                      date && selectedSlot
                        ? 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:-translate-y-1'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {!date ? 'Select a date first' : !selectedSlot ? 'Select a time slot' : 'Confirm Booking'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookAppointment;
