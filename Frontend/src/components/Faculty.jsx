import React from 'react';
import { GraduationCap } from 'lucide-react';
import facultyBanner from '../assets/womensday-04.png';

const Faculty = () => {
  const facultyList = [
    {
      name: "Dr. Robert Anderson",
      position: "Professor & Head",
      specialization: "Artificial Intelligence, Machine Learning",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Dr. Lisa Chen",
      position: "Associate Professor",
      specialization: "Data Science, Big Data Analytics",
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Prof. Michael Johnson",
      position: "Professor",
      specialization: "Strategic Management, Leadership",
      image: "https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Dr. Emily Davis",
      position: "Assistant Professor",
      specialization: "Marketing, Consumer Behavior",
      image: "https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Dr. Sarah Williams",
      position: "Professor",
      specialization: "English Literature, Creative Writing",
      image: "https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Prof. David Brown",
      position: "Associate Professor",
      specialization: "History, Political Science",
      image: "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
    // Add more faculty here...
  ];

  return (
    <>
      {/* Hero Banner */}
      <section
        className="w-full h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url(${facultyBanner})` }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center m-8 text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">OUR FACULTY</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Learn from world-class educators, researchers, and industry experts who are passionate about 
              nurturing the next generation of leaders and innovators.
            </p>
          </div>
        </div>
      </section>

      {/* Faculty Cards */}
      <div className="min-h-screen bg-gray-50 py-20 px-6 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {facultyList.map((faculty, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <img
                    src={faculty.image}
                    alt={faculty.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg transition-transform group-hover:scale-105"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1">
                    <GraduationCap className="text-white w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-1 text-center">{faculty.name}</h3>
                <p className="text-red-600 font-medium text-center">{faculty.position}</p>
                <p className="text-gray-700 text-sm text-center mt-2">{faculty.specialization}</p>
              </div>
            </div>
          ))}

         

        
        </div>
        
        <div className="mt-20 bg-red-700 rounded-3xl p-12 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <GraduationCap className="h-20 w-20 mx-auto mb-8" />
            <h3 className="text-4xl font-bold mb-6">Join Our Faculty</h3>
            <p className="text-xl mb-10 text-blue-100 leading-relaxed">
              Are you passionate about education and research? Join our team of distinguished faculty members 
              and help shape the future of education at Ingraham Institute Girls Degree College .
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-blue-600 px-10 py-4 rounded-xl hover:bg-gray-100 transition-all duration-200 font-bold text-lg transform hover:scale-105">Apply Now</button>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faculty;

