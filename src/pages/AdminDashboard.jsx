import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getAllAppointments, getDoctors, getNotifications, updateAppointmentStatus, getEmergencyAppointments } from '../utils/localStorageDB';
import { FaUsers, FaUserMd, FaCalendarAlt, FaBell, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import StatCard from '../components/StatCard';
import AnimatedCard from '../components/AnimatedCard';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [emergencyCount, setEmergencyCount] = useState(0);
  const user = getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    loadData();
    // eslint-disable-next-line
  }, []);

  const loadData = () => {
    setAppointments(getAllAppointments().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    setDoctors(getDoctors());
    setNotifications(getNotifications().slice(0, 5));
    setEmergencyCount(getEmergencyAppointments().length);
  };

  const handleStatusChange = (id, newStatus) => {
    updateAppointmentStatus(id, newStatus);
    loadData();
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-500 mt-1">System overview and management.</p>
          </div>
        </div>

        {/* Stat Cards — now includes Emergency Bookings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
          <StatCard title="Total Appointments" value={appointments.length} icon={<FaCalendarAlt />} colorClass="bg-blue-500 text-blue-500" delay={0.1} />
          <StatCard title="Pending" value={appointments.filter(a => a.status === 'Scheduled').length} icon={<FaClock />} colorClass="bg-amber-500 text-amber-500" delay={0.2} />
          <StatCard title="Emergency" value={emergencyCount} icon={<FaExclamationTriangle />} colorClass="bg-red-500 text-red-500" delay={0.3} />
          <StatCard title="Total Doctors" value={doctors.length} icon={<FaUserMd />} colorClass="bg-green-500 text-green-500" delay={0.4} />
          <StatCard title="Total Patients" value={new Set(appointments.map(a => a.userId)).size + 1} icon={<FaUsers />} colorClass="bg-purple-500 text-purple-500" delay={0.5} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Appointments Table */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Recent Appointments</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 border-b border-slate-100 text-sm">
                      <th className="p-4 font-semibold">Type</th>
                      <th className="p-4 font-semibold">Doctor</th>
                      <th className="p-4 font-semibold">Date & Time</th>
                      <th className="p-4 font-semibold">Status</th>
                      <th className="p-4 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.slice(0, 8).map((apt) => (
                      <tr key={apt.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                        <td className="p-4">
                          {apt.type === 'Emergency' ? (
                            <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold flex items-center gap-1 w-fit">
                              <FaExclamationTriangle /> ER
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">Regular</span>
                          )}
                        </td>
                        <td className="p-4 text-sm text-slate-600">{apt.doctorName}</td>
                        <td className="p-4 text-sm text-slate-600">{apt.date} <br/><span className="text-xs text-slate-400">{apt.time}</span></td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            apt.status === 'Scheduled' ? 'bg-amber-100 text-amber-700' :
                            apt.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                            apt.status === 'Completed' ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {apt.status}
                          </span>
                        </td>
                        <td className="p-4">
                          {(apt.status === 'Scheduled' || apt.status === 'Confirmed') && (
                            <div className="flex gap-2">
                              <button onClick={() => handleStatusChange(apt.id, 'Completed')} className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200">Done</button>
                              <button onClick={() => handleStatusChange(apt.id, 'Cancelled')} className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200">Cancel</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                    {appointments.length === 0 && (
                      <tr>
                        <td colSpan="5" className="p-8 text-center text-slate-500">No appointments found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* System Logs / Notifications */}
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-4">System Activity</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-[400px] overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="text-slate-500 text-center py-10">No recent activity.</p>
              ) : (
                <div className="space-y-6">
                  {notifications.map((notif, i) => {
                    const isEmergencyNotif = notif.message.includes('EMERGENCY');
                    return (
                      <AnimatedCard
                        key={notif.id}
                        delay={i * 0.1}
                        className={`flex gap-4 p-4 !shadow-none border-l-4 !rounded-l-none bg-slate-50 ${
                          isEmergencyNotif ? 'border-l-red-500' : 'border-l-primary'
                        }`}
                      >
                        <div className={`mt-1 ${isEmergencyNotif ? 'text-red-500' : 'text-primary'}`}>
                          {isEmergencyNotif ? <FaExclamationTriangle /> : <FaBell />}
                        </div>
                        <div>
                          <p className="text-sm text-slate-700">{notif.message}</p>
                          <p className="text-xs text-slate-400 mt-1">{new Date(notif.time).toLocaleString()}</p>
                        </div>
                      </AnimatedCard>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
