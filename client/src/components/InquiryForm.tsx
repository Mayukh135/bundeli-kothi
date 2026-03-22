import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema, type InsertInquiry } from "@shared/routes";
import { useSubmitInquiry } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const COUNTRY_DIAL_CODES: Record<string, string> = {
  IN: "+91",
  US: "+1",
  CA: "+1",
  GB: "+44",
  AU: "+61",
  NZ: "+64",
  SG: "+65",
  AE: "+971",
  SA: "+966",
  QA: "+974",
  OM: "+968",
  KW: "+965",
  BH: "+973",
  DE: "+49",
  FR: "+33",
  IT: "+39",
  ES: "+34",
  NL: "+31",
  BE: "+32",
  CH: "+41",
  AT: "+43",
  IE: "+353",
  PT: "+351",
  SE: "+46",
  NO: "+47",
  DK: "+45",
  FI: "+358",
  PL: "+48",
  CZ: "+420",
  HU: "+36",
  RO: "+40",
  GR: "+30",
  TR: "+90",
  ZA: "+27",
  KE: "+254",
  EG: "+20",
  NG: "+234",
  JP: "+81",
  KR: "+82",
  CN: "+86",
  HK: "+852",
  TW: "+886",
  TH: "+66",
  VN: "+84",
  MY: "+60",
  ID: "+62",
  PH: "+63",
  PK: "+92",
  BD: "+880",
  LK: "+94",
  NP: "+977",
  BR: "+55",
  MX: "+52",
  AR: "+54",
  CL: "+56",
  CO: "+57",
  PE: "+51",
};

const TIMEZONE_REGION_HINTS: Record<string, string> = {
  "Asia/Kolkata": "IN",
  "Asia/Calcutta": "IN",
  "Asia/Karachi": "PK",
  "Asia/Dhaka": "BD",
  "Asia/Kathmandu": "NP",
  "Asia/Colombo": "LK",
  "Asia/Dubai": "AE",
  "Asia/Riyadh": "SA",
  "Asia/Singapore": "SG",
  "Asia/Bangkok": "TH",
  "Asia/Ho_Chi_Minh": "VN",
  "Asia/Kuala_Lumpur": "MY",
  "Asia/Jakarta": "ID",
  "Asia/Manila": "PH",
  "Asia/Tokyo": "JP",
  "Asia/Seoul": "KR",
  "Europe/London": "GB",
  "Europe/Dublin": "IE",
  "Europe/Paris": "FR",
  "Europe/Berlin": "DE",
  "Europe/Rome": "IT",
  "Europe/Madrid": "ES",
  "Europe/Amsterdam": "NL",
  "Europe/Stockholm": "SE",
  "Europe/Oslo": "NO",
  "Europe/Copenhagen": "DK",
  "Europe/Helsinki": "FI",
  "Europe/Warsaw": "PL",
  "Europe/Prague": "CZ",
  "Europe/Budapest": "HU",
  "Europe/Bucharest": "RO",
  "Europe/Athens": "GR",
  "Europe/Istanbul": "TR",
  "America/New_York": "US",
  "America/Chicago": "US",
  "America/Denver": "US",
  "America/Los_Angeles": "US",
  "America/Phoenix": "US",
  "America/Anchorage": "US",
  "America/Toronto": "CA",
  "America/Vancouver": "CA",
  "America/Mexico_City": "MX",
  "America/Sao_Paulo": "BR",
  "America/Argentina/Buenos_Aires": "AR",
  "America/Santiago": "CL",
  "America/Bogota": "CO",
  "America/Lima": "PE",
  "Africa/Johannesburg": "ZA",
  "Africa/Nairobi": "KE",
  "Africa/Cairo": "EG",
  "Africa/Lagos": "NG",
  "Australia/Sydney": "AU",
  "Australia/Melbourne": "AU",
  "Australia/Brisbane": "AU",
  "Australia/Perth": "AU",
  "Pacific/Auckland": "NZ",
};

function extractRegionFromLocale(locale: string): string | undefined {
  const tags = locale.replace(/_/g, "-").split("-");

  // Ignore the first tag (language); region typically appears in later tags.
  for (let i = 1; i < tags.length; i += 1) {
    const token = tags[i];
    if (/^[A-Za-z]{2}$/.test(token)) {
      return token.toUpperCase();
    }
  }

  return undefined;
}

function getRegionName(region: string): string {
  if (typeof Intl === "undefined" || typeof Intl.DisplayNames === "undefined") {
    return region;
  }

  try {
    const displayNames = new Intl.DisplayNames(["en"], { type: "region" });
    return displayNames.of(region) || region;
  } catch {
    return region;
  }
}

