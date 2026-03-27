import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CottageCard } from "@/components/CottageCard";
import { type Cottage } from "@shared/schema";
import { motion } from "framer-motion";
import { useEffect } from "react";

type SustainabilityItem = {
  title: string;
  src: string;
  alt: string;
  description: string;
};

const ourFarmImages = [
  "/images/our-farm/our-farm-1.jpeg",
  "/images/our-farm/our-farm-2.jpg",
  "/images/our-farm/our-farm-3.jpg",
  "/images/our-farm/our-farm-4.jpg",
];

const farmToPlateImages = [
  "/images/farm-to-plate/farm-to-plate-1.jpg",
  "/images/farm-to-plate/farm-to-plate-2.jpg",
];

const ourFarmParagraph =
  "We take pride in organically growing and harvesting a variety of fresh ingredients, ensuring that only the purest and most nutritious produce reaches your plate. Seasonal vegetables and greens thrive under our care, offering fresh and flavorful options throughout the year. We also cultivate mustard, sesame, and peanuts, rich in essential oils and nutrients that enhance both taste and nutrition. Additionally, our wheat and lentils are grown using sustainable farming practices, providing wholesome grains and protein-rich legumes that form the foundation of a balanced diet.";

const farmToPlateParagraph =
  "At Bundeli Kothi, we follow a true farm-to-plate philosophy, where fresh, organic produce moves directly from our fields to your table with minimal delay. Our homegrown fruits, vegetables, grains, and oils are carefully selected and prepared to preserve their natural taste and nutritional value. By harvesting ingredients at their peak and serving them with care, we ensure every meal is wholesome, flavorful, and free from harmful chemicals.";

const farmStoryCards: Cottage[] = [
  {
    id: 101,
    name: "Our Farm",
    type: "Farm Story",
    description: ourFarmParagraph,
    price: 0,
    capacity: 1,
    imageUrl: ourFarmImages[0],
    images: ourFarmImages,
    features: [],
  },
  {
    id: 102,
    name: "Farm to Plate",
    type: "Fresh Dining",
    description: farmToPlateParagraph,
    price: 0,
    capacity: 1,
    imageUrl: farmToPlateImages[0],
    images: farmToPlateImages,
    features: [],
  },
];

const sustainabilityItems: SustainabilityItem[] = [
  {
    title: "Organic farming",
    src: "/images/sustainability/sustainability-1.jpeg",
    alt: "Organic farming",
    description:
      "At Bundeli Kothi, we practice organic farming, ensuring pure, chemical-free ingredients. Our methods prioritize soil health and sustainability using compost, crop rotation, and eco-friendly pest control. We grow seasonal fruits, vegetables, grains, and spices, offering nutritious, farm-fresh meals straight from our fields.",
  },
  {
    title: "Sustainable energy",
    src: "/images/sustainability/sustainability-2.jpeg",
    alt: "Sustainable energy",
    description:
      "Bundeli Kothi harnesses solar power for an eco-friendly, energy-efficient stay. Our solar infrastructure reduces reliance on conventional sources, minimizing our carbon footprint. From lighting to heating, renewable energy ensures uninterrupted power while conserving resources. This commitment balances sustainability with luxury, contributing to a cleaner, greener environment for future generations.",
  },
  {
    title: "Eco-friendly practices",
    src: "/images/sustainability/sustainability-3.jpeg",
    alt: "Eco-friendly practices",
    description:
      "We embrace sustainable practices by composting kitchen waste into nutrient-rich soil enhancers. Our biodegradable cleaning products ensure a toxin-free environment. By reducing waste, conserving resources, and avoiding chemicals, we promote green hospitality while protecting nature, offering a responsible, clean, and refreshing guest experience.",
  },
  {
    title: "Supporting local communities",
    src: "/images/sustainability/sustainability-4.jpeg",
    alt: "Supporting local communities",
    description:
      "Bundeli Kothi empowers nearby villagers by providing employment, preserving Orchha's cultural heritage. Our team of skilled locals enhances hospitality with regional knowledge. By sourcing materials from local farmers and artisans, we support economic growth and sustainable tourism, ensuring community well-being while fostering meaningful connections.",
  },
];

const sustainabilityCards: Cottage[] = sustainabilityItems.map((item, index) => ({
  id: 201 + index,
  name: item.title,
  type: "Sustainability",
  description: item.description,
  price: 0,
  capacity: 1,
  imageUrl: item.src,
  images: [item.src],
  features: [],
}));

export default function About() {
  useEffect(() => {
    if (!window.location.hash) return;

    const id = window.location.hash.slice(1);
    const element = document.getElementById(id);
    if (!element) return;

    const yOffset = -100;
    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans pb-8">
      <Navigation />

      {/* Page Header */}
      <div className="relative h-[52vh] min-h-[420px] flex items-center justify-center mb-10">
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            src="/images/bgcover.png"
            alt="About Us"
            initial={{ scale: 1 }}
            animate={{ scale: 1.15 }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </div>

      {/* Who We Are */}
      <section className="section-padding container-padding">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl [font-family:var(--font-serif)] text-[#CD8E2A] font-bold text-center">
            Who are we?
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mt-4 mb-8" />

          <div className="max-w-4xl mx-auto">
            <img
              src="/images/who-we-are-section.jpg"
              alt="Bundeli Kothi farm to plate"
              className="w-full h-80 md:h-[420px] object-cover mb-6"
            />
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed text-justify">
              Your hosts, Mudit and Sakshi, bring over eight years of dedicated hospitality experience to your stay, backed by formal Hotel Management degrees and professional backgrounds with prestigious chains like Taj and ITC. We're passionate about creating a personalized and memorable experience, reflecting our love for Indian culture, organic farming and sustainable living. Beyond our impeccable service, evidenced by glowing guest reviews, we enjoy sharing our interests in travel, music and language learning. We're committed to ensuring every guest's needs are met with attentive care.
            </p>
          </div>
        </div>
      </section>

      {/* The Farm Experience */}
      <section className="section-padding bg-primary/10 border-y border-primary/20 container-padding">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-primary font-bold text-center">
            The Farm Experience
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-10" />

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {farmStoryCards.map((card, i) => (
              <CottageCard
                key={card.id}
                cottage={card}
                index={i}
                showViewDetails={false}
                descriptionClassName="text-justify"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section id="sustainability" className="section-padding bg-secondary/25 container-padding scroll-mt-28">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-slate-700 font-bold text-center">
            Sustainability
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mt-4 mb-8" />

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {sustainabilityCards.map((card, i) => (
              <CottageCard
                key={card.id}
                cottage={card}
                index={i}
                showViewDetails={false}
                descriptionClassName="text-justify"
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
