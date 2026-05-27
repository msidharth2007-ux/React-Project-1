// src/utils/localStorageDB.js

// Initial Mock Data — using real professional doctor photos from Unsplash
// Each doctor has their own available time slots
const MOCK_DOCTORS = [
  {
    id: 1, name: "Dr. Sarah Smith", specialty: "Cardiologist", experience: "10 Years",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"]
  },
  {
    id: 2, name: "Dr. John Doe", specialty: "Neurologist", experience: "15 Years",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    slots: ["10:00 AM", "11:30 AM", "01:00 PM", "03:30 PM", "04:30 PM"]
  },
  {
    id: 3, name: "Dr. Emily Chen", specialty: "Pediatrician", experience: "8 Years",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face",
    slots: ["08:30 AM", "09:30 AM", "11:00 AM", "01:30 PM", "04:00 PM"]
  },
  {
    id: 4, name: "Dr. Michael Brown", specialty: "Orthopedic", experience: "12 Years",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face",
    slots: ["09:00 AM", "10:30 AM", "12:00 PM", "02:30 PM", "04:00 PM"]
  },
];

const MOCK_USERS = [
  { id: 1, email: "admin@smartcare.com", password: "admin123", role: "admin", name: "System Admin" },
  { id: 2, email: "user@smartcare.com", password: "user123", role: "user", name: "Test User" },
];

// Initialize Database
export const initDB = () => {
  // Always refresh doctors so data stays up-to-date
  localStorage.setItem('doctors', JSON.stringify(MOCK_DOCTORS));
  localStorage.setItem('emergencyDoctors', JSON.stringify(MOCK_EMERGENCY_DOCTORS));
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(MOCK_USERS));
  }
  if (!localStorage.getItem('appointments')) {
    localStorage.setItem('appointments', JSON.stringify([]));
  }
  if (!localStorage.getItem('notifications')) {
    localStorage.setItem('notifications', JSON.stringify([]));
  }
};

// --- Users API ---
export const loginUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return { success: true, user };
  }
  return { success: false, message: "Invalid credentials" };
};

export const registerUser = (name, email, password) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.find(u => u.email === email)) {
    return { success: false, message: "Email already exists" };
  }
  const newUser = { id: Date.now(), name, email, password, role: 'user' };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  return { success: true };
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
};

export const logoutUser = () => {
  localStorage.removeItem('currentUser');
};

// --- Doctors API ---
export const getDoctors = () => {
  return JSON.parse(localStorage.getItem('doctors')) || [];
};

// Get slots already booked for a specific doctor on a specific date
export const getBookedSlots = (doctorId, date) => {
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  return appointments
    .filter(a => a.doctorId === doctorId && a.date === date && a.status !== 'Cancelled')
    .map(a => a.time);
};

// --- Appointments API ---
export const bookAppointment = (userId, doctorId, date, time) => {
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  const doctor = getDoctors().find(d => d.id === doctorId);
  const newAppointment = {
    id: Date.now(),
    userId,
    doctorId,
    doctorName: doctor?.name,
    specialty: doctor?.specialty,
    date,
    time,
    status: 'Scheduled',
    type: 'Regular',
    createdAt: new Date().toISOString()
  };
  appointments.push(newAppointment);
  localStorage.setItem('appointments', JSON.stringify(appointments));
  addNotification(`New appointment booked with ${doctor?.name} on ${date} at ${time}`);
  return { success: true, appointment: newAppointment };
};

export const getUserAppointments = (userId) => {
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  return appointments.filter(a => a.userId === userId);
};

export const getAllAppointments = () => {
  return JSON.parse(localStorage.getItem('appointments')) || [];
};

export const updateAppointmentStatus = (id, status) => {
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  const index = appointments.findIndex(a => a.id === id);
  if (index !== -1) {
    appointments[index].status = status;
    localStorage.setItem('appointments', JSON.stringify(appointments));
    return true;
  }
  return false;
};

// --- Notifications API ---
export const addNotification = (message) => {
  const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
  notifications.unshift({ id: Date.now(), message, time: new Date().toISOString() });
  localStorage.setItem('notifications', JSON.stringify(notifications));
};

