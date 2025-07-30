import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CollegeCarousel from './CollegeCarousel';
import achievementImg from '../assets/achievement.jpg';


const StudentAchievementCard = ({ photo, name, description }) => (
  <div className="bg-white rounded-xl shadow-md p-4 flex gap-4 border hover:shadow-lg transition">
    <img
      src={`http://localhost:5000${photo}`}
      alt={name}
      className="w-20 h-20 rounded-full object-cover border"
    />
    <div>
      <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
      <p className="text-gray-600 mt-1">{description}</p>
    </div>
  </div>
);

const Carousel = ({ data }) => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % data.length);
  const prev = () => setIndex((prev) => (prev - 1 + data.length) % data.length);

  return (
    <div className="relative w-full max-w-4xl mx-auto mb-12">
      <div className="overflow-hidden rounded-xl shadow-lg">
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${index * 100}%)` }}>
          {data.map((item, idx) => (
            <div key={idx} className="w-full flex-shrink-0 bg-white p-6 flex items-center gap-6">
              <img
                src={`http://localhost:5000${item.photo}`}
                alt={item.name}
                className="w-28 h-28 rounded-full object-cover border"
              />
              <div>
                <h3 className="text-xl font-bold text-blue-800">{item.name}</h3>
                <p className="text-gray-700 mt-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Navigation Arrows */}
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-blue-100"
        onClick={prev}
      >
        <ChevronLeft />
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-blue-100"
        onClick={next}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

function StudentAchievementsPage() {
  const [studentAchievements, setStudentAchievements] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/achievements/student')
      .then((res) => {
        if (res.data.success) {
          setStudentAchievements(res.data.data);
        }
      })
      .catch((err) => console.error('Error fetching student achievements:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section - Don't change */}
      {/* <section
  className="relative text-white py-20  bg-cover bg-center"
  style={{ backgroundImage: `url(${achievementImg})` }}
>
  <div className="relative max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
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
</section> */}
<section
        className="w-full h-screen bg-cover bg-center relative"  
        style={{ backgroundImage: `url(${achievementImg})` }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center m-8 text-white px-4">
           <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Our Achievements
      </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
        Celebrating excellence in education, research, and innovation. 
        Discover how we're shaping the future through outstanding accomplishments.
      </p>
          </div>
        </div>
      </section>



      {/* Carousel Section */}
      {studentAchievements.length > 0 && (
        <section className="pt-16 pb-4 px-4 sm:px-8">
           
           <CollegeCarousel data={studentAchievements.slice(0, 5)}></CollegeCarousel>
        </section>
      )}

      {/* Cards Section */}
    
    </div>
  );
}

export default StudentAchievementsPage;
