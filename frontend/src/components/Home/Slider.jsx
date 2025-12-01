import React, { useState, useEffect } from 'react';
import banner1 from '../../asset/b1.jpeg';
import banner2 from '../../asset/b2.jpeg';
import banner3 from '../../asset/b3.jpg';


function Slider() {
  const slides = [banner1, banner2, banner3];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full overflow-hidden relative">
      <img
        src={slides[index]}
        className="w-full h-[450px] object-cover transition-all duration-700"
        alt="slide"
      />

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${i === index ? "bg-[#FFF0C4]" : "bg-white/40"
              }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
