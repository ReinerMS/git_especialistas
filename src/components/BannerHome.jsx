import { useState, useEffect, useCallback } from 'react';

const Slider = () => {
  const banners = [
    { id: 1, src: './imgs/bannerHome/2.jpg' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para ir al siguiente slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  }, [banners.length]);

  // Efecto para cambio automático
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="my-2 w-full mx-auto">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="w-full">
            <img src={banner.src} alt={`Banner ${banner.id}`} className="w-full object-contain" />
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Slider;
