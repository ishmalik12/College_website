import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import HeroSection from './HeroSection';
import achievementImg from '../assets/achievement.jpg';

const Carousel = ({ data }) => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % data.length);
  const prev = () => setIndex((prev) => (prev - 1 + data.length) % data.length);

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-12 px-4">
      <h2 className="text-center text-3xl font-bold text-blue-800 mb-6 flex items-center justify-center gap-2">
        <Trophy className="text-yellow-500" /> Top Achievers
      </h2>

      {/* Single Card Carousel */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row items-center gap-6 px-6 py-8 transition-all duration-500">
        <img
          src={`http://localhost:5000${data[index].photo}`}
          alt={data[index].name}
          className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-blue-300 shadow-lg"
        />
        <div className="text-center md:text-left">
          <h3 className="text-xl md:text-2xl font-bold text-blue-800 flex items-center justify-center md:justify-start gap-2">
            <Trophy className="text-yellow-500 w-5 h-5" /> {data[index].name}
          </h3>
          <p className="text-gray-700 mt-2 text-sm md:text-base leading-relaxed">
            {data[index].description}
          </p>
        </div>
      </div>

      {/* Manual Controls */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={prev}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-full shadow text-sm"
        >
          <ChevronLeft className="inline-block w-4 h-4" /> Prev
        </button>
        <button
          onClick={next}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-full shadow text-sm"
        >
          Next <ChevronRight className="inline-block w-4 h-4" />
        </button>
      </div>
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
      <HeroSection
        title="Our Achievements"
        description="Celebrating excellence in education, research, and innovation. 
        Discover how we're shaping the future through outstanding accomplishments."
        backgroundImage={achievementImg}
      />

      {/* Carousel Section */}
      {studentAchievements.length > 0 && (
        <section className="pt-16 pb-4 px-4 sm:px-8">
          <Carousel data={studentAchievements.slice(0, 5)} />
        </section>
      )}
    </div>
  );
}

export default StudentAchievementsPage;
