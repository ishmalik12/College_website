import React from "react";

const facultyData = [
  {
    name: "Dr. Anjali Verma",
    designation: "Associate Professor, Chemistry",
    qualification: "Ph.D., M.Sc. (Organic Chemistry)",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Prof. Rakesh Sharma",
    designation: "Assistant Professor, Computer Science",
    qualification: "M.Tech., B.Tech.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Dr. Meera Kapoor",
    designation: "Head, Dept. of English",
    qualification: "Ph.D., M.A. (English Literature)",
    image: "https://randomuser.me/api/portraits/women/58.jpg",
  },
];

export default function Faculty() {
  return (
    <div className="min-h-screen bg-white px-4 py-16 md:px-20">
      <h2 className="text-4xl font-bold text-[#47A8BD] mb-12 text-center tracking-wide">
        Faculty Members
      </h2>

      <div className="grid gap-10 md:grid-cols-3">
        {facultyData.map((faculty, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition duration-300"
          >
            <img
              src={faculty.image}
              alt={faculty.name}
              className="w-full h-60 object-cover rounded-t-lg"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold text-[#47A8BD]">
                {faculty.name}
              </h3>
              <p className="text-sm text-gray-700 mt-1">{faculty.designation}</p>
              <p className="text-sm text-gray-600 mt-1">{faculty.qualification}</p>
              <div className="mt-4">
                <span className="inline-block px-3 py-1 text-xs bg-[#FF0000] text-white rounded-full">
                  Faculty Member
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
