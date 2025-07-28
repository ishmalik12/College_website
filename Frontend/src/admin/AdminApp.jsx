import { useState, useEffect } from 'react';
import { 
  LogOut, 
  LayoutDashboard, 
  Mail, 
  Users, 
  GraduationCap, 
  UserCheck, 
  Bell,
  Menu,
  X,
  Info
} from 'lucide-react';
import UploadNotice from './UploadNotice';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import ContactSubmissions from './ContactSubmissions';
import TeacherApplications from './TeacherApplications';
import AlumniApplications from './AlumniApplications';
import FacultyManagement from './Faculty';
import NoticeManagement from './NoticeManagement';
import IQACAdminPanel from './IQACAdminPanel';


export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);


  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    const savedAdmin = localStorage.getItem('adminData');
    
    if (savedToken && savedAdmin) {
      setToken(savedToken);
      setAdmin(JSON.parse(savedAdmin));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (adminData, authToken) => {
    setAdmin(adminData);
    setToken(authToken);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setIsAuthenticated(false);
    setAdmin(null);
    setToken(null);
    setCurrentPage('dashboard');
  };

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: 'contacts', label: 'Contact Messages', icon: <Mail className="w-5 h-5" /> },
  { id: 'teachers', label: 'Teacher Applications', icon: <Users className="w-5 h-5" /> },
  { id: 'alumni', label: 'Alumni Applications', icon: <GraduationCap className="w-5 h-5" /> },
  { id: 'faculty', label: 'Faculty Management', icon: <UserCheck className="w-5 h-5" /> },
  { id: 'notices', label: 'Notice Management', icon: <Bell className="w-5 h-5" /> },
  { id: 'IQAC', label: 'IQAC Management', icon: <Info className="w-5 h-5" /> }
];

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <AdminDashboard token={token} />;
      case 'contacts':
        return <ContactSubmissions token={token} />;
      case 'teachers':
        return <TeacherApplications token={token} />;
      case 'alumni':
        return <AlumniApplications token={token} />;
      case 'faculty':
        return <FacultyManagement token={token} />;
      case 'notices':
        return <NoticeManagement token={token} />;
      case 'IQAC':
        return <IQACAdminPanel token={token}></IQACAdminPanel>
     
      default:
        return <AdminDashboard token={token} />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-64 hidden lg:block'
      }`}>
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          <p className="text-sm text-gray-600">College Management</p>
        </div>
        
        <nav className="mt-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-blue-50 transition-colors duration-200 ${
                currentPage === item.id 
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                  : 'text-gray-700'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-64 p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-800">{admin?.name}</p>
              <p className="text-xs text-gray-500">{admin?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-red-600 transition-colors duration-200"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-gray-600 hover:text-gray-800"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <h2 className="text-xl font-semibold text-gray-800 capitalize">
                {currentPage === 'dashboard' ? 'Dashboard' : 
                 menuItems.find(item => item.id === currentPage)?.label}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {admin?.name}</span>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600 transition-colors duration-200"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}