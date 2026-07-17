import { Resend } from "resend";

let resendInstance: Resend | null = null;

export function getResend(): Resend | null {
  if (!resendInstance) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey.includes("your_resend_api_key_here") || apiKey.includes("placeholder")) {
      console.warn("RESEND_API_KEY is not configured or has default placeholder value.");
      return null;
    }
    resendInstance = new Resend(apiKey);
  }
  return resendInstance;
}

interface TicketEmailData {
  email: string;
  name: string;
  ticketId: string;
  eventName: string;
  eventDate: string;
  eventVenue: string;
}

export async function sendTicketEmail(data: TicketEmailData) {
  const client = getResend();
  if (!client) {
    console.error("Resend client could not be initialized. Skipping email sending.");
    return { success: false, error: "Resend not configured" };
  }

  const { email, name, ticketId, eventName, eventDate, eventVenue } = data;
  
  // Construct a secure, reliable QR Code image URL
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(ticketId)}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Your Entry Pass - ${eventName}</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #050816; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 40px auto; background-color: #0B1528; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 24px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
          <!-- Header -->
          <tr>
            <td style="padding: 30px 40px; background-color: #0d1e36; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: center;">
              <h2 style="margin: 0; font-size: 24px; font-weight: bold; color: #00E5FF; letter-spacing: 1px;">CYFO TECH CONNECT</h2>
              <p style="margin: 5px 0 0 0; font-size: 12px; color: #94A3B8; text-transform: uppercase; letter-spacing: 2px;">Official Entry Pass</p>
            </td>
          </tr>
          
          <!-- Body / Event Title -->
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center;">
              <span style="display: inline-block; padding: 4px 12px; background-color: rgba(0, 229, 255, 0.1); border: 1px solid rgba(0, 229, 255, 0.2); border-radius: 20px; font-size: 11px; font-weight: bold; color: #00E5FF; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">
                ⭐ Access Confirmed
              </span>
              <h1 style="margin: 0; font-size: 22px; font-weight: bold; line-height: 1.3; color: #ffffff;">
                ${eventName}
              </h1>
            </td>
          </tr>

          <!-- QR Code Section -->
          <tr>
            <td style="padding: 20px 40px; text-align: center;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin: auto;">
                <tr>
                  <td style="background-color: #ffffff; padding: 15px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.3);">
                    <img src="${qrCodeUrl}" alt="Ticket QR Code" width="200" height="200" style="display: block; width: 200px; height: 200px;" />
                  </td>
                </tr>
              </table>
              <p style="margin: 15px 0 0 0; font-size: 11px; font-family: monospace; color: #94A3B8; letter-spacing: 1px;">
                TICKET REF ID: <strong style="color: #00E5FF;">${ticketId}</strong>
              </p>
            </td>
          </tr>

          <!-- Details Grid -->
          <tr>
            <td style="padding: 20px 40px 30px 40px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 25px;">
                <tr>
                  <td width="50%" style="padding-bottom: 20px; vertical-align: top;">
                    <p style="margin: 0; font-size: 10px; text-transform: uppercase; color: #64748B; font-family: monospace; letter-spacing: 1px;">Attendee Name</p>
                    <p style="margin: 4px 0 0 0; font-size: 14px; font-weight: bold; color: #ffffff;">${name}</p>
                  </td>
                  <td width="50%" style="padding-bottom: 20px; vertical-align: top;">
                    <p style="margin: 0; font-size: 10px; text-transform: uppercase; color: #64748B; font-family: monospace; letter-spacing: 1px;">Pass Category</p>
                    <p style="margin: 4px 0 0 0; font-size: 14px; font-weight: bold; color: #ffffff;">General Admission</p>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="vertical-align: top;">
                    <p style="margin: 0; font-size: 10px; text-transform: uppercase; color: #64748B; font-family: monospace; letter-spacing: 1px;">Scheduled Date</p>
                    <p style="margin: 4px 0 0 0; font-size: 13px; font-weight: 500; color: #e2e8f0;">${eventDate}</p>
                  </td>
                  <td width="50%" style="vertical-align: top;">
                    <p style="margin: 0; font-size: 10px; text-transform: uppercase; color: #64748B; font-family: monospace; letter-spacing: 1px;">Venue Location</p>
                    <p style="margin: 4px 0 0 0; font-size: 13px; font-weight: 500; color: #e2e8f0;">${eventVenue}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer Text -->
          <tr>
            <td style="padding: 25px 40px; background-color: #060B14; border-top: 1px solid rgba(255, 255, 255, 0.06); text-align: center; border-bottom-left-radius: 24px; border-bottom-right-radius: 24px;">
              <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #94A3B8;">
                Please present this QR code at the registration desk for seamless check-in.
              </p>
              <p style="margin: 8px 0 0 0; font-size: 11px; color: #64748B;">
                Sent with security verification from Cyfo Tech Connect.
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  try {
    const response = await client.emails.send({
      from: "cyfoedu@gmail.com",
      to: email,
      subject: `Your Entry Pass: ${eventName} (${ticketId})`,
      html: htmlContent,
    });

    console.log("Resend response:", response);
    return { success: true, data: response };
  } catch (err: any) {
    console.error("Error sending ticket email with Resend:", err);
    return { success: false, error: err.message };
  }
}
