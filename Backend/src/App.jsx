import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { Toaster } from 'react-hot-toast';

// Import your existing components
import ContactUs from './components/ContactUs';
import TeacherApplicationModal from './components/TeacherApplicationModal';
import AlumniFormPage from './components/AlumniFormPage';
import Notice from './components/Notice';

// Import admin components
import AdminAuth from './admin/AdminAuth';
import AdminDashboard from './admin/AdminDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Toaster position="top-right" />
        
        <Routes>
          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              user ? (
                <AdminDashboard />
              ) : (
                <AdminAuth onLogin={() => setUser(true)} />
              )
            } 
          />
          
          {/* Public Routes */}
          <Route path="/" element={<PublicApp />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/alumni" element={<AlumniFormPage />} />
          <Route path="/notices" element={<Notice />} />
        </Routes>
      </div>
    </Router>
  );
}

// Demo component showing available routes
const PublicApp = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          College Management System
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Public Pages</h2>
            <ul className="space-y-2">
              <li><a href="/contact" className="text-blue-600 hover:text-blue-800">Contact Us</a></li>
              <li><a href="/alumni" className="text-blue-600 hover:text-blue-800">Alumni Registration</a></li>
              <li><a href="/notices" className="text-blue-600 hover:text-blue-800">Notice Board</a></li>
            </ul>
          </div>
          
          <div className="bg-red-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-red-900 mb-4">Admin Panel</h2>
            <p className="text-gray-700 mb-4">
              Access the admin dashboard to manage all submissions and content.
            </p>
            <a 
              href="/admin" 
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 inline-block"
            >
              Admin Login
            </a>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Firebase Setup Instructions</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Create a Firebase project at <a href="https://console.firebase.google.com" className="text-blue-600">Firebase Console</a></li>
            <li>Enable Firestore Database and Firebase Storage</li>
            <li>Enable Authentication with Email/Password</li>
            <li>Replace the config in <code className="bg-gray-200 px-2 py-1 rounded">src/firebase/config.js</code></li>
            <li>Create an admin user in Firebase Authentication</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default App;