import { useState, useEffect } from 'react';
import { 
  LogOut, 
  LayoutDashboard, 
  Mail, 
  Users,  
  UserCheck, 
  Bell,
  Menu,
  X,
  Info,
  Award,
  Building,
  Image,
  GraduationCap
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
import AdminStudentAchievements from './Achievements';
import Facilities from '../components/Facilities';
import AdminFacilities from './AdminFacilities';
import AdminGalleryManager from './GalleryAdmin';
import AdminAlumniData from './AlumniData';


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
  { id: 'IQAC', label: 'IQAC Management', icon: <Info className="w-5 h-5" /> },
  { id: 'Achievements', label: 'Acheivements Management', icon: <Award className="w-5 h-5" /> },
  { id: 'Facilities', label: 'Facilities Management', icon: <Building className="w-5 h-5" /> },
   { id: 'Gallery', label: 'Gallery Management', icon: <Image className="w-5 h-5" /> },
    { id: 'Alumni', label: 'Alumni Management', icon: <GraduationCap className="w-5 h-5" /> }
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
        return <IQACAdminPanel token={token}></IQACAdminPanel>;
      case 'Achievements':
        return <AdminStudentAchievements token={token}></AdminStudentAchievements>
      case 'Facilities':
        return <AdminFacilities token={token}></AdminFacilities>
      case 'Gallery':
        return <AdminGalleryManager token={token}></AdminGalleryManager>
      case 'Alumni':
        return <AdminAlumniData token={token}></AdminAlumniData>
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
   
{/* Sidebar */}
<div
  className={`bg-white shadow-lg fixed z-40 top-0 left-0 h-full w-[80%] max-w-xs transition-transform duration-300 transform ${
    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
  } lg:relative lg:translate-x-0 lg:w-64`}
>
  {/* Header */}
  <div className="p-8 border-b border-gray-200 sticky top-0 bg-white z-10 flex justify-between items-center">
    <div>
      <h1 className="text-3xl font-extrabold text-gray-800">Admin Panel</h1>
      <p className="text-lg text-gray-600">College Management</p>
    </div>
    <button
      onClick={() => setSidebarOpen(false)}
      className="lg:hidden text-gray-600 hover:text-red-600"
    >
      <X className="w-9 h-9" />
    </button>
  </div>

  {/* Navigation */}
  <div className="flex flex-col h-[calc(100vh-8rem)] overflow-y-auto">
    <nav className="flex-grow mt-6 space-y-2 px-2">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            setCurrentPage(item.id);
            setSidebarOpen(false);
          }}
          className={`w-full flex items-center px-6 py-5 text-left text-xl font-semibold hover:bg-blue-50 transition-colors duration-200 ${
            currentPage === item.id
              ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-600'
              : 'text-gray-700'
          }`}
        >
          <span className="text-2xl">{item.icon}</span>
          <span className="ml-5">{item.label}</span>
        </button>
      ))}
    </nav>

    {/* Footer */}
    <div className="p-6 border-t border-gray-200 mt-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold text-gray-800">{admin?.name}</p>
          <p className="text-sm text-gray-500">{admin?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-gray-400 hover:text-red-600 transition-colors duration-200"
          title="Logout"
        >
          <LogOut className="w-7 h-7" />
        </button>
      </div>
    </div>
  </div>
</div>



      {/* Mobile sidebar overlay */}
   {/* Mobile sidebar overlay */}
{sidebarOpen && (
  <div 
    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
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