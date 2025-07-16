// import { useState } from "react";
// import {
//   GraduationCap,
//   BookOpen,
//   Clock,
//   ChevronDown,
//   ChevronUp
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import sample6 from "../assets/slideshow6.jpeg"

// const programs = [
//   {
//     title: "Bachelor of Arts (B.A.)",
//     category: "UG",
//     duration: "3 Years",
//     eligibility: "10+2 (Any Stream)",
//     details: "Includes courses in English, History, Education, Hindi, Economics, Political Science, and Sociology. Offers a strong foundation in humanities and social sciences.",
//     subjects: ["English", "History", "Education", "Hindi", "Economics", "Political Science", "Sociology", "Commerce (Minor)"]
//   },
//   {
//     title: "Bachelor of Commerce (B.Com.)",
//     category: "UG",
//     duration: "3 Years",
//     eligibility: "10+2 (Commerce/Any Stream)",
//     details: "Provides deep knowledge in commerce and business studies with minor subject options.",
//     subjects: ["Commerce", "Commerce (Minor)"]
//   },
//   {
//     title: "Bachelor of Science (B.Sc.) - Mathematics",
//     category: "Science",
//     duration: "3 Years",
//     eligibility: "10+2 (Science Stream)",
//     details: "Progressive structure from certificate to diploma to degree in Mathematics.",
//     subjects: ["Applied Mathematics (Cert)", "Mathematics (Diploma)", "Mathematics (Degree)"]
//   },
//   {
//     title: "Bachelor of Science (B.Sc.) - Zoology",
//     category: "Science",
//     duration: "3 Years",
//     eligibility: "10+2 (Science Stream)",
//     details: "Covers life sciences with applications in diagnostics and public health.",
//     subjects: ["Medical Diagnostics (Cert)", "Molecular Diagnostics (Diploma)", "Zoology (Degree)"]
//   },
//   {
//     title: "Bachelor of Science (B.Sc.) - Botany",
//     category: "Science",
//     duration: "3 Years",
//     eligibility: "10+2 (Science Stream)",
//     details: "Focus on microbiology, ethnomedicine, and applied plant sciences.",
//     subjects: ["Microbiology & Botany (Cert)", "Ethnomedicine (Diploma)", "Botany (Degree)"]
//   },
//   {
//     title: "Bachelor of Science (B.Sc.) - Physics & Chemistry",
//     category: "Science",
//     duration: "3 Years",
//     eligibility: "10+2 (Science Stream)",
//     details: "Core study in physical sciences including Physics, Chemistry, and Minor Science Subjects.",
//     subjects: ["Physics", "Chemistry", "Minor Science Subjects"]
//   },
//   {
//     title: "Skill Development Programs",
//     category: "Skill",
//     duration: "1–2 Years",
//     eligibility: "Open to All",
//     details: "Skill-enhancement certificate and diploma courses in tech and business domains.",
//     subjects: ["Computer Basics", "Web Designing", "Accounting & GST", "Digital Marketing"]
//   }
// ];

// export default function Programs() {
//   const [expanded, setExpanded] = useState(null);
//   const [filter, setFilter] = useState("All");

//   const toggleExpand = (index) => {
//     setExpanded(expanded === index ? null : index);
//   };

//   const filteredPrograms =
//     filter === "All" ? programs : programs.filter((p) => p.category === filter);

//   return (
//     <>
//   {/* Hero Image Section */}
//   <section
//     className="w-full h-screen bg-cover bg-center relative"  
//     style={{ backgroundImage: `url(${sample6})` }}
//   >
//     <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
//       <div className="text-center m-8 text-white px-4">
//         <h1 className="text-4xl md:text-6xl font-bold mb-4">COURSES</h1>
//         <p className="text-lg md:text-xl max-w-2xl mx-auto">
//           Explore a wide range of undergraduate and skill-based programs built for your success.
//         </p>
//       </div>
//     </div>
//   </section>
//     <section className="min-h-screen bg-gradient-to-tr from-blue-50 to-white py-20 px-6 md:px-12">
     

//       <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
//         <AnimatePresence>
//           {filteredPrograms.map((prog, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -30 }}
//               transition={{ duration: 0.4 }}
//               className="rounded-xl border-2 border-blue-200 bg-white shadow-md hover:shadow-lg hover:border-blue-400 transition-all duration-300 flex flex-col justify-between"

