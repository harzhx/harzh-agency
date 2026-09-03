const CALCOM_API_KEY = process.env.CALCOM_API_KEY || "cal_live_62c45680b48210759140635b31b51666";
const CALCOM_EVENT_TYPE_ID = 6897453;

function parseSlotToISO(dateStr: string, slotStr: string): string {
  try {
    const d = new Date(dateStr);
    const [time, period] = (slotStr || "5:00 PM").split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period === "PM" && hours < 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const h = String(hours).padStart(2, "0");
    const m = String(minutes).padStart(2, "0");

    const istISO = `${year}-${month}-${day}T${h}:${m}:00+05:30`;
    return new Date(istISO).toISOString();
  } catch {
    return new Date(Date.now() + 86400000).toISOString();
  }
}

function normalizeRevenueTier(tier: string): string {
  const t = (tier || "").toLowerCase();
  if (t.includes("10k") || t.includes("10,000") || t.includes("above")) return "Above $10,000";
  if (t.includes("0 – 1k") || t.includes("0 - 1k") || t.includes("0 – $1k") || t.includes("0 – 1,000") || t.includes("0 - 1,000")) return "$0 – $1,000";
  if (t.includes("1k – 5k") || t.includes("1k - 5k") || t.includes("1k – $5k") || t.includes("1,000 – 5,000") || t.includes("1,000 - 5,000")) return "$1,000 – $5,000";
  if (t.includes("5k – 10k") || t.includes("5k - 10k") || t.includes("5k – $10k") || t.includes("5,000 – 10,000") || t.includes("5,000 - 10,000")) return "$5,000 – $10,000";
  return "$1,000 – $5,000";
}

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") {
    return res.status(200).json({ status: "ok" });
  }

  const { name, email, channelLink, revenueTier, phone, selectedDate, selectedSlot, slotIso } = req.body || {};

  if (!name || !email || !channelLink) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  let meetingUrl = "https://meet.google.com/hzh-cal-strategy";
  let calBookingId: any = null;
  let calSuccess = false;

  try {
    const startISO = slotIso || parseSlotToISO(selectedDate, selectedSlot);
    const normalizedRevenue = normalizeRevenueTier(revenueTier || "");

    const payload: any = {
      start: startISO,
      eventTypeId: CALCOM_EVENT_TYPE_ID,
      attendee: {
        name,
        email,
        timeZone: "Asia/Calcutta",
      },
      bookingFieldsResponses: {
        "Link-to-your-social-media-accounts-or": channelLink,
        "What-s-your-total-monthly-business-revenue-in": normalizedRevenue,
      },
    };

    if (phone && phone.trim()) {
      payload.attendee.phoneNumber = phone.trim();
    }

    const response = await fetch("https://api.cal.com/v2/bookings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CALCOM_API_KEY}`,
        "cal-api-version": "2024-08-13",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(12000),
    });

    const calResponse = await response.json();

    if (response.ok && calResponse?.data?.id) {
      calSuccess = true;
      calBookingId = calResponse.data.id;
      meetingUrl = calResponse.data.meetingUrl || calResponse.data.location || meetingUrl;
      console.log(`[CAL.COM SUCCESS] Booking #${calBookingId} created for ${name} (${email}):`, meetingUrl);
    } else {
      console.warn("[CAL.COM NOTICE]:", calResponse?.error?.message || "Using fallback meet link");
    }
  } catch (apiErr: any) {
    console.warn("Cal.com background sync notice:", apiErr);
  }

  return res.status(200).json({
    success: true,
    bookingId: calBookingId,
    calSuccess,
    booking: {
      data: {
        meetingUrl,
        location: meetingUrl,
        id: calBookingId,
      },
    },
  });
}
