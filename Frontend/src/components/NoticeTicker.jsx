import React from "react";
import { Link } from "react-router-dom";
import { BellDot } from "lucide-react";

const notices = [
  { title: "Admission Open for 2025", url: "/notices/admission-2025" },
  { title: "Upcoming Seminar on AI & ML", url: "/notices/seminar-ai" },
  { title: "Annual Sports Meet Registration", url: "/notices/sports-meet" },
  { title: "Mid Term Exam Schedule", url: "/notices/midterms" },
  { title: "Teacher’s Day Celebration", url: "/notices/teachers-day" },
];

export default function NoticeTicker() {
  return (
    <div className="w-full bg-[#00008b] overflow-hidden py-2 border-b-2 border-red-600">
      <div className="whitespace-nowrap animate-marquee flex gap-10 text-white font-medium px-4">
        {notices.map((notice, index) => (
          <Link
            to={notice.url}
            key={index}
            className="hover:underline hover:text-red-400 transition text-sm"
          >
          <span className="inline-flex items-center">
  <BellDot size={14} className="mr-1" />
  {notice.title}
</span>

          </Link>
        ))}
      </div>
    </div>
  );
}
