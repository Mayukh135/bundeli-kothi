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
import { useEffect, useState } from "react";

const stayImages = [
  "/images/accomodation/FullSizeRender-scaled-1.jpg",
  "/images/accomodation/jijijijij.jpg",
  "/images/accomodation/WhatsApp-Image-2025-02-23-at-10.13.11-AM-2.jpeg",
  "/images/accomodation/WhatsApp-Image-2025-02-23-at-10.13.11-AM-5.jpeg",
  "/images/accomodation/WhatsApp-Image-2025-03-06-at-11.54.14-AM-scaled.jpeg",
];

export default function Accommodation() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [stayImageIndex, setStayImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStayImageIndex((prev) => (prev + 1) % stayImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const prevStayImage = () => {
    setStayImageIndex((prev) => (prev - 1 + stayImages.length) % stayImages.length);
  };

  const nextStayImage = () => {
    setStayImageIndex((prev) => (prev + 1) % stayImages.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-36 md:pt-40 pb-10 container-padding">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-serif text-primary text-center mb-8 md:mb-10">
            "Spacious, peaceful, and beautifully designed." - Guest from France
          </h1>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative rounded-lg overflow-hidden border border-border/40 shadow-xl group">
            <img
              src={stayImages[stayImageIndex]}
              alt="Your stay at Bundeli Kothi"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-[320px] md:h-[460px] object-cover"
            />

            <button
              onClick={prevStayImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/45 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center"
              aria-label="Previous stay image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextStayImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/45 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center"
              aria-label="Next stay image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-5">
              Your Stay at Bundeli Kothi
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5">
              Each room opens into nature-with private sit-outs, generous space, and everything you need to unwind.
            </p>

            <ul className="space-y-2 text-muted-foreground text-base md:text-lg mb-6">
              <li>• Private patio overlooking gardens</li>
              <li>• Large, airy rooms filled with natural light</li>
              <li>• Quiet, uninterrupted surroundings</li>
              <li>• Designed for comfort and slow living</li>
            </ul>

            <p className="text-muted-foreground text-sm md:text-base mb-6">
              Includes: AC | WiFi | Hot Water | Tea/Coffee | Housekeeping
            </p>

            <div>
              <Button
                onClick={() => setIsInquiryOpen(true)}
                className="font-serif bg-primary hover:bg-primary/90 text-white px-10 h-12 book-now-motion"
              >
                Plan Your Stay
              </Button>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-8 md:py-10 lg:py-12 bg-muted/30 container-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeader subtitle="" title="Room Amenities" centered className="mb-6 [&>h2]:text-primary" />

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
            <DialogTitle>Plan Your Stay</DialogTitle>
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
