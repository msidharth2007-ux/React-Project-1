import React from 'react';
import { getCurrentUser } from '../utils/localStorageDB';
import { FaUserCircle, FaEnvelope, FaIdBadge } from 'react-icons/fa';
import AnimatedCard from '../components/AnimatedCard';

const Profile = () => {
  const user = getCurrentUser();

  if (!user) {
    return <div className="p-10 text-center">Please login to view your profile.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedCard className="overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary to-secondary"></div>
          <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-12 mb-6">
              <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg">
                <FaUserCircle className="w-full h-full text-slate-300" />
              </div>
              <span className={`px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider text-white ${user.role === 'admin' ? 'bg-amber-500' : 'bg-primary'}`}>
                {user.role}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-slate-900 mb-1">{user.name}</h1>
            <p className="text-slate-500 mb-8">Member since 2026</p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                <FaEnvelope className="text-slate-400 text-xl" />
                <div>
                  <p className="text-sm text-slate-500">Email Address</p>
                  <p className="font-medium text-slate-800">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                <FaIdBadge className="text-slate-400 text-xl" />
                <div>
                  <p className="text-sm text-slate-500">User ID</p>
                  <p className="font-medium text-slate-800">#{user.id}</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
};

export default Profile;
