import { useState } from "react";


type CarouselPorps = {
  img1: string
  img2: string
  img3: string
  img4: string
  img5: string
  img6: string
}


function Carousel({img1, img2, img3, img4, img5, img6} : CarouselPorps) {
  // Estado para el índice de la diapositiva actual
  const [currentIndex, setCurrentIndex] = useState(0);

  // Arreglo de imágenes o contenido del carrusel
  const slides = [
    {
      url: img1,
      alt: 'Slide 1',
    },
    {
      url: img2,
      alt: 'Slide 2',
    },
    {
      url: img3,
      alt: 'Slide 3',
    },
    {
      url: img4,
      alt: 'Slide 4',
    },
    {
      url: img5,
      alt: 'Slide 5',
    },
    {
      url: img6,
      alt: 'Slide 6',
    },
  ];

  // Función para ir a la siguiente diapositiva
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  // Función para ir a la diapositiva anterior
  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative hidden w-full max-w-4xl mx-auto mt-3 md:block">
      {/* Contenedor del carrusel */}   
      <div className="relative overflow-hidden " >
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {slides.map((slide, index) => (
            <div key={index} className="flex-shrink-0 relative hidden w-full max-w-4xl mx-auto md:block h-[300px]">
              <img src={slide.url} alt={slide.alt} className="w-full h-[300px] object-cover" loading="lazy" />
            </div>
          ))}
        </div>

        {/* Botones de navegación */}
        <button
          onClick={goToPrev}
          className="absolute left-0 p-2 text-white transform -translate-y-1/2 bg-gray-800 rounded-full top-1/2">
          &#10094;
        </button>
        <button
          onClick={goToNext}
          className="absolute right-0 p-2 text-white transform -translate-y-1/2 bg-gray-800 rounded-full top-1/2">
          &#10095;
        </button>

        {/* Indicadores */}
        <div className="absolute left-0 right-0 flex justify-center bottom-5">
          {slides.map((_, index) => (
            <button
              aria-label="button_carousel"
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`mx-2 h-3 w-3 rounded-full ${index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'}`}></button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel