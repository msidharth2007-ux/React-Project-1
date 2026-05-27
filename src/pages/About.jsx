import React from 'react';
import { FaHospital, FaUserMd, FaAward } from 'react-icons/fa';
import AnimatedCard from '../components/AnimatedCard';

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">About SmartCare</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            We are dedicated to providing the highest quality healthcare services through modern technology and expert medical professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <AnimatedCard delay={0.1} className="p-8 text-center bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
            <FaHospital className="text-5xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Modern Facilities</h3>
            <p className="text-cyan-100">Equipped with the latest medical technology for accurate diagnosis and treatment.</p>
          </AnimatedCard>
          <AnimatedCard delay={0.2} className="p-8 text-center bg-white">
            <FaUserMd className="text-5xl mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-2 text-slate-800">Expert Team</h3>
            <p className="text-slate-500">Our doctors are highly qualified specialists with years of experience.</p>
          </AnimatedCard>
          <AnimatedCard delay={0.3} className="p-8 text-center bg-white">
            <FaAward className="text-5xl mx-auto mb-4 text-secondary" />
            <h3 className="text-2xl font-bold mb-2 text-slate-800">Quality Care</h3>
            <p className="text-slate-500">Committed to patient safety and delivering the best healthcare outcomes.</p>
          </AnimatedCard>
        </div>
      </div>
    </div>
  );
};

export default About;