//             >
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold text-blue-800 mb-1">{prog.title}</h3>
//                 <p className="text-sm text-red-600 mb-2 font-medium">{prog.duration}</p>
//                 <p className="text-sm text-gray-700 mb-4 flex items-center gap-2">
//                   <BookOpen className="w-4 h-4 text-blue-500" />
//                   Eligibility: {prog.eligibility}
//                 </p>
//                 <AnimatePresence>
//                   {expanded === index && (
//                     <motion.div
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       exit={{ opacity: 0, height: 0 }}
//                       transition={{ duration: 0.4 }}
//                       className="bg-blue-50 text-sm text-gray-800 p-4 rounded-md border border-blue-100 space-y-2 mb-4"
//                     >
//                       <p>{prog.details}</p>
//                       <p><strong>Subjects:</strong> {prog.subjects?.join(", ")}</p>
//                       <p><strong>Affiliated to:</strong> CCS University, Meerut</p>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//                 <button
//                   onClick={() => toggleExpand(index)}
//                   className="text-sm text-blue-600 hover:underline flex items-center gap-1"
//                 >
//                   {expanded === index ? "Show Less" : "Learn More"}
//                   {expanded === index ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>

//     </section>
//     </>
//   );
// }






// import { useState } from "react";
// import {
//   GraduationCap,
//   BookOpen,
//   Clock,
//   ChevronDown,
//   ChevronUp,
//   Users,
//   Award,
//   Calendar,
//   Filter,
//   Search,
//   Star,
//   TrendingUp
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import sample6 from "../assets/slideshow6.jpeg";

// const programs = [
//   {
//     title: "Bachelor of Arts (B.A.)",
//     category: "UG",
//     duration: "3 Years",
//     eligibility: "10+2 (Any Stream)",
//     details: "Includes courses in English, History, Education, Hindi, Economics, Political Science, and Sociology. Offers a strong foundation in humanities and social sciences.",
//     subjects: ["English", "History", "Education", "Hindi", "Economics", "Political Science", "Sociology", "Commerce (Minor)"],
//     popularity: 85,
//     studentsEnrolled: 1250,
//     rating: 4.3,
//     color: "from-purple-500 to-pink-500"
//   },
//   {
//     title: "Bachelor of Commerce (B.Com.)",
//     category: "UG",
//     duration: "3 Years",
//     eligibility: "10+2 (Commerce/Any Stream)",
//     details: "Provides deep knowledge in commerce and business studies with minor subject options.",
//     subjects: ["Commerce", "Commerce (Minor)"],
//     popularity: 92,
//     studentsEnrolled: 1850,
//     rating: 4.5,
//     color: "from-green-500 to-emerald-500"
//   },
//   {
//     title: "Bachelor of Science (B.Sc.)",
//     category: "UG",
//     duration: "3 Years",
//     eligibility: "10+2 (Science Stream)",
//     details: "Comprehensive science program offering multiple specializations including Mathematics, Life Sciences, and Physical Sciences. Features progressive structure from certificate to diploma to degree level with practical applications in various fields.",
//     subjects: [
//       "Mathematics Specialization: Applied Mathematics (Cert), Mathematics (Diploma), Mathematics (Degree)",
//       "Zoology Specialization: Medical Diagnostics (Cert), Molecular Diagnostics (Diploma), Zoology (Degree)",
//       "Botany Specialization: Microbiology & Botany (Cert), Ethnomedicine (Diploma), Botany (Degree)",
//       "Physics & Chemistry Specialization: Physics, Chemistry, Minor Science Subjects"
//     ],
//     specializations: [
//       {
//         name: "PCM (Physics,Chemistry,Mathematics)",
//         description: "Progressive structure from certificate to diploma to degree in Physics,Chemistry and Mathematics",
//         subjects: ["Applied Mathematics (Cert)", "Mathematics (Diploma)", "Mathematics (Degree)","Physics", "Chemistry", "Minor Science Subjects"]
//       },
//       {
//         name: "Zoology, Botany, Chemistry",
//         description: "Life sciences with applications in diagnostics and public health, Focus on microbiology, ethnomedicine, and applied plant sciences",
//         subjects: ["Medical Diagnostics (Cert)", "Molecular Diagnostics (Diploma)", "Zoology (Degree)", "Microbiology & Botany (Cert)", "Ethnomedicine (Diploma)", "Botany (Degree)", "Chemistry"]
//       },
//       // {
//       //   name: "Botany",
//       //   description: "Focus on microbiology, ethnomedicine, and applied plant sciences",
//       //   subjects: ["Microbiology & Botany (Cert)", "Ethnomedicine (Diploma)", "Botany (Degree)"]
//       // },
//       // {
//       //   name: "Physics & Chemistry",
//       //   description: "Core study in physical sciences",
//       //   subjects: ["Physics", "Chemistry", "Minor Science Subjects"]
//       // }
//     ],
//     popularity: 78,
//     studentsEnrolled: 2840,
//     rating: 4.2,
//     color: "from-indigo-500 to-purple-500"
//   },
//   {
//     title: "Skill Development Programs",
//     category: "Skill",
//     duration: "1–2 Years",
//     eligibility: "Open to All",
//     details: "Skill-enhancement certificate and diploma courses in tech and business domains.",
//     subjects: ["Computer Basics", "Web Designing", "Accounting & GST", "Digital Marketing"],
//     popularity: 95,
//     studentsEnrolled: 2100,
//     rating: 4.7,
//     color: "from-orange-500 to-red-500"
//   }
// ];

