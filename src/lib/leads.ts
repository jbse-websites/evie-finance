import { createServerFn } from "@tanstack/react-start";

type LeadData = {
  first: string;
  last: string;
  email: string;
  mobile: string;
  ev: string;
  budget: string;
};

export const submitLead = createServerFn({ method: "POST" })
  .validator((data: unknown): LeadData => {
    const d = data as LeadData;
    if (!d.first || !d.last || !d.email || !d.mobile) {
      throw new Error("Missing required fields");
    }
    return d;
  })
  .handler(async ({ data }) => {
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "EVNOW <leads@evnow.co.nz>",
          to: ["josh@jbse.co.nz"],
          subject: `New EV Finance lead — ${data.first} ${data.last}`,
          html: `
            <h2 style="font-family:sans-serif">New EVNOW Lead</h2>
            <table style="font-family:sans-serif;border-collapse:collapse">
              <tr><td style="padding:4px 12px 4px 0"><strong>Name</strong></td><td>${data.first} ${data.last}</td></tr>
              <tr><td style="padding:4px 12px 4px 0"><strong>Email</strong></td><td>${data.email}</td></tr>
              <tr><td style="padding:4px 12px 4px 0"><strong>Mobile</strong></td><td>${data.mobile}</td></tr>
              <tr><td style="padding:4px 12px 4px 0"><strong>EV interest</strong></td><td>${data.ev || "Not specified"}</td></tr>
              <tr><td style="padding:4px 12px 4px 0"><strong>Budget</strong></td><td>${data.budget || "Not specified"}</td></tr>
            </table>
          `,
        }),
      });
      if (!res.ok) throw new Error(`Resend error: ${res.status}`);
    } else {
      console.log("[EVNOW lead — RESEND_API_KEY not set]", data);
    }
    return { ok: true };
  });
