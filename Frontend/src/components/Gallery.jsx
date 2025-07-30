import React, { useState, useRef, useEffect } from "react";
import { Camera, X, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import axios from 'axios';
import heroImg from '../assets/blurimg.jpeg';
// --- IMAGE IMPORTS ---
// import angawadi1 from "../assets/Angawadi-01.png";
// import angawadi2 from "../assets/Angawadi-02.jpg";
// import angawadi3 from "../assets/Angawadi-03.jpg";
// import fssai1 from "../assets/FSSAI-01.jpg";
// import fssai2 from "../assets/FSSAI-02.jpg";
// import fssai3 from "../assets/FSSAI-03.jpg";
// import shark1 from "../assets/SharkTank-01.png";
// import shark2 from "../assets/SharkTank-02.png";
// import shark3 from "../assets/SharkTank-03.png";
// import shark4 from "../assets/SharkTank-04.png";
// import shark5 from "../assets/SharkTank-05.png";
// import women1 from "../assets/womensday-01.png";
// import women2 from "../assets/womensday-02.png";
// import women3 from "../assets/womensday-03.png";
// import women4 from "../assets/womensday-04.png";
// import women5 from "../assets/womensday-05.png";
// import women6 from "../assets/womensday-06.png";
// import christmas1 from "../assets/Christmas01.png";
// import christmas2 from "../assets/Christmas02.png";
// import christmas3 from "../assets/Christmas03.png";
// import freshers1 from "../assets/Freshers01.png";
// import freshers2 from "../assets/Freshers02.png";
// import freshers3 from "../assets/Freshers03.png";
// import hindi1 from "../assets/HindiDiwas01.png";
// import hindi2 from "../assets/HindiDiwas02.png";
// import independence1 from "../assets/IndependenceDay01.png";
// import independence2 from "../assets/IndependenceDay02.png";
// import poshan1 from "../assets/poshanMela01.png";
// import poshan2 from "../assets/poshanMela02.png";
// import poshan3 from "../assets/poshanMela03.png";
// import poshan4 from "../assets/poshanMela04.png";
// import poshan5 from "../assets/poshanMela05.png";
// import poshan6 from "../assets/poshanMela06.png";
// import poshan7 from "../assets/poshanMela07.png";
// import sadak1 from "../assets/SadakSuraksha01.png";
// import sadak2 from "../assets/SadakSuraksha02.png";
// import teachers1 from "../assets/TeachersDay01.png";
// import yoga1 from "../assets/YogaDay01.png";
// import yoga2 from "../assets/YogaDay02.png";

// const imageData = [
//   { src: angawadi1, title: "Angawadi", category: "Angawadi" },
//   { src: angawadi2, title: "Angawadi", category: "Angawadi" },
//   { src: angawadi3, title: "Angawadi", category: "Angawadi" },
//   { src: fssai1, title: "FSSAI", category: "FSSAI" },
//   { src: fssai2, title: "FSSAI", category: "FSSAI" },
//   { src: fssai3, title: "FSSAI", category: "FSSAI" },
//   { src: shark1, title: "Shark Tank", category: "Shark Tank" },
//   { src: shark2, title: "Shark Tank", category: "Shark Tank" },
//   { src: shark3, title: "Shark Tank", category: "Shark Tank" },
//   { src: shark4, title: "Shark Tank", category: "Shark Tank" },
//   { src: shark5, title: "Shark Tank", category: "Shark Tank" },
//   { src: women1, title: "Womens Day", category: "Womens Day" },
//   { src: women2, title: "Womens Day", category: "Womens Day" },
//   { src: women3, title: "Womens Day", category: "Womens Day" },
//   { src: women4, title: "Womens Day", category: "Womens Day" },
//   { src: women5, title: "Womens Day", category: "Womens Day" },
//   { src: women6, title: "Womens Day", category: "Womens Day" },
//   { src: christmas1, title: "Christmas Day", category: "Christmas Day" },
//   { src: christmas2, title: "Christmas Day", category: "Christmas Day" },
//   { src: christmas3, title: "Christmas Day", category: "Christmas Day" },
//   { src: freshers1, title: "Freshers Celebration", category: "Freshers Celebration" },
//   { src: freshers2, title: "Freshers Celebration", category: "Freshers Celebration" },
//   { src: freshers3, title: "Freshers Celebration", category: "Freshers Celebration" },
//   { src: hindi1, title: "Hindi Diwas", category: "Hindi Diwas" },
//   { src: hindi2, title: "Hindi Diwas", category: "Hindi Diwas" },
//   { src: independence1, title: "Independence Day", category: "Independence Day" },
//   { src: independence2, title: "Independence Day", category: "Independence Day" },
//   { src: poshan1, title: "Poshan Mela", category: "Poshan Mela" },
//   { src: poshan2, title: "Poshan Mela", category: "Poshan Mela" },
//   { src: poshan3, title: "Poshan Mela", category: "Poshan Mela" },
//   { src: poshan4, title: "Poshan Mela", category: "Poshan Mela" },
//   { src: poshan5, title: "Poshan Mela", category: "Poshan Mela" },
//   { src: poshan6, title: "Poshan Mela", category: "Poshan Mela" },
//   { src: poshan7, title: "Poshan Mela", category: "Poshan Mela" },
//   { src: sadak1, title: "Sadak Suraksha", category: "Sadak Suraksha" },
//   { src: sadak2, title: "Sadak Suraksha", category: "Sadak Suraksha" },
//   { src: teachers1, title: "Teachers Day", category: "Teachers Day" },
//   { src: yoga1, title: "Yoga Day", category: "Yoga Day" },
//   { src: yoga2, title: "Yoga Day", category: "Yoga Day" },
// ];

const accentColors = [
  "bg-blue-500",
  "bg-yellow-400",
  "bg-green-500",
  "bg-red-500",
  "bg-pink-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-cyan-500",
  "bg-lime-500",
];

// const categoryList = ["All", ...Array.from(new Set(imageData.map((img) => img.category)))];

export default function LumiaGalleryDropdown() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [imageData, setImageData] = useState([]);

useEffect(() => {
  axios.get("http://localhost:5000/api/gallery").then((res) => {
    setImageData(res.data);
  });
}, []);

const categoryList = ["All", ...Array.from(new Set(imageData.map((img) => img.category)))];
const filteredImages = selectedCategory === "All"
  ? imageData
  : imageData.filter((img) => img.category === selectedCategory);

  
  // Close dropdown on outside click
  useEffect(() => {
    function handler(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handler);
    }
    return () => document.removeEventListener("mousedown", handler);
  }, [dropdownOpen]);

  // Modal keyboard nav
  useEffect(() => {
    if (!modalOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") setModalOpen(false);
      if (filteredImages.length > 1) {
        if (e.key === "ArrowRight") setCurrentIdx((idx) => (idx + 1) % filteredImages.length);
        if (e.key === "ArrowLeft") setCurrentIdx((idx) => (idx - 1 + filteredImages.length) % filteredImages.length);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [modalOpen, filteredImages.length]);

  return (
    <div className="min-h-screen bg-[#FBF5DF] font-sans" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      {/* Hero Section */}
      
<section
  className="relative text-white py-24 overflow-hidden"
  style={{
    backgroundImage: `url(${heroImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
  <div className="relative max-w-7xl mx-auto px-6 text-center">
    <div className="mb-8 flex justify-center">
      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-white/20">
        <Camera className="w-12 h-12 text-white" />
      </div>
    </div>
    <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
      Campus Gallery
    </h1>
  </div>
</section>

      {/* Dropdown Button */}
      <div className="max-w-xl mx-auto mt-8 mb-8 flex justify-center">
        <div className="relative inline-block w-full" ref={dropdownRef}>
          <button
            className="w-full flex justify-between bg-white/90 px-4 py-2 rounded shadow-md text-lg text-gray-800 font-semibold focus:outline-none hover:bg-white"
            onClick={() => setDropdownOpen((open) => !open)}
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
          >
            {selectedCategory}
            <ChevronDown className="inline-block ml-3 w-5 h-5 text-gray-700" />
          </button>
          {dropdownOpen && (
            <ul className="absolute z-10 left-0 w-full mt-1 bg-white rounded-lg shadow-xl py-1 max-h-60 overflow-auto border border-gray-200"
                tabIndex={-1}
                role="listbox"
            >
              {categoryList.map((cat) => (
                <li
                  key={cat}
                  tabIndex={0}
                  role="option"
                  aria-selected={selectedCategory === cat}
                  className={`px-4 py-2 hover:bg-blue-100 cursor-pointer text-gray-900 font-medium ${selectedCategory === cat ? "bg-blue-200" : ""}`}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setDropdownOpen(false);
                  }}
                >
                  {cat}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Lumia Grid */}
      <div className="max-w-9xl  px-4 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 auto-rows-[120px] sm:auto-rows-[160px] md:auto-rows-[180px]">
          {filteredImages.map(({ imageUrl, title, category }, idx) => (
            <button
              key={category + idx}
              onClick={() => { setModalOpen(true); setCurrentIdx(idx); }}
              className={`${accentColors[idx % accentColors.length]} ${
                idx % 7 === 0 ? 'col-span-2 row-span-2' : idx % 5 === 0 ? 'col-span-2' : ''
              } overflow-hidden relative group cursor-pointer rounded-md shadow-lg 
                transition-transform duration-300 hover:scale-110`}
            >
              <img
                src={`http://localhost:5000${imageUrl}`}
                alt={category}
                className="w-full h-full object-cover pointer-events-none select-none"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 p-2 text-white font-semibold select-none">
                {category}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && currentIdx !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 select-none"
          onClick={() => setModalOpen(false)}
        >
          <button
            onClick={() => setModalOpen(false)}
            className="absolute top-4 right-4 text-white"
          >
            <X size={32} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIdx((idx) => (idx - 1 + filteredImages.length) % filteredImages.length);
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"
          >
            <ChevronLeft size={32} />
          </button>

          <img
            src={filteredImages[currentIdx].image}
            alt={filteredImages[currentIdx].category}
            className="max-w-3xl w-[90vw] max-h-[80vh] object-contain rounded-xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIdx((idx) => (idx + 1) % filteredImages.length);
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </div>
  );
}