// export default function Programs() {
//   const [expanded, setExpanded] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   const toggleExpand = (index) => {
//     setExpanded(expanded === index ? null : index);
//   };

//   const filteredPrograms = programs.filter(program => {
//     const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          program.subjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase()));
//     return matchesSearch;
//   });

//   return (
//     <>
//       {/* Hero Image Section */}
//       <section
//         className="w-full h-screen bg-cover bg-center relative"  
//         style={{ backgroundImage: `url(${sample6})` }}
//       >
//         <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
//           <div className="text-center m-8 text-white px-4">
//             <h1 className="text-4xl md:text-6xl font-bold mb-4">COURSES</h1>
//             <p className="text-lg md:text-xl max-w-2xl mx-auto">
//               Explore a wide range of undergraduate and skill-based programs built for your success.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Programs Section */}
//       <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-white">
//         <div className="max-w-7xl mx-auto">
//           {/* Section Header */}
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               Our Programs
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Choose from our comprehensive range of undergraduate and skill-based programs
//             </p>
//           </div>

//           {/* Search and Filter */}
//           <div className="mb-12 space-y-6">
//             <div className="relative max-w-md mx-auto">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search programs..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300"
//               />
//             </div>
//           </div>

//           {/* Programs Grid */}
//           <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//             <AnimatePresence mode="popLayout">
//               {filteredPrograms.map((program, index) => (
//                 <motion.div
//                   key={program.title}
//                   layout
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.4 }}
//                   className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
//                 >
//                   {/* Gradient Header */}
//                   <div className={`h-2 bg-gradient-to-r ${program.color}`}></div>
                  
//                   {/* Popularity Badge */}
//                   <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
//                     <TrendingUp className="w-3 h-3" />
//                     {program.popularity}%
//                   </div>

//                   <div className="p-6">
//                     <div className="flex items-start justify-between mb-4">
//                       <div className="flex-1">
//                         <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
//                           {program.title}
//                         </h3>
//                         <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
//                           <div className="flex items-center gap-1">
//                             <Clock className="w-4 h-4 text-blue-500" />
//                             {program.duration}
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <Users className="w-4 h-4 text-green-500" />
//                             {program.studentsEnrolled.toLocaleString()}
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-2 mb-4">
//                       <div className="flex items-center gap-1">
//                         {[...Array(5)].map((_, i) => (
//                           <Star
//                             key={i}
//                             className={`w-4 h-4 ${
//                               i < Math.floor(program.rating)
//                                 ? 'fill-yellow-400 text-yellow-400'
//                                 : 'text-gray-300'
//                             }`}
//                           />
//                         ))}
//                       </div>
//                       <span className="text-sm text-gray-600">({program.rating})</span>
//                     </div>

//                     <div className="flex items-center gap-2 mb-4 text-sm text-gray-700">
//                       <BookOpen className="w-4 h-4 text-blue-500" />
//                       <span className="font-medium">Eligibility:</span>
//                       <span>{program.eligibility}</span>
//                     </div>

//                     <AnimatePresence>
//                       {expanded === index && (
//                         <motion.div
//                           initial={{ opacity: 0, height: 0 }}
//                           animate={{ opacity: 1, height: "auto" }}
//                           exit={{ opacity: 0, height: 0 }}
//                           transition={{ duration: 0.3 }}
//                           className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-4 border border-blue-100"
//                         >
//                           <p className="text-gray-700 mb-3 leading-relaxed">{program.details}</p>
                          
