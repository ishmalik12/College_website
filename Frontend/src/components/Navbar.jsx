import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Change background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", path: "/about" },
    { label: "Courses", path: "/programs" },
    { label: "Faculty", path: "/faculty" },
    { label: "Achievements", path: "/achievements" },
    { label: "Gallery", path: "/gallery" },
    { label: "Facilities", path: "/facilities" },
    { label: "Notices", path: "/notices" },
    { label: "Alumni", path: "/apply-alumni" },
    { label: "IQAC", path: "/internal-quality-assessment-control" },
    { label: "Contact Us", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-blue-900 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 text-white">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 font-medium text-sm md:text-base">
          {navLinks.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className="hover:text-gray-200 uppercase"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Icon */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-900 text-white px-6 py-4 space-y-4">
          {navLinks.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className="block uppercase text-sm hover:text-gray-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
