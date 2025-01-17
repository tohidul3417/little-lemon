import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    text: "The Mediterranean flavors at Little Lemon transported me straight to Greece. Absolutely phenomenal experience!",
    role: "Food Critic"
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 5,
    text: "Best hummus in Chicago! The modern twist on traditional recipes is genius.",
    role: "Regular Customer"
  },
  {
    id: 3,
    name: "Emma Davis",
    rating: 5,
    text: "The atmosphere and service are as exceptional as the food. A must-visit restaurant!",
    role: "Food Blogger"
  },
  {
    id: 4,
    name: "James Wilson",
    rating: 5,
    text: "Their commitment to authentic Mediterranean cuisine while adding creative modern elements is remarkable.",
    role: "Chef"
  }
];

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => 
        current === testimonials.length - 1 ? 0 : current + 1
      );
    }, 3000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const handlePrevious = () => {
    setIsAutoPlay(false);
    setActiveIndex((current) => 
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setActiveIndex((current) => 
      current === testimonials.length - 1 ? 0 : current + 1
    );
  };

  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="testimonials-title">What Our Guests Say</h2>
        
        <div className="testimonials-carousel"
             onMouseEnter={() => setIsAutoPlay(false)}
             onMouseLeave={() => setIsAutoPlay(true)}>
          
          <button 
            className="carousel-btn carousel-btn-left"
            onClick={handlePrevious}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="testimonials-content">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonial-card ${index === activeIndex ? 'active' : ''}`}
                aria-hidden={index !== activeIndex}
              >
                <Quote className="quote-icon" size={32} />
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h3>{testimonial.name}</h3>
                    <p>{testimonial.role}</p>
                  </div>
                  <div className="rating">
                    {'★'.repeat(testimonial.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            className="carousel-btn carousel-btn-right"
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="testimonial-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === activeIndex ? 'active' : ''}`}
              onClick={() => {
                setIsAutoPlay(false);
                setActiveIndex(index);
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
