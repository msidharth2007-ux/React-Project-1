import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserMd, FaCalendarCheck, FaHeartbeat, FaStar, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaHospital, FaAward, FaExclamationTriangle, FaAmbulance } from 'react-icons/fa';
import AnimatedCard from '../components/AnimatedCard';
import { getDoctors, getCurrentUser } from '../utils/localStorageDB';

const Home = () => {
  // Get doctors from our LocalStorage DB for the doctors section
  const doctors = getDoctors();
  // Check if user is logged in to hide Register button
  const user = getCurrentUser();

  return (
    <div className="flex flex-col">

      {/* ═══════════════════════════════════════════
          HERO SECTION  (scroll target: hero-section)
         ═══════════════════════════════════════════ */}
      <section id="hero-section" className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-blue-50 -z-10"></div>
        
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-cyan-200/40 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-200/40 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-cyan-100 text-cyan-800 text-sm font-semibold mb-6">
                Modern Healthcare Solution
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                Your Health Is Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Top Priority</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-lg">
                Book appointments with the best doctors in the city. Experience seamless healthcare management with our modern system.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/doctors" className="px-8 py-3 rounded-full text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:-translate-y-1 transition-all font-semibold text-lg">
                  Find a Doctor
                </Link>
                {/* Only show Register button if user is NOT logged in */}
                {!user && (
                  <Link to="/register" className="px-8 py-3 rounded-full text-cyan-700 bg-white border border-cyan-200 hover:bg-cyan-50 hover:-translate-y-1 transition-all font-semibold text-lg">
                    Register Now
                  </Link>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              {/* Dashboard Image */}
              <div className="relative rounded-2xl bg-white shadow-2xl p-2 border border-slate-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-100/50 to-blue-50/50 rounded-2xl"></div>
                <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Medical dashboard" className="rounded-xl relative z-10 w-full h-auto object-cover" />
                
                {/* Floating element */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute -left-12 top-20 bg-white p-4 rounded-xl shadow-xl z-20 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                    <FaCalendarCheck />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Next Appointment</p>
                    <p className="text-sm font-bold text-slate-800">Today, 2:30 PM</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURES / WHY CHOOSE US
         ═══════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose SmartCare?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">We provide the best features to make your healthcare journey as smooth as possible.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedCard delay={0.1} className="p-8 text-center hover:bg-cyan-50 group">
              <div className="w-16 h-16 mx-auto rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 text-2xl mb-6 group-hover:scale-110 transition-transform">
                <FaUserMd />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Expert Doctors</h3>
              <p className="text-slate-500">Access to a wide network of highly qualified and experienced medical professionals.</p>
            </AnimatedCard>

            <AnimatedCard delay={0.2} className="p-8 text-center hover:bg-blue-50 group">
              <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl mb-6 group-hover:scale-110 transition-transform">
                <FaCalendarCheck />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Easy Booking</h3>
              <p className="text-slate-500">Book appointments seamlessly with our intuitive online scheduling system.</p>
            </AnimatedCard>

            <AnimatedCard delay={0.3} className="p-8 text-center hover:bg-rose-50 group">
              <div className="w-16 h-16 mx-auto rounded-full bg-rose-100 flex items-center justify-center text-rose-600 text-2xl mb-6 group-hover:scale-110 transition-transform">
                <FaHeartbeat />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Quality Care</h3>
              <p className="text-slate-500">We prioritize your health with state-of-the-art facilities and personalized care plans.</p>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          DOCTORS SECTION  (scroll target: doctors-section)
         ═══════════════════════════════════════════ */}
      <section id="doctors-section" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-cyan-100 text-cyan-800 text-sm font-semibold mb-4">Our Team</span>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Meet Our Specialists</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Highly qualified doctors ready to take care of your health.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doc, index) => (
              <AnimatedCard key={doc.id} delay={index * 0.1} className="overflow-hidden group">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <img src={doc.image} alt={doc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute bottom-4 left-4 z-20">
                    <h3 className="text-lg font-bold text-white">{doc.name}</h3>
                    <p className="text-cyan-300 font-medium text-sm">{doc.specialty}</p>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <div className="flex justify-between items-center mb-3 text-sm">
                    <span className="text-slate-600">{doc.experience}</span>
                    <div className="flex items-center text-amber-500">
                      <FaStar className="mr-1" /> 4.9
                    </div>
                  </div>
                  <Link
                    to={`/book-appointment/${doc.id}`}
                    className="block w-full text-center py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg transition-all font-medium text-sm"
                  >
                    Book Appointment
                  </Link>
                </div>
              </AnimatedCard>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/doctors" className="inline-block px-8 py-3 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all font-semibold">
              View All Doctors →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ABOUT SECTION  (scroll target: about-section)
         ═══════════════════════════════════════════ */}
      <section id="about-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-4">About Us</span>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">About SmartCare</h2>
            <p className="text-slate-500 max-w-3xl mx-auto">Dedicated to providing the highest quality healthcare services through modern technology and expert medical professionals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedCard delay={0.1} className="p-8 text-center bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
              <FaHospital className="text-5xl mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Modern Facilities</h3>
              <p className="text-cyan-100">Equipped with the latest medical technology for accurate diagnosis.</p>
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
      </section>

      {/* ═══════════════════════════════════════════
          EMERGENCY BOOKING CTA
         ═══════════════════════════════════════════ */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-rose-600 relative overflow-hidden">
        {/* Decorative pulse circles */}
        <div className="absolute top-1/2 left-10 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-48 h-48 bg-white/5 rounded-full animate-pulse"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full mb-6">
              <FaExclamationTriangle className="animate-pulse" />
              <span className="font-semibold text-sm">24/7 Emergency Services</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Need Urgent Care?</h2>
            <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">Book an emergency appointment instantly. Our emergency doctors are available around the clock for critical situations.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/emergency-booking"
                className="px-8 py-3.5 bg-white text-red-600 rounded-full font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-2"
              >
                <FaAmbulance /> Book Emergency Now
              </Link>
              <a
                href="tel:108"
                className="px-8 py-3.5 bg-white/10 backdrop-blur border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center gap-2"
              >
                <FaPhoneAlt /> Call 108
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CONTACT SECTION  (scroll target: contact-section)
         ═══════════════════════════════════════════ */}
      <section id="contact-section" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-purple-100 text-purple-800 text-sm font-semibold mb-4">Get in Touch</span>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Contact Us</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Have questions or need assistance? Reach out to our support team.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <AnimatedCard delay={0.1} className="p-6 flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl">
                <FaPhoneAlt />
              </div>
              <h4 className="text-lg font-bold text-slate-800">Phone</h4>
              <p className="text-slate-500 text-sm">+1 (555) 123-4567</p>
            </AnimatedCard>
            <AnimatedCard delay={0.2} className="p-6 flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center text-2xl">
                <FaEnvelope />
              </div>
              <h4 className="text-lg font-bold text-slate-800">Email</h4>
              <p className="text-slate-500 text-sm">support@medicare.com</p>
            </AnimatedCard>
            <AnimatedCard delay={0.3} className="p-6 flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-2xl">
                <FaMapMarkerAlt />
              </div>
              <h4 className="text-lg font-bold text-slate-800">Location</h4>
              <p className="text-slate-500 text-sm">123 Healthcare Ave, Medical City</p>
            </AnimatedCard>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
