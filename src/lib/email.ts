import { Resend } from 'resend';

// Resend client — needs RESEND_API_KEY in .env
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM = process.env.EMAIL_FROM || 'Har Ghar Service <bookings@hargharservice.in>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@hargharservice.in';
const BRAND_GOLD = '#c9a227';
const BRAND_CHARCOAL = '#2b2b2b';

type BookingEmailData = {
  bookingNo: string;
  customerName: string;
  customerEmail?: string;
  serviceTitle: string;
  category?: string;
  bookingDate: string;
  timeSlot: string;
  quantity: number;
  totalAmount: number;
  gstAmount: number;
  subtotal: number;
  discount: number;
  address: string;
  phone?: string;
  notes?: string;
};

const inr = (n: number) => '₹' + n.toLocaleString('en-IN');

function layout(title: string, bodyHtml: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title></head>
<body style="margin:0;padding:0;background:#f7f4ee;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;">
    <div style="background:${BRAND_CHARCOAL};padding:24px 28px;text-align:center;">
      <div style="color:${BRAND_GOLD};font-size:26px;font-weight:bold;letter-spacing:2px;font-family:Georgia,serif;">HGS</div>
      <div style="color:#ffffff;font-size:12px;letter-spacing:3px;margin-top:4px;">HAR GHAR SERVICE</div>
    </div>
    <div style="padding:28px;">
      ${bodyHtml}
    </div>
    <div style="background:#f7f4ee;padding:20px 28px;text-align:center;color:#8a857c;font-size:12px;line-height:1.6;">
      <p style="margin:0 0 6px;">Shop No. 3, Plot No. 1341/94, Karnail Singh Nagar, Phase 3, Ludhiana, Punjab - 141006</p>
      <p style="margin:0;">Call: <a href="tel:+919780554129" style="color:${BRAND_GOLD};text-decoration:none;">097805 54129</a> · <a href="mailto:admin@hargharservice.in" style="color:${BRAND_GOLD};text-decoration:none;">admin@hargharservice.in</a></p>
    </div>
  </div>
</body>
</html>`;
}

function bookingDetailsTable(d: BookingEmailData) {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 0;color:#8a857c;font-size:13px;vertical-align:top;">${label}</td><td style="padding:8px 0;font-size:14px;color:${BRAND_CHARCOAL};text-align:right;font-weight:bold;">${value}</td></tr>`;
  return `
  <table role="presentation" style="width:100%;border-collapse:collapse;">
    ${row('Booking No.', d.bookingNo)}
    ${row('Service', d.serviceTitle)}
    ${d.category ? row('Category', d.category) : ''}
    ${row('Date', d.bookingDate)}
    ${row('Time Slot', d.timeSlot)}
    ${row('Quantity', String(d.quantity))}
    ${row('Address', d.address)}
  </table>
  <table role="presentation" style="width:100%;border-collapse:collapse;margin-top:16px;border-top:1px solid #e6dfd0;padding-top:12px;">
    ${row('Subtotal', inr(d.subtotal))}
    ${row('GST (18%)', inr(d.gstAmount))}
    ${d.discount > 0 ? row('Discount', '- ' + inr(d.discount)) : ''}
    <tr>
      <td style="padding:12px 0 0;color:${BRAND_CHARCOAL};font-size:15px;font-weight:bold;">Total</td>
      <td style="padding:12px 0 0;color:${BRAND_GOLD};font-size:18px;font-weight:bold;text-align:right;">${inr(d.totalAmount)}</td>
    </tr>
  </table>`;
}

// ── Customer confirmation email ─────────────────────────────
function customerBookingHtml(d: BookingEmailData) {
  const body = `
    <h2 style="margin:0 0 6px;color:${BRAND_CHARCOAL};font-size:22px;">Booking Confirmed, ${d.customerName}!</h2>
    <p style="margin:0 0 20px;color:#8a857c;font-size:14px;">Thank you for booking with Har Ghar Service. Our team will reach out shortly to confirm your slot.</p>
    ${bookingDetailsTable(d)}
    <div style="margin-top:24px;padding:16px;background:#f6efd8;border-left:4px solid ${BRAND_GOLD};border-radius:6px;">
      <p style="margin:0;font-size:13px;color:${BRAND_CHARCOAL};">Need to reschedule or cancel? Call us at <strong>097805 54129</strong> — we're available 24/7.</p>
    </div>`;
  return layout('Booking Confirmation', body);
}

