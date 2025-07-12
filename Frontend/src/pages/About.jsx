import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import cllgimg from "../assets/cllgimg.jpeg"
import { Info, Target, Flag, CheckCircle } from "lucide-react";
import visionBg from "../assets/blurimg.jpeg";
export default function About() {
  useEffect(() => {
  AOS.init({
    duration: 1000, // animation duration
    once: true,     // only once per scroll
  });
}, []);

  return (
    <div className="bg-gray-50 min-h-screen px-6 py-12 sm:px-12 md:px-24 space-y-16">
      


      
      {/* About Section */}
      <section id="about"  data-aos="fade-up" className="bg-transparent  rounded-xl p-8 ">
        <div className="text-center mb-10">
  <h2 className="text-3xl md:text-4xl font-bold inline-block relative">
    About
    <span className="block h-1 w-22 bg-[#47A8BD] rounded-full mx-auto mt-2"></span>
  </h2>
</div>
        
  <img
    src={cllgimg}
    alt="College View"
    className="w-full max-h-[500px] object-cover rounded-xl shadow-lg mb-8"
  />
        <p className="text-gray-700 leading-relaxed text-justify" style={{fontFamily:"Arvo"}}>
          Realizing the importance of girls education Ingraham Institute Girls degree College started its girls degree college from July 2017 with B.A (Eng. Eco., Pol. Sci. Education, History, Sociology and Hindi with 140 seats for all) B.Sc. (Bio with 60 seats) and B.Sc. (Maths with 60 seats) & B. Com. (with 60 seats) courses. Since then it is constantly progressing to develop young girls through enquiry based learning. The institution has wide reputation for its quality of learning and a holistic approach towards grooming the students.

Infact, an Institution is known well by its highly qualified and ideal teachers and not merely by its building and infrastructure alone. The citizens of Ghaziabad metropolis and its enviros feel proud of the Ingraham Institute Girls degree college Ghaziabad, because it does not consist of only adequate space , modern building but it has highly qualified and ideal teachers also to impart girls education through the best use of modern technology.

The Institution basically aims to make and Endeavour to mould the young mind in such a way that they evolve and emerge as potential individuals, who push the convectional boundaries and harness their potential to become a force to make a better tomorrow.

The approach of the Institution does not make it’s student succeed in the competitive scenario only but inculcate in them the spirit of positive mind and soul also, so that they become ideal citizens of the country.
        </p>
      </section>
  

      {/* Vision & Mission */}
    

<section
  id="vision"
  data-aos="fade-left"
  className="ml-0 bg-cover  bg-center bg-no-repeat  relative"
  style={{
    backgroundImage: `url(${visionBg}),`,
  }}
>
  {/* Blur + Overlay */}
  <div className="backdrop-blur-xs bg-white/60 w-full h-full  py-20 md:px-20">
    <div className="grid md:grid-cols-2 gap-10">
      {/* Objective */}
      <div className="bg-white shadow-xl rounded-xl p-8 border-t-4 border-blue-500">
        <h3 className="text-2xl font-semibold text-blue-700 mb-4">Our Objective</h3>
        <p className="text-gray-700 leading-relaxed text-justify" style={{ fontFamily: "Arvo" }}>
          The idea to establish Ingraham Institute Girls' Degree College (a Christian Minority Institution) is to provide higher education to the poor, needy and marginalised Girls of our society...
        </p>
      </div>

      {/* Mission */}
      <div className="bg-white shadow-xl rounded-xl p-8 border-t-4 border-green-500">
        <h3 className="text-2xl font-semibold text-green-700 mb-4">Our Mission</h3>
        <p className="text-lg text-center font-medium text-gray-800 mb-6">
          Educating the whole person in mind, body and spirit.
        </p>
        <ul className="space-y-4">
          {[
            "Lifelong learning",
            "Creation of learning culture",
            "Regional economic regeneration",
            "Pure research, scholarship and discipline",
            "Technology innovation",
            "Social cohesion and action",
            "Public accountability",
          ].map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 hover:bg-[#e6f9fd] transition-all p-3 rounded-lg"
            >
              <CheckCircle className="text-[#47A8BD] mt-1" size={20} />
              <span className="text-base md:text-lg">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</section>

      {/* Leadership */}
      <section id="leadership" data-aos="fade-down" className="bg-white shadow-md rounded-xl p-8 border-l-4 border-purple-600">
        <h2 className="text-3xl font-bold text-purple-700 mb-4">Leadership</h2>
        <p className="text-gray-700 leading-relaxed text-justify mb-4">
          Our leadership team consists of visionary educators and administrators who believe in inclusive, progressive, and value-based education. Under their guidance, the college has grown in stature and continues to set new standards in women’s education.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {/* Replace with real leadership cards if available */}
          {["Principal", "Vice Principal", "Dean"].map((role, index) => (
            <div key={index} className="bg-gray-100 rounded-lg p-4 shadow-sm">
              <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-3"></div>
              <h4 className="text-lg font-semibold text-center">{role}</h4>
              <p className="text-sm text-center text-gray-600">Name Placeholder</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Initiatives */}
      <section id="initiatives" data-aos="fade-left" className="bg-white shadow-md rounded-xl p-8 border-l-4 border-rose-500">
        <h2 className="text-3xl font-bold text-rose-600 mb-4">Social Initiatives</h2>
        <p className="text-gray-700 leading-relaxed text-justify">
          As an institution that believes in giving back to society, we actively participate in community outreach. Our students and faculty are involved in initiatives such as:
        </p>
        <ul className="list-disc list-inside text-gray-700 mt-4 space-y-1">
          <li>Cleanliness and Swachh Bharat drives</li>
          <li>Tree plantation and eco-awareness programs</li>
          <li>Women empowerment and gender sensitization workshops</li>
          <li>Health check-up and blood donation camps</li>
        </ul>
      </section>

      {/* Placements */}
      <section id="placements" data-aos="fade-up" className="bg-white shadow-md rounded-xl p-8 border-l-4 border-yellow-500">
        <h2 className="text-3xl font-bold text-yellow-600 mb-4">Placements</h2>
        <p className="text-gray-700 leading-relaxed text-justify">
          Our placement cell provides students with industry exposure, career guidance, and support in securing internships and job offers. We collaborate with reputed organizations and companies to organize placement drives, seminars, and workshops that prepare students for successful careers.
        </p>
        <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600" data-aos="fade-left">
          {/* Example logos or partners */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm text-center">Company A</div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm text-center">Company B</div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm text-center">Company C</div>
        </div>
      </section>
    </div>
  );
}
