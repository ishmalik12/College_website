import React, { useState, useCallback, useEffect } from 'react';
import { ChevronRight, MapPin, Clock, Play, X } from 'lucide-react';

// Facilities data
const facilities = [
  {
    id: 'central-library',
    name: 'Central Library',
    description: 'A comprehensive hub of academic resources featuring over 200,000 books, digital content, and collaborative study spaces designed to support research and learning.',
    image: 'https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Library',
    color: 'bg-blue-500',
    features: ['High-Speed Wi-Fi', 'E-books & Digital Resources', 'Academic Journals', 'Study Zones', 'Research Assistance', 'Group Study Rooms'],
    stats: {
      books: '200K+',
      seats: '500',
      terminals: '50',
    },
    icon: 'MapPin',
    location: 'Building A, Ground Floor',
    operatingHours: 'Mon-Fri: 8:00 AM - 10:00 PM, Sat-Sun: 9:00 AM - 8:00 PM',
    virtualTourUrl: '/virtual-tour/library'
  },
  {
    id: 'science-laboratory',
    name: 'Advanced Science Laboratory',
    description: 'State-of-the-art laboratory facilities equipped with cutting-edge instruments for physics, chemistry, and biology experiments, supporting hands-on learning and research.',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Laboratory',
    color: 'bg-green-500',
    features: ['Mass Spectrometer', 'High-Speed Centrifuge', 'Digital pH Meters', 'Fume Hood Systems', 'Microscopy Suite', 'Safety Equipment'],
    stats: {
      experiments: '300+',
      labs: '12',
      assistants: '15',
    },
    icon: 'Clock',
    location: 'Science Building, Floors 2-4',
    operatingHours: 'Mon-Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 4:00 PM',
    virtualTourUrl: '/virtual-tour/laboratory'
  },
  {
    id: 'computer-center',
    name: 'Computer Learning Center',
    description: 'Modern computing facility with high-performance workstations, specialized software, and collaborative spaces for programming, design, and digital innovation.',
    image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Technology',
    color: 'bg-purple-500',
    features: ['High-Performance PCs', 'Software Licenses', '3D Printing Lab', 'VR Development Suite', 'Network Infrastructure', 'Technical Support'],
    stats: {
      computers: '200+',
      software: '50+',
      printers: '8',
    },
    icon: 'Play',
    location: 'Technology Building, All Floors',
    operatingHours: '24/7 Access for Students',
    virtualTourUrl: '/virtual-tour/computer-center'
  },
  {
    id: 'sports-complex',
    name: 'Athletic Sports Complex',
    description: 'Comprehensive sports facility featuring indoor courts, fitness equipment, swimming pool, and outdoor fields supporting various athletic programs and recreational activities.',
    image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Athletics',
    color: 'bg-red-500',
    features: ['Olympic Pool', 'Fitness Center', 'Basketball Courts', 'Tennis Courts', 'Running Track', 'Equipment Rental'],
    stats: {
      courts: '15',
      capacity: '2000',
      programs: '25',
    },
    icon: 'MapPin',
    location: 'Sports Complex, West Campus',
    operatingHours: 'Mon-Sun: 6:00 AM - 10:00 PM',
    virtualTourUrl: '/virtual-tour/sports-complex'
  }
];



// Icon mapping
const iconMap = {
  MapPin,
  Clock,
  Play,
};

// Facility Card Component
const FacilityCard = ({ facility, onSelect }) => {
  const IconComponent = iconMap[facility.icon] || MapPin;

  return (
    <article
      className="bg-white rounded-2xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={() => onSelect(facility)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(facility);
        }
      }}
      aria-label={`View details for ${facility.name}`}
    >
      <div className="relative h-60 overflow-hidden">
        <img 
          src={facility.image} 
          alt={facility.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className={`absolute top-4 left-4 p-3 rounded-xl ${facility.color} text-white shadow-lg`}>
          <IconComponent className="w-6 h-6" />
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
          {facility.category}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
            {facility.name}
          </h3>
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {facility.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {facility.features.slice(0, 3).map((feature, i) => (
            <span 
              key={i} 
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
            >
              {feature}
            </span>
          ))}
          {facility.features.length > 3 && (
            <span className="text-blue-600 text-sm font-medium">
              +{facility.features.length - 3} more
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {Object.entries(facility.stats).map(([key, value], i) => (
            <div key={i} className="text-center bg-gray-50 rounded-lg p-3">
              <div className="text-sm font-bold text-gray-900">{value}</div>
              <div className="text-xs text-gray-500 capitalize">{key}</div>
            </div>
          ))}
        </div>

        <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg group">
          Explore Facility
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </article>
  );
};

// Facility Modal Component
const FacilityModal = ({ facility, onClose }) => {
  const IconComponent = iconMap[facility.icon] || MapPin;

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full hover:bg-white transition-colors shadow-lg z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-80 overflow-hidden">
          <img 
            src={facility.image} 
            alt={facility.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <div className="absolute bottom-8 left-8">
            <div className={`${facility.color} text-white p-4 rounded-xl shadow-lg mb-4 inline-block`}>
              <IconComponent className="w-8 h-8" />
            </div>
            <h2 id="modal-title" className="text-4xl font-bold text-white mb-2">
              {facility.name}
            </h2>
            <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
              {facility.category}
            </span>
          </div>
        </div>

        <div className="p-8">
          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            {facility.description}
          </p>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Key Features & Amenities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {facility.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Facility Statistics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(facility.stats).map(([key, value], i) => (
                <div key={i} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl text-center border border-blue-100">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{value}</div>
                  <div className="text-gray-600 capitalize font-medium">{key}</div>
                </div>
              ))}
            </div>
          </div>

          {facility.location && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Location & Hours</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span>{facility.location}</span>
                </div>
                {facility.operatingHours && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="w-5 h-5 text-green-600" />
                    <span>{facility.operatingHours}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg">
              <MapPin className="w-5 h-5" />
              Get Directions
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              <Clock className="w-5 h-5" />
              Operating Hours
            </button>
            {facility.virtualTourUrl && (
              <button className="flex-1 bg-green-100 text-green-700 py-4 rounded-xl font-medium hover:bg-green-200 transition-colors flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Virtual Tour
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


// Main Facilities Component
export default function Facilities()  {
  const [selectedFacility, setSelectedFacility] = useState(null);

  const handleFacilitySelect = useCallback((facility) => {
    setSelectedFacility(facility);
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedFacility(null);
  }, []);

  return (
    <div className="bg-white">
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Campus Facilities
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our world-class facilities designed to support your academic success and personal growth
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {facilities.map((facility) => (
            <FacilityCard
              key={facility.id}
              facility={facility}
              onSelect={handleFacilitySelect}
            />
          ))}
        </div>
      </section>

      {selectedFacility && (
        <FacilityModal
          facility={selectedFacility}
          onClose={handleModalClose}
        />
      )}

    

    </div>
  );
};