export const getNotifications = () => {
  return JSON.parse(localStorage.getItem('notifications')) || [];
};

// Reset DB (Useful for demo)
export const resetDB = () => {
  localStorage.clear();
  initDB();
};

// ═══════════════════════════════════════
// EMERGENCY DOCTORS & BOOKING SYSTEM
// ═══════════════════════════════════════

// Emergency doctor mock data
const MOCK_EMERGENCY_DOCTORS = [
  {
    id: 101, name: "Dr. Rajesh Kumar", specialization: "Emergency Medicine",
    emergencyAvailable: true, availableFrom: "00:00", availableTo: "23:59",
    emergencyTypes: ["Heart Problem", "Accident Injury", "General Emergency"],
    roomNo: "ER-101", phone: "+1 (555) 901-0001", rating: 4.9,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=face"
  },
  {
    id: 102, name: "Dr. Priya Sharma", specialization: "Cardiac Surgeon",
    emergencyAvailable: true, availableFrom: "06:00", availableTo: "18:00",
    emergencyTypes: ["Heart Problem", "Breathing Problem"],
    roomNo: "ER-202", phone: "+1 (555) 901-0002", rating: 4.8,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"
  },
  {
    id: 103, name: "Dr. James Wilson", specialization: "Trauma Surgeon",
    emergencyAvailable: true, availableFrom: "08:00", availableTo: "22:00",
    emergencyTypes: ["Accident Injury", "General Emergency"],
    roomNo: "ER-105", phone: "+1 (555) 901-0003", rating: 4.7,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face"
  },
  {
    id: 104, name: "Dr. Anita Desai", specialization: "Pediatric Emergency",
    emergencyAvailable: true, availableFrom: "07:00", availableTo: "20:00",
    emergencyTypes: ["Child Emergency", "High Fever", "Breathing Problem"],
    roomNo: "ER-301", phone: "+1 (555) 901-0004", rating: 4.9,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face"
  },
  {
    id: 105, name: "Dr. David Chen", specialization: "Pulmonologist",
    emergencyAvailable: true, availableFrom: "09:00", availableTo: "21:00",
    emergencyTypes: ["Breathing Problem", "General Emergency", "High Fever"],
    roomNo: "ER-110", phone: "+1 (555) 901-0005", rating: 4.6,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face"
  },
  {
    id: 106, name: "Dr. Meera Patel", specialization: "Obstetrics & Gynecology",
    emergencyAvailable: true, availableFrom: "00:00", availableTo: "23:59",
    emergencyTypes: ["Pregnancy Emergency", "General Emergency"],
    roomNo: "ER-401", phone: "+1 (555) 901-0006", rating: 4.8,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"
  },
];

// Get all emergency doctors from LocalStorage
export const getEmergencyDoctors = () => {
  return JSON.parse(localStorage.getItem('emergencyDoctors')) || [];
};

// Book an emergency appointment and save to LocalStorage
export const bookEmergencyAppointment = (userId, doctorId, emergencyType, time) => {
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  const doctor = getEmergencyDoctors().find(d => d.id === doctorId);
  const tokenNumber = "ER-" + Math.floor(1000 + Math.random() * 9000);
  const today = new Date().toISOString().split('T')[0];

  const newAppointment = {
    id: Date.now(),
    userId,
    doctorId,
    doctorName: doctor?.name,
    specialty: doctor?.specialization,
    emergencyType,
    date: today,
    time,
    status: 'Confirmed',
    type: 'Emergency',
    tokenNumber,
    roomNo: doctor?.roomNo,
    phone: doctor?.phone,
    createdAt: new Date().toISOString()
  };

  appointments.push(newAppointment);
  localStorage.setItem('appointments', JSON.stringify(appointments));
  addNotification(`🚨 EMERGENCY: ${emergencyType} — booked with ${doctor?.name} (Token: ${tokenNumber})`);
  return { success: true, appointment: newAppointment };
};

// Get only emergency appointments
export const getEmergencyAppointments = () => {
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  return appointments.filter(a => a.type === 'Emergency');
};

