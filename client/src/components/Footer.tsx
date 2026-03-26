import { Link } from "wouter";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background text-foreground pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div>
              <img src="/images/logo.png" alt="Bundeli Kothi Logo" className="h-24 md:h-28 w-auto mb-4 object-contain" />
            </div>
            <div className="grid grid-cols-2 gap-3 max-w-xs">
              <div className="h-24 flex items-center justify-center">
                <img
                  src="/images/farmstay.png"
                  alt="Farmstay view"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="h-24 flex items-center justify-center">
                <img
                  src="/images/MP-best-farmstay.png"
                  alt="MP best farmstay"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Socials & Partners */}
          <div>
            <h4 className="font-serif text-lg mb-6">Our Socials and Booking partners</h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/bundelikothi/" target="_blank" rel="noopener noreferrer" className="p-2 bg-foreground/10 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/bundeli.orchha/" target="_blank" rel="noopener noreferrer" className="p-2 bg-foreground/10 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.booking.com/hotel/in/bundeli-kothi-a-unique-farmstay.html?chal_t=1774461736996&force_referer=https%3A%2F%2Fwww.google.com%2F"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-foreground/10 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <img src="/images/bookings.png" alt="Bookings" className="w-5 h-5 object-contain" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-6">Explore</h4>
            <ul className="space-y-4">
              {[
                { label: "Our Story", href: "/about" },
                { label: "Accommodation", href: "/accommodation" },
                { label: "Experience Orchha", href: "/experiences" },
                { label: "Gallery", href: "/gallery" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>
                    <span className="text-foreground/70 hover:text-primary transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-foreground/80">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-accent" />
                <span>
                  Main Road, Maharajpura, Orchha,<br />
                  Madhya Pradesh, India 472246
                </span>
              </li>
              <li className="flex items-center gap-3 text-foreground/80">
                <Mail className="w-5 h-5 shrink-0 text-accent" />
                <span>bundelikothi@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-foreground/80">
                <Phone className="w-5 h-5 shrink-0 text-accent" />
                <span>+91 87563 98160</span>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-serif text-lg mb-6">Legal</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/privacy-policy">
                  <span className="text-foreground/70 hover:text-primary transition-colors cursor-pointer block">
                    Privacy Policy
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions">
                  <span className="text-foreground/70 hover:text-primary transition-colors cursor-pointer block">
                    Terms & Conditions
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/cancellation-policy">
                  <span className="text-foreground/70 hover:text-primary transition-colors cursor-pointer block">
                    Cancellation Policy
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-foreground/10 flex justify-center items-center text-sm text-foreground/50 text-center">
          <p>Copyright © 2025 Design &amp; Developed By Klient Boost.</p>
        </div>
      </div>
    </footer>
  );
}
