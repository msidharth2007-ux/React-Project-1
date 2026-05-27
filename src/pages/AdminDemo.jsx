import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaServer, FaUser, FaStethoscope, FaCalendarCheck, FaBell, FaCheckCircle, FaTimesCircle, FaRedo, FaTerminal } from 'react-icons/fa';

const AdminDemo = () => {
  const [stage, setStage] = useState(0);
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({ users: 154, doctors: 42, appointments: 892, pending: 15 });
  const [activeAppointments, setActiveAppointments] = useState([]);
  const [isSimulating, setIsSimulating] = useState(true);

  // Helper to add logs with timestamp
  const addLog = (message, type = 'info') => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { id: Date.now(), time, message, type }]);
  };

  const runSimulation = () => {
    setIsSimulating(true);
    setStage(0);
    setLogs([]);
    setActiveAppointments([]);
    setStats({ users: 154, doctors: 42, appointments: 892, pending: 15 });

    const timeline = [
      { time: 1000, action: () => { setStage(1); addLog("Initializing SmartCare Hospital System Backend...", "system"); } },
      { time: 2500, action: () => { addLog("Connected to Database. All systems nominal.", "success"); } },
      
      { time: 4000, action: () => { setStage(2); addLog("User 'Test User' (ID: #8942) initiated login request.", "info"); } },
      { time: 5000, action: () => { addLog("Authenticating user credentials...", "warning"); } },
      { time: 6000, action: () => { addLog("Authentication successful. Generating JWT token.", "success"); } },
      
      { time: 7500, action: () => { setStage(3); addLog("API Request: GET /api/doctors", "info"); } },
      { time: 8500, action: () => { addLog("Database query: SELECT * FROM doctors WHERE status='active'", "system"); } },
      { time: 9000, action: () => { addLog("Fetched 42 doctors. Sending response (200 OK).", "success"); } },
      
      { time: 11000, action: () => { setStage(4); addLog("API Request: POST /api/appointments/book", "warning"); } },
      { time: 12000, action: () => { addLog("Validating appointment slot for Dr. Sarah Smith (ID: #1) on Oct 25, 10:00 AM...", "info"); } },
      { time: 13500, action: () => { 
        addLog("Slot available. Inserting into appointments table...", "system");
        setStats(prev => ({ ...prev, pending: prev.pending + 1, appointments: prev.appointments + 1 }));
        setActiveAppointments([{ id: "APT-8921", patient: "Test User", doctor: "Dr. Sarah Smith", time: "Oct 25, 10:00 AM", status: "Pending" }]);
      }},
      
      { time: 15000, action: () => { setStage(5); addLog("Triggering Webhook: Admin Notification System", "info"); } },
      { time: 16000, action: () => { addLog("Push notification dispatched to Admin Dashboard.", "success"); } },
      
      { time: 18000, action: () => { setStage(6); addLog("Admin Action: PUT /api/appointments/APT-8921/confirm", "warning"); } },
      { time: 19500, action: () => { 
        addLog("Database Update: UPDATE appointments SET status='Confirmed' WHERE id='APT-8921'", "system");
        setStats(prev => ({ ...prev, pending: prev.pending - 1 }));
        setActiveAppointments([{ id: "APT-8921", patient: "Test User", doctor: "Dr. Sarah Smith", time: "Oct 25, 10:00 AM", status: "Confirmed" }]);
      }},
      { time: 20500, action: () => { addLog("Sending confirmation SMS/Email to Test User.", "success"); } },
      
      { time: 23000, action: () => { setStage(7); addLog("User Action: DELETE /api/appointments/APT-8921/cancel", "error"); } },
      { time: 24500, action: () => { 
        addLog("Database Update: UPDATE appointments SET status='Cancelled' WHERE id='APT-8921'", "system");
        setActiveAppointments([{ id: "APT-8921", patient: "Test User", doctor: "Dr. Sarah Smith", time: "Oct 25, 10:00 AM", status: "Cancelled" }]);
      }},
      { time: 25500, action: () => { 
        addLog("Simulation Complete. Awaiting manual restart.", "info"); 
        setIsSimulating(false);
      }}
    ];

    timeline.forEach(({ time, action }) => {
      setTimeout(action, time);
    });
  };

  useEffect(() => {
    runSimulation();
  }, []);

  // Auto-scroll logs
  useEffect(() => {
    const logsContainer = document.getElementById('demo-logs');
    if (logsContainer) {
      logsContainer.scrollTop = logsContainer.scrollHeight;
    }
  }, [logs]);

  const getStageIcon = (idx) => {
    if (stage > idx) return <FaCheckCircle className="text-green-500" />;
    if (stage === idx) return <FaTerminal className="text-amber-500 animate-pulse" />;
    return <FaCheckCircle className="text-slate-700" />;
  };

  const getLogColor = (type) => {
    switch(type) {
      case 'success': return 'text-green-400';
      case 'error': return 'text-red-400';
      case 'warning': return 'text-amber-400';
      case 'system': return 'text-purple-400';
      default: return 'text-cyan-400';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 py-6 px-4 sm:px-6 lg:px-8 font-mono">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <FaServer className="text-cyan-500" /> SmartCare Live Server Demo
            </h1>
            <p className="text-slate-400 text-sm mt-1">Simulating backend operations and real-time database updates.</p>
          </div>
          <button 
            onClick={runSimulation} 
            disabled={isSimulating}
            className={`px-4 py-2 rounded font-bold flex items-center gap-2 transition-all ${isSimulating ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]'}`}
          >
            <FaRedo className={isSimulating ? "animate-spin" : ""} /> {isSimulating ? 'Simulating...' : 'Run Demo Again'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Progress Flow & Stats */}
          <div className="space-y-6">
            
            {/* Live Stats */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 backdrop-blur-sm">
              <h3 className="text-cyan-400 font-bold mb-4 flex items-center gap-2"><FaServer /> LIVE DATABASE STATS</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 p-3 rounded border border-slate-800">
                  <p className="text-xs text-slate-400">Total Users</p>
                  <motion.p key={stats.users} initial={{ scale: 1.5, color: '#06b6d4' }} animate={{ scale: 1, color: '#f8fafc' }} className="text-2xl font-bold">{stats.users}</motion.p>
                </div>
                <div className="bg-slate-900 p-3 rounded border border-slate-800">
                  <p className="text-xs text-slate-400">Doctors</p>
                  <p className="text-2xl font-bold text-white">{stats.doctors}</p>
                </div>
                <div className="bg-slate-900 p-3 rounded border border-slate-800">
                  <p className="text-xs text-slate-400">Appointments</p>
                  <motion.p key={stats.appointments} initial={{ scale: 1.5, color: '#06b6d4' }} animate={{ scale: 1, color: '#f8fafc' }} className="text-2xl font-bold">{stats.appointments}</motion.p>
                </div>
                <div className="bg-slate-900 p-3 rounded border border-slate-800 relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-2 h-full ${stats.pending > 15 ? 'bg-amber-500 animate-pulse' : 'bg-transparent'}`}></div>
                  <p className="text-xs text-slate-400">Pending</p>
                  <motion.p key={stats.pending} initial={{ scale: 1.5, color: '#f59e0b' }} animate={{ scale: 1, color: '#f8fafc' }} className="text-2xl font-bold">{stats.pending}</motion.p>
                </div>
              </div>
            </div>

            {/* Workflow Progress */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 backdrop-blur-sm">
              <h3 className="text-cyan-400 font-bold mb-4 text-sm">SIMULATION STAGES</h3>
              <ul className="space-y-4 relative">
                <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-slate-700 z-0"></div>
                
                <li className={`flex items-center gap-3 relative z-10 ${stage >= 1 ? 'text-white' : 'text-slate-600'}`}>
                  <div className={`bg-slate-900 rounded-full p-1`}>{getStageIcon(1)}</div>
                  <span className="text-sm">System Initialization</span>
                </li>
                <li className={`flex items-center gap-3 relative z-10 ${stage >= 2 ? 'text-white' : 'text-slate-600'}`}>
                  <div className={`bg-slate-900 rounded-full p-1`}>{getStageIcon(2)}</div>
                  <span className="text-sm">User Authentication (JWT)</span>
                </li>
                <li className={`flex items-center gap-3 relative z-10 ${stage >= 3 ? 'text-white' : 'text-slate-600'}`}>
                  <div className={`bg-slate-900 rounded-full p-1`}>{getStageIcon(3)}</div>
                  <span className="text-sm">Fetch API Data</span>
                </li>
                <li className={`flex items-center gap-3 relative z-10 ${stage >= 4 ? 'text-white' : 'text-slate-600'}`}>
                  <div className={`bg-slate-900 rounded-full p-1`}>{getStageIcon(4)}</div>
                  <span className="text-sm">Process Booking Request</span>
                </li>
                <li className={`flex items-center gap-3 relative z-10 ${stage >= 5 ? 'text-white' : 'text-slate-600'}`}>
                  <div className={`bg-slate-900 rounded-full p-1`}>{getStageIcon(5)}</div>
                  <span className="text-sm">Dispatch Notifications</span>
                </li>
                <li className={`flex items-center gap-3 relative z-10 ${stage >= 6 ? 'text-white' : 'text-slate-600'}`}>
                  <div className={`bg-slate-900 rounded-full p-1`}>{getStageIcon(6)}</div>
                  <span className="text-sm">Admin Confirmation</span>
                </li>
                <li className={`flex items-center gap-3 relative z-10 ${stage >= 7 ? 'text-white' : 'text-slate-600'}`}>
                  <div className={`bg-slate-900 rounded-full p-1`}>{getStageIcon(7)}</div>
                  <span className="text-sm">Cancellation & Rollback</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Terminal & UI Preview */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Terminal / Activity Console */}
            <div className="bg-black rounded-xl border border-slate-700 flex flex-col h-[350px] shadow-[0_0_30px_rgba(0,0,0,0.8)] relative overflow-hidden">
              <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 text-xs text-slate-400 border-b border-slate-700">
                <div className="flex gap-1.5 mr-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                backend-server-node-01 ~ npm run start:prod
              </div>
              
              <div id="demo-logs" className="p-4 flex-1 overflow-y-auto text-sm space-y-2">
                <AnimatePresence>
                  {logs.map((log) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={log.id} 
                      className="flex gap-3 font-mono"
                    >
                      <span className="text-slate-500 shrink-0">[{log.time}]</span>
                      <span className={`${getLogColor(log.type)}`}>
                        {log.type === 'error' ? '> ERR: ' : log.type === 'warning' ? '> WARN: ' : '> '} 
                        {log.message}
                      </span>
                    </motion.div>
                  ))}
                  {isSimulating && (
                    <motion.div 
                      animate={{ opacity: [1, 0, 1] }} 
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="text-slate-500"
                    >
                      _
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Live UI State Updates */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 backdrop-blur-sm flex-1">
              <h3 className="text-cyan-400 font-bold mb-4 text-sm flex items-center gap-2"><FaBell className={stage >= 5 ? 'animate-bounce text-amber-400' : ''} /> REAL-TIME DASHBOARD PREVIEW</h3>
              
              <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 min-h-[150px] relative overflow-hidden">
                {activeAppointments.length === 0 ? (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-sm">
                    Waiting for database changes...
                  </div>
                ) : (
                  <AnimatePresence>
                    {activeAppointments.map(apt => (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        key={apt.status} // Remount on status change for animation
                        className={`p-4 rounded-lg border-l-4 ${
                          apt.status === 'Confirmed' ? 'bg-green-900/20 border-green-500' :
                          apt.status === 'Cancelled' ? 'bg-red-900/20 border-red-500' :
                          'bg-amber-900/20 border-amber-500'
                        } flex justify-between items-center`}
                      >
                        <div>
                          <p className="font-bold text-white text-lg">{apt.patient} <span className="text-sm font-normal text-slate-400 ml-2">ID: {apt.id}</span></p>
                          <p className="text-slate-300 text-sm mt-1">{apt.doctor} • {apt.time}</p>
                        </div>
                        <div>
                          <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                            apt.status === 'Confirmed' ? 'bg-green-500/20 text-green-400' :
                            apt.status === 'Cancelled' ? 'bg-red-500/20 text-red-400' :
                            'bg-amber-500/20 text-amber-400 animate-pulse'
                          }`}>
                            {apt.status}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDemo;
