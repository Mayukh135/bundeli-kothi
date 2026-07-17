import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";

const galleryImagePaths = [
  "/images/gallery/01.jpg",
  "/images/gallery/02.jpeg",
  "/images/gallery/03.jpg",
  "/images/gallery/04.jpg",
  "/images/gallery/05.jpg",
  "/images/gallery/06.jpeg",
  "/images/gallery/07.jpg",
  "/images/gallery/09.jpeg",
  "/images/gallery/10.jpg",
  "/images/gallery/11.jpeg",
  "/images/gallery/12.jpg",
  "/images/gallery/14.jpg",
  "/images/gallery/15.jpg",
  "/images/gallery/32.jpg",
  "/images/gallery/31.jpg",
  "/images/gallery/08.jpg",
  "/images/gallery/13.jpg",
  "/images/gallery/30.jpg",
  "/images/gallery/33.jpg",
  "/images/gallery/16.jpg",
  "/images/gallery/18.jpg",
  "/images/gallery/19.jpg",
  "/images/gallery/20.jpg",
  "/images/gallery/27.jpg",
  "/images/gallery/29.jpg",
  "/images/gallery/34.jpg",
  "/images/gallery/35.jpg",
  "/images/gallery/28.jpg",
  "/images/gallery/36.jpg",
  "/images/gallery/17.jpg",
  "/images/gallery/23.jpg",
  "/images/gallery/24.jpg",
  "/images/gallery/21.jpeg",
  "/images/gallery/25.jpg",
  "/images/gallery/22.jpg",
  "/images/gallery/26.jpg",
] as const;

export default function Gallery() {
  const galleryImages = useMemo(
    () =>
      galleryImagePaths.map((src, index) => ({
        src,
        alt: `Bundeli Kothi gallery photo ${index + 1}`,
      })),
    []
  );

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const imageCount = galleryImages.length;

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current - 1 + imageCount) % imageCount;
    });
  }, [imageCount]);

  const goNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current + 1) % imageCount;
    });
  }, [imageCount]);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        goPrev();
      }

      if (event.key === "ArrowRight") {
        goNext();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activeIndex, closeLightbox, goNext, goPrev]);

  const activeImage = activeIndex !== null ? galleryImages[activeIndex] : null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <motion.img
          src="/images/bgcover.png"
          alt="Gallery header"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1.14 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif mb-4">Gallery</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/90">
            A visual journey through life, nature, and moments at Bundeli Kothi.
          </p>
        </div>
      </div>

      <section className="section-padding container-padding bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            subtitle="Moments"
            title="Photo Gallery"
            description="Captured moments from Bundeli Kothi."
            className="[&>h2]:text-[#CD8E2A]"
            centered
          />

          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {galleryImages.map((image, index) => (
              <motion.button
                type="button"
                key={image.src}
                onClick={() => setActiveIndex(index)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="bg-white rounded-lg border border-border/50 shadow-sm overflow-hidden group text-left"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/90 flex items-center justify-center p-4 md:p-8"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                closeLightbox();
              }}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-11 md:h-11 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center"
              aria-label="Close fullscreen gallery"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goPrev();
              }}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <motion.img
              key={activeImage.src}
              src={activeImage.src}
              alt={activeImage.alt}
              decoding="async"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="max-w-[96vw] max-h-[90vh] object-contain"
              onClick={(event) => event.stopPropagation()}
            />

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goNext();
              }}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}