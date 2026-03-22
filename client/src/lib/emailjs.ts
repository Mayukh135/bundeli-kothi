import emailjs from "@emailjs/browser";
import { format } from "date-fns";
import type { InsertInquiry } from "@shared/routes";

type EmailJsConfig = {
  serviceId: string;
  publicKey: string;
  adminTemplateId: string;
  guestTemplateId: string;
  adminEmail: string;
};

const EMAILJS_CONFIG: EmailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "",
  adminTemplateId: import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID ?? "",
  guestTemplateId: import.meta.env.VITE_EMAILJS_GUEST_TEMPLATE_ID ?? "",
  adminEmail: import.meta.env.VITE_BOOKING_ADMIN_EMAIL ?? "",
};

function isEmailJsConfigured(): boolean {
  return Boolean(
    EMAILJS_CONFIG.serviceId &&
      EMAILJS_CONFIG.publicKey &&
      EMAILJS_CONFIG.adminTemplateId &&
      EMAILJS_CONFIG.guestTemplateId
  );
}

function toDisplayDate(value: unknown): string {
  if (!value) return "Not provided";

  const parsed = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(parsed.getTime())) return "Not provided";

  return format(parsed, "PPP");
}

export type InquiryEmailDeliveryResult = {
  skipped: boolean;
  adminSent: boolean;
  guestSent: boolean;
  errors: string[];
};

export async function sendInquiryEmails(
  inquiry: InsertInquiry
): Promise<InquiryEmailDeliveryResult> {
  if (!isEmailJsConfigured()) {
    return {
      skipped: true,
      adminSent: false,
      guestSent: false,
      errors: ["EmailJS is not configured. Missing one or more VITE_EMAILJS_* variables."],
    };
  }

  const templateParams = {
    guest_name: inquiry.name ?? "",
    guest_email: inquiry.email ?? "",
    guest_phone: inquiry.phone ?? "",
    check_in: toDisplayDate(inquiry.checkIn),
    check_out: toDisplayDate(inquiry.checkOut),
    guests: String(inquiry.guests ?? ""),
    message: inquiry.message ?? "",
    inquiry_time: format(new Date(), "PPP p"),
  };

  const adminSend = emailjs.send(
    EMAILJS_CONFIG.serviceId,
    EMAILJS_CONFIG.adminTemplateId,
    {
      ...templateParams,
      to_email: EMAILJS_CONFIG.adminEmail || undefined,
      recipient_type: "admin",
    },
    { publicKey: EMAILJS_CONFIG.publicKey }
  );

  const guestSend = emailjs.send(
    EMAILJS_CONFIG.serviceId,
    EMAILJS_CONFIG.guestTemplateId,
    {
      ...templateParams,
      to_email: inquiry.email,
      recipient_type: "guest",
    },
    { publicKey: EMAILJS_CONFIG.publicKey }
  );

  const [adminResult, guestResult] = await Promise.allSettled([adminSend, guestSend]);

  const errors: string[] = [];
  if (adminResult.status === "rejected") {
    errors.push(`Admin email failed: ${String(adminResult.reason)}`);
  }
  if (guestResult.status === "rejected") {
    errors.push(`Guest email failed: ${String(guestResult.reason)}`);
  }

  return {
    skipped: false,
    adminSent: adminResult.status === "fulfilled",
    guestSent: guestResult.status === "fulfilled",
    errors,
  };
}
