import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function TestimonialsSection() {
    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            specialty: "Patient, Cardiac Care",
            avatar: "/api/placeholder/100/100",
            text: "The care I received exceeded all my expectations. The doctors took time to explain everything thoroughly and made me feel completely at ease throughout my treatment.",
            rating: 5,
            date: "March 2025"
        },
        {
            id: 2,
            name: "Michael Rodriguez",
            specialty: "Patient, Orthopedic Surgery",
            avatar: "/api/placeholder/100/100",
            text: "After my knee replacement, the rehabilitation team designed a recovery plan perfectly tailored to my needs. Six months later, I'm hiking again pain-free!",
            rating: 5,
            date: "January 2025"
        },
        {
            id: 3,
            name: "Emma Chen",
            specialty: "Patient, Preventive Care",
            avatar: "/api/placeholder/100/100",
            text: "The annual wellness program has transformed my approach to health. The personalized guidance and supportive staff make maintaining a healthy lifestyle so much easier.",
            rating: 4,
            date: "April 2025"
        },
        {
            id: 4,
            name: "James Wilson",
            specialty: "Patient, Emergency Care",
            avatar: "/api/placeholder/100/100",
            text: "When I was rushed to the ER, the team acted with incredible speed and precision. Their expertise and compassion during a frightening time made all the difference.",
            rating: 5,
            date: "February 2025"
        },
        {
            id: 5,
            name: "Olivia Garcia",
            specialty: "Patient, Maternity Care",
            avatar: "/api/placeholder/100/100",
            text: "From prenatal through postpartum, the entire maternal health team provided exceptional support. They made the journey to motherhood feel safe and empowering.",
            rating: 5,
            date: "April 2025"
        },
        {
            id: 6,
            name: "Robert Kim",
            specialty: "Patient, Cancer Treatment",
            avatar: "/api/placeholder/100/100",
            text: "Throughout my cancer treatment, I felt like more than just a patient. The personalized approach and continuous support from the entire oncology team gave me strength.",
            rating: 5,
            date: "March 2025"
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const cardsToShow = 3;
    const totalSlides = Math.ceil(testimonials.length / cardsToShow);

    const getCurrentGroup = () => {
        const start = activeIndex * cardsToShow;
        return testimonials.slice(start, start + cardsToShow);
    };

    const goToNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setActiveIndex((prev) => (prev + 1) % totalSlides);
    };

    const goToPrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToIndex = (index) => {
        if (isAnimating || index === activeIndex) return;
        setIsAnimating(true);
        setActiveIndex(index);
    };

    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => setIsAnimating(false), 500);
            return () => clearTimeout(timer);
        }
    }, [isAnimating]);

    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(goToNext, 12000);
        return () => clearInterval(interval);
    }, []);

    const renderStars = (rating) => {
        return Array.from({ length: 5 }).map((_, i) => (
            <svg
                key={i}
                className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    const TestimonialCard = ({ testimonial }) => (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="p-6">
                <div className="flex items-center mb-4">
                    <div className="relative mr-4">
                        <div className="absolute inset-0 bg-indigo-500 rounded-full opacity-10 transform scale-110"></div>
                        <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
                        />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                        <p className="text-sm text-indigo-600">{testimonial.specialty}</p>
                    </div>
                </div>

                <div className="mb-2">
                    <div className="flex mb-1">{renderStars(testimonial.rating)}</div>
                    <p className="text-xs text-gray-500">{testimonial.date}</p>
                </div>

                <div className="relative">
                    <Quote size={18} className="absolute -left-1 -top-1 text-indigo-200" />
                    <blockquote className="pl-5 pt-2">
                        <p className="text-gray-700 text-sm leading-relaxed">
                            {testimonial.text}
                        </p>
                    </blockquote>
                </div>
            </div>
        </div>
    );

    return (
        <section className="  py-24">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        What Our Patients Say
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Real stories from patients who have trusted us with their care
                    </p>
                </div>

                <div className="relative max-w-6xl mx-auto px-4">
                    {/* Testimonial slider */}
                    <div
                        className="transition-all duration-500 ease-in-out"
                        style={{
                            opacity: isAnimating ? 0.7 : 1,
                        }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {getCurrentGroup().map((testimonial) => (
                                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                            ))}
                        </div>
                    </div>

                    {/* Navigation buttons */}
                    <div className="flex justify-between absolute top-1/2 -translate-y-1/2 w-full -mx-10 z-20">
                        <button
                            onClick={goToPrev}
                            className="bg-white rounded-full p-3 shadow-lg text-gray-700 hover:text-indigo-600 hover:scale-110 transition-all duration-200"
                            aria-label="Previous testimonials"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={goToNext}
                            className="bg-white rounded-full p-3 shadow-lg text-gray-700 hover:text-indigo-600 hover:scale-110 transition-all duration-200"
                            aria-label="Next testimonials"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                {/* Indicator dots */}
                <div className="flex justify-center mt-10 gap-3">
                    {Array.from({ length: totalSlides }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => goToIndex(idx)}
                            className={`transition-all duration-300 ${activeIndex === idx
                                    ? 'w-8 bg-indigo-600'
                                    : 'w-3 bg-gray-300 hover:bg-gray-400'
                                } h-3 rounded-full`}
                            aria-label={`Go to testimonial group ${idx + 1}`}
                            aria-current={activeIndex === idx ? 'true' : 'false'}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}