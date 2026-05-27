import { FaHospitalSymbol, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
              <FaHospitalSymbol className="text-secondary" />
              Smart<span className="text-secondary">Care</span>
            </div>
            <p className="text-sm text-slate-400">
              Providing premium healthcare services with modern technology. Your health is our priority.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-secondary transition-colors">Home</a></li>
              <li><a href="/doctors" className="hover:text-secondary transition-colors">Find a Doctor</a></li>
              <li><a href="/about" className="hover:text-secondary transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-secondary transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>123 Healthcare Ave, Medical City</li>
              <li>contact@medicare.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} SmartCare Hospital System. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 md:mt-0">
            Made with <FaHeart className="text-red-500" /> for Engineering Project
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
