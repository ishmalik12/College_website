import React, { useState } from 'react';
import { Target, Eye, Heart, Globe, Users, Award, Globe2, HeartHandshake , TrendingUp, Building , CheckCircle , Droplets, Leaf, Sun } from 'lucide-react';
import logo from "../assets/logo.png";
import cllgimg from "../assets/cllgimg.jpeg";
import { motion } from "framer-motion";
import flower from '../assets/flower.gif';
import directorImg from "../assets/DIR.jpg";
import SolarPan from "../assets/solarpannel.jpg";
import solarImg from "../assets/solarpannel.jpg";
import farmingImg from "../assets/organicfarming.jpg";
import sadakImg from "../assets/SadakSuraksha01.png";
import img3 from "../assets/slideshow6.jpeg";
import img2 from "../assets/cllgimg.jpeg";
import img1 from "../assets/blurimg.jpeg";
import img4 from "../assets/aboutpage.png";





const About = () => {
  const [activeTab, setActiveTab] = useState('objective-mission');

  const tabs = [
    { id: 'objective-mission', label: 'Objective & Mission', icon: <Target className="h-5 w-5" /> },
    { id: 'leadership', label: 'Leadership', icon: <Users className="h-5 w-5" /> },
    { id: 'social-initiative', label: 'Social Initiative', icon: <Heart className="h-5 w-5" /> },
  ];

const initiatives = [
  {
    title: "Rain Water Harvesting",
    description:
      "Conserving water through rainwater collection systems to recharge groundwater and reduce dependency on external sources.",
    impact: "20+ installations across campus",
    icon: <Droplets className="h-8 w-8" />,
    image: "/images/rainwater.jpg"
  },
  {
    title: "Organic Farming",
    description:
      "Promoting sustainable agriculture by cultivating crops without synthetic fertilizers or pesticides, encouraging healthy ecosystems.",
    impact: "15 acres of organic cultivation",
    icon: <Leaf className="h-8 w-8" />,
    image: "/images/organic.jpg"
  },
  {
    title: "Solar Panel Installation",
    description:
      "Harnessing solar energy to power infrastructure sustainably, reducing carbon emissions and reliance on non-renewable energy.",
    impact: "75% energy needs met by solar",
    icon: <Sun className="h-8 w-8" />,
    image: "/images/solar.jpg"
  }
];



  return (
    <div className="min-h-screen bg-gray-50">
      <section className="grid md:grid-cols-4 gap-8 text-center p-12" data-aos="fade-up">
  {[
    {
      icon: <Award className="mx-auto text-blue-600" size={36} />,
      title: "Founded",
      desc: "2017",
    },
    {
      icon: <Users className="mx-auto text-green-600" size={36} />,
      title: "Students",
      desc: "320+ enrolled",
    },
    {
      icon: <Globe2 className="mx-auto text-pink-600" size={36} />,
      title: "Courses",
      desc: "B.A., B.Sc. (Bio/Maths), B.Com.",
    },
    {
      icon: <HeartHandshake className="mx-auto text-yellow-600" size={36} />,
      title: "Community",
      desc: "Active outreach & social impact",
    },
  ].map((item, index) => (
    <div
      key={index}
      className="bg-white/10 backdrop-blur-md border border-white/20 shadow-md rounded-2xl p-6 transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:bg-white/20"
    >
      {item.icon}
      <h3 className="font-bold text-xl mt-3 text-blue-700">{item.title}</h3>
      <p className="text-blue-600">{item.desc}</p>
    </div>
  ))}
</section>

   <section className="relative py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 overflow-hidden">
  {/* Background effects */}
  <div className="absolute inset-0">
    <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
  </div>

  {/* Content Container */}
  <div className="relative max-w-6xl mx-auto px-2 sm:px-2 lg:px-2 ">
    <h1 className="text-5xl font-bold text-white mb-6">About</h1>
    <p className="text-lg lg:text-xl text-blue-100 leading-relaxed">
    Realizing the importance of girls education Ingraham Institute Girls degree College started its girls degree college from July 2017 with B.A (Eng. Eco., Pol. Sci. Education, History, Sociology and Hindi with 140 seats for all) B.Sc. (Bio with 60 seats) and B.Sc. (Maths with 60 seats) & B. Com. (with 60 seats) courses. Since then it is constantly progressing to develop young girls through enquiry based learning.
     The institution has wide reputation for its quality of learning and a holistic approach towards grooming the students. Infact, an Institution is known well by its highly qualified and ideal teachers and not merely by its building and infrastructure alone. The citizens of Ghaziabad metropolis and its enviros feel proud of the Ingraham Institute Girls degree college Ghaziabad, because it does not consist of only adequate space , modern building but it has highly qualified and ideal teachers also to impart girls education through the best use of modern technology. 
     <br></br><br></br>The Institution basically aims to make and Endeavour to mould the young mind in such a way that they evolve and emerge as potential individuals, who push the convectional boundaries and harness their potential to become a force to make a better tomorrow. The approach of the Institution does not make it's student succeed in the competitive scenario only but inculcate in them the spirit of positive mind and soul also, so that they become ideal citizens of the country.
    </p>
  </div>

 {/* Image Grid Below - Fullscreen, No Gaps */}
<div className="w-screen mt-16">
  <div className="grid grid-cols-1 grid-rows-1 w-full h-[60vh] sm:h-[70vh] md:h-[80vh]">
    {[img1].map((src, idx) => ( 
      <div
        key={idx}
        className="group relative w-full h-full overflow-hidden"
      >
        <img
          src={src}
          alt={`Image ${idx + 1}`}
          className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
        />
      </div>
    ))}
  </div>
</div>

</section>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-wrap justify-center mb-16 bg-blue-700 rounded-2xl p-3 shadow-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 rounded-xl font-medium transition-all duration-300 m-1 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg transform scale-105'
                  : 'text-white hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
 <div className="min-h-[600px]">
        

          {activeTab === 'objective-mission' && (
            <div className="grid lg:grid-cols-2 gap-12 animate-fade-in">
              <div className="bg-white rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 w-20 h-20 rounded-2xl flex items-center justify-center mb-8">
                  <Eye className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-blue-900 mb-6">Our Objective</h3>
                  <p className="text-gray-700 leading-relaxed text-justify">
        The idea to establish Ingraham Institute Girls' Degree College (a
        Christian Minority Institution) is to provide higher education to the
        poor, needy and marginalised Girls of our society in Ghaziabad and
        neighbouring irrespective of caste, creed and colour. Through imparting
        purposeful learning and education to build their character and
        personality imbued with the knowledge and wisdom revealed by the
        teachings of Jesus Christ, so that they become worthy citizens of this
        great country India. Besides, to provide them through Ingraham Institute
        Ghaziabad, opportunities and other services, in accordance with the
        policies and purpose of Methodist Church in India and its successor body
        within the bounds of directives given by the Board of Governors of the
        Ingraham Institute from time to time. The objective of the Ingraham
        Institute shall be to share the facilities and opportunity provided by
        the Institute, within the ambit of Christian education for Christian
        youth and other children.
      </p>
              </div>

              <div className="bg-white rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="bg-gradient-to-r from-red-600 to-red-700 w-20 h-20 rounded-2xl flex items-center justify-center mb-8">
                  <Target className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-blue-900 mb-6">Our Mission</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  To provide transformative education that empowers students to become global leaders and innovators, 
                  making a positive impact on society and the world.
                </p>
                <ul className="space-y-3 text-gray-800">
        {[
          "Lifelong learning and curiosity",
          "Building a culture of inclusivity",
          "Promoting research and innovation",
          "Empowering regional development",
          "Fostering social responsibility",
          "Championing technology and progress",
          "Ensuring public accountability",
        ].map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <CheckCircle className="text-[#47A8BD]" size={20} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
              </div>
            </div>
          )}

          {activeTab === 'leadership' && (
            <section
  id="leadership"
  data-aos="fade-up"
  className="bg-white shadow-lg rounded-2xl px-6 md:px-16 py-12 "
>
 
  <div className="flex flex-col md:flex-row items-center gap-10">
    {/* Director's Photo */}
    <div className="flex-shrink-0">
      <img
  src={directorImg}
  alt="Director"
  className="rounded-xl shadow-md w-64 h-64 object-cover"
/>

    </div>

    {/* Director's Message */}
    <div className="text-gray-700 text-[1.05rem] leading-relaxed text-justify">
      <h3 className="text-2xl font-semibold text-teal-600 mb-4">
        Director's Message
      </h3>
      
      <p className="mb-4">
        Life is a never-ending learning process for all those, who have explored to
        gain education through learning to enhance their knowledge and skills in
        the field of academics. During the learning process irrespective of its
        nature many challenges and unforeseen obstacles come, which can be tackled
        with determination and singleness of the purpose to our day to day
        responsibilities with best of our ability, with honesty and hard work
        imbued with integrity of heart.
      </p>
      <p className="mb-4">
        As an educator, our endeavour will be to help, shape and bring out the
        best out of our students. Our efforts will be to ensure that during the
        learning process of our students they are not only be confined to gain
        their academic degrees but also to uplift their physical, mental,
        emotional and spiritual facilities to build their character and
        personality. I am sure, our qualified and learned teachers are committed
        to impart outcome based education to all, including those who are
        under-privileged and deprived of their legitimate right to receive proper
        education, irrespective of their caste, creed and colour and subsequently
        contribute towards the mission of our great country to become the leading
        nation of the world.
      </p>
      <p className="mb-4">
        With good wishes and God's blessings.
      </p>
      <p className="mt-2 font-medium text-teal-700 italic">
        Wg. Cdr Prakash Jethro
      </p>
    </div>
    {/* Flower - Top Left */}
  <motion.img
    src={flower}
    alt="flower"
    initial={{ opacity: 0, x: -20, y: -20, scale: 0.5 }}
    whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
    transition={{ duration: 1, delay: 0.1 }}
    className="absolute top-0 left-0 w-10 h-10 md:w-14 md:h-14 pointer-events-none"
  />

  {/* Flower - Top Right */}
  <motion.img
    src={flower}
    alt="flower"
    initial={{ opacity: 0, x: 20, y: -20, scale: 0.5 }}
    whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
    transition={{ duration: 1, delay: 0.2 }}
    className="absolute top-0 right-0 w-10 h-10 md:w-14 md:h-14 pointer-events-none"
  />

  {/* Flower - Bottom Left */}
  <motion.img
    src={flower}
    alt="flower"
    initial={{ opacity: 0, x: -20, y: 20, scale: 0.5 }}
    whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
    transition={{ duration: 1, delay: 0.3 }}
    className="absolute bottom-0 left-0 w-10 h-10 md:w-14 md:h-14 pointer-events-none"
  />

  {/* Flower - Bottom Right */}
  <motion.img
    src={flower}
    alt="flower"
    initial={{ opacity: 0, x: 20, y: 20, scale: 0.5 }}
    whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
    transition={{ duration: 1, delay: 0.4 }}
    className="absolute bottom-0 right-0 w-10 h-10 md:w-14 md:h-14 pointer-events-none"
  />
  </div>
</section>
          )}


{activeTab === 'social-initiative' && (
  <div className="space-y-16 animate-fade-in">
    <div className="text-center">
      <h3 className="text-4xl font-bold text-blue-900 mb-6">Social Initiatives</h3>
      <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
        Ingraham Institute Girls Degree College University is committed to making a positive impact on society through various community outreach and social responsibility programs.
      </p>
    </div>
    
    <div className="space-y-20">
      {/* Rain Water Harvesting - Card Left, Visualization Right */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="bg-white rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500">
          <div className="bg-gradient-to-br from-teal-500 to-green-500 w-20 h-20 rounded-2xl flex items-center justify-center mb-8">
            <Droplets className="w-10 h-10 text-white" />
          </div>
          <h4 className="text-3xl font-bold text-gray-800 mb-6">Rain Water Harvesting</h4>
          <p className="text-gray-600 mb-8 leading-relaxed text-lg">
            Conserving water through rainwater collection systems to recharge groundwater and reduce dependency on external sources.
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-8 flex flex-col items-center">
          {/* You can use an existing illustration or a relevant photo here */}
          <Droplets className="w-16 h-16 text-teal-600 mb-4" />
          <h6 className="text-xl font-semibold text-gray-700 mb-4">Initiative Visualization</h6>
        </div>
      </div>
      
      {/* Organic Farming - Visualization Left, Card Right */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-3xl p-8 flex flex-col items-center">
          <img src={farmingImg} alt="Organic Farming" className="w-full max-h-52 rounded-xl shadow-lg object-cover mb-4" />
          <h6 className="text-xl font-semibold text-gray-700">Organic Farming</h6>
        </div>
        <div className="bg-white rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500">
          <div className="bg-gradient-to-br from-green-500 to-teal-500 w-20 h-20 rounded-2xl flex items-center justify-center mb-8">
            <Leaf className="w-10 h-10 text-white" />
          </div>
          <h4 className="text-3xl font-bold text-gray-800 mb-6">Organic Farming</h4>
          <p className="text-gray-600 mb-8 leading-relaxed text-lg">
            Promoting sustainable agriculture by cultivating crops without synthetic fertilizers or pesticides, encouraging healthy ecosystems.
          </p>
        </div>
      </div>
      
      {/* Solar Panel Installation - Card Left, Visualization Right */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="bg-white rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500">
          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 w-20 h-20 rounded-2xl flex items-center justify-center mb-8">
            <Sun className="w-10 h-10 text-white" />
          </div>
          <h4 className="text-3xl font-bold text-gray-800 mb-6">Solar Panel Installation</h4>
          <p className="text-gray-600 mb-8 leading-relaxed text-lg">
            Harnessing solar energy to power infrastructure sustainably, reducing carbon emissions and reliance on non-renewable energy.
          </p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-8 flex flex-col items-center">
          <img src={solarImg} alt="Solar Panel Installation" className="w-full max-h-52 rounded-xl shadow-lg object-cover mb-4" />
          <h6 className="text-xl font-semibold text-gray-700">Solar Panels</h6>
        </div>
      </div>
      
      {/* Sadak Suraksha - Visualization Left, Card Right */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-8 flex flex-col items-center">
          <img src={sadakImg} alt="Sadak Suraksha" className="w-full max-h-52 rounded-xl shadow-lg object-cover mb-4" />
          <h6 className="text-xl font-semibold text-gray-700">Sadak Suraksha</h6>
        </div>
        <div className="bg-white rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500">
          <div className="bg-gradient-to-br from-red-500 to-yellow-600 w-20 h-20 rounded-2xl flex items-center justify-center mb-8">
            <Droplets className="w-10 h-10 text-white" />
          </div>
          <h4 className="text-3xl font-bold text-gray-800 mb-6">Sadak Suraksha</h4>
          <p className="text-gray-600 mb-8 leading-relaxed text-lg">
            Road safety awareness initiative to promote safe travel and traffic conduct.
          </p>
        </div>
      </div>
    </div>
  </div>
)}
         
        </div>
      </div>
    </div>
  );
};

export default About;