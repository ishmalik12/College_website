import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  ChevronRight, MapPin, Clock, Play, X, Search, Filter, Users,
  BookOpen, Utensils, Heart, Music, Wifi, Shield, Car, Home,
  Dumbbell, Microscope, Monitor, Calendar, Star, Phone, Mail
} from 'lucide-react';
import heroImg from '../assets/blurimg.jpeg';

const facilities = [
  // ... your facilities array here
];

const iconMap = {
  MapPin, Clock, Play, BookOpen, Microscope, Monitor, Dumbbell,
  Users, Utensils, Heart, Music, Home, Filter, Wifi, Shield, Car
};

const FacilityCard = ({ facility, onSelect, index }) => {
  const IconComponent = iconMap[facility.icon] || MapPin;
  return (
    <article
      className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-3 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-200"
      style={{ animationDelay: `${index * 150}ms` }}
      onClick={() => onSelect(facility)}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(facility);
        }
      }}
      aria-label={`View details for ${facility.name}`}
    >
      {/* Card content here */}
    </article>
  );
};

const SearchAndFilter = ({ searchTerm, onSearchChange, selectedCategory, onCategoryChange }) => null;

const FacilityModal = ({ facility, onClose }) => {
  const IconComponent = iconMap[facility.icon] || MapPin;
  useEffect(() => {
    const handleEscape = e => {
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
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-y-auto shadow-2xl relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm text-gray-800 p-3 rounded-full hover:bg-white transition-all duration-200 shadow-lg z-10 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:scale-110"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="relative h-96 overflow-hidden rounded-t-3xl">
          <img
            src={facility.image}
            alt={facility.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <div className="flex items-start justify-between mb-4">
              <span className={`${facility.color} text-white p-4 rounded-2xl shadow-lg mb-4 inline-block backdrop-blur-sm`}>
                <IconComponent className="w-8 h-8" />
              </span>
              {facility.rating && (
                <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-bold text-gray-900">{facility.rating}</span>
                  <span className="text-gray-600 text-sm">rating</span>
                </div>
              )}
            </div>
            <h2 id="modal-title" className="text-4xl font-black text-white mb-2">
              {facility.name}
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              <span className="bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest shadow-sm border border-white/20">
                {facility.category}
              </span>
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="w-4 h-4" />
                <span className="font-medium">{facility.location}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-8">
          {/* Modal content */}
        </div>
      </div>
    </div>
  );
};

export default function Facilities() {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleFacilitySelect = useCallback(facility => {
    setSelectedFacility(facility);
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedFacility(null);
  }, []);

  const filteredFacilities = useMemo(() => {
    return facilities.filter(facility => {
      const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facility.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facility.features.some(feature =>
          feature.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesCategory = selectedCategory === 'all' || facility.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
      <div className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden rounded-3xl shadow-lg mb-12">
        <img
          src={heroImg}
          alt="Ingraham Girls Degree College"
          className="absolute inset-0 w-full h-full object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative z-10 flex flex-col justify-center items-center w-full h-full text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow">
            World-Class Campus Facilities
          </h1>
          <p className="text-base md:text-lg font-medium text-white opacity-90 max-w-2xl mx-auto drop-shadow">
            Discover our comprehensive range of state-of-the-art facilities designed to support academic excellence, personal growth, and community engagement throughout your university journey.
          </p>
        </div>
      </div>
      <section className="max-w-7xl mx-auto px-4 md:px-6">
        {filteredFacilities.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4" />
            </div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No facilities found</h3>
            <p className="text-gray-500">Try adjusting your search terms or selected category.</p>
          </div>
        ) : (
          <>
            <div className="mb-8 text-center">
              <p className="text-gray-600">
                Showing <span className="font-bold text-blue-600">{filteredFacilities.length}</span> facilities
                {selectedCategory !== 'all' && (
                  <span> in <span className="font-bold text-indigo-600">{selectedCategory}</span></span>
                )}
              </p>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredFacilities.map((facility, index) => (
                <FacilityCard
                  key={facility.id}
                  facility={facility}
                  onSelect={handleFacilitySelect}
                  index={index}
                />
              ))}
            </div>
          </>
        )}
      </section>
      {selectedFacility && (
        <FacilityModal facility={selectedFacility} onClose={handleModalClose} />
      )}
    </div>
  );
}
