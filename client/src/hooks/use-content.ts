import { useMutation } from "@tanstack/react-query";
import { api, type InsertInquiry } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { STATIC_ACTIVITIES, STATIC_COTTAGES, STATIC_TESTIMONIALS } from "@/data/static-data";
import { sendInquiryEmails } from "@/lib/emailjs";

// Fetch Cottages — served directly from static data
export function useCottages() {
  return {
    data: STATIC_COTTAGES,
    isLoading: false,
    error: null,
  };
}

// Fetch Single Cottage — served directly from static data
export function useCottage(id: number) {
  return {
    data: STATIC_COTTAGES.find((c) => c.id === id),
    isLoading: false,
    error: null,
  };
}

// Fetch Activities — served directly from static data
export function useActivities() {
  return {
    data: STATIC_ACTIVITIES,
    isLoading: false,
    error: null,
  };
}

// Fetch Testimonials — served directly from static data
export function useTestimonials() {
  return {
    data: STATIC_TESTIMONIALS,
    isLoading: false,
    error: null,
  };
}

// Submit Inquiry — still sends to the API
export function useSubmitInquiry() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertInquiry) => {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 10000);

      const apiPromise = (async () => {
        try {
          const res = await fetch(api.inquiries.create.path, {
            method: api.inquiries.create.method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            signal: controller.signal,
          });

          if (!res.ok) {
            const contentType = res.headers.get("content-type") || "";
            if (contentType.includes("application/json")) {
              const error = await res.json();
              throw new Error(error.message || "Failed to submit inquiry");
            }
            throw new Error("Failed to submit inquiry");
          }

          return api.inquiries.create.responses[201].parse(await res.json());
        } finally {
          window.clearTimeout(timeoutId);
        }
      })();

      const [apiResult, emailResult] = await Promise.allSettled([
        apiPromise,
        sendInquiryEmails(data),
      ]);

      const apiSaved = apiResult.status === "fulfilled";
      const emailSent =
        emailResult.status === "fulfilled" &&
        !emailResult.value.skipped &&
        (emailResult.value.adminSent || emailResult.value.guestSent);

      if (!apiSaved && !emailSent) {
        if (apiResult.status === "rejected") {
          throw new Error(apiResult.reason?.message || "Unable to submit inquiry. Please try again.");
        }
        throw new Error("Unable to submit inquiry. Please try again.");
      }

      return {
        apiSaved,
        emailResult: emailResult.status === "fulfilled" ? emailResult.value : null,
      };
    },
    onSuccess: (result) => {
      if (!result.apiSaved && result.emailResult) {
        toast({
          title: "Inquiry Sent",
          description: "Your inquiry email was sent successfully.",
          variant: "default",
        });
        return;
      }

      toast({
        title: "Inquiry Sent",
        description: "Thank you for reaching out. We will get back to you shortly.",
        variant: "default",
      });

      if (result.emailResult && (!result.emailResult.adminSent || !result.emailResult.guestSent)) {
        console.error(result.emailResult.errors.join(" | "));
        toast({
          title: "Inquiry Saved, Email Pending",
          description:
            "Your inquiry was saved, but one or more confirmation emails could not be delivered right now.",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
