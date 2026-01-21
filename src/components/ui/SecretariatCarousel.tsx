import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { allSecretariat, TeamMember } from '@/data/team';

export const SecretariatCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const members = allSecretariat;

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % members.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, members.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + members.length) % members.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % members.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const getVisibleIndices = () => {
    const indices = [];
    for (let i = -2; i <= 2; i++) {
      indices.push((currentIndex + i + members.length) % members.length);
    }
    return indices;
  };

  const visibleIndices = getVisibleIndices();

  return (
    <section className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Meet the Secretariat
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get to know the founders, heads, and deputies who power MWEF.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
            aria-label="Previous member"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
            aria-label="Next member"
          >
            <ChevronRight size={24} />
          </button>

          {/* Cards Container */}
          <div className="flex items-center justify-center h-[400px] px-16">
            <div className="relative w-full flex items-center justify-center">
              {visibleIndices.map((memberIndex, position) => {
                const member = members[memberIndex];
                const offset = position - 2; // -2, -1, 0, 1, 2
                const isCenter = offset === 0;
                
                const scale = isCenter ? 1 : 0.75;
                const opacity = Math.abs(offset) === 2 ? 0.4 : Math.abs(offset) === 1 ? 0.7 : 1;
                const zIndex = 10 - Math.abs(offset);
                const xOffset = offset * 200;

                return (
                  <motion.div
                    key={`${memberIndex}-${position}`}
                    className="absolute cursor-pointer"
                    style={{ zIndex }}
                    animate={{
                      x: xOffset,
                      scale,
                      opacity,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                    }}
                    onClick={() => !isCenter && goToSlide(memberIndex)}
                  >
                    <div 
                      className={`relative overflow-hidden rounded-xl ${
                        isCenter 
                          ? 'w-64 h-80 md:w-72 md:h-96' 
                          : 'w-48 h-60 md:w-56 md:h-72'
                      }`}
                      style={{
                        background: isCenter 
                          ? 'linear-gradient(135deg, hsl(var(--accent) / 0.2), hsl(var(--primary) / 0.1))' 
                          : 'linear-gradient(135deg, hsl(var(--muted)), hsl(var(--secondary)))',
                      }}
                    >
                      {/* Member Image */}
                      <div className="absolute inset-0">
                        <img
                          src={member.image || '/placeholder.svg'}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      </div>

                      {/* Member Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className={`font-bold ${isCenter ? 'text-xl md:text-2xl' : 'text-sm md:text-base'}`}>
                          {member.name}
                        </h3>
                        <p className={`text-white/80 ${isCenter ? 'text-base' : 'text-xs'}`}>
                          {member.role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Link
            to="/about/secretariat"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-md transition-all duration-200 hover:opacity-90"
          >
            Explore the Secretariat
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
