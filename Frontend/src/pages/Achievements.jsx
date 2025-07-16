import React, { useState } from 'react';
import { 
  Trophy, 
  Award, 
  BookOpen, 
  Users, 
  Building, 
  Target, 
  Medal,
  GraduationCap,
  Lightbulb,
  Globe,
  Star
} from 'lucide-react';

const AchievementCard = ({ icon, title, description, year }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
    <div className="flex items-start space-x-4">
      <div className="bg-blue-100 p-3 rounded-lg text-blue-600 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          {year && <span className="text-sm text-blue-600 font-medium">{year}</span>}
        </div>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

function App() {
  const [activeTab, setActiveTab] = useState('academic');

  const achievements = {
    academic: [
      {
        icon: <GraduationCap className="w-6 h-6" />,
        title: "NAAC A++ Accreditation",
        description: "Received the highest grade of A++ from National Assessment and Accreditation Council, recognizing our commitment to academic excellence and quality education.",
        year: "2023"
      },
      {
        icon: <BookOpen className="w-6 h-6" />,
        title: "Top 10 Engineering College",
        description: "Ranked among the top 10 engineering colleges in the state by National Institutional Ranking Framework (NIRF) for three consecutive years.",
        year: "2021-2023"
      },
      {
        icon: <Award className="w-6 h-6" />,
        title: "NBA Accreditation",
        description: "All major engineering programs accredited by National Board of Accreditation, ensuring international standards in technical education.",
        year: "2022"
      },
      {
        icon: <Trophy className="w-6 h-6" />,
        title: "Best Innovation Award",
        description: "Awarded the Best Innovation in Higher Education by the State Government for implementing cutting-edge teaching methodologies.",
        year: "2023"
      }
    ],
    research: [
      {
        icon: <Lightbulb className="w-6 h-6" />,
        title: "Research Excellence Award",
        description: "Recognized for outstanding research contributions in artificial intelligence and machine learning with over 500 publications in peer-reviewed journals.",
        year: "2023"
      },
      {
        icon: <Globe className="w-6 h-6" />,
        title: "International Collaboration",
        description: "Established research partnerships with 15 international universities, facilitating student and faculty exchange programs.",
        year: "2022"
      },
      {
        icon: <Target className="w-6 h-6" />,
        title: "Patent Portfolio",
        description: "Filed 50+ patents in emerging technologies including renewable energy, biotechnology, and smart systems.",
        year: "2021-2023"
      },
      {
        icon: <Building className="w-6 h-6" />,
        title: "Research Funding",
        description: "Secured $2.5 million in research grants from government agencies and industry partners for innovative projects.",
        year: "2023"
      }
    ],
    student: [
      {
        icon: <Users className="w-6 h-6" />,
        title: "100% Placement Record",
        description: "Achieved 100% placement rate for the graduating class of 2023, with average salary package of $85,000 annually.",
        year: "2023"
      },
      {
        icon: <Medal className="w-6 h-6" />,
        title: "National Competition Winners",
        description: "Students won first place in 12 national-level technical competitions, including robotics, coding, and innovation challenges.",
        year: "2023"
      },
      {
        icon: <Star className="w-6 h-6" />,
        title: "Student Startup Success",
        description: "25 successful startups launched by our students and alumni, with combined valuation exceeding $50 million.",
        year: "2020-2023"
      },
      {
        icon: <Trophy className="w-6 h-6" />,
        title: "Sports Excellence",
        description: "Inter-university champions in 8 different sports categories, with 15 students representing the country in international competitions.",
        year: "2023"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Achievements
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Celebrating excellence in education, research, and innovation. 
              Discover how we're shaping the future through outstanding accomplishments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                View All Achievements
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Key Achievements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our accomplishments across different domains
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-col sm:flex-row justify-center mb-12">
            <div className="bg-white rounded-lg shadow-sm p-1 flex flex-col sm:flex-row">
              <button
                onClick={() => setActiveTab('academic')}
                className={`px-6 py-3 rounded-md font-semibold transition-colors ${
                  activeTab === 'academic'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Academic Excellence
              </button>
              <button
                onClick={() => setActiveTab('research')}
                className={`px-6 py-3 rounded-md font-semibold transition-colors ${
                  activeTab === 'research'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Research & Innovation
              </button>
              <button
                onClick={() => setActiveTab('student')}
                className={`px-6 py-3 rounded-md font-semibold transition-colors ${
                  activeTab === 'student'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Student Success
              </button>
            </div>
          </div>

          {/* Achievement Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements[activeTab].map((achievement, index) => (
              <AchievementCard key={index} {...achievement} />
            ))}
          </div>
        </div>
      </section>

     
    </div>
  );
}

export default App;