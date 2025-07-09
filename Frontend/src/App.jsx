import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import RightSidebarToggle from "./components/Sidebar";
import Faculty from "./components/Faculty";

export default function App() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Router>
       
      
       
        <Navbar></Navbar>
        <RightSidebarToggle />
        <main className="flex-grow">
           
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faculty" element={<Faculty></Faculty>} />
            

            
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-primary text-white py-6 text-center">
                <p>&copy; 2025 Ingraham Institute Girls Degree College. All rights reserved.</p>
            </footer>

      

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
