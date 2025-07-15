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
              <li><a href="#about" className="text-blue-200 hover:text-white transition-colors duration-200">About Us</a></li>
              <li><a href="#programs" className="text-blue-200 hover:text-white transition-colors duration-200">Academic Programs</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">Admissions</a></li>
              <li><a href="#campus" className="text-blue-200 hover:text-white transition-colors duration-200">Campus Life</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">Research</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">Alumni</a></li>
            </ul>
          </div>

          {/* Student Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Student Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">Student Portal</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">Library</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">Career Services</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">Academic Support</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">Financial Aid</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">Health Services</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-red-400 mt-0.5" />
                <div>
                  <p className="text-blue-200">123 University Ave</p>
                  <p className="text-blue-200">Heritage City, HC 12345</p>
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
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-200 text-sm">
            © 2024 Heritage University. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-blue-200 hover:text-white text-sm transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-blue-200 hover:text-white text-sm transition-colors duration-200">Terms of Service</a>
            <a href="#" className="text-blue-200 hover:text-white text-sm transition-colors duration-200">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
