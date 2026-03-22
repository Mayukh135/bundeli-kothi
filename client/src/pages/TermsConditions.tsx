import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function TermsConditions() {
    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "booking", title: "Booking & Reservations" },
        { id: "payment", title: "Payment Terms" },
        { id: "checkin", title: "Check-in & Check-out" },
        { id: "conduct", title: "Guest Conduct & Rules" },
        { id: "liability", title: "Limitation of Liability" },
        { id: "contact", title: "Contact Us" },
    ];

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -100;
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <Navigation />

            {/* Page Header */}
            <div className="relative h-[40vh] min-h-[350px] flex items-center justify-center mb-12">
                <div className="absolute inset-0 overflow-hidden">
                    <motion.img
                        src="/images/hero-3.png"
                        alt="Terms and Conditions"
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.15 }}
                        transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
                <div className="relative z-10 text-center text-white px-4 mt-16">
                    <h1 className="text-4xl md:text-5xl font-serif mb-4">Terms & Conditions</h1>
                </div>
            </div>

            <div className="pt-6 pb-16 container-padding max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 md:gap-12 relative items-start">
                {/* Sidebar */}
                <aside className="w-full lg:w-1/4 lg:sticky lg:top-32 shrink-0 z-20">
                    <div className="bg-muted/50 rounded-xl p-6 border border-border/50 mb-6 hover:shadow-[0_0_25px_rgba(64,114,83,0.3)] hover:border-primary/50 transition-all duration-500">
                        {/* Desktop TOC */}
                        <div className="hidden lg:block">
                            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-6">Contents</h3>
                            <ul className="space-y-4">
                                {sections.map(section => (
                                    <li key={section.id}>
                                        <button
                                            onClick={() => scrollTo(section.id)}
                                            className="flex items-center gap-2 text-sm text-left text-muted-foreground hover:text-primary hover:translate-x-1 hover:drop-shadow-[0_0_8px_rgba(64,114,83,0.4)] transition-all duration-300 w-full"
                                        >
                                            <ChevronRight className="w-3.5 h-3.5 opacity-50 shrink-0" />
                                            {section.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Mobile TOC */}
                        <details className="lg:hidden group">
                            <summary className="text-sm font-bold text-muted-foreground uppercase tracking-widest cursor-pointer list-none flex items-center justify-between">
                                <span>Table of Contents</span>
                                <ChevronRight className="w-5 h-5 group-open:rotate-90 transition-transform" />
                            </summary>
                            <ul className="space-y-4 mt-6 border-t border-border/50 pt-6">
                                {sections.map(section => (
                                    <li key={section.id}>
                                        <button
                                            onClick={(e) => {
                                                scrollTo(section.id);
                                                e.currentTarget.closest('details')?.removeAttribute('open');
                                            }}
                                            className="flex items-center gap-2 text-sm text-left text-muted-foreground hover:text-primary hover:translate-x-1 hover:drop-shadow-[0_0_8px_rgba(64,114,83,0.4)] transition-all duration-300 w-full"
                                        >
                                            <ChevronRight className="w-3.5 h-3.5 opacity-50 shrink-0" />
                                            {section.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    </div>
                    <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-medium pl-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </aside>

                {/* Content */}
                <div className="w-full lg:w-3/4 max-w-3xl space-y-12 pb-10">

                    <section id="introduction" className="scroll-mt-32">
                        <h2 className="text-3xl font-serif text-foreground font-bold mb-6">Introduction</h2>
                        <div className="text-muted-foreground space-y-4 leading-relaxed">
                            <p>
                                Welcome to Bundeli Kothi. By making a reservation or using our website, you agree to comply with and be bound by the following Terms and Conditions. Please review them carefully before booking your stay with us.
                            </p>
                        </div>
                    </section>

                    <section id="booking" className="scroll-mt-32">
                        <h2 className="text-3xl font-serif text-foreground font-bold mb-6">Booking & Reservations</h2>
                        <div className="text-muted-foreground space-y-4 leading-relaxed">
                            <p>
                                All bookings are subject to availability. A reservation is only confirmed once we receive the required advance payment and issue a formal formal booking confirmation to your registered email.
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Rates are subject to change without prior notice, but confirmed bookings will not be affected by subsequent rate adjustments.</li>
                                <li>Any special requests (dietary needs, accessibility requirements) must be made at the time of booking. While we strive to accommodate them, they cannot be fully guaranteed.</li>
                                <li>The person making the booking must be at least 18 years of age and assumes responsibility for all guests in their party.</li>
                            </ul>
                        </div>
                    </section>

                    <section id="payment" className="scroll-mt-32">
                        <h2 className="text-3xl font-serif text-foreground font-bold mb-6">Payment Terms</h2>
                        <div className="text-muted-foreground space-y-4 leading-relaxed">
                            <p>Payment terms depend strictly on the booking policies presented at the time of reservation.</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>We generally require a 50% advance deposit to secure your room.</li>
                                <li>The balance payment is due 30 days prior to your arrival, or upon check-out if specifically requested and agreed in writing.</li>
                                <li>We accept major credit cards, debit cards, and secure bank transfers as methods of payment. Any transaction fees must be borne by the guest.</li>
                            </ul>
                        </div>
                    </section>

                    <section id="checkin" className="scroll-mt-32">
                        <h2 className="text-3xl font-serif text-foreground font-bold mb-6">Check-in & Check-out</h2>
                        <div className="text-muted-foreground space-y-4 leading-relaxed">
                            <p>Standard operating times for guests are as follows:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Check-in:</strong> 1:00 PM (13:00 Hrs) onwards.</li>
                                <li><strong>Check-out:</strong> 11:00 AM (11:00 Hrs).</li>
                            </ul>
                            <p>Early check-ins and late check-outs are subject to availability and may incur additional charges. Valid government-issued photo identification (Passport or Aadhar Card) is mandatory for all guests upon arrival according to local laws.</p>
                        </div>
                    </section>

                    <section id="conduct" className="scroll-mt-32">
                        <h2 className="text-3xl font-serif text-foreground font-bold mb-6">Guest Conduct & Rules</h2>
                        <div className="text-muted-foreground space-y-4 leading-relaxed">
                            <p>We are a quiet, eco-friendly luxury lodge meant for relaxation, wildlife viewing, and tuning into nature.</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Guests are expected to behave respectfully towards our staff and other guests at all times.</li>
                                <li>Loud music, parties, and disruptive behavior are strictly prohibited to maintain the serenity of the environment.</li>
                                <li>Bundeli Kothi is a strictly non-smoking property in all indoor spaces and cottages. Smoking is only permitted in clearly designated outdoor areas.</li>
                                <li>Damages caused to the property by the guest or their invitees will be evaluated and charged directly to the guest's account.</li>
                            </ul>
                        </div>
                    </section>

                    <section id="liability" className="scroll-mt-32">
                        <h2 className="text-3xl font-serif text-foreground font-bold mb-6">Limitation of Liability</h2>
                        <div className="text-muted-foreground space-y-4 leading-relaxed">
                            <p>
                                Bundeli Kothi acts as an agent in arranging safaris, local transport, and other external experiences. We shall not be held liable for any delays, accidents, losses, or injuries caused during these activities by third parties. Guests undertake safaris and outdoor adventures entirely at their own risk.
                            </p>
                        </div>
                    </section>

                    <section id="contact" className="scroll-mt-32">
                        <h2 className="text-3xl font-serif text-foreground font-bold mb-6">Contact Us</h2>
                        <div className="text-muted-foreground space-y-4 leading-relaxed">
                            <p>For any questions regarding our legal terms, please reach out to our team:</p>
                            <p className="font-medium text-foreground bg-muted/30 p-4 rounded-lg mt-4 border border-border/50">
                                Email: bundelikothi@gmail.com<br />
                                Phone: +91 87563 98160
                            </p>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
}
