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
import { format, startOfDay } from "date-fns";
import { cn } from "@/lib/utils";

const COUNTRY_DIAL_CODES: Record<string, string> = {
  AF: "+93",
  AL: "+355",
  DZ: "+213",
  AS: "+1",
  AD: "+376",
  AO: "+244",
  AI: "+1",
  AG: "+1",
  AR: "+54",
  AM: "+374",
  AW: "+297",
  AU: "+61",
  AT: "+43",
  AZ: "+994",
  BS: "+1",
  BH: "+973",
  BD: "+880",
  BB: "+1",
  BY: "+375",
  BE: "+32",
  BZ: "+501",
  BJ: "+229",
  BM: "+1",
  BT: "+975",
  BO: "+591",
  BA: "+387",
  BW: "+267",
  BR: "+55",
  IO: "+246",
  VG: "+1",
  BN: "+673",
  BG: "+359",
  BF: "+226",
  BI: "+257",
  KH: "+855",
  CM: "+237",
  CA: "+1",
  CV: "+238",
  BQ: "+599",
  KY: "+1",
  CF: "+236",
  TD: "+235",
  CL: "+56",
  CN: "+86",
  CX: "+61",
  CC: "+61",
  CO: "+57",
  KM: "+269",
  CG: "+242",
  CD: "+243",
  CK: "+682",
  CR: "+506",
  CI: "+225",
  HR: "+385",
  CU: "+53",
  CW: "+599",
  CY: "+357",
  CZ: "+420",
  DK: "+45",
  DJ: "+253",
  DM: "+1",
  DO: "+1",
  EC: "+593",
  EG: "+20",
  SV: "+503",
  GQ: "+240",
  ER: "+291",
  EE: "+372",
  SZ: "+268",
  ET: "+251",
  FK: "+500",
  FO: "+298",
  FJ: "+679",
  FI: "+358",
  FR: "+33",
  GF: "+594",
  PF: "+689",
  GA: "+241",
  GM: "+220",
  GE: "+995",
  DE: "+49",
  GH: "+233",
  GI: "+350",
  GR: "+30",
  GL: "+299",
  GD: "+1",
  GP: "+590",
  GU: "+1",
  GT: "+502",
  GG: "+44",
  GN: "+224",
  GW: "+245",
  GY: "+592",
  HT: "+509",
  HN: "+504",
  HK: "+852",
  HU: "+36",
  IS: "+354",
  IN: "+91",
  ID: "+62",
  IR: "+98",
  IQ: "+964",
  IE: "+353",
  IM: "+44",
  IL: "+972",
  IT: "+39",
  JM: "+1",
  JP: "+81",
  JE: "+44",
  JO: "+962",
  KZ: "+7",
  KE: "+254",
  KI: "+686",
  KP: "+850",
  KR: "+82",
  XK: "+383",
  KW: "+965",
  KG: "+996",
  LA: "+856",
  LV: "+371",
  LB: "+961",
  LS: "+266",
  LR: "+231",
  LY: "+218",
  LI: "+423",
  LT: "+370",
  LU: "+352",
  MO: "+853",
  MG: "+261",
  MW: "+265",
  MY: "+60",
  MV: "+960",
  ML: "+223",
  MT: "+356",
  MH: "+692",
  MQ: "+596",
  MR: "+222",
  MU: "+230",
  YT: "+262",
  MX: "+52",
  FM: "+691",
  MD: "+373",
  MC: "+377",
  MN: "+976",
  ME: "+382",
  MS: "+1",
  MA: "+212",
  MZ: "+258",
  MM: "+95",
  NA: "+264",
  NR: "+674",
  NP: "+977",
  NL: "+31",
  NC: "+687",
  NZ: "+64",
  NI: "+505",
  NE: "+227",
  NG: "+234",
  NU: "+683",
  NF: "+672",
  MK: "+389",
  MP: "+1",
  NO: "+47",
  OM: "+968",
  PK: "+92",
  PW: "+680",
  PS: "+970",
  PA: "+507",
  PG: "+675",
  PY: "+595",
  PE: "+51",
  PH: "+63",
  PL: "+48",
  PT: "+351",
  PR: "+1",
  QA: "+974",
  RE: "+262",
  RO: "+40",
  RU: "+7",
  RW: "+250",
  BL: "+590",
  SH: "+290",
  KN: "+1",
  LC: "+1",
  MF: "+590",
  PM: "+508",
  VC: "+1",
  WS: "+685",
  SM: "+378",
  ST: "+239",
  SA: "+966",
  SN: "+221",
  RS: "+381",
  SC: "+248",
  SL: "+232",
  SG: "+65",
  SX: "+1",
  SK: "+421",
  SI: "+386",
  SB: "+677",
  SO: "+252",
  ZA: "+27",
  SS: "+211",
  ES: "+34",
  LK: "+94",
  SD: "+249",
  SR: "+597",
  SE: "+46",
  CH: "+41",
  SY: "+963",
  TW: "+886",
  TJ: "+992",
  TZ: "+255",
  TH: "+66",
  TL: "+670",
  TG: "+228",
  TK: "+690",
  TO: "+676",
  TT: "+1",
  TN: "+216",
  TR: "+90",
  TM: "+993",
  TC: "+1",
  TV: "+688",
  VI: "+1",
  UG: "+256",
  UA: "+380",
  AE: "+971",
  GB: "+44",
  US: "+1",
  UY: "+598",
  UZ: "+998",
  VU: "+678",
  VA: "+39",
  VE: "+58",
  VN: "+84",
  WF: "+681",
  EH: "+212",
  YE: "+967",
  ZM: "+260",
  ZW: "+263",
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
    countryName: getRegionName(region),
    label: `${getRegionName(region)} (${dialCode})`,
  }))
  .sort((a, b) => a.countryName.localeCompare(b.countryName));

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
  const today = useMemo(() => startOfDay(new Date()), []);
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
                            <SelectItem key={option.region} value={option.region} textValue={option.countryName}>
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
                          startOfDay(date) < today
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
                        disabled={(date) => {
                          const checkInDate = parseDateValue(form.getValues("checkIn"));
                          const checkInStart = checkInDate ? startOfDay(checkInDate) : null;
                          const currentDate = startOfDay(date);

                          if (checkInStart) {
                            return currentDate <= checkInStart;
                          }

                          return currentDate < today;
                        }}
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
            className="w-full h-14 text-lg [font-family:var(--font-serif)] bg-primary hover:bg-primary/90 text-white"
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
