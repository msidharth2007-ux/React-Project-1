import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoctors } from '../utils/localStorageDB';
import { FaUserMd, FaStar, FaSearch } from 'react-icons/fa';
import AnimatedCard from '../components/AnimatedCard';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setDoctors(getDoctors());
  }, []);

  const filteredDoctors = doctors.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Our Specialists</h1>
            <p className="text-slate-500 mt-1">Find and book appointments with top doctors.</p>
          </div>
          
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Search by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDoctors.map((doc, index) => (
            <AnimatedCard key={doc.id} delay={index * 0.1} className="overflow-hidden group">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img src={doc.image} alt={doc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute bottom-4 left-4 z-20">
                  <h3 className="text-xl font-bold text-white">{doc.name}</h3>
                  <p className="text-cyan-300 font-medium">{doc.specialty}</p>
                </div>
              </div>
              <div className="p-5 bg-white">
                <div className="flex justify-between items-center mb-4 text-sm">
                  <div className="flex items-center text-slate-600">
                    <FaUserMd className="mr-2 text-primary" />
                    {doc.experience}
                  </div>
                  <div className="flex items-center text-amber-500">
                    <FaStar className="mr-1" /> 4.9
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/book-appointment/${doc.id}`)}
                  className="w-full py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg transition-all font-medium"
                >
                  Book Appointment
                </button>
              </div>
            </AnimatedCard>
          ))}
          
          {filteredDoctors.length === 0 && (
            <div className="col-span-full text-center py-20 text-slate-500">
              No doctors found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
