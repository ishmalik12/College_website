import React, { useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  Calendar,
  Users,
  Award,
  Heart,
  Sparkles,
  ArrowRight,
  ImageIcon,
  Clock,
  MapPin
} from 'lucide-react';

import angawadi1 from "../assets/Angawadi-01.png";
import angawadi2 from "../assets/Angawadi-02.jpg";
import angawadi3 from "../assets/Angawadi-03.jpg";

import fssai1 from "../assets/FSSAI-01.jpg";
import fssai2 from "../assets/FSSAI-02.jpg";
import fssai3 from "../assets/FSSAI-03.jpg";

import shark1 from "../assets/SharkTank-01.png";
import shark2 from "../assets/SharkTank-02.png";
import shark3 from "../assets/SharkTank-03.png";
import shark4 from "../assets/SharkTank-04.png";
import shark5 from "../assets/SharkTank-05.png";

import women1 from "../assets/womensday-01.png";
import women2 from "../assets/womensday-02.png";
import women3 from "../assets/womensday-03.png";
import women4 from "../assets/womensday-04.png";
import women5 from "../assets/womensday-05.png";
import women6 from "../assets/womensday-06.png";

// ✅ Gallery Data
const groupedGallery = {
  '2024': [
    {
      section: 'Anganwadi Visit',
      color: 'red',
      icon: Heart,
      location: 'Community Center',
      date: 'March 15, 2024',
      items: [
        { title: 'Community Outreach', description: 'Students visiting Anganwadi center.', src: angawadi1, tags: ['Community', 'Health'] },
        { title: 'Child Interaction', description: 'Interacting with children.', src: angawadi2, tags: ['Children'] },
        { title: 'Educational Activities', description: 'Fun learning activities.', src: angawadi3, tags: ['Learning'] }
      ]
    },
    {
      section: 'FSSAI Awareness Program',
      color: 'blue',
      icon: Award,
      location: 'Main Auditorium',
      date: 'April 22, 2024',
      items: [
        { title: 'Food Safety Summit', description: 'Presentation on food safety.', src: fssai1, tags: ['Safety'] },
        { title: 'Interactive Workshop', description: 'Demonstrating practices.', src: fssai2, tags: ['Workshop'] },
        { title: 'Student Engagement', description: 'Students participating actively.', src: fssai3, tags: ['Engagement'] }
      ]
    },
    {
      section: 'Shark Tank Event',
      color: 'red',
      icon: Sparkles,
      location: 'Innovation Hub',
      date: 'May 10, 2024',
      items: [
        { title: 'Pitch Presentations', description: 'Students pitch ideas.', src: shark1, tags: ['Pitch'] },
        { title: 'Expert Panel', description: 'Panel evaluates ideas.', src: shark2, tags: ['Panel'] },
        { title: 'Winning Team', description: 'Top team awarded.', src: shark3, tags: ['Winners'] },
        { title: 'Collaboration', description: 'Team efforts.', src: shark4, tags: ['Teamwork'] },
        { title: 'Grand Finale', description: 'Closing ceremony.', src: shark5, tags: ['Finale'] }
      ]
    }
  ],
  '2025': [
    {
      section: "Women's Day Celebration",
      color: 'blue',
      icon: Users,
      location: 'Central Campus',
      date: 'March 8, 2025',
      items: [
        { title: 'Inspiring Keynote', description: 'Leadership talk.', src: women1, tags: ['Leadership'] },
        { title: 'Unity & Strength', description: 'Group photo.', src: women2, tags: ['Unity'] },
        { title: 'Cultural Showcase', description: 'Performances.', src: women3, tags: ['Culture'] },
        { title: 'Stories of Success', description: 'Women achievements.', src: women4, tags: ['Success'] },
        { title: 'Recognition Awards', description: 'Outstanding women honored.', src: women5, tags: ['Awards'] },
        { title: 'Celebration Finale', description: 'Closing event.', src: women6, tags: ['Celebration'] }
      ]
    }
  ]
};

const Gallery = () => {
  const [activeYear, setActiveYear] = useState('2024');
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalImages, setModalImages] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  const openModal = (images, index) => {
    setModalImages(images);
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalImages([]);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % modalImages.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? modalImages.length - 1 : prev - 1));
  };

  const getColorClasses = (color) => ({
    red: {
      primary: 'text-red-600',
      accent: 'bg-red-600',
    },
    blue: {
      primary: 'text-blue-600',
      accent: 'bg-blue-600',
    },
    default: {
      primary: 'text-gray-600',
      accent: 'bg-gray-600',
    }
  }[color] || { primary: 'text-gray-600', accent: 'bg-gray-600' });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20 text-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-white/10 p-5 rounded-full">
            <Camera className="w-10 h-10" />
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-4">Campus Gallery</h1>
        <p className="text-blue-100 max-w-xl mx-auto mb-10">
          Explore vibrant memories and milestones of our academic community.
        </p>
        <div className="flex justify-center gap-4">
          {['2024', '2025'].map((year) => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`px-6 py-3 rounded-xl font-semibold ${
                activeYear === year ? 'bg-white text-blue-900' : 'bg-white/10 text-white'
              }`}
            >
              <Calendar className="inline-block w-4 h-4 mr-1" />
              {year}
            </button>
          ))}
        </div>
      </section>

      {/* Event Sections */}
      {groupedGallery[activeYear].map((group, idx) => {
        const colors = getColorClasses(group.color);
        const IconComponent = group.icon;

        return (
          <section
            key={idx}
            className={`py-16 px-6 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
          >
            <div className="max-w-6xl mx-auto text-center mb-12">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${colors.accent} flex items-center justify-center`}>
                <IconComponent className="text-white w-8 h-8" />
              </div>
              <h2 className="text-4xl font-bold">{group.section}</h2>
              <div className="mt-2 flex justify-center gap-6 text-gray-600">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" /> {group.location}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" /> {group.date}
                </span>
                <span className="flex items-center">
                  <ImageIcon className="w-4 h-4 mr-2" /> {group.items.length} Photos
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {group.items.map((img, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer group"
                  onClick={() => openModal(group.items, i)}
                  onMouseEnter={() => setHoveredCard(`${idx}-${i}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    <ArrowRight className="text-white w-6 h-6" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700">
                      {img.title}
                    </h3>
                    <p className="text-sm text-gray-600">{img.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {/* Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4">
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 text-white bg-white/20 hover:bg-white/30 p-2 rounded-full z-[10000]"
          >
            <X className="w-6 h-6" />
          </button>
          <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 text-white z-[9999]">
            <ChevronLeft className="w-10 h-10" />
          </button>
          <div className="max-w-[98vw] max-h-[95vh] flex flex-col items-center justify-center">
            <img
              src={modalImages[selectedImage].src}
              alt={modalImages[selectedImage].title}
              className="rounded-lg object-contain w-[98vw] h-[95vh]"
            />
            <div className="mt-4 text-center text-white">
              <h3 className="text-2xl font-bold">{modalImages[selectedImage].title}</h3>
              <p className="mt-2 text-gray-300">{modalImages[selectedImage].description}</p>
            </div>
          </div>
          <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 text-white z-[9999]">
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
