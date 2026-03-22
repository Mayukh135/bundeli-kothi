import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
    const sections = [
        { id: "overview", title: "Overview" },
        { id: "collect", title: "Information We Collect" },
        { id: "use", title: "How We Use Your Information" },
        { id: "sharing", title: "Sharing of Information" },
        { id: "security", title: "Data Security" },
        { id: "rights", title: "Your Rights" },
        { id: "contact", title: "Contact Us" },
    ];

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -100; // Account for fixed header
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
                        src="/images/hero-2.png"
                        alt="Privacy Policy"
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.15 }}
                        transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
                <div className="relative z-10 text-center text-white px-4 mt-16">
                    <h1 className="text-4xl md:text-5xl font-serif mb-4">Privacy Policy</h1>
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

                    <section id="overview" className="scroll-mt-32">
                        <h2 className="text-3xl font-serif text-foreground font-bold mb-6">Overview</h2>
                        <div className="text-muted-foreground space-y-4 leading-relaxed">
                            <p>
                                Bundeli Kothi ("we", "us", or "our") is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <strong>bundelikothi.com</strong> or make a booking through our platform.
                            </p>
                            <p>
                                Please read this policy carefully. If you disagree with its terms, please discontinue use of our site.
                            </p>
                        </div>
                    </section>

                    <section id="collect" className="scroll-mt-32">
                        <h2 className="text-3xl font-serif text-foreground font-bold mb-6">Information We Collect</h2>
                        <div className="text-muted-foreground space-y-4 leading-relaxed">
                            <p>We collect information you provide directly to us, including:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Personal Data:</strong> Full name, email address, phone number, and billing address.</li>
                                <li><strong>Payment details:</strong> Processed securely via our payment gateway — we <strong>never</strong> store your full credit card numbers or security codes.</li>
                                <li><strong>Booking Information:</strong> Travel preferences, dietary requirements, travel dates, and guest counts.</li>
                                <li><strong>Identification:</strong> Government-issued ID details required for hotel check-in as mandated by Indian law.</li>
                                <li><strong>Correspondence:</strong> Any communications you send us via email or our contact forms.</li>
                            </ul>
                            <p>We also automatically collect technical data such as your IP address, browser type, device identifiers, pages visited, and time spent on our site to improve functionality.</p>
                        </div>
                    </section>

                    <section id="use" className="scroll-mt-32">
                        <h2 className="text-3xl font-serif text-foreground font-bold mb-6">How We Use Your Information</h2>
                        <div className="text-muted-foreground space-y-4 leading-relaxed">
                            <p>We use the information we collect to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Process and manage your accommodation and safari bookings.</li>
                                <li>Communicate with you regarding your stay, special requests, and inquiries.</li>
                                <li>Improve our website, services, and overall guest experience.</li>
                                <li>Comply with local legal and regulatory reporting requirements.</li>
                                <li>Send promotional emails about new packages or events (only if you have opted in).</li>
                            </ul>
                        </div>
                    </section>

                    <section id="sharing" className="scroll-mt-32">
                        <h2 className="text-3xl font-serif text-foreground font-bold mb-6">Sharing of Information</h2>
                        <div className="text-muted-foreground space-y-4 leading-relaxed">
                            <p>We do not sell, rent, or trade your personal information to third parties. We may share your information only in the following specific situations:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Service Providers:</strong> We may share data with trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential and secure.</li>
                                <li><strong>Legal Requirements:</strong> We may disclose your information where required by law, subpoena, or if we reasonably believe that such action is necessary to comply with the law and reasonable requests of law enforcement.</li>
                            </ul>
                        </div>
                    </section>

                    <section id="security" className="scroll-mt-32">
                        <h2 className="text-3xl font-serif text-foreground font-bold mb-6">Data Security</h2>
                        <div className="text-muted-foreground space-y-4 leading-relaxed">
                            <p>
                                We use administrative, technical, and physical security measures to help protect your personal information from unauthorized access. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our best efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                            </p>
                        </div>
                    </section>

                    <section id="rights" className="scroll-mt-32">
                        <h2 className="text-3xl font-serif text-foreground font-bold mb-6">Your Rights</h2>
                        <div className="text-muted-foreground space-y-4 leading-relaxed">
                            <p>You have the fundamental right to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Request access to the personal data we hold about you.</li>
                                <li>Request correction of any inaccurate or incomplete data.</li>
                                <li>Request deletion of your personal data, subject to local legal and regulatory retention constraints.</li>
                                <li>Opt-out of any marketing communications at any time.</li>
                            </ul>
                        </div>
                    </section>

                    <section id="contact" className="scroll-mt-32">
                        <h2 className="text-3xl font-serif text-foreground font-bold mb-6">Contact Us</h2>
                        <div className="text-muted-foreground space-y-4 leading-relaxed">
                            <p>If you have questions, comments, or concerns about this Privacy Policy, please contact us at:</p>
                            <p className="font-medium text-foreground bg-muted/30 p-4 rounded-lg mt-4 border border-border/50">
                                Email: bundelikothi@gmail.com<br />
                                Phone: +91 87563 98160<br />
                                Address: Main Road, Maharajpura, Orchha, Madhya Pradesh, India 472246
                            </p>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
}
