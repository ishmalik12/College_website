import { useState } from "react";

import { Link, useLocation } from "react-router-dom";

import logo from "../assets/logo.png"

import {
  Menu,
  X,
  Users,
  BookOpen,
  Info,
  Award,
  Image,
  Bell,
  School,
  HandHeart,
  LogOut,
} from "lucide-react";

export default function RightSidebarToggle() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("About");

 const navItems = [
    { name: "Our Vision", icon: <Info size={20} />, path: "/about" },
    { name: "Programs / Courses", icon: <BookOpen size={20} />, path: "/programs" },
    { name: "Faculty", icon: <Users size={20} />, path: "/faculty" },
    { name: "Achievements", icon: <Award size={20} />, path: "/achievements" },
    { name: "Social Initiatives", icon: <HandHeart size={20} />, path: "/socialinitiative" },
    { name: "Gallery", icon: <Image size={20} />, path: "/gallery" },
    { name: "Notices", icon: <Bell size={20} />, path: "/notices" },
    { name: "Facilities", icon: <School size={20} />, path: "/facilities" },
  ];

  return (
    <>
      {/* Toggle Button - Only when closed */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 right-4 z-[60] bg-[#47A8BD] text-white p-3 rounded-full shadow-lg hover:bg-[#3997aa] transition"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-[49]"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#47A8BD] text-white shadow-lg transform transition-transform duration-300 z-[50] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/20">
         
          <button
            onClick={() => setOpen(false)}
            className="text-white hover:text-red-300 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4 space-y-1">
          {navItems.map((item) => (
            <Link
              to={item.path}
              key={item.name}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-6 py-3 text-sm transition-all ${
                location.pathname === item.path
                  ? "bg-white text-[#47A8BD] font-semibold rounded-r-full"
                  : "hover:bg-white/10"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="my-4 border-t border-white/20"></div>

        {/* Logout */}
        
      </div>
    </>
  );
}
