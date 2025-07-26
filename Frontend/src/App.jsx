import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import 'leaflet/dist/leaflet.css';

import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Contact from "./pages/Contact";
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
import AdminApp from "./admin/AdminApp";
import InternalQualityAssessment from "./components/InternalQualityAssessment"; // Adjust path if needed


// ✅ Wrapper to use `useLocation` with Router
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  const [showMenu, setShowMenu] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);

  return (
    <>
      {/* ✅ Hide Navbar on /admin */}
      {!isAdminPage && <Navbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/notices" element={<Notice />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/apply-alumni" element={<AlumniFormPage />} />
          <Route path="/admin/*" element={<AdminApp />} />
<Route path="/internal-quality-assessment-control" element={<InternalQualityAssessment />} />

        </Routes>
      </main>

      {/* ✅ Hide Footer on /admin */}
      {!isAdminPage && <Footer />}

      {/* 📌 Floating Apply Now Menu - Only for normal pages */}
      {!isAdminPage && (
        <div className="fixed bottom-2 right-6 z-50 text-right">
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
              <button
                className="block px-4 py-2 hover:bg-gray-100 text-primary font-medium"
                onClick={() => setModalOpen(true)}
              >
                Apply as Teacher
              </button>
              <TeacherApplicationModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
              />
              <StudentApplicationModal
                isOpen={showStudentModal}
                onClose={() => setShowStudentModal(false)}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AppWrapper;
