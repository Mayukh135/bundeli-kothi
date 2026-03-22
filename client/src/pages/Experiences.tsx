import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useActivities } from "@/hooks/use-content";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { type Activity } from "@shared/schema";
import { motion, AnimatePresence } from "framer-motion";

function ActivityImage({ activity }: { activity: Activity }) {
  const images =
    activity.images && activity.images.length > 0
      ? activity.images
      : [activity.imageUrl];
  const [idx, setIdx] = useState(0);
  const [direction, setDirection] = useState(1);

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    setDirection(-1);
    setIdx((i) => (i - 1 + images.length) % images.length);
  };
  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    setDirection(1);
    setIdx((i) => (i + 1) % images.length);
  };

  const goToDot = (e: React.MouseEvent, i: number) => {
    e.preventDefault();
    setDirection(i > idx ? 1 : -1);
    setIdx(i);
  };

  return (
    <div className="relative aspect-[4/3] rounded-lg shadow-xl group border border-border/50" style={{ perspective: "1500px" }}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={idx}
          src={images[idx]}
          alt={activity.title}
          custom={direction}
          variants={{
            enter: (dir: number) => ({
              rotateY: dir > 0 ? 90 : -90,
              transformOrigin: dir > 0 ? "right center" : "left center",
              opacity: 0,
            }),
            center: (dir: number) => ({
              rotateY: 0,
              transformOrigin: dir > 0 ? "right center" : "left center",
              opacity: 1,
            }),
            exit: (dir: number) => ({
              rotateY: dir > 0 ? -90 : 90,
              transformOrigin: dir > 0 ? "left center" : "right center",
              opacity: 0,
              position: "absolute" as any,
            }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
          style={{ backfaceVisibility: "hidden" }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 border-[1px] border-white/20 m-4 rounded-sm pointer-events-none" />

      {images.length > 1 && (
        <>
          {/* Prev / Next */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full w-9 h-9 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full w-9 h-9 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => goToDot(e, i)}
                className={cn(
                  "rounded-full transition-all",
                  i === idx ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/80"
                )}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Experiences() {
  const { data: activities, isLoading } = useActivities();

  useEffect(() => {
    if (!isLoading && window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const yOffset = -100; // Account for fixed navigation
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 150);
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Page Header */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            src="/images/panna_jungle1.jpg"
            alt="Experiences in Panna"
            initial={{ scale: 1 }}
            animate={{ scale: 1.15 }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif mb-4">Majestic Orchha</h1>
          <div className="max-w-5xl mx-auto space-y-3">
            <p className="text-base md:text-lg text-white/90 text-justify">
              Immerse yourself in the landscape of Orchha.
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding container-padding">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-16 md:space-y-20">
              {activities?.map((activity, index) => (
                <div
                  key={activity.id}
                  id={activity.title.toLowerCase().replace(/\s+/g, '-')}
                  className={cn(
                    "flex flex-col md:flex-row gap-10 lg:gap-14 items-center",
                    index % 2 === 1 && "md:flex-row-reverse"
                  )}
                >
                  <div className="w-full md:w-1/2">
                    <ActivityImage activity={activity} />
                  </div>
                  <div className="w-full md:w-1/2">
                    <h3 className="text-3xl lg:text-4xl font-serif mb-6 text-primary">{activity.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed text-justify">
                      {activity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
