import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getUserAppointments, updateAppointmentStatus } from '../utils/localStorageDB';
import { FaCalendarTimes, FaClock, FaCalendarCheck, FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';
import AnimatedCard from '../components/AnimatedCard';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const user = getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role === 'admin') {
      navigate('/login');
      return;
    }
    loadAppointments();
    // eslint-disable-next-line
  }, []);

  const loadAppointments = () => {
    if (!user) return;
    // Sort: emergency first, then by date (newest first)
    const allApts = getUserAppointments(user.id);
    const sorted = allApts.sort((a, b) => {
      // Emergency appointments always come first
      if (a.type === 'Emergency' && b.type !== 'Emergency') return -1;
      if (a.type !== 'Emergency' && b.type === 'Emergency') return 1;
      // Then sort by date (newest first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setAppointments(sorted);
  };

  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      updateAppointmentStatus(id, 'Cancelled');
      loadAppointments();
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Go Back button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-600 hover:text-primary hover:bg-white transition-all font-medium mb-6"
        >
          <FaArrowLeft /> Go Back to Home
        </button>

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">My Appointments</h1>
          <p className="text-slate-500 mt-1">Manage your upcoming and past medical appointments.</p>
        </div>

        {appointments.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-slate-100">
            <FaCalendarTimes className="mx-auto text-6xl text-slate-200 mb-6" />
            <h2 className="text-2xl font-bold text-slate-700 mb-2">No appointments found</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">You haven't booked any appointments yet. Find a doctor and schedule your first visit.</p>
            <button onClick={() => navigate('/doctors')} className="px-8 py-3 rounded-full text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all font-medium">
              Find a Doctor
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {appointments.map((apt, index) => {
              const isEmergency = apt.type === 'Emergency';
              return (
                <AnimatedCard
                  key={apt.id}
                  delay={index * 0.1}
                  className={`flex flex-col md:flex-row md:items-center justify-between p-6 ${
                    isEmergency ? 'border-l-4 border-l-red-500' : ''
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    {/* Date box */}
                    <div className={`p-4 rounded-xl text-center min-w-[100px] ${isEmergency ? 'bg-red-50' : 'bg-slate-100'}`}>
                      <p className="text-xs text-slate-500 uppercase font-bold">{new Date(apt.date).toLocaleString('default', { month: 'short' })}</p>
                      <p className={`text-3xl font-black ${isEmergency ? 'text-red-500' : 'text-primary'}`}>{new Date(apt.date).getDate()}</p>
                      <p className="text-xs text-slate-500">{new Date(apt.date).getFullYear()}</p>
                    </div>
                    
                    {/* Info */}
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-slate-800">{apt.doctorName}</h3>
                        {/* Status badge */}
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          apt.status === 'Scheduled' ? 'bg-amber-100 text-amber-700' :
                          apt.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                          apt.status === 'Completed' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {apt.status}
                        </span>
                        {/* Emergency badge */}
                        {isEmergency && (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white flex items-center gap-1">
                            <FaExclamationTriangle /> EMERGENCY
                          </span>
                        )}
                      </div>
                      <p className="text-slate-500 mb-1">{apt.specialty}</p>
                      {/* Show emergency type if applicable */}
                      {isEmergency && apt.emergencyType && (
                        <p className="text-red-600 text-sm font-medium mb-1">{apt.emergencyType}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                        <span className="bg-slate-50 inline-flex items-center px-3 py-1 rounded-md border border-slate-100">
                          <FaClock className="mr-2 text-slate-400" /> {apt.time}
                        </span>
                        {/* Show token & room for emergency */}
                        {isEmergency && apt.tokenNumber && (
                          <span className="bg-red-50 inline-flex items-center px-3 py-1 rounded-md border border-red-100 text-red-600 font-bold">
                            Token: {apt.tokenNumber}
                          </span>
                        )}
                        {isEmergency && apt.roomNo && (
                          <span className="bg-blue-50 inline-flex items-center px-3 py-1 rounded-md border border-blue-100 text-blue-600 font-bold">
                            Room: {apt.roomNo}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="mt-6 md:mt-0 flex gap-3">
                    {apt.status === 'Scheduled' && (
                      <button 
                        onClick={() => handleCancel(apt.id)}
                        className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                      >
                        Cancel Appointment
                      </button>
                    )}
                    {apt.status === 'Completed' && (
                      <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium">
                        Book Again
                      </button>
                    )}
                  </div>
                </AnimatedCard>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
