import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { InquiryForm } from "@/components/InquiryForm";
import { MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Page Header */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center mb-12">
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            src="/images/bgcover.png"
            alt="Contact Us"
            initial={{ scale: 1 }}
            animate={{ scale: 1.15 }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/90">
            We'd love to hear from you. Plan your escape to the wild today.
          </p>
        </div>
      </div>

      <section className="section-padding container-padding">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-serif mb-6 text-[#CD8E2A]">Get in Touch</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Whether you have questions, need assistance, or want more information, our team is here to help.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-secondary p-3 rounded-full text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Location</h3>
                    <p className="text-muted-foreground">
                      Main Road, Maharajpura, Orchha,<br />
                      Madhya Pradesh, India 472246
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-secondary p-3 rounded-full text-primary">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Phone</h3>
                    <p className="text-muted-foreground">+91 87563 98160</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-secondary p-3 rounded-full text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Email</h3>
                    <p className="text-muted-foreground">bundelikothi@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Link */}
            <a
              href="https://maps.app.goo.gl/EDFmzAgMtywm9iAR8"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-[300px] bg-muted rounded-lg overflow-hidden border border-border shadow-inner relative group block"
            >
              {/* Static Map Image */}
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2674&auto=format&fit=crop"
                alt="Map Location"
                className="w-full h-full object-cover filter grayscale opacity-70 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="bg-white/95 px-6 py-3 rounded-full shadow-lg text-sm font-bold text-primary flex items-center gap-2 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <MapPin className="w-4 h-4" />
                  View on Google Maps
                </span>
              </div>
            </a>
          </div>

          {/* Form */}
          <div>
            <InquiryForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
