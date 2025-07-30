import React, { useEffect, useState } from 'react';
import { GraduationCap, Award, Users, Star } from 'lucide-react';
import facultyBanner from '../assets/womensday-04.png';

const Faculty = () => {
  const [facultyList, setFacultyList] = useState([]);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/faculty/public'); // <-- Replace with your deployed URL if needed
        const data = await res.json();
        if (data.success) {
          setFacultyList(data.faculty);
        }
      } catch (err) {
        console.error('Error fetching faculty:', err);
      }
    };

    fetchFaculty();
  }, []);

  return (
    <>
      {/* Hero Banner */}
     <section
  className="relative w-full h-screen bg-cover bg-center"
  style={{ backgroundImage: `url(${facultyBanner})` }}
>
  <div className="relative h-full bg-black/40 flex items-center justify-center">
    <div className="text-center text-white px-4 max-w-6xl mx-auto">
      <div className="mb-8 flex justify-center">
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 border border-white/30 shadow-2xl">
          <GraduationCap className="w-20 h-20 text-white" />
        </div>
      </div>
      <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight">
        OUR FACULTY
      </h1>
      <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-blue-100 mb-12 font-light">
        Learn from world-class educators, researchers, and industry experts who are passionate
        about nurturing the next generation of leaders and innovators.
      </p>
      <div className="flex flex-wrap justify-center gap-8 text-white/90">
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
          <Award className="w-6 h-6" />
          <span className="text-lg font-medium">Excellence in Teaching</span>
        </div>
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
          <Users className="w-6 h-6" />
          <span className="text-lg font-medium">Expert Faculty</span>
        </div>
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
          <Star className="w-6 h-6" />
          <span className="text-lg font-medium">Research Leaders</span>
        </div>
      </div>
    </div>
  </div>

  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
    <div className="w-8 h-12 border-2 border-white/60 rounded-full flex justify-center bg-white/10 backdrop-blur-sm">
      <div className="w-2 h-4 bg-white/80 rounded-full mt-2 animate-pulse"></div>
    </div>
  </div>
</section>


      {/* Faculty Cards */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-24 px-6 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold mb-6 shadow-lg">
              <GraduationCap className="w-6 h-6" />
              Distinguished Faculty
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Meet Our Educators
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our faculty brings together decades of experience in education, research, and industry expertise
              to provide world-class learning experiences.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {facultyList.map((faculty, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
<div className="relative p-8">
  <div className="flex flex-col items-center">
    <div className="relative mb-6 group-hover:scale-110 transition-transform duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity scale-110"></div>
      <div className="relative">
        <img
          src={
            faculty.photoUrl?.startsWith('http')
              ? faculty.photoUrl
              : `http://localhost:5000${faculty.photoUrl}`
          }
          alt={faculty.name}
         className="w-32 h-32 rounded-full object-cover"
        />
        <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
          <GraduationCap className="text-white w-6 h-6" />
        </div>
      </div>
    </div>

    <h3 className="text-xl font-bold text-gray-900 mb-2 text-center group-hover:text-blue-600 transition-colors duration-300 leading-tight">
      {faculty.name}
    </h3>

    {faculty.designation && (
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-2 group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300">
        <p className="text-blue-700 font-semibold text-sm text-center">
          {faculty.designation}
        </p>
      </div>
    )}

    {/* New: Department */}
    {faculty.department && (
      <p className="text-sm text-gray-700 font-medium mb-1">
        Dept: {faculty.department}
      </p>
    )}

    {/* New: Experience */}
    {faculty.experience && (
      <p className="text-sm text-gray-600 mb-4">
        Experience: {faculty.experience}
      </p>
    )}

    <div className="border-t border-gray-100 pt-4 w-full group-hover:border-gray-200 transition-colors duration-300">
      <p className="text-gray-600 text-sm text-center leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
        {faculty.specialization || faculty.bio || 'No description provided.'}
      </p>
    </div>
  </div>
</div>

              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 relative">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-16 text-white text-center shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent)]"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-white/5 to-transparent rounded-full -translate-y-48 translate-x-48"></div>

            <div className="relative max-w-5xl mx-auto">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-8 w-fit mx-auto mb-10 border border-white/30 shadow-2xl">
                <GraduationCap className="h-20 w-20 mx-auto" />
              </div>

              <h3 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent leading-tight">
                Join Our Faculty
              </h3>

              <p className="text-xl md:text-2xl mb-12 text-blue-100 leading-relaxed max-w-4xl mx-auto font-light">
                Are you passionate about education and research? Join our team of distinguished faculty
                members and help shape the future of education at Ingraham Institute Girls Degree College.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="group bg-white text-blue-600 px-12 py-5 rounded-2xl hover:bg-gray-50 transition-all duration-300 font-bold text-xl shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1">
                  <span className="flex items-center justify-center gap-3">
                    Apply Now
                    <Award className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faculty;