// ── Admin notification email ────────────────────────────────
function adminBookingHtml(d: BookingEmailData) {
  const body = `
    <h2 style="margin:0 0 6px;color:${BRAND_CHARCOAL};font-size:22px;">New Booking Received</h2>
    <p style="margin:0 0 20px;color:#8a857c;font-size:14px;">A new booking has been placed. Please assign an executive.</p>
    ${bookingDetailsTable(d)}
    <table role="presentation" style="width:100%;border-collapse:collapse;margin-top:16px;border-top:1px solid #e6dfd0;padding-top:12px;">
      <tr><td style="padding:8px 0;color:#8a857c;font-size:13px;">Customer</td><td style="padding:8px 0;font-size:14px;color:${BRAND_CHARCOAL};text-align:right;font-weight:bold;">${d.customerName}</td></tr>
      ${d.customerEmail ? `<tr><td style="padding:8px 0;color:#8a857c;font-size:13px;">Email</td><td style="padding:8px 0;font-size:14px;text-align:right;">${d.customerEmail}</td></tr>` : ''}
      ${d.phone ? `<tr><td style="padding:8px 0;color:#8a857c;font-size:13px;">Phone</td><td style="padding:8px 0;font-size:14px;text-align:right;">${d.phone}</td></tr>` : ''}
      ${d.notes ? `<tr><td style="padding:8px 0;color:#8a857c;font-size:13px;vertical-align:top;">Notes</td><td style="padding:8px 0;font-size:14px;text-align:right;">${d.notes}</td></tr>` : ''}
    </table>`;
  return layout('New Booking', body);
}

export type SendResult = { ok: boolean; error?: string };

async function send(to: string | string[], subject: string, html: string): Promise<SendResult> {
  if (!resend) {
    console.warn('[email] RESEND_API_KEY not set — skipping email:', subject);
    return { ok: false, error: 'RESEND_API_KEY not configured' };
  }
  try {
    await resend.emails.send({ from: FROM, to, subject, html });
    return { ok: true };
  } catch (e: any) {
    console.error('[email] send failed:', e?.message || e);
    return { ok: false, error: e?.message || 'send failed' };
  }
}

export async function sendBookingConfirmation(d: BookingEmailData): Promise<SendResult> {
  if (!d.customerEmail) return { ok: false, error: 'no customer email' };
  return send(d.customerEmail, `Booking Confirmed — ${d.bookingNo} | Har Ghar Service`, customerBookingHtml(d));
}

export async function sendBookingAdminNotification(d: BookingEmailData): Promise<SendResult> {
  return send(ADMIN_EMAIL, `New Booking ${d.bookingNo} — ${d.serviceTitle}`, adminBookingHtml(d));
}

export async function sendBookingStatusUpdate(
  to: string, d: { bookingNo: string; serviceTitle: string; status: string; customerName: string }
): Promise<SendResult> {
  const body = `
    <h2 style="margin:0 0 6px;color:${BRAND_CHARCOAL};font-size:22px;">Booking ${d.status}</h2>
    <p style="margin:0 0 20px;color:#8a857c;font-size:14px;">Hi ${d.customerName}, your booking <strong>${d.bookingNo}</strong> for <strong>${d.serviceTitle}</strong> is now <strong>${d.status}</strong>.</p>
    <p style="font-size:13px;color:#8a857c;">Questions? Call <strong>097805 54129</strong> anytime.</p>`;
  return send(to, `Booking ${d.status} — ${d.bookingNo} | Har Ghar Service`, layout(`Booking ${d.status}`, body));
}
