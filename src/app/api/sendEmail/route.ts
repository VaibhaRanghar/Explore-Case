import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, phone, query } = await request.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.SITE_MAIL_RECEIVER,
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Query: ${query}
      `,
      replyTo: email,
    };

    const info = await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: true, messageId: info.messageId, info }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to send email." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
