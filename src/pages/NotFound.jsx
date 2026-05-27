import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeartBroken } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <FaHeartBroken className="text-8xl text-slate-200 mb-6" />
      <h1 className="text-6xl font-black text-slate-800 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-slate-600 mb-6">Page Not Found</h2>
      <p className="text-slate-500 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-secondary transition-colors shadow-lg">
        Back to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
