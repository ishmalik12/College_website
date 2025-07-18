import React, { useState, useEffect, useRef } from "react";
import {
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Import your images here
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
import christmas1 from "../assets/Christmas01.png";
import christmas2 from "../assets/Christmas02.png";
import christmas3 from "../assets/Christmas03.png";
import freshers1 from "../assets/Freshers01.png";
import freshers2 from "../assets/Freshers02.png";
import freshers3 from "../assets/freshers03.png";
import hindi1 from "../assets/HindiDiwas01.png";
import hindi2 from "../assets/HindiDiwas02.png";
import independence1 from "../assets/IndependenceDay01.png";
import independence2 from "../assets/IndependenceDay02.png";
import poshan1 from "../assets/poshanMela01.png";
import poshan2 from "../assets/poshanMela02.png";
import poshan3 from "../assets/poshanMela03.png";
import poshan4 from "../assets/poshanMela04.png";
import poshan5 from "../assets/poshanMela05.png";
import poshan6 from "../assets/poshanMela06.png";
import poshan7 from "../assets/poshanMela07.png";
import sadak1 from "../assets/SadakSuraksha01.png";
import sadak2 from "../assets/SadakSuraksha02.png";
import teachers1 from "../assets/TeachersDay01.png";
import yoga1 from "../assets/YogaDay01.png";
import yoga2 from "../assets/YogaDay02.png";

// Accent colors
const accentColors = [
  "bg-blue-600",
  "bg-green-600",
  "bg-orange-500",
  "bg-red-600",
  "bg-violet-600",
  "bg-amber-500",
  "bg-cyan-700",
  "bg-pink-600",
  "bg-teal-700",
];

const tileSizes = [
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-2",
];

// Titles for each image — replace or adapt these as needed
const imageData = [
  { src: angawadi1, title: "Anganwadi Visit" },
  { src: angawadi2, title: "Anganwadi - Child Interaction" },
  { src: angawadi3, title: "Anganwadi - Activities" },
  { src: fssai1, title: "FSSAI Food Safety" },
  { src: fssai2, title: "FSSAI Workshop" },
  { src: fssai3, title: "FSSAI Engagement" },
  { src: shark1, title: "Shark Tank Pitch" },
  { src: shark2, title: "Shark Tank Experts" },
  { src: shark3, title: "Shark Tank Winners" },
  { src: shark4, title: "Team Collaboration" },
  { src: shark5, title: "Grand Finale" },
  { src: women1, title: "Women's Day Keynote" },
  { src: women2, title: "Women's Day Unity" },
  { src: women3, title: "Cultural Showcase" },
  { src: women4, title: "Inspiring Stories" },
  { src: women5, title: "Recognition Awards" },
  { src: women6, title: "Celebration Finale" },
  { src: christmas1, title: "Christmas Decorations" },
  { src: christmas2, title: "Carol Singing" },
  { src: christmas3, title: "Gift Exchange" },
  { src: freshers1, title: "Freshers Welcome" },
  { src: freshers2, title: "Cultural Program" },
  { src: freshers3, title: "Group Activities" },
  { src: hindi1, title: "Hindi Poetry" },
  { src: hindi2, title: "Hindi Literature" },
  { src: independence1, title: "Flag Hoisting" },
  { src: independence2, title: "Patriotic Program" },
  { src: poshan1, title: "Nutrition Awareness" },
  { src: poshan2, title: "Food Exhibition" },
  { src: poshan3, title: "Cooking Demo" },
  { src: poshan4, title: "Health Checkup" },
  { src: poshan5, title: "Interactive Session" },
  { src: poshan6, title: "Community Participation" },
  { src: poshan7, title: "Award Ceremony" },
  { src: sadak1, title: "Road Safety Awareness" },
  { src: sadak2, title: "Safety Demonstration" },
  { src: teachers1, title: "Teachers Appreciation" },
  { src: yoga1, title: "Morning Yoga" },
  { src: yoga2, title: "Meditation Workshop" },
];

function getRandomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const LumiaGallery = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!modalOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") setModalOpen(false);
      if (e.key === "ArrowRight")
        setCurrentIdx((idx) => (idx + 1) % imageData.length);
      if (e.key === "ArrowLeft")
        setCurrentIdx((idx) => (idx - 1 + imageData.length) % imageData.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [modalOpen]);

  useEffect(() => {
    if (modalOpen && dialogRef.current) dialogRef.current.focus();
  }, [modalOpen]);

  // Consistent tile meta
  const tileMeta = React.useMemo(
    () =>
      imageData.map((img, i) => ({
        color: accentColors[i % accentColors.length],
        size: tileSizes[i % tileSizes.length],
      })),
    []
  );

  return (
    <div
      className="min-h-screen bg-gray-900 font-sans"
      style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="mb-8 flex justify-center">
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-white/20">
              <Camera className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Campus Gallery
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-12 leading-relaxed">
            Explore campus moments in a vibrant Lumia tile-inspired gallery.
          </p>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div
          className="grid auto-rows-[160px] sm:auto-rows-[220px] md:auto-rows-[240px] gap-4
           grid-cols-2 sm:grid-cols-4 md:grid-cols-6"
        >
          {imageData.map(({ src, title }, idx) => (
            <button
              key={idx}
              type="button"
              tabIndex={0}
              onClick={() => {
                setCurrentIdx(idx);
                setModalOpen(true);
              }}
              className={`overflow-hidden flex flex-col justify-end
                transition-transform duration-200 focus:outline-none group
                ${tileMeta[idx].color} ${tileMeta[idx].size}
                rounded-sm relative hover:scale-105 shadow-lg cursor-pointer`}
              style={{
                margin: "2px",
              }}
              aria-label={`View image: ${title}`}
            >
              <img
                src={src}
                alt={title}
                className="object-cover w-full h-full
                  transition-transform duration-200 group-hover:scale-110 group-focus:scale-110"
                loading="lazy"
                draggable="false"
                style={{
                  aspectRatio: "1/1",
                  display: "block",
                  background: "#222",
                }}
              />
              <div
                className="absolute inset-x-0 bottom-0 p-3"
                style={{ background: "rgba(0,0,0,0.45)" }}
              >
                <span
                  className="text-white font-bold text-lg select-none"
                  style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}
                >
                  {title}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
      {modalOpen && (
        <div
          ref={dialogRef}
          tabIndex={-1}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur"
          onClick={() => setModalOpen(false)}
          aria-modal="true"
          role="dialog"
        >
          <button
            aria-label="Close"
            onClick={() => setModalOpen(false)}
            className="absolute top-8 right-10 text-white text-4xl font-bold focus:outline-none z-50"
            tabIndex={0}
            style={{ lineHeight: 1 }}
          >
            <X size={36} />
          </button>
          <button
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIdx((idx) => (idx - 1 + imageData.length) % imageData.length);
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-300 z-50"
            tabIndex={0}
          >
            <ChevronLeft size={36} />
          </button>
          <img
            src={imageData[currentIdx].src}
            alt={imageData[currentIdx].title}
            className="max-w-4xl w-[92vw] max-h-[80vh] rounded-xl shadow-2xl outline-none transition-transform duration-200 scale-100"
            style={{ background: "#222" }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIdx((idx) => (idx + 1) % imageData.length);
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-300 z-50"
            tabIndex={0}
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </div>
  );
};

export default LumiaGallery;
