import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function CancellationPolicy() {
    const sections = [
        { id: "overview", title: "Overview" },
        { id: "standard", title: "Standard Cancellation" },
        { id: "peak", title: "Peak Season Policy" },
        { id: "noshow", title: "No-shows & Early Departures" },
        { id: "refunds", title: "Refund Processing" },
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
                        src="/images/hero-4.png"
                        alt="Cancellation Policy"
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.15 }}
                        transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
                <div className="relative z-10 text-center text-white px-4 mt-16">
                    <h1 className="text-4xl md:text-5xl font-serif mb-4">Cancellation Policy</h1>
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
                                We understand that travel plans can sometimes change unexpectedly. However, due to our boutique size — offering only a limited number of cottages — and our remote location, late cancellations have a significant impact on our operations and ability to schedule staff.
                            </p>
                            <p>Please review our cancellation policies carefully before confirming your stay with us.</p>
                        </div>
                    </section>

                    <section id="standard" className="scroll-mt-32">
                        <h2 className="text-3xl font-serif text-foreground font-bold mb-6">Standard Cancellation Policy</h2>
                        <div className="text-muted-foreground space-y-4 leading-relaxed">
                            <p>For bookings outside of peak holidays and festive periods:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>More than 30 days prior to arrival:</strong> 100% refund (minus a nominal 5% bank processing fee).</li>
                                <li><strong>15 to 30 days prior to arrival:</strong> 50% refund of the total booking cost.</li>
                                <li><strong>Less than 15 days prior to arrival:</strong> Completely non-refundable (100% cancellation fee applies).</li>
                            </ul>
                        </div>
                    </section>

                    <section id="peak" className="scroll-mt-32">
                        <h2 className="text-3xl font-serif text-foreground font-bold mb-6">Peak Season Policy</h2>
                        <div className="text-muted-foreground space-y-4 leading-relaxed">
                            <p>For high-demand festive dates (e.g., Diwali, Christmas, New Year, and long weekends), stricter special cancellation rules apply:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>More than 45 days prior to arrival:</strong> Full refund (minus a nominal 5% bank processing fee).</li>
                                <li><strong>Less than 45 days prior to arrival:</strong> Completely non-refundable (100% cancellation fee). No exceptions will be made.</li>
                            </ul>
                        </div>
                    </section>

                    <section id="noshow" className="scroll-mt-32">
                        <h2 className="text-3xl font-serif text-foreground font-bold mb-6">No-shows & Early Departures</h2>
                        <div className="text-muted-foreground space-y-4 leading-relaxed">
                            <p>
                                In the unfortunate event of a guest's non-arrival (no-show) or if a guest decides to depart earlier than the scheduled checkout date for any reason, the <strong>full amount of the originally booked stay</strong> will be charged to the guest. No partial or full refunds will be provided for unutilized nights.
                            </p>
                        </div>
                    </section>

                    <section id="refunds" className="scroll-mt-32">
                        <h2 className="text-3xl font-serif text-foreground font-bold mb-6">Refund Processing</h2>
                        <div className="text-muted-foreground space-y-4 leading-relaxed">
                            <p>
                                Approved refunds will be processed directly back to the original payment method utilized at the time of booking. It may take between <strong>10 to 14 business days</strong> for the funds to reflect in your account. Bank or credit card processing fees deducted by the payment gateways are non-refundable.
                            </p>
                        </div>
                    </section>

                    <section id="contact" className="scroll-mt-32">
                        <h2 className="text-3xl font-serif text-foreground font-bold mb-6">Contact Us</h2>
                        <div className="text-muted-foreground space-y-4 leading-relaxed">
                            <p>If you need to alter or cancel your booking, please reach out to us in writing as soon as possible to avoid unnecessary fees:</p>
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
