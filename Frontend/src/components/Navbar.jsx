import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import React from 'react'
import logo from "../assets/logo.png"

export default function Navbar() {
  return (

<header className="bg-white/70 backdrop-blur-md sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
              
            <h1 className="text-2xl font-extrabold text-primary tracking-wide">
                  Ingraham Institute Girls Degree College</h1>

            <nav className="space-x-5 text-gray-800 font-medium flex items-center">
              {[
                { path: "/about us", label: "About us" },
                { path: "/contact", label: "Contact Us" },
                { path: "/FAQ", label: "FAQ's" },
              ].map((item, index) => (
                <div key={index} className="inline-block  group relative">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `pb-1 transition-all hover:text-primary ${
                        isActive ? "text-secondary font-semibold" : ""
                      }`
                    }
                  >
                    {item.label}
                    <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-secondary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                  </NavLink>
                </div>
              ))}
            </nav>
          </div>
        </header>
          )
}
