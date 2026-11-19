import { Resend } from "resend";

type NewRequest = {
  id: string;
  name: string;
  email: string;
  phone: string;
  idea: string;
  zone: string;
  size: string;
  photoCount: number;
};

// Todo lo que escribe el visitante se "escapa" antes de meterlo en el HTML
const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Para el asunto: sin saltos de línea y con longitud limitada
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").slice(0, 80);

export async function sendRequestEmails(r: NewRequest) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const notify = process.env.ADMIN_NOTIFY_EMAIL;

  if (!key || !from || !notify) {
    console.warn("Emails no configurados: se omite el envío.");
    return;
  }

  const resend = new Resend(key);
  const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";
  const adminLink = `${siteUrl}/admin/${r.id}`;

  const row = (k: string, v: string) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td style="padding:4px 0">${esc(v)}</td></tr>`;

  // 1) Aviso para ella
  const herHtml = `
    <div style="font-family:Arial,sans-serif;max-width:560px">
      <h2 style="margin:0 0 16px">Nueva solicitud de cita</h2>
      <table>
        ${row("Nombre", r.name)}
        ${row("Email", r.email)}
        ${row("Teléfono", r.phone || "—")}
        ${row("Zona", r.zone)}
        ${row("Tamaño", r.size)}
        ${row("Fotos", String(r.photoCount))}
      </table>
      <p style="margin:16px 0 4px;color:#666">Idea</p>
      <p style="white-space:pre-wrap;margin:0">${esc(r.idea)}</p>
      <p style="margin-top:24px"><a href="${adminLink}">Abrir en el panel</a></p>
      <p style="color:#888;font-size:12px">
        Puedes responder a este email para escribir directamente al cliente.
      </p>
    </div>`;

  const herText = [
    "Nueva solicitud de cita",
    `Nombre: ${r.name}`,
    `Email: ${r.email}`,
    `Teléfono: ${r.phone || "—"}`,
    `Zona: ${r.zone}`,
    `Tamaño: ${r.size}`,
    `Fotos: ${r.photoCount}`,
    "",
    r.idea,
    "",
    `Panel: ${adminLink}`,
  ].join("\n");

  // 2) Confirmación para el cliente (texto fijo, sin contenido del visitante)
  const clientHtml = `
    <div style="font-family:Arial,sans-serif;max-width:560px">
      <p>Hola,</p>
      <p>Gracias por tu solicitud. La he recibido y la revisaré con calma.
         Te responderé por email lo antes posible con una propuesta y fechas disponibles.</p>
      <p>Un saludo,<br>Aintzire Urra</p>
    </div>`;

  const clientText =
    "Hola,\n\nGracias por tu solicitud. La he recibido y la revisaré con calma. " +
    "Te responderé por email lo antes posible con una propuesta y fechas disponibles.\n\n" +
    "Un saludo,\nAintzire Urra";

  const results = await Promise.allSettled([
    resend.emails.send({
      from,
      to: [notify],
      replyTo: r.email,
      subject: `Nueva solicitud de ${oneLine(r.name)}`,
      html: herHtml,
      text: herText,
    }),
    resend.emails.send({
      from,
      to: [r.email],
      replyTo: notify,
      subject: "He recibido tu solicitud",
      html: clientHtml,
      text: clientText,
    }),
  ]);

  const labels = ["aviso a Aintzire", "confirmación al cliente"];
  results.forEach((res, i) => {
    if (res.status === "rejected") {
      console.error(`Email (${labels[i]}) falló:`, res.reason);
    } else if (res.value.error) {
      console.error(`Email (${labels[i]}) rechazado:`, res.value.error.message);
    }
  });
}