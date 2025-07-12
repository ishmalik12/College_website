import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import cllgimg from "../assets/cllgimg.jpeg";
import visionBg from "../assets/blurimg.jpeg";
import { CheckCircle, Users, Award, Globe2, HeartHandshake } from "lucide-react";

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-pink-50 min-h-screen px-6 py-12 sm:px-12 md:px-24 space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-6" data-aos="fade-down">
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900">About </h1>
         <img
          src={cllgimg}
          alt="A vibrant view of the college campus"
          className="mx-auto w-full max-w-3xl max-h-[400px] object-cover rounded-2xl shadow-2xl"
        />
        <p style={{fontFamily:"Arvo"}} className="text-lg md:text-xl text-gray-700 mx-auto">
          Realizing the importance of girls education Ingraham Institute Girls degree College started its girls degree college from July 2017 with B.A (Eng. Eco., Pol. Sci. Education, History, Sociology and Hindi with 140 seats for all) B.Sc. (Bio with 60 seats) and B.Sc. (Maths with 60 seats) & B. Com. (with 60 seats) courses. Since then it is constantly progressing to develop young girls through enquiry based learning. The institution has wide reputation for its quality of learning and a holistic approach towards grooming the students. Infact, an Institution is known well by its highly qualified and ideal teachers and not merely by its building and infrastructure alone. The citizens of Ghaziabad metropolis and its enviros feel proud of the Ingraham Institute Girls degree college Ghaziabad, because it does not consist of only adequate space , modern building but it has highly qualified and ideal teachers also to impart girls education through the best use of modern technology. The Institution basically aims to make and Endeavour to mould the young mind in such a way that they evolve and emerge as potential individuals, who push the convectional boundaries and harness their potential to become a force to make a better tomorrow. The approach of the Institution does not make it’s student succeed in the competitive scenario only but inculcate in them the spirit of positive mind and soul also, so that they become ideal citizens of the country.


        </p>
       
      </section>

      {/* Quick Facts */}
      <section className="grid md:grid-cols-4 gap-8 text-center" data-aos="fade-up">
        <div>
          <Award className="mx-auto text-blue-600" size={36} />
          <h3 className="font-bold text-xl mt-2">Founded</h3>
          <p className="text-gray-600">2017</p>
        </div>
        <div>
          <Users className="mx-auto text-green-600" size={36} />
          <h3 className="font-bold text-xl mt-2">Students</h3>
          <p className="text-gray-600">320+ enrolled</p>
        </div>
        <div>
          <Globe2 className="mx-auto text-pink-600" size={36} />
          <h3 className="font-bold text-xl mt-2">Courses</h3>
          <p className="text-gray-600">B.A., B.Sc. (Bio/Maths), B.Com.</p>
        </div>
        <div>
          <HeartHandshake className="mx-auto text-yellow-600" size={36} />
          <h3 className="font-bold text-xl mt-2">Community</h3>
          <p className="text-gray-600">Active outreach & social impact</p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section
        id="vision"
        data-aos="fade-right"
        className="relative rounded-2xl overflow-hidden"
        style={{
          backgroundImage: `url(${visionBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="backdrop-blur-sm bg-white/70 w-full h-full py-16 px-6 md:px-20">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Objective */}
            <div className="bg-white/90 shadow-lg rounded-xl p-8 border-l-4 border-blue-500">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">Our Objective</h3>
              <p className="text-gray-700 leading-relaxed">
                To provide higher education opportunities to underprivileged and marginalized girls, nurturing them into confident, capable individuals ready to shape a brighter future.
              </p>
            </div>
            {/* Mission */}
            <div className="bg-white/90 shadow-lg rounded-xl p-8 border-l-4 border-green-500">
              <h3 className="text-2xl font-semibold text-green-700 mb-4">Our Mission</h3>
              <ul className="space-y-3">
                {[
                  "Lifelong learning and curiosity",
                  "Building a culture of inclusivity",
                  "Promoting research and innovation",
                  "Empowering regional development",
                  "Fostering social responsibility",
                  "Championing technology and progress",
                  "Ensuring public accountability"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle className="text-[#47A8BD]" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" data-aos="fade-up" className="bg-white shadow-lg rounded-2xl p-10 border-l-4 border-purple-600">
        <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">Leadership</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
          {/* Replace with real data */}
          {[
            { role: "Principal", name: "Dr. Anjali Sharma" },
            { role: "Vice Principal", name: "Ms. Neha Verma" },
            { role: "Dean", name: "Prof. Ritu Singh" }
          ].map((leader, idx) => (
            <div key={idx} className="bg-gray-100 rounded-lg p-6 shadow-md text-center hover:shadow-xl transition">
              <div className="w-24 h-24 bg-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-blue-700">
                {leader.name.split(" ").map(n => n[0]).join("")}
              </div>
              <h4 className="text-lg font-semibold">{leader.role}</h4>
              <p className="text-sm text-gray-600">{leader.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Initiatives */}
      <section id="initiatives" data-aos="fade-left" className="bg-white shadow-lg rounded-2xl p-10 border-l-4 border-rose-500">
        <h2 className="text-3xl font-bold text-rose-600 mb-6 text-center">Social Initiatives</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { icon: <Globe2 className="text-green-500" />, title: "Cleanliness Drives" },
            { icon: <CheckCircle className="text-blue-500" />, title: "Tree Plantation" },
            { icon: <HeartHandshake className="text-rose-500" />, title: "Women Empowerment" },
            { icon: <Award className="text-yellow-500" />, title: "Health & Blood Donation Camps" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 bg-gray-50 p-6 rounded-xl shadow hover:bg-blue-50 transition">
              {item.icon}
              <span className="text-lg font-medium">{item.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Placements */}
      <section id="placements" data-aos="fade-up" className="bg-white shadow-lg rounded-2xl p-10 border-l-4 border-yellow-500">
        <h2 className="text-3xl font-bold text-yellow-600 mb-6 text-center">Placements</h2>
        <p className="text-gray-700 text-center mb-8">
          Our placement cell connects students with top organizations, offering career guidance, internships, and job opportunities.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {/* Replace with real company logos */}
          {["TCS", "Infosys", "Wipro", "HDFC Bank", "ICICI", "Amazon"].map((company, idx) => (
            <div key={idx} className="bg-gray-100 px-6 py-4 rounded-lg shadow text-center font-semibold text-gray-700 hover:bg-yellow-50 transition">
              {company}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
