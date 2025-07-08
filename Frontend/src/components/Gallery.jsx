import { useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const images = [
  "/gallery/1.jpg",
  "/gallery/2.jpg",
  "/gallery/3.jpg",
  "/gallery/4.jpg",
  "/gallery/5.jpg",
  "/gallery/6.jpg",
];

export default function Gallery() {
  const [index, setIndex] = useState(-1);

  return (
    <section className="bg-gray-100 py-16 px-4 md:px-12">
      <h2 className="text-4xl font-extrabold text-center text-primary mb-12">Campus Life</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {images.map((img, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition duration-300"
            onClick={() => setIndex(i)}
          >
            <img
              src={img}
              alt={`Gallery ${i + 1}`}
              className="w-full h-60 object-cover"
            />
          </div>
        ))}
      </div>

      {index >= 0 && (
        <Lightbox
          mainSrc={images[index]}
          nextSrc={images[(index + 1) % images.length]}
          prevSrc={images[(index + images.length - 1) % images.length]}
          onCloseRequest={() => setIndex(-1)}
          onMovePrevRequest={() =>
            setIndex((index + images.length - 1) % images.length)
          }
          onMoveNextRequest={() => setIndex((index + 1) % images.length)}
        />
      )}
    </section>
  );
}
