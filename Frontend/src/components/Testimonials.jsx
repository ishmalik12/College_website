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
    speed: 800,
    autoplaySpeed: 5000,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: false,
  };

  return (
    <section className="bg-gradient-to-br from-primary via-sky-200 to-white py-20 px-4">
      <h2 className="text-4xl font-extrabold text-center text-secondary mb-12">
        What Our Students Say
      </h2>
      <div className="max-w-4xl mx-auto">
        <Slider {...settings}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12 flex flex-col items-center text-center transition-transform duration-500"
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-24 h-24 rounded-full border-4 border-secondary mb-4 shadow-md"
              />
              <p className="text-lg text-gray-700 italic mb-6">“{t.message}”</p>
              <h4 className="text-xl font-bold text-primary">{t.name}</h4>
              <span className="text-sm text-gray-500">{t.role}</span>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
