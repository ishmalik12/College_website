import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > window.innerHeight - 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { label: "About", path: "/about" },
    { label: "Courses", path: "programs" },
    { label: "Faculty", path: "Faculty" },
    { label: "Achievements", path: "Achievements" },
    { label: "Gallery", path: "Gallery" },
    { label: "Facilities", path: "Facilities" },
    { label: "Notices", path: "Notices" },
    { label: "Alumni", path: "apply-alumni" },
    { label: "IQAC", path: "internal-quality-assessment-control" },
    { label: "Contact Us", path: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-blue-900 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 text-white relative">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10 cursor-pointer" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 font-medium text-sm md:text-base">
          {navLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.path}
              className="hover:text-gray-200 uppercase"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-blue-900 transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-screen py-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-start px-6 space-y-4 text-sm font-medium text-white">
          {navLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className="uppercase hover:text-gray-200"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
