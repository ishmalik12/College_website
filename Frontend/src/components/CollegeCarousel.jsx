import { useEffect, useState } from "react";

const slides = [
  {
    image: "https://source.unsplash.com/1600x900/?college,campus",
   
  },
  {
    image: "https://source.unsplash.com/1600x900/?university,lecture",
    title: "Modern Infrastructure",
    subtitle: "Smart classrooms and modern labs",
  },
  {
    image: "https://source.unsplash.com/1600x900/?students,graduation",
    title: "Join the Future",
    subtitle: "Empowering the leaders of tomorrow",
  },
];

export default function CollegeCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen  relative overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full  transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            
          </div>
        </div>
      ))}
    </div>
  );
}
