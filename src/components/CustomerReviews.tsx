import { useEffect, useRef, useState } from "react";
import "./styles/CustomerReviews.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

interface CustomerReview {
  id: number;
  name: string;
  company: string;
  role: string;
  rating: number;
  review: string;
  project: string;
  image: string;
  linkedin?: string;
}

const CustomerReviews = () => {
  const [activeReview, setActiveReview] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const reviewRefs = useRef<(HTMLDivElement | null)[]>([]);

  const customerReviews: CustomerReview[] = [
    {
      id: 1,
      name: "Mehmet Yıldız",
      company: "TechCorp",
      role: "CTO",
      rating: 5,
      review: "Misgibi Software ile çalışmak gerçekten harika bir deneyimdi. Projemizi zamanında ve bütçe dahilinde tamamladılar. Teknik uzmanlıkları ve müşteri odaklı yaklaşımları takdire şayan. Kesinlikle tavsiye ederim!",
      project: "E-ticaret Platformu",
      image: "/teams/teams1.avif",
      linkedin: "https://linkedin.com/in/mehmetyildiz"
    },
    {
      id: 2,
      name: "Ayşe Demir",
      company: "StartupHub",
      role: "Kurucu",
      rating: 5,
      review: "Startup'ımız için geliştirdikleri mobil uygulama mükemmel! Kullanıcı deneyimi çok iyi tasarlanmış ve performansı harika. Misgibi Software ekibi gerçekten işini biliyor.",
      project: "Mobil Uygulama",
      image: "/teams/teams2.avif",
      linkedin: "https://linkedin.com/in/aysedemir"
    },
    {
      id: 3,
      name: "Ali Kaya",
      company: "DigitalAgency",
      role: "Pazarlama Müdürü",
      rating: 5,
      review: "Web sitemizi sıfırdan tasarladılar ve sonuç muhteşem! SEO optimizasyonu, hız ve kullanıcı deneyimi konularında çok başarılılar. Müşteri memnuniyeti %100!",
      project: "Kurumsal Website",
      image: "/teams/teams3.avif",
      linkedin: "https://linkedin.com/in/alikaya"
    }
  ];

  const setRef = (el: HTMLDivElement | null, index: number) => {
    reviewRefs.current[index] = el;
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % customerReviews.length);
    }, 8000); // 8 saniyede bir değişim

    return () => clearInterval(interval);
  }, [isAutoPlaying, customerReviews.length]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Manual navigation
  const goToReview = (index: number) => {
    setActiveReview(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
  };

  // GSAP animations
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        ".review-card",
        { 
          y: 100, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".customer-reviews-section",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  // Rating stars component
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`star ${index < rating ? 'filled' : ''}`}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ));
  };

  return (
    <div className="customer-reviews-section section-container" id="reviews">
      <div className="customer-reviews-container">
        <h2>
          Müşteri <span>Yorumları</span>
          <br /> & Referanslar
        </h2>
        
        <div className="reviews-content" ref={containerRef}>
          <div 
            className="reviews-carousel"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {customerReviews.map((review, index) => (
              <div
                key={review.id}
                className={`review-card ${activeReview === index ? 'review-active' : ''}`}
                ref={(el) => setRef(el, index)}
                onClick={() => goToReview(index)}
                style={{
                  transform: activeReview === index 
                    ? 'translateX(0) scale(1)' 
                    : index < activeReview 
                      ? 'translateX(-100%) scale(0.8)' 
                      : 'translateX(100%) scale(0.8)',
                  opacity: activeReview === index ? 1 : 0,
                  zIndex: activeReview === index ? 10 : 1,
                  pointerEvents: activeReview === index ? 'auto' : 'none'
                }}
              >
                <div className="review-header">
                  <div className="review-avatar">
                    <img src={review.image} alt={review.name} />
                    {review.linkedin && (
                      <a 
                        href={review.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="review-linkedin"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.047-1.852-3.047-1.853 0-2.136 1.445-2.136 2.939v5.677H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                  
                  <div className="review-info">
                    <h3>{review.name}</h3>
                    <h4>{review.role}</h4>
                    <h5>{review.company}</h5>
                    <div className="review-project">
                      <span>Proje:</span> {review.project}
                    </div>
                  </div>
                  
                  <div className="review-rating">
                    {renderStars(review.rating)}
                  </div>
                </div>
                
                <div className="review-content">
                  <blockquote>
                    "{review.review}"
                  </blockquote>
                </div>
                
                <div className="review-footer">
                  <div className="review-company-logo">
                    <span>{review.company.charAt(0)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="reviews-navigation">
            <div className="reviews-dots">
              {customerReviews.map((_, index) => (
                <button
                  key={index}
                  className={`review-dot ${activeReview === index ? 'active' : ''}`}
                  onClick={() => goToReview(index)}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="reviews-arrows">
              <button
                className="review-arrow prev"
                onClick={() => goToReview((activeReview - 1 + customerReviews.length) % customerReviews.length)}
                aria-label="Previous review"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </button>
              
              <button
                className="review-arrow next"
                onClick={() => goToReview((activeReview + 1) % customerReviews.length)}
                aria-label="Next review"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
