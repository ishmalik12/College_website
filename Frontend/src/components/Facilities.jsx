// import React, { useState, useCallback, useEffect, useMemo } from 'react';
// import {
//   ChevronRight, MapPin, Clock, Play, X, Search, Filter, Users,
//   BookOpen, Utensils, Heart, Music, Wifi, Shield, Car, Home,
//   Dumbbell, Microscope, Monitor, Calendar, Star, Phone, Mail
// } from 'lucide-react';
// import heroImg from '../assets/blurimg.jpeg';
// import axios from 'axios';

// const FacilityCard = ({ name, image, description }) => (
//   <div
//     className="relative h-[300px] bg-cover bg-center rounded-lg overflow-hidden shadow-lg group"
//     style={{ backgroundImage: `url(http://localhost:5000${image})` }}
//   >
//     <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-70 duration-300 flex items-center justify-center p-6 text-center">
//       <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//         <h2 className="text-2xl font-bold mb-2 uppercase">{name}</h2>
//         <p className="text-sm">{description}</p>
//       </div>
//     </div>
//   </div>
// );





// export default function Facilities() {
 
//    const [facilities, setFacilities] = useState([]);

//   useEffect(() => {
//     axios
//       .get('http://localhost:5000/api/facilities')
//       .then((res) => {
//         if (res.data.success) {
//           setFacilities(res.data.data);
//         }
//       })
//       .catch((err) => {
//         console.error('Error fetching facilities:', err);
//       });
//   }, []);

//   return (
//     <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
//       <div className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden rounded-3xl shadow-lg mb-12">
//         <img
//           src={heroImg}
//           alt="Ingraham Girls Degree College"
//           className="absolute inset-0 w-full h-full object-cover object-center"
//           aria-hidden="true"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-60" />
//         <div className="relative z-10 flex flex-col justify-center items-center w-full h-full text-center px-4">
//           <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow">
//             World-Class Campus Facilities
//           </h1>
//           <p className="text-base md:text-lg font-medium text-white opacity-90 max-w-2xl mx-auto drop-shadow">
//             Discover our comprehensive range of state-of-the-art facilities designed to support academic excellence, personal growth, and community engagement throughout your university journey.
//           </p>
//         </div>
//       </div>
//       <section className="max-w-7xl mx-auto px-4 md:px-6">
//         <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-8">
//       <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
//         Our Facilities
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {facilities.map((facility) => (
//           <FacilityCard
//             key={facility._id}
//             name={facility.name}
//             image={facility.image}
//             description={facility.description}
//           />
//         ))}
//       </div>
//     </div>
//       </section>
    
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import heroImg from '../assets/blurimg.jpeg';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Custom Arrow Component
const CustomArrow = ({ onClick, direction }) => (
  <button
    className={`absolute top-1/2 z-20 transform -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/20 hover:bg-white/40 transition duration-300 ${
      direction === 'left' ? 'left-3 md:left-6' : 'right-3 md:right-6'
    }`}
    onClick={onClick}
    aria-label={direction}
  >
    {direction === 'left' ? (
      <ChevronLeft className="text-white" />
    ) : (
      <ChevronRight className="text-white" />
    )}
  </button>
);

// Facility Slide
const FacilitySlide = ({ name, image, description }) => (
  <div className="relative w-full h-[70vh] sm:h-[80vh] md:h-[85vh] px-4">
    <div
      className="w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-center bg-cover transition-transform duration-500 hover:scale-[1.01]"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(http://localhost:5000${image})`,
      }}
    >
      <div className="flex flex-col items-center justify-center h-full text-center text-white px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 uppercase tracking-wide drop-shadow-lg">
          {name}
        </h2>
        <p className="text-sm md:text-base max-w-3xl text-gray-200 drop-shadow">
          {description}
        </p>
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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    fade: true,
    pauseOnHover: true,
    appendDots: dots => (
      <div className="mt-4">
        <ul className="flex justify-center gap-2">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 bg-indigo-400 rounded-full hover:scale-110 transition-all duration-300" />
    ),
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen font-sans">
      {/* Hero Section */}
      <div className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden rounded-3xl shadow-lg mb-16">
        <img
          src={heroImg}
          alt="Ingraham Girls Degree College"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative z-10 text-white text-center px-6">
          <h1 className="text-4xl md:text-5xl font-black mb-4 drop-shadow-xl">
            World-Class Campus Facilities
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto text-gray-200">
            Explore our stunning campus through a visual tour of top-notch infrastructure, crafted to empower and inspire every student.
          </p>
        </div>
      </div>

      {/* Slider Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
          Facility Showcase
        </h2>

        {facilities.length > 0 ? (
          <Slider {...sliderSettings}>
            {facilities.map(facility => (
              <FacilitySlide
                key={facility._id}
                name={facility.name}
                image={facility.image}
                description={facility.description}
              />
            ))}
          </Slider>
        ) : (
          <p className="text-center text-gray-500">Loading facilities...</p>
        )}
      </section>
    </div>
  );
}
