# EmailJS Setup Guide (Admin + Guest Templates)

This project sends booking inquiry emails via EmailJS to:
- Admin (new inquiry notification)
- Guest (confirmation email)

## 1) Install dependency

Already installed in this project:
- @emailjs/browser

If needed again:

```bash
npm install @emailjs/browser
```

## 2) Create EmailJS service

1. Log in to EmailJS dashboard.
2. Go to Email Services.
3. Add a service (Gmail, Outlook, SMTP, etc.).
4. Copy the Service ID.

You will use this value for:
- VITE_EMAILJS_SERVICE_ID

## 3) Create two templates

Create these two EmailJS templates:
- Admin template (new inquiry alert)
- Guest template (booking confirmation)

Copy both template IDs:
- VITE_EMAILJS_ADMIN_TEMPLATE_ID
- VITE_EMAILJS_GUEST_TEMPLATE_ID

### Template variables used by the app

Use these exact variable names in both templates:
- {{guest_name}}
- {{guest_email}}
- {{guest_phone}}
- {{check_in}}
- {{check_out}}
- {{guests}}
- {{message}}
- {{inquiry_time}}
- {{to_email}}
- {{recipient_type}}

## 4) Recommended template content

### A) Admin template

Subject:

```text
New Booking Inquiry from {{guest_name}}
```

Body:

```text
A new inquiry has been submitted.

Name: {{guest_name}}
Email: {{guest_email}}
Phone: {{guest_phone}}
Check-in: {{check_in}}
Check-out: {{check_out}}
Guests: {{guests}}
Message: {{message}}
Submitted at: {{inquiry_time}}

Recipient type: {{recipient_type}}
```

### B) Guest template

Subject:

```text
We received your inquiry, {{guest_name}}
```

Body:

```text
Dear {{guest_name}},

Thank you for your inquiry at Bundeli Kothi.

Here is a copy of your details:
- Email: {{guest_email}}
- Phone: {{guest_phone}}
- Check-in: {{check_in}}
- Check-out: {{check_out}}
- Guests: {{guests}}
- Message: {{message}}

Our team will contact you shortly.

Regards,
Bundeli Kothi
```

## 5) Get public key

1. Open EmailJS Account settings.
2. Copy your Public Key.

Use this value for:
- VITE_EMAILJS_PUBLIC_KEY

## 6) Configure environment variables

Create this file:
- client/.env

You can copy from:
- client/.env.example

Add values:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
VITE_EMAILJS_ADMIN_TEMPLATE_ID=template_admin_xxxxxxx
VITE_EMAILJS_GUEST_TEMPLATE_ID=template_guest_xxxxxxx
VITE_BOOKING_ADMIN_EMAIL=admin@example.com
```

Notes:
- VITE_BOOKING_ADMIN_EMAIL is optional.
- If VITE_BOOKING_ADMIN_EMAIL is not set, configure recipient directly inside your EmailJS admin template.

## 7) How it works in this project

- Form is validated in:
  - client/src/components/InquiryForm.tsx
- Inquiry is saved to backend first in:
  - client/src/hooks/use-content.ts
- After successful save, app sends:
  - Admin email template
  - Guest email template
- EmailJS integration is implemented in:
  - client/src/lib/emailjs.ts

## 8) Test locally

1. Fill all required fields in booking form.
2. Submit inquiry.
3. Expected behavior:
   - Success toast: Inquiry Sent
   - Admin receives notification email
   - Guest receives confirmation email

If inquiry is saved but email fails, user sees:
- Inquiry Saved, Email Pending

## 9) Deploy environment variables

Add the same VITE_EMAILJS_* variables and optional VITE_BOOKING_ADMIN_EMAIL to your hosting platform environment settings.

## 10) Troubleshooting

- No emails sent:
  - Check all required VITE_EMAILJS_* values are present.
  - Verify Service ID, Template IDs, and Public Key are correct.
- Admin email not arriving:
  - Set VITE_BOOKING_ADMIN_EMAIL, or hardcode recipient inside admin template.
- Guest email not arriving:
  - Confirm guest template uses {{to_email}} or appropriate EmailJS recipient setting.
- Template values blank:
  - Ensure variable names exactly match the list in section 3.
