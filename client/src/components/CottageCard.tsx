import { useState } from "react";
import { ArrowRight, Users, ChevronLeft, ChevronRight, X } from "lucide-react";
import { type Cottage } from "@shared/schema";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BedDouble, Maximize } from "lucide-react";
interface CottageCardProps {
  cottage: Cottage;
  index: number;
  showViewDetails?: boolean;
  descriptionClassName?: string;
}

export function CottageCard({
  cottage,
  index,
  showViewDetails = true,
  descriptionClassName,
}: CottageCardProps) {
  const bgImage = cottage.imageUrl || "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80";

  // Carousel logic
  const images = (cottage.images && cottage.images.length > 0) ? cottage.images : [bgImage];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [guests, setGuests] = useState(1);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentImage = images[currentImageIndex];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group relative bg-card rounded-lg overflow-hidden border border-border/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
      >
        <div className="aspect-[4/3] overflow-hidden relative group/carousel">
          <img
            src={currentImage}
            alt={cottage.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Carousel Controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-20 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-20 cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>

              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                {images.map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </>
          )}

          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-primary px-3 py-1 text-sm font-bold uppercase tracking-wider rounded-sm shadow-sm z-10">
            {cottage.type}
          </div>
        </div>

        <div className="p-8">
          <div className="mb-4">
            <h3 className="text-2xl font-serif text-foreground group-hover:text-primary transition-colors">
              {cottage.name}
            </h3>
          </div>

          <p
            className={cn(
              "text-muted-foreground mb-4",
              showViewDetails && "line-clamp-3",
              descriptionClassName,
            )}
          >
            {cottage.description}
          </p>

          {showViewDetails && (
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors cursor-pointer group/link mt-auto"
            >
              View Details <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
            </button>
          )}
        </div>
      </motion.div>

      {/* Details Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => { setShowModal(false); setGuests(1); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => { setShowModal(false); setGuests(1); }}
                className="absolute top-4 right-4 bg-muted hover:bg-muted/80 text-foreground rounded-full p-2 transition-colors z-10"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 md:p-8 lg:p-10">
                <div className="grid lg:grid-cols-3 gap-10">

                  {/* Left Column */}
                  <div className="lg:col-span-2 space-y-10">

                    {/* About This Property */}
                    <div className="space-y-4">
                      <h2 className="text-2xl md:text-3xl font-serif text-foreground font-bold">About This Property</h2>
                      <p className="text-muted-foreground leading-relaxed text-[15px]">
                        {cottage.type === "Sustainability"
                          ? "The staircase leads to a child's bed but also opens onto a small machan that connects with the neighbouring room, making them ideal for an extended family or friends travelling together. There is space to accommodate an extra bed on the ground floor and we can provide smaller three-sided cots for younger children."
                          : "Our rooms are spacious and well-appointed, designed in a way that precludes the need for energy heavy heating and cooling. High ceilings and thick mud walls keep them cool in the warmer months and warm at colder times. While outside temperatures may change by 10–15 degrees, inside the difference will only be one or two degrees throughout."
                        }
                      </p>
                    </div>

                    {/* Amenities */}
                    {cottage.features && cottage.features.length > 0 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-serif text-foreground font-bold">Amenities</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {cottage.features.map((amenity, i) => (
                            <div key={i} className="flex items-center gap-2 px-4 py-2 bg-secondary/60 border border-border/60 rounded-md text-sm font-medium text-foreground">
                              <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {amenity}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Available Rooms */}
                    <div className="space-y-6">
                      <h2 className="text-2xl font-serif text-foreground font-bold">Available Rooms</h2>

                      <div className="flex flex-col gap-4">
                        <div className="border border-accent/40 bg-secondary/40 rounded-xl p-5 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm">
                          <div className="space-y-4">
                            <h3 className="text-xl font-serif font-bold text-foreground">{cottage.name}</h3>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {cottage.capacity} guests</span>
                              <span className="flex items-center gap-1.5"><BedDouble className="w-4 h-4" /> {cottage.capacity > 2 ? '2' : '1'} King</span>
                              <span className="flex items-center gap-1.5"><Maximize className="w-4 h-4" /> {cottage.capacity > 2 ? '150 m²' : '50 m²'}</span>
                            </div>
                            {cottage.features && cottage.features.length > 0 && (
                              <div className="flex flex-wrap gap-2 pt-1">
                                {cottage.features.slice(0, 3).map((f, idx) => (
                                  <span key={idx} className="px-3 py-1 bg-muted/60 text-muted-foreground text-xs font-medium rounded-full">
                                    {f}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="text-right flex-shrink-0 w-full md:w-auto flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start">
                            <span className="text-2xl font-bold text-foreground font-sans">Rs. {cottage.price}</span>
                            <span className="text-sm text-muted-foreground">per night</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Booking Sidebar */}
                  <div className="lg:col-span-1">
                    <div className="sticky top-24 border border-border/80 bg-white rounded-xl p-6 shadow-sm space-y-6">
                      <h3 className="text-xl font-serif font-bold">Book Your Stay</h3>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold">Check-in</label>
                          <input type="date" className="flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-muted-foreground" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold">Check-out</label>
                          <input type="date" className="flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-muted-foreground" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold">Guests</label>
                          <select
                            value={guests}
                            onChange={(e) => setGuests(parseInt(e.target.value))}
                            className={cn(
                              "flex h-11 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-colors",
                              guests > cottage.capacity ? "border-red-500 focus-visible:ring-red-500 text-red-600" : "border-input text-muted-foreground"
                            )}
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                          </select>
                          <AnimatePresence>
                            {guests > cottage.capacity && (
                              <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-[12px] text-red-500 font-medium leading-tight"
                              >
                                ⚠️ Exceeds max capacity of {cottage.capacity} guests for this room.
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="text-center text-[13px] text-muted-foreground mb-4 font-medium">
                          ✓ Selected: {cottage.name}
                        </div>
                        <Button
                          className={cn(
                            "w-full h-12 text-md transition-colors rounded-md font-medium mt-2",
                            guests > cottage.capacity ? "bg-muted text-muted-foreground pointer-events-none" : "bg-primary hover:bg-primary/90 text-primary-foreground"
                          )}
                          disabled={guests > cottage.capacity}
                        >
                          Reserve Now
                        </Button>
                        <p className="text-center text-[11px] text-muted-foreground mt-4 tracking-tight">
                          No payment required — confirm your reservation instantly
                        </p>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
