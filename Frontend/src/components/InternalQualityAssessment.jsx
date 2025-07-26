// import React, { useState } from "react";
// import { FileText, FileCheck2, ChevronDown, ChevronUp } from "lucide-react";

// const iqacData = {
//   minutes: [
//     {
//       title: "IQAC Meeting - January 2024",
//       link: "#",
//     },
//     {
//       title: "IQAC Meeting - October 2023",
//       link: "#",
//     },
//     {
//       title: "IQAC Meeting - July 2023",
//       link: "#",
//     },
//   ],
//   mouCirculars: [
//     {
//       title: "MoU with XYZ University - 2023",
//       link: "#",
//     },
//     {
//       title: "Circular: Internal Review Process - Feb 2024",
//       link: "#",
//     },
//     {
//       title: "MoU with ABC Institution - 2022",
//       link: "#",
//     },
//   ],
// };

// const Section = ({ title, icon: Icon, items }) => {
//   const [open, setOpen] = useState(true);

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 mb-6">
//       <div
//         className="flex items-center justify-between cursor-pointer"
//         onClick={() => setOpen(!open)}
//       >
//         <div className="flex items-center space-x-3">
//           <Icon className="w-6 h-6 text-blue-700" />
//           <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
//         </div>
//         {open ? <ChevronUp className="text-blue-700" /> : <ChevronDown className="text-blue-700" />}
//       </div>
//       {open && (
//         <ul className="mt-4 space-y-3">
//           {items.map((item, index) => (
//             <li key={index}>
//               <a
//                 href={item.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 hover:underline text-base flex items-center"
//               >
//                 <FileCheck2 className="w-4 h-4 mr-2 text-blue-500" />
//                 {item.title}
//               </a>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// const HeaderSection = () => (
//   <div className="relative bg-gradient-to-br from-blue-900 to-blue-700 py-16 px-6 rounded-xl shadow-lg text-white mb-10">
//     <div className="max-w-5xl mx-auto text-center">
//       <h1 className="text-4xl md:text-5xl font-bold mb-4">
//         Internal Quality Assurance Cell (IQAC)
//       </h1>
//       <p className="text-lg md:text-xl max-w-3xl mx-auto text-blue-100">
//         Committed to academic excellence, quality enhancement, and continual institutional growth.
//       </p>
//     </div>

//     {/* Optional SVG wave */}
//     <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
//       <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 fill-gray-50">
//         <path d="M0,0V46.29c47.62,22,103.65,29.05,158,17.57..." />
//       </svg>
//     </div>
//   </div>
// );

// const IQACPage = () => {
//   return (
//     <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-10">
//       <HeaderSection />

//       <div className="max-w-5xl mx-auto">
//         <Section
//           title="Minutes of Meetings"
//           icon={FileText}
//           items={iqacData.minutes}
//         />
//         <Section
//           title="MoU and Circulars"
//           icon={FileCheck2}
//           items={iqacData.mouCirculars}
//         />
//       </div>
//     </div>
//   );
// };

// export default IQACPage;

import React, { useState } from "react";
import {
  FileText,
  FileCheck2,
  ClipboardList,
  FilePlus,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";

// Data Section
const iqacData = {
  minutes: [
    { title: "IQAC Meeting - January 2025", link: "#" },
    { title: "IQAC Meeting - December 2024", link: "#" },
    { title: "IQAC Meeting - October 2024", link: "#" },
  ],
  mou: [
    { title: "MOU with ABC Institution", link: "#" },
    { title: "MOU with DEF University", link: "#" },
    { title: "MOU with XYZ Company", link: "#" },
  ],
  circulars: [
    { title: "Circular - Academic Audit 2025", link: "#" },
    { title: "Circular - Quality Improvement Drive", link: "#" },
    { title: "Circular - New Committee Formed", link: "#" },
  ],
  about: `The Internal Quality Assurance Cell (IQAC) is established to develop a system for conscious, consistent, and catalytic improvement in the performance of institutions. It works toward enhancing the quality culture in the institution by planning and monitoring initiatives and practices.`,
};

// Collapsible Section Component
const Section = ({ title, icon: Icon, items }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center space-x-3">
          <Icon className="w-6 h-6 text-blue-700" />
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>
        {open ? (
          <ChevronUp className="text-blue-700" />
        ) : (
          <ChevronDown className="text-blue-700" />
        )}
      </div>
      {open && items && (
        <ul className="mt-4 space-y-3">
          {items.map((item, index) => (
            <li key={index}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-base flex items-center"
              >
                <FileCheck2 className="w-4 h-4 mr-2 text-blue-500" />
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Hero Section
const HeaderSection = () => (
  <section className="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20 px-6 mb-10">
    <div className="max-w-7xl mx-auto text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Internal Quality Assurance Cell (IQAC)
      </h1>
      <p className="text-lg md:text-xl max-w-3xl mx-auto text-blue-100">
        Committed to academic excellence, quality enhancement, and continual
        institutional growth.
      </p>
    </div>
  </section>
);

// Main Component
const IQAC = () => {
  const [activeTab, setActiveTab] = useState("about");

  const tabs = [
    { id: "about", name: "About IQAC", icon: <Info /> },
    { id: "minutes", name: "Minutes of Meeting", icon: <ClipboardList /> },
    { id: "mou", name: "MOU", icon: <FileText /> },
    { id: "circulars", name: "Circulars", icon: <FilePlus /> },
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <HeaderSection />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-5 py-3 rounded-full border-2 transition-colors text-sm font-medium ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50"
              }`}
            >
              <span className="mr-2">{tab.icon}</span> {tab.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mb-20">
          {activeTab === "about" && (
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-gray-700 text-lg leading-relaxed">
              {iqacData.about}
            </div>
          )}
          {activeTab === "minutes" && (
            <Section
              title="Minutes of Meetings"
              icon={ClipboardList}
              items={iqacData.minutes}
            />
          )}
          {activeTab === "mou" && (
            <Section title="Memorandum of Understanding" icon={FileText} items={iqacData.mou} />
          )}
          {activeTab === "circulars" && (
            <Section title="Circulars" icon={FilePlus} items={iqacData.circulars} />
          )}
        </div>
      </div>
    </div>
  );
};

export default IQAC;
