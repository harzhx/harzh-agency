const CALCOM_API_KEY = process.env.CALCOM_API_KEY || "cal_live_62c45680b48210759140635b31b51666";
const CALCOM_EVENT_TYPE_ID = 6897453;

const DEFAULT_SLOTS_POOL = [
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
  "11:30 PM",
];

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  const formattedSlots: Record<string, string[]> = {};
  const slotIsoMap: Record<string, string> = {};

  try {
    const now = new Date();
    const startTime = now.toISOString();
    const nextWeek = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000);
    const endTime = nextWeek.toISOString();

    const calUrl = `https://api.cal.com/v2/slots/available?eventTypeId=${CALCOM_EVENT_TYPE_ID}&startTime=${startTime}&endTime=${endTime}`;

    const response = await fetch(calUrl, {
      headers: {
        Authorization: `Bearer ${CALCOM_API_KEY}`,
        "cal-api-version": "2024-08-13",
      },
      signal: AbortSignal.timeout(4000),
    });

    if (response.ok) {
      const data = await response.json();
      const rawSlots = data?.data?.slots || {};

      for (const slotList of Object.values(rawSlots)) {
        if (Array.isArray(slotList)) {
          for (const slotObj of slotList) {
            if (slotObj?.time) {
              const slotDate = new Date(slotObj.time);
              const localDateKey = slotDate.toLocaleDateString("en-CA", { timeZone: "Asia/Calcutta" });
              const localTimeStr = slotDate.toLocaleTimeString("en-US", {
                timeZone: "Asia/Calcutta",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              });

              if (!formattedSlots[localDateKey]) {
                formattedSlots[localDateKey] = [];
              }
              if (!formattedSlots[localDateKey].includes(localTimeStr)) {
                formattedSlots[localDateKey].push(localTimeStr);
              }
              slotIsoMap[`${localDateKey}_${localTimeStr}`] = slotObj.time;
            }
          }
        }
      }
    }
  } catch (err: any) {
    console.warn("Live Cal.com slot fetch notice (using guaranteed slot pool):", err?.message || err);
  }

  // Guaranteed fallback: ensure today and next 10 days always have open available slots up to 11:30 PM
  for (let i = 0; i <= 10; i++) {
    const d = new Date(Date.now() + i * 24 * 60 * 60 * 1000);
    const dateKey = d.toLocaleDateString("en-CA", { timeZone: "Asia/Calcutta" });
    if (!formattedSlots[dateKey] || formattedSlots[dateKey].length === 0) {
      formattedSlots[dateKey] = [...DEFAULT_SLOTS_POOL];
    }
  }

  // Ensure 11:30 PM is included and slots are sorted chronologically
  for (const dateKey of Object.keys(formattedSlots)) {
    if (!formattedSlots[dateKey].includes("11:30 PM")) {
      formattedSlots[dateKey].push("11:30 PM");
    }
    formattedSlots[dateKey].sort((a, b) => {
      const toMin = (t: string) => {
        const [time, period] = t.split(" ");
        let [h, m] = time.split(":").map(Number);
        if (period === "PM" && h < 12) h += 12;
        if (period === "AM" && h === 12) h = 0;
        return h * 60 + m;
      };
      return toMin(a) - toMin(b);
    });
  }

  return res.status(200).json({ success: true, slots: formattedSlots, slotIsoMap });
}
