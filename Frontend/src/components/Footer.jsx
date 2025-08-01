import React from 'react';
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Logo" className="h-10" />
              <div>
                <h3 className="text-xl font-bold">Ingraham Institute Girls Degree College</h3>
                <p className="text-blue-200 text-sm">Excellence in Education</p>
              </div>
            </div>
            <p className="text-blue-200 leading-relaxed">
              Empowering students to become global leaders and innovators through
              transformative education and cutting-edge research.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-blue-200 hover:text-white cursor-pointer transition-colors duration-200" />
              <Twitter className="h-6 w-6 text-blue-200 hover:text-white cursor-pointer transition-colors duration-200" />
              <Instagram className="h-6 w-6 text-blue-200 hover:text-white cursor-pointer transition-colors duration-200" />
              <Linkedin className="h-6 w-6 text-blue-200 hover:text-white cursor-pointer transition-colors duration-200" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-blue-200 hover:text-white transition-colors duration-200">About Us</Link>
              </li>
              <li>
                <Link to="/programs" className="text-blue-200 hover:text-white transition-colors duration-200">Academic Programs</Link>
              </li>
              <li>
                <Link to="/facilities" className="text-blue-200 hover:text-white transition-colors duration-200">Campus Life</Link>
              </li>
              <li>
                <Link to="/notices" className="text-blue-200 hover:text-white transition-colors duration-200">Notice</Link>
              </li>
              <li>
                <Link to="/apply-alumni" className="text-blue-200 hover:text-white transition-colors duration-200">Alumni</Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-200 hover:text-white transition-colors duration-200">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Student Resources
          <div>
            <h4 className="text-lg font-semibold mb-4">Student Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-blue-200 hover:text-white transition-colors duration-200">Student Portal</Link></li>
              <li><Link to="/contact" className="text-blue-200 hover:text-white transition-colors duration-200">Library</Link></li>
              <li><Link to="/contact" className="text-blue-200 hover:text-white transition-colors duration-200">Career Services</Link></li>
              <li><Link to="/contact" className="text-blue-200 hover:text-white transition-colors duration-200">Academic Support</Link></li>
              <li><Link to="/contact" className="text-blue-200 hover:text-white transition-colors duration-200">Financial Aid</Link></li>
              <li><Link to="/contact" className="text-blue-200 hover:text-white transition-colors duration-200">Health Services</Link></li>
            </ul>
          </div> */}

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-red-400 mt-0.5" />
                <div>
                  <p className="text-blue-200">Ingraham Institute Girls’ Degree College
</p>
                  <p className="text-blue-200">Sector 11, Raj Kunj, Raj Nagar, Ghaziabad, Uttar Pradesh 201002</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-400" />
                <p className="text-blue-200">(555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-400" />
                <p className="text-blue-200">info@heritage.edu</p>
              </div>
            </div>
            
          </div>
          {/* Map Location */}
<div className="w-full h-64 lg:h-full rounded-md overflow-hidden">
  <iframe
    title="College Location Map"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.4639196958847!2d77.45257595!3d28.675766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf196c9efbc6b%3A0x1fb5920aa4478e88!2sRaj%20Kunj%2C%20Raj%20Nagar%2C%20Ghaziabad%2C%20Uttar%20Pradesh%20201002!5e0!3m2!1sen!2sin!4v1753879131013!5m2!1sen!2sin"
    width="100%"
    height="100%"
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="border-0"
  ></iframe>
</div>

        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-blue-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-200 text-sm">
            © 2024 Heritage University. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-blue-200 hover:text-white text-sm transition-colors duration-200">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-blue-200 hover:text-white text-sm transition-colors duration-200">Terms of Service</Link>
            <Link to="/accessibility" className="text-blue-200 hover:text-white text-sm transition-colors duration-200">Accessibility</Link>
            <Link to="/admin" className="text-blue-200 hover:text-white text-sm transition-colors duration-200">Admin Panel</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