//                           {program.specializations && (
//                             <div className="mb-4">
//                               <h4 className="font-semibold text-gray-900 mb-3">Available Specializations:</h4>
//                               <div className="space-y-3">
//                                 {program.specializations.map((spec, i) => (
//                                   <div key={i} className="bg-white rounded-lg p-3 border border-gray-200">
//                                     <h5 className="font-medium text-gray-900 mb-1">{spec.name}</h5>
//                                     <p className="text-sm text-gray-600 mb-2">{spec.description}</p>
//                                     <div className="flex flex-wrap gap-1">
//                                       {spec.subjects.map((subject, j) => (
//                                         <span
//                                           key={j}
//                                           className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
//                                         >
//                                           {subject}
//                                         </span>
//                                       ))}
//                                     </div>
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           )}
                          
//                           <div className="mb-3">
//                             <h4 className="font-semibold text-gray-900 mb-2">Subjects Covered:</h4>
//                             <div className="flex flex-wrap gap-2">
//                               {program.subjects.map((subject, i) => (
//                                 <span
//                                   key={i}
//                                   className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm border border-gray-200"
//                                 >
//                                   {subject}
//                                 </span>
//                               ))}
//                             </div>
//                           </div>
//                           <div className="bg-blue-100 rounded-lg p-3">
//                             <p className="text-sm text-blue-800 flex items-center gap-1">
//                               <Award className="w-4 h-4" />
//                               <strong>Affiliated to:</strong> CCS University, Meerut
//                             </p>
//                           </div>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>

//                     <div className="flex items-center justify-between">
//                       <button
//                         onClick={() => toggleExpand(index)}
//                         className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium transition-colors"
//                       >
//                         {expanded === index ? "Show Less" : "Learn More"}
//                         {expanded === index ? 
//                           <ChevronUp className="w-4 h-4" /> : 
//                           <ChevronDown className="w-4 h-4" />
//                         }
//                       </button>
                      
//                       <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md">
//                         Apply Now
//                       </button>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>

//           {filteredPrograms.length === 0 && (
//             <div className="text-center py-12">
//               <div className="text-gray-400 mb-4">
//                 <Search className="w-16 h-16 mx-auto" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-600 mb-2">No programs found</h3>
//               <p className="text-gray-500">Try adjusting your search or filter criteria</p>
//             </div>
//           )}
//         </div>
//       </section>
//     </>
//   );
// }


