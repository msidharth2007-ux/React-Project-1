import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import AnimatedCard from '../components/AnimatedCard';

const Contact = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Contact Us</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Have questions or need assistance? Reach out to our support team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <AnimatedCard className="p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Send us a message</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea rows="4" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"></textarea>
              </div>
              <button type="button" className="w-full py-3 bg-primary text-white rounded-lg font-bold hover:bg-secondary transition-colors">
                Send Message
              </button>
            </form>
          </AnimatedCard>

          <div className="space-y-6">
            <AnimatedCard delay={0.1} className="p-6 flex items-center gap-6">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl shrink-0">
                <FaPhoneAlt />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-800">Phone</h4>
                <p className="text-slate-500">+1 (555) 123-4567</p>
              </div>
            </AnimatedCard>
            <AnimatedCard delay={0.2} className="p-6 flex items-center gap-6">
              <div className="w-14 h-14 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center text-2xl shrink-0">
                <FaEnvelope />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-800">Email</h4>
                <p className="text-slate-500">support@medicare.com</p>
              </div>
            </AnimatedCard>
            <AnimatedCard delay={0.3} className="p-6 flex items-center gap-6">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-2xl shrink-0">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-800">Location</h4>
                <p className="text-slate-500">123 Healthcare Ave, Medical City, MC 10001</p>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
