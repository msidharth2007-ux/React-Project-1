import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, colorClass, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between overflow-hidden relative group"
    >
      <div className="relative z-10">
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
      </div>
      <div className={`p-4 rounded-full ${colorClass} bg-opacity-10 text-2xl relative z-10`}>
        {icon}
      </div>
      
      {/* Decorative background circle */}
      <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full ${colorClass} opacity-5 group-hover:scale-150 transition-transform duration-500`}></div>
    </motion.div>
  );
};

export default StatCard;