import { useState } from "react";
import {
  GraduationCap,
  BookOpen,
  Clock,
  ChevronDown,
  ChevronUp,
  Search,
  Award // also required below!
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import sample6 from "../assets/slideshow6.jpeg"

const programs = [
  {
    title: "Bachelor of Arts (B.A.)",
    category: "UG",
    duration: "3 Years",
    eligibility: "10+2 (Any Stream)",
    details:
      "Includes courses in English, History, Education, Hindi, Economics, Political Science, and Sociology. Offers a strong foundation in humanities and social sciences.",
    subjects: [
      "English",
      "History",
      "Education",
      "Hindi",
      "Economics",
      "Political Science",
      "Sociology",
      "Commerce (Minor)",
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Bachelor of Commerce (B.Com.)",
    category: "UG",
    duration: "3 Years",
    eligibility: "10+2 (Commerce/Any Stream)",
    details:
      "Provides deep knowledge in commerce and business studies with minor subject options.",
    subjects: ["Commerce", "Commerce (Minor)"],
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Bachelor of Science (B.Sc.)",
    category: "UG",
    duration: "3 Years",
    eligibility: "10+2 (Science Stream)",
    details:
      "Comprehensive science program offering multiple specializations including Mathematics, Life Sciences, and Physical Sciences. Features progressive structure from certificate to diploma to degree level with practical applications in various fields.",
    subjects: [
      "Mathematics Specialization: Applied Mathematics (Cert), Mathematics (Diploma), Mathematics (Degree)",
      "Zoology Specialization: Medical Diagnostics (Cert), Molecular Diagnostics (Diploma), Zoology (Degree)",
      "Botany Specialization: Microbiology & Botany (Cert), Ethnomedicine (Diploma), Botany (Degree)",
      "Physics & Chemistry Specialization: Physics, Chemistry, Minor Science Subjects",
    ],
    color: "from-blue-500 to-indigo-500",
    specializations: [
      {
        name: "PCM (Physics, Chemistry, Mathematics)",
        description:
          "Progressive structure from certificate to diploma to degree in core physical sciences.",
        subjects: [
          "Applied Mathematics (Cert)",
          "Mathematics (Diploma)",
          "Mathematics (Degree)",
          "Physics",
          "Chemistry",
          "Minor Science Subjects",
        ],
      },
      {
        name: "Zoology, Botany, Chemistry",
        description:
          "Life sciences with applications in diagnostics and public health. Focus on microbiology, ethnomedicine, and applied plant sciences.",
        subjects: [
          "Medical Diagnostics (Cert)",
          "Molecular Diagnostics (Diploma)",
          "Zoology (Degree)",
          "Microbiology & Botany (Cert)",
          "Ethnomedicine (Diploma)",
          "Botany (Degree)",
          "Chemistry",
        ],
      },
      // {
      //   name: "Botany",
      //   description:
      //     "In-depth study of plants including microbiology and ethnomedicine.",
      //   subjects: [
      //     "Microbiology & Botany (Cert)",
      //     "Ethnomedicine (Diploma)",
      //     "Botany (Degree)",
      //   ],
      // },
      // {
      //   name: "Physics & Chemistry",
      //   description: "Core study in physical sciences.",
      //   subjects: ["Physics", "Chemistry", "Minor Science Subjects"],
      // },
    ],
  },
  {
    title: "Skill Development Programs",
    category: "Skill",
    duration: "1–2 Years",
    eligibility: "Open to All",
    details:
      "Skill-enhancement certificate and diploma courses in tech and business domains.",
    subjects: [
      "Computer Basics", "Web Designing", "Accounting & GST", "Digital Marketing"
    ],
    color: "from-orange-500 to-red-500",
  },
];


export default function Programs() {
  const [expanded, setExpanded] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.subjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  return (
    <>
      {/* Hero Image Section */}
      <section
        className="w-full h-screen bg-cover bg-center relative"  
        style={{ backgroundImage: `url(${sample6})` }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center m-8 text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">COURSES</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Explore a wide range of undergraduate and skill-based programs built for your success.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive range of undergraduate and skill-based programs
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-12 space-y-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300"
              />
            </div>
          </div>

          {/* Programs Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredPrograms.map((program, index) => (
                <motion.div
                  key={program.title}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
                >
                  {/* Gradient Header */}
                  <div className={`h-2 bg-gradient-to-r ${program.color}`}></div>
                  

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {program.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-blue-500" />
                            {program.duration}
                          </div>
                        </div>
                      </div>
                    </div>


                    <div className="flex items-center gap-2 mb-4 text-sm text-gray-700">
                      <BookOpen className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">Eligibility:</span>
                      <span>{program.eligibility}</span>
                    </div>

                    <AnimatePresence>
                      {expanded === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-4 border border-blue-100"
                        >
                          <p className="text-gray-700 mb-3 leading-relaxed">{program.details}</p>
                          
                          {program.specializations && (
                            <div className="mb-4">
                              <h4 className="font-semibold text-gray-900 mb-3">Available Specializations:</h4>
                              <div className="space-y-3">
                                {program.specializations.map((spec, i) => (
                                  <div key={i} className="bg-white rounded-lg p-3 border border-gray-200">
                                    <h5 className="font-medium text-gray-900 mb-1">{spec.name}</h5>
                                    <p className="text-sm text-gray-600 mb-2">{spec.description}</p>
                                    <div className="flex flex-wrap gap-1">
                                      {spec.subjects.map((subject, j) => (
                                        <span
                                          key={j}
                                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                                        >
                                          {subject}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <div className="mb-3">
                            <h4 className="font-semibold text-gray-900 mb-2">Subjects Covered:</h4>
                            <div className="flex flex-wrap gap-2">
                              {program.subjects.map((subject, i) => (
                                <span
                                  key={i}
                                  className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm border border-gray-200"
                                >
                                  {subject}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="bg-blue-100 rounded-lg p-3">
                            <p className="text-sm text-blue-800 flex items-center gap-1">
                              <Award className="w-4 h-4" />
                              <strong>Affiliated to:</strong> CCS University, Meerut
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => toggleExpand(index)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                      >
                        {expanded === index ? "Show Less" : "Learn More"}
                        {expanded === index ? 
                          <ChevronUp className="w-4 h-4" /> : 
                          <ChevronDown className="w-4 h-4" />
                        }
                      </button>
                      
                      <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredPrograms.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No programs found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}