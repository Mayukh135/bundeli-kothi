import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { InquiryForm } from "@/components/InquiryForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Wifi, Car, Flower2, Umbrella, Sparkles, Droplets, Wind, Coffee, Tv } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const heroImages = [
  { src: "/images/accomodation/FullSizeRender-scaled-1.jpg", alt: "Accommodation view 1" },
  { src: "/images/accomodation/jijijijij.jpg", alt: "Accommodation view 2" },
  { src: "/images/accomodation/WhatsApp-Image-2025-02-23-at-10.13.11-AM-2.jpeg", alt: "Accommodation view 3" },
  { src: "/images/accomodation/WhatsApp-Image-2025-02-23-at-10.13.11-AM-5.jpeg", alt: "Accommodation view 4" },
  { src: "/images/accomodation/WhatsApp-Image-2025-03-06-at-11.54.14-AM-scaled.jpeg", alt: "Accommodation view 5" },
];

export default function Accommodation() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (i: number) => {
    if (i === heroIndex) return;
    setDirection(i > heroIndex ? 1 : -1);
    setHeroIndex(i);
  };
  const prev = () => {
    setDirection(-1);
    setHeroIndex((prevIndex) => (prevIndex - 1 + heroImages.length) % heroImages.length);
  };
  const next = () => {
    setDirection(1);
    setHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Carousel */}
      <div className="relative h-[100svh] min-h-[500px] flex items-center justify-center overflow-hidden" style={{ perspective: "1500px" }}>
        {/* Carousel images with zoom effect */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={heroIndex}
            src={heroImages[heroIndex].src}
            alt={heroImages[heroIndex].alt}
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
                position: "absolute" as const,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ backfaceVisibility: "hidden" }}
          />
        </AnimatePresence>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45 z-10" />

        {/* Prev / Next buttons */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/70 text-white rounded-full w-11 h-11 flex items-center justify-center transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/70 text-white rounded-full w-11 h-11 flex items-center justify-center transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all rounded-full ${i === heroIndex ? "w-6 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <section className="section-padding container-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-justify max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our farmstay offers a perfect blend of traditional charm and modern comfort, ensuring a relaxing and memorable experience. Guests can unwind in well-furnished, spacious, air-conditioned rooms that provide breathtaking views of the serene countryside. Each room is thoughtfully designed with an ensuite bathroom, a powder room, and a private patio or sit-out area, allowing guests to soak in the peaceful surroundings.
            </p>

            <div className="flex justify-center mt-5">
              <Button
                onClick={() => setIsInquiryOpen(true)}
                className="font-serif bg-primary hover:bg-primary/90 text-white px-16 h-[60px] text-[1.15rem] book-now-motion"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-8 md:py-10 lg:py-12 bg-muted/30 container-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeader subtitle="Comforts" title="Room Amenities" centered className="mb-6" />

          <p className="text-justify text-base md:text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto mb-6">
            To enhance your stay, we offer a range of amenities, including complimentary breakfast, an in-room tea and coffee maker, WiFi access, and exclusive access to our private farm. Additionally, power backup ensures uninterrupted comfort throughout your visit. Whether you're looking for a peaceful retreat or an immersive farm experience, our farmstay is the perfect destination.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {[
              { icon: Wifi,       label: "Free Wifi" },
              { icon: Car,        label: "Free Parking" },
              { icon: Flower2,    label: "Garden View" },
              { icon: Umbrella,   label: "Private Patio" },
              { icon: Sparkles,   label: "Daily House Keeping" },
              { icon: Droplets,   label: "Hot Water" },
              { icon: Wind,       label: "Aircon" },
              { icon: Coffee,     label: "Complimentary Breakfast" },
              { icon: Tv,         label: "Television" },
            ].map(({ icon: Icon, label }, i) => (
              <div key={i} className="flex items-center gap-2 p-4 bg-white rounded shadow-sm border border-border/50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                <Icon className="w-5 h-5 text-accent shrink-0" />
                <span className="font-medium text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={isInquiryOpen} onOpenChange={setIsInquiryOpen}>
        <DialogContent className="w-[95vw] max-w-3xl border-none bg-transparent p-0 shadow-none">
          <DialogHeader className="sr-only">
            <DialogTitle>Make an Inquiry</DialogTitle>
            <DialogDescription>Fill out the form and we will get back to you with availability.</DialogDescription>
          </DialogHeader>
          <div className="max-h-[86vh] overflow-y-auto p-1 sm:p-2">
            <InquiryForm />
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
