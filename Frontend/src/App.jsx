import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Contact from "./pages/Contact";
import logo from "./assets/logo.png"

export default function App() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Router>
      <div className="font-sans min-h-screen flex flex-col justify-between">
        {/* Navbar */}
        <header className="bg-white/70 backdrop-blur-md sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-extrabold text-primary tracking-wide">
                  Ingraham Institute Girls Degree College</h1>

            <nav className="space-x-6 text-gray-800 font-medium flex items-center">
              <img src={logo} alt="" />
              {[
                { path: "/", label: "Home" },
                { path: "/about", label: "About" },
                { path: "/programs", label: "Programs" },
                { path: "/contact", label: "Contact" },
              ].map((item, index) => (
                <div key={index} className="inline-block group relative">
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

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-primary text-white py-6 text-center">
                <p>&copy; 2025 Ingraham Institute Girls Degree College. All rights reserved.</p>
            </footer>

      </div>

      {/* 📌 Floating Apply Now Menu */}
      <div className="fixed bottom-6 right-6 z-50 text-right">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="bg-secondary text-white px-5 py-3 rounded-full shadow-lg hover:bg-primary transition duration-300"
        >
          Apply Now ⮟
        </button>

        {showMenu && (
          <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden text-left">
            <a
              href="/contact?role=student"
              className="block px-4 py-2 hover:bg-gray-100 text-primary font-medium"
            >
              Apply as Student
            </a>
            <a
              href="/contact?role=teacher"
              className="block px-4 py-2 hover:bg-gray-100 text-primary font-medium"
            >
              Apply as Teacher
            </a>
          </div>
        )}
      </div>
    </Router>
  );
}
