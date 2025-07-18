import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { 
  Users, 
  MessageSquare, 
  GraduationCap, 
  Bell, 
  LogOut,
  BarChart3,
  Settings,
  Calendar
} from 'lucide-react';
import ContactSubmissions from './ContactSubmissions';
import TeacherApplications from './TeacherApplications';
import AlumniManagement from './AlumniManagement';
import NoticeManagement from './NoticeManagement';
import FacultyManagement from './FacultyManagement';
import { contactService, teacherService, alumniService, noticeService } from '../firebase/services';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    contacts: 0,
    teachers: 0,
    alumni: 0,
    notices: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [contacts, teachers, alumni, notices] = await Promise.all([
          contactService.getContacts(),
          teacherService.getApplications(),
          alumniService.getAlumni(),
          noticeService.getNotices()
        ]);

        setStats({
          contacts: contacts.length,
          teachers: teachers.length,
          alumni: alumni.length,
          notices: notices.length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'contacts', label: 'Contact Submissions', icon: MessageSquare },
    { id: 'teachers', label: 'Teacher Applications', icon: Users },
    { id: 'alumni', label: 'Alumni Management', icon: GraduationCap },
    { id: 'notices', label: 'Notice Management', icon: Bell },
    { id: 'faculty', label: 'Faculty Management', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'contacts':
        return <ContactSubmissions />;
      case 'teachers':
        return <TeacherApplications />;
      case 'alumni':
        return <AlumniManagement />;
      case 'notices':
        return <NoticeManagement />;
      case 'faculty':
        return <FacultyManagement />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Contact Submissions</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.contacts}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Teacher Applications</p>
                  <p className="text-2xl font-bold text-green-600">{stats.teachers}</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Alumni Registered</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.alumni}</p>
                </div>
                <GraduationCap className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Notices</p>
                  <p className="text-2xl font-bold text-red-600">{stats.notices}</p>
                </div>
                <Bell className="h-8 w-8 text-red-600" />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 bg-white rounded-lg shadow-md p-6">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;