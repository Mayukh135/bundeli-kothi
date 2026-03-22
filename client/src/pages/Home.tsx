import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { CottageCard } from "@/components/CottageCard";
import { InquiryForm } from "@/components/InquiryForm";
import { useCottages } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const heroImages = [
  "/images/slider/WhatsApp-Image-2025-08-24-at-12.55.00-AM-1.jpeg",
  "/images/slider/WhatsApp-Image-2025-08-24-at-12.55.00-AM.jpeg",
  "/images/slider/WhatsApp-Image-2025-08-24-at-12.55.01-AM.jpeg"
];

export default function Home() {
  const { data: cottages, isLoading: cottagesLoading } = useCottages();

  // Hero carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Bird photo carousel state
  const birdImages = [
    { src: "/images/a-unique-farmstay/DJI_0745-01-Copy-scaled-1.jpg", alt: "A Unique Farmstay view 1" },
    { src: "/images/a-unique-farmstay/dji_fly_20240417_181336_828_1713357828238_photo_optimized-01-scaled-1.jpeg", alt: "A Unique Farmstay view 2" },
    { src: "/images/a-unique-farmstay/IMG_1466-scaled-1.jpg", alt: "A Unique Farmstay view 3" },
    { src: "/images/a-unique-farmstay/jijijijij.jpg", alt: "A Unique Farmstay view 4" },
  ];
  const [birdIndex, setBirdIndex] = useState(0);
  const prevBird = (e: React.MouseEvent) => { e.stopPropagation(); setBirdIndex((prev) => (prev - 1 + birdImages.length) % birdImages.length); };
  const nextBird = (e: React.MouseEvent) => { e.stopPropagation(); setBirdIndex((prev) => (prev + 1) % birdImages.length); };

  // Bird carousel auto-rotation every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBirdIndex((prev) => (prev + 1) % birdImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [birdImages.length]);

  // Carousel timer - change image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Show only 2 cottages on home
  const featuredCottages = cottages?.slice(0, 2) || [];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Carousel background images */}
          {heroImages.map((img, index) => (
            <motion.img
              key={img}
              src={img}
              alt={`Bundeli Kothi Landscape ${index + 1}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
              transition={{ duration: 1.5 }} // Smooth 1.5s crossfade
              className="absolute inset-0 w-full h-full object-cover"
            />
          ))}
          <div className="absolute inset-0 bg-black/30 md:bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/90 text-sm md:text-base uppercase tracking-[0.3em] font-medium mb-6 block"
          >
            A UNIQUE FARMSTAY
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-tight"
          >
            Bundeli Kothi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light"
          >
            A serene farmstay retreat nestled in the heart of Bundelkhand, near the historic charm of Orchha.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white animate-bounce"
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
              <img
                key={birdIndex}
                src={birdImages[birdIndex].src}
                alt={birdImages[birdIndex].alt}
                className="w-full h-full object-cover transition-all duration-700"
              />
              {/* Prev button */}
              <button
                onClick={prevBird}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white rounded-full w-9 h-9 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xl font-bold"
                aria-label="Previous bird image"
              >
                &#8249;
              </button>
              {/* Next button */}
              <button
                onClick={nextBird}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white rounded-full w-9 h-9 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xl font-bold"
                aria-label="Next bird image"
              >
                &#8250;
              </button>
              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                {birdImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setBirdIndex(i); }}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${i === birdIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
                    aria-label={`Go to bird image ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div>
            <SectionHeader
              subtitle="Welcome"
              title="A unique Farmstay"
              centered={false}
              className="mb-6 [&>p]:text-justify"
              description="Bundeli Kothi is a serene retreat in Orchha, Madhya Pradesh, spread over five acres of lush greenery. It offers an immersive natural experience, with organic farms, manicured lawns, and peaceful surroundings. Guests can enjoy farm-fresh meals from homegrown fruits, vegetables, and grains. The tranquil ambiance is perfect for relaxation, whether sunbathing or reading under a neem tree. Wake up to the soothing sounds of nature and experience sustainable living at its finest."
            />
            <a href="/about">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8 h-12">
                Read Our Story
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Featured Cottages */}
      <section className="section-padding bg-muted/50 container-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            subtitle="Accommodation"
            title="Earth-Walled Luxury"
            description="Our independent cottages are crafted from mud and thatch, designed to catch the breeze and blend seamlessly with the surroundings."
          />

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {cottagesLoading ? (
              // Loading skeletons
              [1, 2].map((i) => (
                <div key={i} className="h-[500px] bg-gray-200 animate-pulse rounded-lg" />
              ))
            ) : (
              featuredCottages.map((cottage, i) => (
                <Link
                  key={cottage.id}
                  href={cottage.type === "Sustainability" ? "/about#sustainability" : "/accommodation"}
                  className="block"
                >
                  <CottageCard cottage={cottage} index={i} showViewDetails={false} />
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Experience Highlights - Parallax-ish */}
      <section className="relative py-20 md:py-24 overflow-hidden bg-muted/20">
        <div className="absolute inset-0 z-0 opacity-10">
          {/* Heritage-themed background texture */}
          <img
            src="https://images.unsplash.com/photo-1505553877995-1f92e850b297?q=80&w=2692&auto=format&fit=crop"
            alt="Orchha heritage landscape"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 container-padding max-w-7xl mx-auto text-center">
          <SectionHeader
            subtitle="Experience Orchha"
            title="Adventures in Orchha"
            description="Discover Orchha through royal palaces, sacred temples, river adventures, and rich natural landscapes."
            className="mx-auto"
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
                      <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg mx-auto shadow-md" />
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
              <Button size="lg" className="bg-accent text-white hover:bg-accent/90 border-none">
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
            description="Ready to experience the untamed beauty of Orchha? Send us an inquiry and we will curate your perfect stay."
          />
          <InquiryForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}
