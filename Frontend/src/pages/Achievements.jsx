import React from 'react';
import { ChevronRight } from 'lucide-react';

const achievements = [
  {
    id: '1',
    years: '1838-1861',
    title: 'The Bombay Times',
    description: 'The Bombay Times and Journal of Commerce',
    color: 'bg-orange-500',
    position: 'bottom'
  },
  {
    id: '2',
    years: '1952-1962',
    title: 'Filmfare Magazine',
    description: 'Filmfare Magazine Launched',
    color: 'bg-teal-500',
    position: 'top'
  },
  {
    id: '3',
    years: '1990-1999',
    title: 'Global Recognition',
    description: 'Times Of India Got Featured Among The World',
    color: 'bg-blue-500',
    position: 'bottom'
  },
  {
    id: '4',
    years: '2000-2004',
    title: 'Milestone Achievement',
    description: 'The Times Of India Crossed 2 Millions Mark',
    color: 'bg-red-500',
    position: 'top'
  },
  {
    id: '5',
    years: '2005-2007',
    title: 'Digital Expansion',
    description: 'Launch Of Simply Marry And Mumbai Mirror',
    color: 'bg-purple-500',
    position: 'bottom'
  },
  {
    id: '6',
    years: '2009-2016',
    title: 'Modern Era',
    description: 'Launch Of ET NOW And Bennett University',
    color: 'bg-yellow-500',
    position: 'top'
  }
];

const Achievements = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>

      {/* Main content */}
      <div className="relative z-10 px-6 py-16">
        {/* Title */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-wide">
            Ingraham Institue Girl's Degree College
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block max-w-7xl mx-auto">
          <div className="relative">
            {/* Main timeline line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-slate-600 via-slate-400 to-slate-600 transform -translate-y-1/2"></div>

            {/* Timeline items */}
            <div className="relative flex justify-between items-center min-h-[400px]">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="relative flex-1 px-2">
                  {/* Timeline dot */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="w-4 h-4 bg-white rounded-full border-4 border-slate-300 shadow-lg"></div>
                  </div>

                  {/* Colored segment */}
                  <div className={`absolute top-1/2 left-0 right-0 h-2 ${achievement.color} transform -translate-y-1/2 z-10`}></div>

                  {/* Achievement card */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 w-64 ${
                    achievement.position === 'top' ? 'bottom-full mb-8' : 'top-full mt-8'
                  }`}>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                      <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 ${achievement.color} text-white shadow-lg`}>
                        {achievement.years}
                      </div>
                      <div className="text-white">
                        <h3 className="text-lg font-bold mb-2 leading-tight">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                          {achievement.description}
                        </p>
                        <button className="group flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-105">
                          Know More
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>
                    <div className={`absolute left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-white/40 ${
                      achievement.position === 'top' ? 'top-full' : 'bottom-full'
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Vertical Timeline */}
        <div className="lg:hidden max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-slate-600 via-slate-400 to-slate-600"></div>
            <div className="space-y-12">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="relative flex items-start">
                  <div className="absolute left-8 transform -translate-x-1/2 z-20">
                    <div className="w-4 h-4 bg-white rounded-full border-4 border-slate-300 shadow-lg"></div>
                  </div>
                  <div className="ml-20 w-full">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                      <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 ${achievement.color} text-white shadow-lg`}>
                        {achievement.years}
                      </div>
                      <div className="text-white">
                        <h3 className="text-lg font-bold mb-2 leading-tight">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                          {achievement.description}
                        </p>
                        <button className="group flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-105">
                          Know More
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-teal-500/10 rounded-full blur-lg animate-pulse delay-2000"></div>
      </div>
    </div>
  );
};

export default Achievements;
