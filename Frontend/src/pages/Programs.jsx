import { useState } from "react";
import {
  GraduationCap,
  BookOpen,
  Clock,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import sample6 from "../assets/slideshow6.jpeg"

const programs = [
  {
    title: "Bachelor of Arts (B.A.)",
    category: "UG",
    duration: "3 Years",
    eligibility: "10+2 (Any Stream)",
    details: "Includes courses in English, History, Education, Hindi, Economics, Political Science, and Sociology. Offers a strong foundation in humanities and social sciences.",
    subjects: ["English", "History", "Education", "Hindi", "Economics", "Political Science", "Sociology", "Commerce (Minor)"]
  },
  {
    title: "Bachelor of Commerce (B.Com.)",
    category: "UG",
    duration: "3 Years",
    eligibility: "10+2 (Commerce/Any Stream)",
    details: "Provides deep knowledge in commerce and business studies with minor subject options.",
    subjects: ["Commerce", "Commerce (Minor)"]
  },
  {
    title: "Bachelor of Science (B.Sc.) - Mathematics",
    category: "Science",
    duration: "3 Years",
    eligibility: "10+2 (Science Stream)",
    details: "Progressive structure from certificate to diploma to degree in Mathematics.",
    subjects: ["Applied Mathematics (Cert)", "Mathematics (Diploma)", "Mathematics (Degree)"]
  },
  {
    title: "Bachelor of Science (B.Sc.) - Zoology",
    category: "Science",
    duration: "3 Years",
    eligibility: "10+2 (Science Stream)",
    details: "Covers life sciences with applications in diagnostics and public health.",
    subjects: ["Medical Diagnostics (Cert)", "Molecular Diagnostics (Diploma)", "Zoology (Degree)"]
  },
  {
    title: "Bachelor of Science (B.Sc.) - Botany",
    category: "Science",
    duration: "3 Years",
    eligibility: "10+2 (Science Stream)",
    details: "Focus on microbiology, ethnomedicine, and applied plant sciences.",
    subjects: ["Microbiology & Botany (Cert)", "Ethnomedicine (Diploma)", "Botany (Degree)"]
  },
  {
    title: "Bachelor of Science (B.Sc.) - Physics & Chemistry",
    category: "Science",
    duration: "3 Years",
    eligibility: "10+2 (Science Stream)",
    details: "Core study in physical sciences including Physics, Chemistry, and Minor Science Subjects.",
    subjects: ["Physics", "Chemistry", "Minor Science Subjects"]
  },
  {
    title: "Skill Development Programs",
    category: "Skill",
    duration: "1–2 Years",
    eligibility: "Open to All",
    details: "Skill-enhancement certificate and diploma courses in tech and business domains.",
    subjects: ["Computer Basics", "Web Designing", "Accounting & GST", "Digital Marketing"]
  }
];

export default function Programs() {
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState("All");

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const filteredPrograms =
    filter === "All" ? programs : programs.filter((p) => p.category === filter);

  return (
    <>
  {/* Hero Image Section */}
  <section
    className="w-full h-screen bg-cover bg-center relative"
    style={{ backgroundImage: `url(${sample6})` }}
  >
    <div className="absolute inset-0 bg-black/40 flex items-end justify-center">
      <div className="text-center m-8 text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">COURSES</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Explore a wide range of undergraduate and skill-based programs built for your success.
        </p>
      </div>
    </div>
  </section>
    <section className="min-h-screen bg-gradient-to-tr from-blue-50 to-white py-20 px-6 md:px-12">
     

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredPrograms.map((prog, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="rounded-xl border-2 border-blue-200 bg-white shadow-md hover:shadow-lg hover:border-blue-400 transition-all duration-300 flex flex-col justify-between"

            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-1">{prog.title}</h3>
                <p className="text-sm text-red-600 mb-2 font-medium">{prog.duration}</p>
                <p className="text-sm text-gray-700 mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  Eligibility: {prog.eligibility}
                </p>
                <AnimatePresence>
                  {expanded === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="bg-blue-50 text-sm text-gray-800 p-4 rounded-md border border-blue-100 space-y-2 mb-4"
                    >
                      <p>{prog.details}</p>
                      <p><strong>Subjects:</strong> {prog.subjects?.join(", ")}</p>
                      <p><strong>Affiliated to:</strong> CCS University, Meerut</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <button
                  onClick={() => toggleExpand(index)}
                  className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                >
                  {expanded === index ? "Show Less" : "Learn More"}
                  {expanded === index ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </section>
    </>
  );
}
