import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { InquiryForm } from "@/components/InquiryForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/accommodation", label: "Accommodation" },
  { href: "/experiences", label: "Experience Orchha" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location === "/";
  // Always solid on non-home pages, or if scrolled
  const isSolid = !isHome || isScrolled;

  const openInquiryFromSheet = () => {
    setIsSheetOpen(false);
    setTimeout(() => setIsInquiryOpen(true), 150);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          isSolid
            ? "bg-background py-4 shadow-sm"
            : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo + Branding */}
          <Link href="/" className="z-50">
            <div className="flex items-center cursor-pointer group">
              {/* Logo image — always visible */}
              <img
                src="/images/logo.png"
                alt="Bundeli Kothi Logo"
                className="h-20 w-20 md:h-24 md:w-24 object-contain transition-all duration-500 opacity-100"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = location === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <span
                    className={cn(
                      "text-[15px] font-medium transition-colors cursor-pointer py-1 border-b-2",
                      isSolid
                        ? isActive
                          ? "text-primary border-primary"
                          : "text-foreground/80 hover:text-primary border-transparent"
                        : isActive
                          ? "text-white border-white"
                          : "text-white/90 hover:text-white border-transparent"
                    )}
                  >
                    {link.label}
                  </span>
                </Link>
              )
            })}
            <Button
              onClick={() => setIsInquiryOpen(true)}
              className={cn(
                "ml-4 font-serif rounded-md px-8 py-2 h-auto text-[16px] book-now-motion",
                isSolid
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-background text-primary hover:bg-background/90"
              )}
            >
              Book Now
            </Button>
          </nav>

          {/* Mobile Nav */}
          <div className="lg:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "hover:bg-transparent",
                    isSolid ? "text-foreground" : "text-white"
                  )}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background border-l-border w-[300px] p-0">
                <div className="flex flex-col h-full pt-20 px-8">
                  <nav className="flex flex-col gap-6">
                    {NAV_LINKS.map((link) => {
                      const isActive = location === link.href;
                      return (
                        <Link key={link.href} href={link.href}>
                          <span
                            className={cn(
                              "text-xl font-serif cursor-pointer transition-colors border-b-2 inline-block pb-1",
                              isActive ? "text-primary border-primary" : "text-foreground border-transparent hover:text-primary"
                            )}
                          >
                            {link.label}
                          </span>
                        </Link>
                      )
                    })}
                    <Button
                      onClick={openInquiryFromSheet}
                      className="mt-8 w-full bg-primary text-primary-foreground hover:bg-primary/90 font-serif text-lg py-6 rounded-md book-now-motion"
                    >
                      Book Your Stay
                    </Button>
                  </nav>

                  <div className="mt-auto mb-10 text-muted-foreground text-sm space-y-2">
                    <p>Main Road, Maharajpura, Orchha</p>
                    <p>Madhya Pradesh, 472246, India</p>
                    <p className="pt-4">+91 87563 98160</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <Dialog open={isInquiryOpen} onOpenChange={setIsInquiryOpen}>
        <DialogContent className="w-[95vw] max-w-3xl border-none bg-transparent p-0 shadow-none">
          <DialogHeader className="sr-only">
            <DialogTitle>Make an Inquiry</DialogTitle>
            <DialogDescription>Fill out the form and we will get back to you with availability.</DialogDescription>
          </DialogHeader>
          <div className="max-h-[86vh] overflow-y-auto p-1 sm:p-2">
            <InquiryForm />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
