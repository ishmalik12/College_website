import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { useState } from "react";
import 'leaflet/dist/leaflet.css';

import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Contact from "./pages/Contact"
import Navbar from "./components/Navbar";
import Gallery from './components/Gallery'; 
import RightSidebarToggle from "./components/Sidebar";
import Faculty from "./components/Faculty";
import Achievements from "./pages/Achievements";
import Notice from "./pages/Notices";
import Footer from "./components/Footer";
import Facilities from './components/Facilities';
import TeacherApplicationModal from "./pages/TeacherApplicationForm";
import StudentApplicationModal from "./pages/StudentApplicationForm";
import AlumniFormPage from "./pages/AluminiForm";



export default function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
   const [showStudentModal, setShowStudentModal] = useState(false);


  return (
    <Router>
       
      
       
        <Navbar></Navbar>
       
        <main className="flex-grow">
           
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/contact" element={<Contact></Contact>} />
            <Route path="/faculty" element={<Faculty></Faculty>} />
            <Route path="/gallery" element={<Gallery></Gallery>} />
            <Route path="/notices" element={<Notice></Notice>}/>
            <Route path="/achievements" element={<Achievements />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/apply-alumni" element={<AlumniFormPage></AlumniFormPage>} />

            
          </Routes>
        </main>

        {/* Footer */}
       <Footer></Footer>

      

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
            <button
               onClick={() => setShowStudentModal(true)}
              className="block px-4 py-2 hover:bg-gray-100 text-primary font-medium"
            >
              Apply as Student
            </button>
            <button className="block px-4 py-2 hover:bg-gray-100 text-primary font-medium" onClick={() => setModalOpen(true)} >
              Apply as Teacher
            </button>
             <TeacherApplicationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
  <StudentApplicationModal  isOpen={showStudentModal} onClose={()=>setShowStudentModal(false)}/>
  
              
          </div>
        )}
      </div>
    </Router>
  );
}
