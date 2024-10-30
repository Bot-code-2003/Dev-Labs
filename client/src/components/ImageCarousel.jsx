import { useState, useRef, useEffect } from "react";

export default function Component({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const carouselRef = useRef(null);

  const nextSlide = () =>
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  const prevSlide = () =>
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * 0.8; // 80% of the container width
      carouselRef.current.scrollTo({
        left: currentIndex * scrollAmount,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  // New function to handle image click and open modal
  const openModal = (index) => {
    setCurrentIndex(index); // Set currentIndex to the clicked image's index
    setIsModalOpen(true); // Open the modal
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      <div
        ref={carouselRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-4/5 sm:w-3/5 px-1 snap-center"
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-48 sm:h-[450px] object-cover cursor-pointer shadow-md"
              onClick={() => openModal(index)} // Call the new function with the index
            />
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
        aria-label="Previous slide"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
        aria-label="Next slide"
      >
        &#10095;
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-w-4xl max-h-full p-4">
            <img
              src={images[currentIndex]} // Display the image at currentIndex
              alt={`Slide ${currentIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(false);
              }}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full"
              aria-label="Close modal"
            >
              &#10005;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