const COUNTRY_OPTIONS = Object.entries(COUNTRY_DIAL_CODES)
  .map(([region, dialCode]) => ({
    region,
    dialCode,
    label: `${dialCode} - ${getRegionName(region)}`,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

function detectRegion(): string {
  if (typeof window === "undefined") return "IN";

  const localeCandidates = [
    ...(window.navigator.languages || []),
    window.navigator.language,
    Intl.DateTimeFormat().resolvedOptions().locale,
  ].filter(Boolean) as string[];

  for (const locale of localeCandidates) {
    const region = extractRegionFromLocale(locale);
    if (region && COUNTRY_DIAL_CODES[region]) {
      return region;
    }
  }

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (timeZone) {
    const hintedRegion = TIMEZONE_REGION_HINTS[timeZone];
    if (hintedRegion && COUNTRY_DIAL_CODES[hintedRegion]) {
      return hintedRegion;
    }
  }

  return "IN";
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseDateValue(value: unknown): Date | null {
  if (!value) return null;

  const parsed = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(parsed.getTime())) return null;

  return parsed;
}

export function InquiryForm() {
  const mutation = useSubmitInquiry();
  const detectedRegion = useMemo(() => detectRegion(), []);
  const [selectedRegion, setSelectedRegion] = useState(detectedRegion);
  const selectedDialCode = COUNTRY_DIAL_CODES[selectedRegion] || "+91";

  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      guests: 2,
      message: "",
    },
  });

  function onSubmit(data: InsertInquiry) {
    form.clearErrors(["name", "email", "phone", "guests", "checkIn", "checkOut", "message"]);

    const normalizedName = typeof data.name === "string" ? data.name.trim() : "";
    if (!normalizedName) {
      form.setError("name", {
        type: "manual",
        message: "Full name is required",
      });
      return;
    }

    const normalizedEmail = typeof data.email === "string" ? data.email.trim() : "";
    if (!normalizedEmail) {
      form.setError("email", {
        type: "manual",
        message: "Email address is required",
      });
      return;
    }

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      form.setError("email", {
        type: "manual",
        message: "Please enter a valid email address",
      });
      return;
    }

    const normalizedMessage = typeof data.message === "string" ? data.message.trim() : "";
    if (!normalizedMessage) {
      form.setError("message", {
        type: "manual",
        message: "Message is required",
      });
      return;
    }

    const guestsCount = Number(data.guests);
    if (!Number.isInteger(guestsCount) || guestsCount < 1) {
      form.setError("guests", {
        type: "manual",
        message: "Guests must be at least 1",
      });
      return;
    }

    const checkInDate = parseDateValue(data.checkIn);
    if (!checkInDate) {
      form.setError("checkIn", {
        type: "manual",
        message: "Check-in date is required",
      });
      return;
    }

    const checkOutDate = parseDateValue(data.checkOut);
    if (!checkOutDate) {
      form.setError("checkOut", {
        type: "manual",
        message: "Check-out date is required",
      });
      return;
    }

    if (checkOutDate <= checkInDate) {
      form.setError("checkOut", {
        type: "manual",
        message: "Check-out must be after check-in",
      });
      return;
    }

    const localPhoneNumber = typeof data.phone === "string" ? data.phone.trim() : "";
    const normalizedPhone = localPhoneNumber.replace(/\D/g, "").slice(0, 10);

    if (normalizedPhone.length !== 10) {
      form.setError("phone", {
        type: "manual",
        message: "Phone number must be exactly 10 digits",
      });
      return;
    }

    mutation.mutate(
      {
        ...data,
        name: normalizedName,
        email: normalizedEmail,
        phone: `${selectedDialCode} ${normalizedPhone}`,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: guestsCount,
        message: normalizedMessage,
      },
      {
        onSuccess: () => {
          form.reset({
            name: "",
            email: "",
            phone: "",
            guests: 2,
            message: "",
          });
        },
      }
    );
  }

  return (
    <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-border/50">
      <div className="mb-8">
        <h3 className="text-2xl font-serif mb-2">Make an Inquiry</h3>
        <p className="text-muted-foreground">Fill out the form below and we'll get back to you with availability.</p>
        <p className="text-sm text-muted-foreground mt-2">
          Prefer to call?{" "}
          <a href="tel:+918756398160" className="text-primary font-medium underline underline-offset-2 hover:text-primary/80">
            +91 87563 98160
          </a>
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} className="bg-muted/30 border-border/50 focus:bg-white transition-colors h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" {...field} className="bg-muted/30 border-border/50 focus:bg-white transition-colors h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phone"
              rules={{
                required: "Phone number is required",
                validate: (value) => {
                  const digits = String(value ?? "").replace(/\D/g, "");
                  return digits.length === 10 || "Phone number must be exactly 10 digits";
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                        <SelectTrigger className="w-[92px] h-12 shrink-0 bg-muted/30 border-border/50 focus:bg-white transition-colors px-2">
                          <span className="w-full text-center">{selectedDialCode}</span>
                        </SelectTrigger>
                        <SelectContent className="max-h-72 min-w-[220px]">
                          {COUNTRY_OPTIONS.map((option) => (
                            <SelectItem key={option.region} value={option.region}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Input
                        type="tel"
                        autoComplete="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={10}
                        placeholder="9876543210"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => {
                          field.onChange(e.target.value.replace(/\D/g, "").slice(0, 10));
                        }}
                        className="bg-muted/30 border-border/50 focus:bg-white transition-colors h-12"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="guests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Guests</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      {...field}
                      value={typeof field.value === "number" && Number.isFinite(field.value) ? field.value : ""}
                      onChange={(e) => {
                        const raw = e.target.value;
                        field.onChange(raw === "" ? undefined : parseInt(raw, 10));
                      }}
                      className="bg-muted/30 border-border/50 focus:bg-white transition-colors h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="checkIn"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Check-in Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal h-12 bg-muted/30 border-border/50 hover:bg-white",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value || undefined}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="checkOut"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Check-out Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal h-12 bg-muted/30 border-border/50 hover:bg-white",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value || undefined}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message / Special Requests</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your trip plans..."
                    className="resize-none min-h-[120px] bg-muted/30 border-border/50 focus:bg-white transition-colors"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full h-14 text-lg font-serif italic bg-primary hover:bg-primary/90 text-white"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sending Inquiry...
              </>
            ) : (
              "Submit Inquiry"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
