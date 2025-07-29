import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  ChevronRight, MapPin, Clock, Play, X, Search, Filter, Users,
  BookOpen, Utensils, Heart, Music, Wifi, Shield, Car, Home,
  Dumbbell, Microscope, Monitor, Calendar, Star, Phone, Mail
} from 'lucide-react';
import heroImg from '../assets/blurimg.jpeg';
import axios from 'axios';

const FacilityCard = ({ name, image, description }) => (
  <div
    className="relative h-[300px] bg-cover bg-center rounded-lg overflow-hidden shadow-lg group"
    style={{ backgroundImage: `url(http://localhost:5000${image})` }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-70 duration-300 flex items-center justify-center p-6 text-center">
      <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h2 className="text-2xl font-bold mb-2 uppercase">{name}</h2>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  </div>
);





export default function Facilities() {
 
   const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/facilities')
      .then((res) => {
        if (res.data.success) {
          setFacilities(res.data.data);
        }
      })
      .catch((err) => {
        console.error('Error fetching facilities:', err);
      });
  }, []);

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
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Our Facilities
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {facilities.map((facility) => (
          <FacilityCard
            key={facility._id}
            name={facility.name}
            image={facility.image}
            description={facility.description}
          />
        ))}
      </div>
    </div>
      </section>
    
    </div>
  );
}
