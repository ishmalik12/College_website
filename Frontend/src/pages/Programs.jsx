import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const programs = [
  {
    title: "Engineering",
    desc: "Cutting-edge tech programs with hands-on labs.",
    icon: "💻",
    bg: "from-cyan-500 to-blue-500",
  },
  {
    title: "Sciences",
    desc: "Explore physics, chemistry, and innovation.",
    icon: "🔬",
    bg: "from-purple-500 to-indigo-500",
  },
  {
    title: "Arts & Humanities",
    desc: "Creativity, culture, and communication meet here.",
    icon: "🎨",
    bg: "from-pink-500 to-red-500",
  },
];

export default function Programs() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <section className="bg-gray-50 py-16 px-4 md:px-12 min-h-screen">
      <h2 className="text-4xl font-extrabold text-center text-primary mb-12">Our Programs</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {programs.map((prog, i) => (
          <div
            key={i}
            data-aos="fade-up"
            className={`p-6 rounded-xl shadow-lg transform transition hover:-translate-y-2 hover:scale-105 bg-gradient-to-br ${prog.bg} text-white`}
          >
            <div className="text-5xl mb-4">{prog.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{prog.title}</h3>
            <p className="text-md">{prog.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
