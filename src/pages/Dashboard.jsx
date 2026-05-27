import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getUserAppointments } from '../utils/localStorageDB';
import { FaCalendarAlt, FaUserMd, FaClock, FaExclamationTriangle, FaAmbulance } from 'react-icons/fa';
import AnimatedCard from '../components/AnimatedCard';
import StatCard from '../components/StatCard';

const Dashboard = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user || user.role === 'admin') {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  if (!user) return null;

  const appointments = getUserAppointments(user.id);
  const upcomingAppointments = appointments.filter(a => a.status === 'Scheduled');
  const emergencyAppointments = appointments.filter(a => a.type === 'Emergency');

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user.name}!</h1>
          <p className="text-slate-500 mt-1">Here is your healthcare overview.</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatCard 
            title="Total Appointments" 
            value={appointments.length} 
            icon={<FaCalendarAlt />} 
            colorClass="bg-blue-500 text-blue-500" 
            delay={0.1}
          />
          <StatCard 
            title="Upcoming" 
            value={upcomingAppointments.length} 
            icon={<FaClock />} 
            colorClass="bg-amber-500 text-amber-500" 
            delay={0.2}
          />
          <StatCard 
            title="Doctors Consulted" 
            value={[...new Set(appointments.map(a => a.doctorId))].length} 
            icon={<FaUserMd />} 
            colorClass="bg-green-500 text-green-500" 
            delay={0.3}
          />
          <StatCard 
            title="Emergency Visits" 
            value={emergencyAppointments.length} 
            icon={<FaExclamationTriangle />} 
            colorClass="bg-red-500 text-red-500" 
            delay={0.4}
          />
        </div>

        {/* Emergency Quick Action Card */}
        <div className="mb-10">
          <AnimatedCard delay={0.2} className="bg-gradient-to-r from-red-500 to-rose-600 p-6 text-white !border-0 !shadow-xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                  <FaAmbulance />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Need Urgent Care?</h3>
                  <p className="text-red-100 text-sm">Book an emergency appointment instantly</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/emergency-booking')}
                className="px-6 py-3 bg-white text-red-600 rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <FaExclamationTriangle /> Emergency Booking
              </button>
            </div>
          </AnimatedCard>
        </div>

        {/* Emergency Appointments (if any) */}
        {emergencyAppointments.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <FaExclamationTriangle className="text-red-500" /> Emergency Appointments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {emergencyAppointments.slice(0, 3).map((apt, index) => (
                <AnimatedCard key={apt.id} delay={index * 0.1} className="p-6 border-l-4 border-l-red-500">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold flex items-center gap-1">
                      <FaExclamationTriangle /> Emergency
                    </span>
                    <span className="text-sm text-slate-500">{apt.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">{apt.doctorName}</h3>
                  <p className="text-slate-500 mb-1">{apt.specialty}</p>
                  <p className="text-red-600 text-sm font-medium mb-3">{apt.emergencyType}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-slate-600 text-sm">
                      <FaClock className="mr-2" /> {apt.time}
                    </div>
                    <span className="text-xs font-bold bg-red-50 text-red-600 px-2 py-1 rounded">{apt.tokenNumber}</span>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Regular Appointments */}
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Upcoming Appointments</h2>
        
        {upcomingAppointments.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-slate-100">
            <FaCalendarAlt className="mx-auto text-5xl text-slate-300 mb-4" />
            <p className="text-lg text-slate-500 mb-6">You have no upcoming appointments.</p>
            <button onClick={() => navigate('/doctors')} className="px-6 py-2 rounded-lg text-white bg-primary hover:bg-secondary transition-colors">
              Book Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingAppointments.map((apt, index) => (
              <AnimatedCard key={apt.id} delay={index * 0.1} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
                    {apt.status}
                  </span>
                  <span className="text-sm text-slate-500">{apt.date}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800">{apt.doctorName}</h3>
                <p className="text-slate-500 mb-4">{apt.specialty}</p>
                <div className="flex items-center text-slate-600 mb-4">
                  <FaClock className="mr-2" />
                  {apt.time}
                </div>
                <button onClick={() => navigate('/my-appointments')} className="w-full py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium">
                  View Details
                </button>
              </AnimatedCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
