import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    // Parse the request body to get form data
    const { name, email, phone, query } = await request.json();

    // Create a transporter object with SMTP configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // Use TLS (secure: true for port 465)
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    console.log(process.env.EMAIL, process.env.PASSWORD);
    // Define email options
    const mailOptions = {
      from: process.env.EMAIL, // Sender email address
      to: process.env.SITE_MAIL_RECEIVER, // Receiver email address
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Query: ${query}
      `, // Plain text body
      replyTo: email, // Reply-to email address
    };

    // Send the email
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
