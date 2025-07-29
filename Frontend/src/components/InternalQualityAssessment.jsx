import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FileText,
  FileCheck2,
  ClipboardList,
  FilePlus,
  ChevronDown,
  ChevronUp,
  Users,
} from "lucide-react";

// Collapsible Section Component
const Section = ({ title, icon: Icon, items }) => {
  const [open, setOpen] = useState(true);

  const isMinutes = title.toLowerCase().includes("minutes");

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
        <div className="mt-4">
          {isMinutes ? (
            <table className="min-w-full border border-gray-200 rounded overflow-hidden">
              <thead>
                <tr className="bg-blue-100 text-gray-700 text-left text-sm">
                  <th className="py-2 px-4 border-b">Title</th>
                  <th className="py-2 px-4 border-b text-center">View</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-2 px-4">{item.title}</td>
                    <td className="py-2 px-4 text-center">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-700 transition"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <ul className="space-y-3">
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
      )}
    </div>
  );
};

// Member Card Component
const MemberCard = ({ member }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
    {/* <img
      src={`http://localhost:5000${member.photoUrl}`}
      alt={member.name}
      className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 border-blue-100 shadow-md"
    /> */}
    <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
    <p className="text-base text-gray-600">{member.designation}</p>
  </div>
);

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
  const [activeTab, setActiveTab] = useState("minutes");
  const [uploads, setUploads] = useState({
    minutes: [],
    mou: [],
    circulars: [],
  });
  const [members, setMembers] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const [minutesRes, mouRes, circularsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/iqac/uploads/minutes"),
        axios.get("http://localhost:5000/api/iqac/uploads/mou"),
        axios.get("http://localhost:5000/api/iqac/uploads/circular"),
      ]);

      setUploads({
        minutes: minutesRes.data.files.map((f) => ({
          title: f.title || "Untitled",
          link: `http://localhost:5000${f.filePath}`,
        })),
        mou: mouRes.data.files.map((f) => ({
          title: f.title || "Untitled",
          link: `http://localhost:5000${f.filePath}`,
        })),
        circulars: circularsRes.data.files.map((f) => ({
          title: f.title || "Untitled",
          link: `http://localhost:5000${f.filePath}`,
        })),
      });
    } catch (err) {
      console.error("Error fetching IQAC uploads:", err);
    }
  };

 const fetchMembers = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/iqac/team");
    const sortedTeam = (res.data.team || []).sort(
      (a, b) => a.displayOrder - b.displayOrder
    );
    setMembers(sortedTeam);
  } catch (err) {
    console.error("Error fetching IQAC members:", err);
  }
};


  fetchData();
  fetchMembers();
}, []);


  const tabs = [
    { id: "minutes", name: "Minutes of Meeting", icon: <ClipboardList /> },
    { id: "mou", name: "MOU", icon: <FileText /> },
    { id: "circulars", name: "Circulars", icon: <FilePlus /> },
    { id: "members", name: "The Team", icon: <Users /> },
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
          {activeTab === "minutes" && (
            <Section
              title="Minutes of Meetings"
              icon={ClipboardList}
              items={uploads.minutes}
            />
          )}
          {activeTab === "mou" && (
            <Section
              title="Memorandum of Understanding"
              icon={FileText}
              items={uploads.mou}
            />
          )}
          {activeTab === "circulars" && (
            <Section
              title="Circulars"
              icon={FilePlus}
              items={uploads.circulars}
            />
          )}
          {activeTab === "members" && (
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
                <Users className="text-blue-700 w-6 h-6" />
                IQAC Team Members
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {members.map((member) => (
                  <MemberCard key={member._id} member={member} />
                ))}
              </div>
               <h2 className="text-2xl mt-5 font-semibold mb-6 text-gray-800 flex items-center gap-2">
                <Users className="text-blue-700 w-6 h-6" />
                Responsibilities of IQAC
              </h2>
              
              <p className="text-gray-700 leading-relaxed text-justify">
                The Internal Quality Assurance Cell (IQAC) is committed to
                fostering and sustaining a culture of excellence within the
                institution. It plays a vital role in developing and applying
                quality benchmarks for various academic and administrative
                activities. The IQAC organizes workshops, seminars, and
                awareness programs to promote quality enhancement initiatives.
                It is also responsible for maintaining comprehensive
                institutional data and documentation. Regular feedback is
                collected and analyzed from stakeholders to support informed
                decision-making and continuous improvement. Additionally, the
                IQAC prepares and submits the Annual Quality Assurance Report
                (AQAR) to NAAC. The cell convenes biannually, typically in June
                and December, and may meet additionally as needed. All members
                are encouraged to extend their full cooperation to ensure the
                success of this essential quality assurance mechanism.
              </p>
              <div className="mt-6 text-gray-800">
                <p className="font-semibold">Principal</p>
                <p>Dr. Renu Bansal</p>
                <p>Ingraham Institute Girls’ Degree College, Ghaziabad</p>
              </div>

            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default IQAC;
