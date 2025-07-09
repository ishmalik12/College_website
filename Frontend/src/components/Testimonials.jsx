import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "Ananya Sharma",
    role: "Computer Science, 2023",
    message:
      "Global University empowered me with the tools and mentors to chase my dreams in AI and research. The environment is truly world-class!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rohan Mehta",
    role: "Mechanical Engineering, 2022",
    message:
      "From labs to leadership clubs, this place gave me the edge. I got placed at Tesla thanks to the innovation culture here!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Sinha",
    role: "Business Management, 2024",
    message:
      "The diversity, the professors, the vibe — everything pushed me to grow. I'll always be proud to call this my alma mater.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

export default function Testimonials() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 6000,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: false,
  };

  return (
    <section className="bg-white py-20 px-6">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-[#47A8BD] mb-16 tracking-tight">
        Voices of Our Students
      </h2>

      <div className="max-w-5xl mx-auto">
        <Slider {...settings}>
          {testimonials.map((t, i) => (
            <div key={i} className="flex flex-col items-center text-center px-4 md:px-20">
              <div className="bg-[#F9FAFB] rounded-xl shadow-lg px-8 py-10 md:py-12 max-w-3xl mx-auto">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-24 h-24 rounded-full border-4 border-[#47A8BD] mx-auto mb-6 shadow"
                />
                <p className="text-lg md:text-xl text-gray-700 italic leading-relaxed mb-6">
                  “{t.message}”
                </p>
                <h4 className="text-xl md:text-2xl font-semibold text-[#47A8BD] mb-1">
                  {t.name}
                </h4>
                <span className="text-sm text-gray-500">{t.role}</span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
