import { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  GraduationCap, 
  UserCheck, 
  Bell, 
  Mail, 
  BarChart3, 
  Calendar,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import UploadNotice from './UploadNotice';
import AddFacultyPage from './AddFaculty';


export default function AdminDashboard({ token }) {
  const [stats, setStats] = useState({
    contacts: 0,
    teacherApplications: 0,
    alumniApplications: 0,
    faculty: 0,
    notices: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [showAddFaculty, setShowAddFaculty] = useState(false);

  const [loading, setLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // Fetch statistics
      const [contacts, teachers, alumni, faculty, notices] = await Promise.all([
        fetch('http://localhost:5000/api/contact?limit=1', { headers }),
        fetch('http://localhost:5000/api/teacher-applications?limit=1', { headers }),
        fetch('http://localhost:5000/api/alumni-applications?limit=1', { headers }),
        fetch('http://localhost:5000/api/faculty?limit=1', { headers }),
        fetch('http://localhost:5000/api/notices?limit=1', { headers })
      ]);

      const [contactData, teacherData, alumniData, facultyData, noticeData] = await Promise.all([
        contacts.json(),
        teachers.json(),
        alumni.json(),
        faculty.json(),
        notices.json()
      ]);

      setStats({
        contacts: contactData.pagination?.total || 0,
        teacherApplications: teacherData.pagination?.total || 0,
        alumniApplications: alumniData.pagination?.total || 0,
        faculty: facultyData.pagination?.total || 0,
        notices: noticeData.pagination?.total || 0
      });

      // Mock recent activity - in real app, you'd fetch this from backend
      setRecentActivity([
        { type: 'contact', message: 'New contact form submission', time: '2 minutes ago' },
        { type: 'application', message: 'Teacher application received', time: '1 hour ago' },
        { type: 'notice', message: 'Notice published: Exam Schedule', time: '3 hours ago' },
        { type: 'alumni', message: 'Alumni registration approved', time: '5 hours ago' }
      ]);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Contact Messages',
      value: stats.contacts,
      icon: <Mail className="w-8 h-8" />,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Teacher Applications',
      value: stats.teacherApplications,
      icon: <Users className="w-8 h-8" />,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Alumni Registrations',
      value: stats.alumniApplications,
      icon: <GraduationCap className="w-8 h-8" />,
      color: 'bg-purple-500',
      change: '+15%'
    },
    {
      title: 'Faculty Members',
      value: stats.faculty,
      icon: <UserCheck className="w-8 h-8" />,
      color: 'bg-orange-500',
      change: '+3%'
    },
    {
      title: 'Active Notices',
      value: stats.notices,
      icon: <Bell className="w-8 h-8" />,
      color: 'bg-red-500',
      change: '+25%'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome to Admin Dashboard</h1>
            <p className="text-blue-100">Manage your college data efficiently</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
            <BarChart3 className="w-12 h-12" />
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.color} text-white p-3 rounded-lg`}>
                {card.icon}
              </div>
              <div className="flex items-center text-green-600 text-sm font-medium">
                <TrendingUp className="w-4 h-4 mr-1" />
                {card.change}
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">{card.title}</h3>
            <p className="text-3xl font-bold text-gray-800">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
 {showUploadForm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-all">
    <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6 animate-fade-in">
      {/* Close button */}
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
        onClick={() => setShowUploadForm(false)}
      >
        &times;
      </button>

      {/* Modal content */}
      <UploadNotice token={token} onClose={() => setShowUploadForm(false)} />
    </div>
  </div>
)}
{showAddFaculty && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-all">
    <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6 animate-fade-in">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
        onClick={() => setShowAddFaculty(false)}
      >
        &times;
      </button>
      <AddFacultyPage token={token} />
    </div>
  </div>
)}



        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-blue-600" />
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  {activity.type === 'contact' && <Mail className="w-5 h-5 text-blue-500" />}
                  {activity.type === 'application' && <FileText className="w-5 h-5 text-green-500" />}
                  {activity.type === 'notice' && <Bell className="w-5 h-5 text-red-500" />}
                  {activity.type === 'alumni' && <GraduationCap className="w-5 h-5 text-purple-500" />}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">{activity.message}</p>
                  <p className="text-gray-500 text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <AlertCircle className="w-6 h-6 mr-2 text-orange-600" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button  onClick={() => setShowUploadForm(true)} className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 text-center transition-colors duration-200">
              <Bell className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-blue-800 font-medium">Add Notice</p>
            </button>
          <button onClick={() => setShowAddFaculty(true)} className="bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-4 text-center transition-colors duration-200">
  <UserCheck className="w-8 h-8 text-green-600 mx-auto mb-2" />
  <p className="text-green-800 font-medium">Add Faculty</p>
</button>

            <button className="bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg p-4 text-center transition-colors duration-200">
              <Mail className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-purple-800 font-medium">View Messages</p>
            </button>
            <button className="bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg p-4 text-center transition-colors duration-200">
              <FileText className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-orange-800 font-medium">Applications</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}