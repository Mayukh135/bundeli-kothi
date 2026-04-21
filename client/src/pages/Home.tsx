import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { InquiryForm } from "@/components/InquiryForm";
import { useCottages, useTestimonials } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

const heroImages = [
  "/images/slider/WhatsApp-Image-2025-08-24-at-12.55.00-AM-1.jpeg",
  "/images/slider/WhatsApp-Image-2025-08-24-at-12.55.00-AM.jpeg",
  "/images/slider/WhatsApp-Image-2025-08-24-at-12.55.01-AM.jpeg"
];

export default function Home() {
  const { data: cottages, isLoading: cottagesLoading } = useCottages();
  const { data: testimonials, isLoading: testimonialsLoading } = useTestimonials();
  const googleReviewsUrl = "https://www.google.com/travel/search?q=google%20maps%20bundeli%20kothi&g2lb=4965990%2C72471280%2C72560029%2C72573224%2C72647020%2C72686036%2C72803964%2C72882230%2C72958624%2C73059275%2C73064764%2C121529349&hl=en-IN&gl=in&cs=1&ssta=1&ts=CAEaRwopEicyJTB4Mzk3Nzc5OTlkNzI4NmNkZDoweDQ0OWQ2YWI3OTI5MjQxZDQSGhIUCgcI6g8QCBgBEgcI6g8QCBgCGAEyAhAA&qs=CAEyE0Nnb0kxSVBKbFBuVzJzNUVFQUU4AkIJCdRBkpK3ap1EQgkJ1EGSkrdqnUQ&ap=ugEHcmV2aWV3cw&ictx=111&ved=0CAAQ5JsGahcKEwjIqsbvsP2TAxUAAAAAHQAAAAAQDg";
  const reviewCards = testimonials ?? [];

  // Hero carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [heroDirection, setHeroDirection] = useState(1);

  // Bird photo carousel state
  const birdImages = [
    { src: "/images/a-unique-farmstay/DJI_0745-01-Copy-scaled-1.jpg", alt: "A Unique Farmstay view 1" },
    { src: "/images/a-unique-farmstay/dji_fly_20240417_181336_828_1713357828238_photo_optimized-01-scaled-1.jpeg", alt: "A Unique Farmstay view 2" },
    { src: "/images/a-unique-farmstay/IMG_1466-scaled-1.jpg", alt: "A Unique Farmstay view 3" },
    { src: "/images/a-unique-farmstay/jijijijij.jpg", alt: "A Unique Farmstay view 4" },
  ];
  const [birdIndex, setBirdIndex] = useState(0);
  const [birdDirection, setBirdDirection] = useState(1);
  const prevBird = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBirdDirection(-1);
    setBirdIndex((prev) => (prev - 1 + birdImages.length) % birdImages.length);
  };
  const nextBird = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBirdDirection(1);
    setBirdIndex((prev) => (prev + 1) % birdImages.length);
  };
  const goToBird = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    if (index === birdIndex) return;
    setBirdDirection(index > birdIndex ? 1 : -1);
    setBirdIndex(index);
  };

  // Bird carousel auto-rotation every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBirdDirection(1);
      setBirdIndex((prev) => (prev + 1) % birdImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [birdImages.length]);

  // Carousel timer - change image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroDirection(1);
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const accommodationCottage = cottages?.find((cottage) => cottage.type === "Accommodation");
  const sustainabilityCottage = cottages?.find((cottage) => cottage.type === "Sustainability");

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[88svh] min-h-[560px] md:h-screen md:min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Cinematic hero slider */}
          <AnimatePresence initial={false} custom={heroDirection}>
            <motion.img
              key={currentImageIndex}
              src={heroImages[currentImageIndex]}
              alt={`Bundeli Kothi Landscape ${currentImageIndex + 1}`}
              loading={currentImageIndex === 0 ? "eager" : "lazy"}
              fetchPriority={currentImageIndex === 0 ? "high" : "auto"}
              decoding="async"
              custom={heroDirection}
              initial={(direction: number) => ({
                opacity: 0,
                x: direction > 0 ? 80 : -80,
                scale: 1.08,
              })}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1.02,
              }}
              exit={(direction: number) => ({
                opacity: 0,
                x: direction > 0 ? -60 : 60,
                scale: 1.04,
              })}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/30 md:bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-primary text-sm md:text-base uppercase tracking-[0.3em] font-medium mb-6 block"
          >
            A HOSTED EXPERIENCE
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 md:mb-8 leading-tight"
          >
            Bundeli Kothi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/85 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 md:mb-10 font-light text-center md:text-justify"
          >
            A 4-room boutique retreat near Orchha, surrounded by orchards, slow living, and deeply personal hospitality.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-24 md:bottom-20 left-1/2 -translate-x-1/2 text-white animate-bounce"
        >
          <ArrowRight className="rotate-90 w-6 h-6" />
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="section-padding container-padding">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-14 items-center">
          <div className="relative p-4">
            {/* Bird photo carousel */}
            <div className="aspect-[16/10] rounded-lg shadow-2xl relative z-10 border-4 border-accent/20 box-border group overflow-hidden">
              <AnimatePresence initial={false} custom={birdDirection}>
                <motion.img
                  key={birdIndex}
                  src={birdImages[birdIndex].src}
                  alt={birdImages[birdIndex].alt}
                  loading="lazy"
                  decoding="async"
                  custom={birdDirection}
                  initial={(direction: number) => ({ opacity: 0, x: direction > 0 ? 40 : -40, scale: 1.06 })}
                  animate={{ opacity: 1, x: 0, scale: 1.01 }}
                  exit={(direction: number) => ({ opacity: 0, x: direction > 0 ? -30 : 30, scale: 1.03 })}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              {/* Prev button */}
              <button
                onClick={prevBird}
                className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 z-20 bg-black/45 hover:bg-black/70 text-white rounded-full w-11 h-11 md:w-9 md:h-9 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity text-xl font-bold"
                aria-label="Previous bird image"
              >
                &#8249;
              </button>
              {/* Next button */}
              <button
                onClick={nextBird}
                className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 z-20 bg-black/45 hover:bg-black/70 text-white rounded-full w-11 h-11 md:w-9 md:h-9 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity text-xl font-bold"
                aria-label="Next bird image"
              >
                &#8250;
              </button>
              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                {birdImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => goToBird(e, i)}
                    className="w-6 h-6 min-w-6 min-h-6 rounded-full flex items-center justify-center touch-manipulation"
                    aria-label={`Go to bird image ${i + 1}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-all ${i === birdIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <SectionHeader
              subtitle="Welcome"
              title="A Hosted Experience"
              centered={false}
              className="mb-6 [&>h2]:text-primary [&>p]:text-justify"
              description={`Tucked away in the historic town of Orchha, Bundeli Kothi is a five-acre estate where time slows down.

Our home offers a rare pause between destinations where you can slow down, stay longer, and truly unwind.
Wake up to birdsong, wander through organic farms, and savour meals crafted from ingredients grown just steps away.
Spend your afternoons under the shade of neem trees, or simply do nothing at all.

This is not just a stay - it is a gentle return to nature, comfort, and quiet luxury.`}
            />
            <a href="/about">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8 h-12">
                Read Our Story
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Farm-to-Table Experience */}
      <section className="section-padding container-padding bg-muted/50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <SectionHeader
              subtitle="Experience"
              title="Farm-to-Table Dining"
              centered={false}
              className="mb-0 [&>h2]:text-primary [&>p]:text-justify"
              description={`Much of what you eat here is grown on the land itself. Fresh, seasonal, and simple—meals at Bundeli Kothi are not just nourishing, but memorable. Long breakfasts and slow dinners often become the highlight of the stay.`}
            />
          </div>
          <div className="relative rounded-lg overflow-hidden shadow-xl border border-border/60">
            <img
              src="/images/farm-to-plate/farm-to-plate-1.jpg"
              alt="Farm-to-Table dining at Bundeli Kothi"
              loading="lazy"
              decoding="async"
              className="w-full h-[320px] md:h-[420px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured Cottages */}
      <section className="section-padding bg-muted/50 container-padding">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-14 items-center">
          {cottagesLoading ? (
            <>
              <div className="h-[360px] md:h-[420px] bg-gray-200 animate-pulse rounded-lg" />
              <div className="h-[260px] bg-gray-200 animate-pulse rounded-lg" />
            </>
          ) : accommodationCottage ? (
            <>
              <Link href="/accommodation" className="block">
                <div className="relative rounded-lg overflow-hidden shadow-xl border border-border/60">
                  <img
                    src={accommodationCottage.images?.[0] || accommodationCottage.imageUrl}
                    alt="Accommodation at Bundeli Kothi"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-[320px] md:h-[420px] object-cover"
                  />
                </div>
              </Link>
              <div>
                <SectionHeader
                  subtitle="Accommodation"
                  title="Comfort, Space & Quiet Luxury"
                  centered={false}
                  className="mb-6 [&>h2]:text-primary [&>p]:text-justify"
                  description={accommodationCottage.description}
                />
                <Link href="/accommodation">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8 h-12">
                    Explore Accommodation
                  </Button>
                </Link>
              </div>
            </>
          ) : null}
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="section-padding container-padding bg-background">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-14 items-center">
          {cottagesLoading ? (
            <>
              <div className="h-[260px] bg-gray-200 animate-pulse rounded-lg" />
              <div className="h-[360px] md:h-[420px] bg-gray-200 animate-pulse rounded-lg" />
            </>
          ) : sustainabilityCottage ? (
            <>
              <div>
                <SectionHeader
                  subtitle="SUSTAINABILITY"
                  title="Our Way of Life"
                  centered={false}
                  className="mb-6 [&>h2]:text-primary [&>p]:text-justify"
                  description={sustainabilityCottage.description}
                />
                <Link href="/about#sustainability">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8 h-12">
                    Learn About Sustainability
                  </Button>
                </Link>
              </div>
              <Link href="/about#sustainability" className="block">
                <div className="relative rounded-lg overflow-hidden shadow-xl border border-border/60">
                  <img
                    src={sustainabilityCottage.images?.[0] || sustainabilityCottage.imageUrl}
                    alt="Sustainability at Bundeli Kothi"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-[320px] md:h-[420px] object-cover"
                  />
                </div>
              </Link>
            </>
          ) : null}
        </div>
      </section>

      {/* Guest Reviews */}
      <section className="section-padding container-padding bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            subtitle="Reviews"
            title="Why Guests Fall in Love With Bundeli Kothi"
            className="[&>h2]:text-primary [&>p]:text-center"
            description="Stories from guests who found more than a stay at Bundeli Kothi."
          />

          <div className="relative overflow-hidden">
            <div className="reviews-marquee flex w-max gap-6 py-2">
              {[0, 1].map((groupIndex) => (
                <div key={groupIndex} className="flex gap-6 pr-6">
                  {testimonialsLoading
                    ? [1, 2].map((i) => (
                        <div key={`${groupIndex}-${i}`} className="h-56 w-[320px] bg-gray-200 animate-pulse rounded-lg shrink-0" />
                      ))
                    : reviewCards.map((testimonial) => (
                        <div
                          key={`${groupIndex}-${testimonial.id}`}
                          className="bg-white rounded-lg border border-border/70 shadow-sm p-8 flex flex-col justify-between w-[320px] md:w-[360px] shrink-0"
                        >
                          <p className="text-muted-foreground text-justify leading-relaxed mb-6">
                            "{testimonial.content}"
                          </p>
                          <div>
                            <p className="font-serif text-lg text-foreground">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                          </div>
                        </div>
                      ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8 h-12">
              <a href={googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="min-w-6 min-h-6">
                Read All Reviews on Google
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Experience Highlights - Parallax-ish */}
      <section className="relative py-20 md:py-24 overflow-hidden bg-muted/20">
        <div className="relative z-10 container-padding max-w-7xl mx-auto text-center">
          <SectionHeader
            subtitle="Explore Orchha"
            title="Adventures in Orchha"
            description="Discover Orchha through royal palaces, sacred temples, river adventures, and rich natural landscapes."
            className="mx-auto [&>h2]:text-primary [&>p]:text-justify"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { title: "Raj Mahal", desc: "Explore Bundela grandeur in Orchha's iconic royal palace.", image: "/images/raja-mahal-orchha.jpg", icon: "🏰", link: "/experiences#raj-mahal" },
              { title: "Laxmi Narayan Temple", desc: "Admire murals, carvings, and unique Bundela architecture.", image: "/images/laxmi-narayan-temple.jpg", icon: "🛕", link: "/experiences#laxmi-narayan-temple" },
              { title: "Chhatris", desc: "Witness the riverside cenotaphs and their striking skyline.", image: "/images/chhatris.jpg", icon: "🏛️", link: "/experiences#chhatris" },
            ].map((item: { title: string; desc: string; icon: string; image?: string, link: string }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white rounded-lg shadow-sm border border-border hover:shadow-[0_0_25px_rgba(64,114,83,0.3)] hover:border-primary/50 active:shadow-[0_0_25px_rgba(64,114,83,0.5)] active:border-primary active:scale-[0.98] transition-all duration-300 group overflow-hidden"
              >
                <Link href={item.link} className="block p-8 w-full h-full cursor-pointer focus:outline-none">
                  <div className="mb-4 group-hover:scale-110 group-active:scale-110 transition-transform duration-300">
                    {item.image ? (
                      <img src={item.image} alt={item.title} loading="lazy" decoding="async" className="w-20 h-20 object-cover rounded-lg mx-auto shadow-md" />
                    ) : (
                      <div className="text-4xl">{item.icon}</div>
                    )}
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-3 text-foreground group-hover:text-primary group-active:text-primary transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/experiences">
              <Button size="lg" className="bg-[#cd8e2a] text-white hover:bg-[#b57d25] border-none">
                Discover More Activities
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section className="section-padding bg-secondary/30 container-padding" id="booking">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            subtitle="Contact Us"
            title="Begin Your Journey"
            className="[&>h2]:text-primary [&>p]:text-justify"
            description="Ready to experience the untamed beauty of Orchha? Send us an inquiry and we will curate your perfect stay."
          />
          <InquiryForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}
