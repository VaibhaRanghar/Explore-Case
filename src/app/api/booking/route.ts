import nodemailer from "nodemailer";

interface BookingFormData {
  ticketType: string;
  tourType: string;
  departureDate: string;
  destinationFrom: string;
  destinationTo: string;
  adults: number;
  children: number;
  infants: number;
  seniors: number;
  description: string;
  name: string;
  email: string;
  country: string;
  state: string;
  city: string;
  mobile: string;
}

export async function POST(request: Request) {
  try {
    const formData: BookingFormData = await request.json();

    // Validate required fields
    const requiredFields = [
      "ticketType",
      "tourType",
      "departureDate",
      "destinationFrom",
      "destinationTo",
      "name",
      "email",
      "country",
      "state",
      "city",
      "mobile",
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof BookingFormData]) {
        return new Response(
          JSON.stringify({
            success: false,
            error: `Missing required field: ${field}`,
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    // Calculate total passengers
    const totalPassengers =
      formData.adults + formData.children + formData.infants + formData.seniors;

    // Generate booking reference number
    const bookingRef = `TRV-${Date.now()
      .toString(36)
      .toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Format departure date for display
    const formattedDate = new Date(formData.departureDate).toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

    // Email to you (website owner/travel agency) with booking data
    const bookingDataEmail = {
      from: process.env.EMAIL,
      to: process.env.SITE_MAIL_RECEIVER,
      subject: `🎫 New Booking Request - ${formData.name} | ${formData.destinationFrom} → ${formData.destinationTo} | ${totalPassengers} pax`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Travel Booking Request</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 800px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .header h1 { margin: 0; font-size: 28px; }
            .booking-ref { background: rgba(255,255,255,0.2); padding: 10px; border-radius: 5px; margin-top: 15px; font-weight: bold; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .section { background: white; margin: 20px 0; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .section h2 { color: #10b981; margin-top: 0; padding-bottom: 10px; border-bottom: 2px solid #e5e7eb; }
            .detail-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; }
            .detail-item { padding: 15px; background: #f8f9fa; border-radius: 5px; border-left: 4px solid #10b981; }
            .detail-label { font-weight: bold; color: #374151; display: block; margin-bottom: 5px; }
            .detail-value { color: #6b7280; }
            .passenger-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
            .passenger-count { text-align: center; padding: 15px; background: #ecfdf5; border-radius: 5px; }
            .passenger-number { font-size: 24px; font-weight: bold; color: #10b981; }
            .passenger-label { font-size: 12px; color: #6b7280; text-transform: uppercase; }
            .total-passengers { text-align: center; margin: 20px 0; padding: 20px; background: #10b981; color: white; border-radius: 8px; }
            .description-box { background: #f0f9ff; border: 1px solid #e0e7ff; padding: 20px; border-radius: 5px; margin-top: 15px; }
            .priority { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 5px; }
            .footer { text-align: center; margin-top: 30px; padding: 20px; background: #f3f4f6; border-radius: 5px; }
            .summary-table { width: 100%; border-collapse: collapse; margin: 25px 0; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
            .summary-table th { background: #f1f5f9; padding: 15px; text-align: left; font-weight: 600; color: #334155; border-bottom: 1px solid #e2e8f0; }
            .summary-table td { padding: 15px; border-bottom: 1px solid #f1f5f9; }
            .summary-table tr:last-child td { border-bottom: none; }
            .highlight-route { background: linear-gradient(90deg, #10b981, #059669); color: white; padding: 2px 8px; border-radius: 15px; font-weight: 600; }
            @media (max-width: 768px) {
              .container { padding: 10px; }
              .header { padding: 30px 20px; }
              .content { padding: 25px 20px; }
              .data-grid { grid-template-columns: 1fr; }
              .passenger-summary { grid-template-columns: repeat(2, 1fr); }
              .contact-grid { grid-template-columns: 1fr; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎫 New Travel Booking Request</h1>
              <div class="booking-ref">Reference: ${bookingRef}</div>
              <p>Received on ${new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}</p>
            </div>
            
            <div class="content">
              <div class="priority">
                <strong>⚡ Action Required:</strong> A new travel booking request has been submitted and requires your immediate attention for availability check and quote preparation.
              </div>

              <div class="section">
                <h2>✈️ Travel Details</h2>
                <div class="detail-grid">
                  <div class="detail-item">
                    <span class="detail-label">Ticket Type</span>
                    <span class="detail-value">${
                      formData.ticketType.charAt(0).toUpperCase() +
                      formData.ticketType.slice(1)
                    }</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Tour Type</span>
                    <span class="detail-value">${formData.tourType
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Departure Date</span>
                    <span class="detail-value">${formattedDate}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Route</span>
                    <span class="detail-value">${formData.destinationFrom} → ${
        formData.destinationTo
      }</span>
                  </div>
                </div>
              </div>

              <div class="section">
                <h2>👥 Passenger Information</h2>
                <div class="passenger-grid">
                  <div class="passenger-count">
                    <div class="passenger-number">${formData.adults}</div>
                    <div class="passenger-label">Adults</div>
                  </div>
                  <div class="passenger-count">
                    <div class="passenger-number">${formData.children}</div>
                    <div class="passenger-label">Children</div>
                  </div>
                  <div class="passenger-count">
                    <div class="passenger-number">${formData.infants}</div>
                    <div class="passenger-label">Infants</div>
                  </div>
                  <div class="passenger-count">
                    <div class="passenger-number">${formData.seniors}</div>
                    <div class="passenger-label">Sr. Citizens</div>
                  </div>
                </div>
                <div class="total-passengers">
                  <strong>Total Passengers: ${totalPassengers}</strong>
                </div>
              </div>

              <div class="section">
                <h2>📋 Customer Information</h2>
                <div class="detail-grid">
                  <div class="detail-item">
                    <span class="detail-label">Full Name</span>
                    <span class="detail-value">${formData.name}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Email Address</span>
                    <span class="detail-value">${formData.email}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Mobile Number</span>
                    <span class="detail-value">${formData.mobile}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Location</span>
                    <span class="detail-value">${formData.city}, ${
        formData.state
      }, ${formData.country}</span>
                  </div>
                </div>
              </div>

              ${
                formData.description
                  ? `
              <div class="section">
                <h2>💬 Special Requirements</h2>
                <div class="description-box">
                  <p><strong>Customer Message:</strong></p>
                  <p>${formData.description}</p>
                </div>
              </div>
              `
                  : ""
              }

              <div class="data-section">
                <h2 class="section-title">📊 Complete Booking Summary</h2>
                <table class="summary-table">
                  <tr>
                    <th>Booking Reference</th>
                    <td><strong>${bookingRef}</strong></td>
                  </tr>
                  <tr>
                    <th>Customer Name</th>
                    <td>${formData.name}</td>
                  </tr>
                  <tr>
                    <th>Contact Info</th>
                    <td>${formData.email} • ${formData.mobile}</td>
                  </tr>
                  <tr>
                    <th>Travel Details</th>
                    <td>${formData.ticketType.toUpperCase()} ${formData.tourType
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")} • ${formData.destinationFrom} → ${
        formData.destinationTo
      }</td>
                  </tr>
                  <tr>
                    <th>Departure Date</th>
                    <td>${formattedDate}</td>
                  </tr>
                  <tr>
                    <th>Total Passengers</th>
                    <td><strong>${totalPassengers}</strong> (${
        formData.adults
      } Adult${formData.adults > 1 ? "s" : ""}${
        formData.children > 0
          ? `, ${formData.children} Child${formData.children > 1 ? "ren" : ""}`
          : ""
      }${
        formData.infants > 0
          ? `, ${formData.infants} Infant${formData.infants > 1 ? "s" : ""}`
          : ""
      }${
        formData.seniors > 0
          ? `, ${formData.seniors} Senior${formData.seniors > 1 ? "s" : ""}`
          : ""
      })</td>
                  </tr>
                  <tr>
                    <th>Customer Location</th>
                    <td>${formData.city}, ${formData.state}, ${
        formData.country
      }</td>
                  </tr>
                  <tr>
                    <th>Submission Time</th>
                    <td>${new Date().toLocaleString()}</td>
                  </tr>
                </table>
              </div>

              <div class="footer">
                <p><strong>Next Steps:</strong></p>
                <p>1. Check availability for the requested dates and route<br>
                2. Prepare quote based on passenger count and requirements<br>
                3. Contact customer within 24 hours with booking details<br>
                4. Send booking confirmation once payment is processed</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
🎫 NEW BOOKING REQUEST - ${bookingRef}
=======================================

⚡ IMMEDIATE ACTION REQUIRED ⚡
Customer: ${formData.name}
Contact: ${formData.email} | ${formData.mobile}

TRIP DETAILS:
============
Travel Type: ${formData.ticketType.toUpperCase()}
Journey Type: ${formData.tourType
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")}
Route: ${formData.destinationFrom} → ${formData.destinationTo}
Departure: ${formattedDate}

PASSENGERS:
===========
Adults: ${formData.adults}
Children: ${formData.children}
Infants: ${formData.infants}
Sr. Citizens: ${formData.seniors}
TOTAL: ${totalPassengers}

CUSTOMER DETAILS:
================
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.mobile}
Location: ${formData.city}, ${formData.state}, ${formData.country}

${
  formData.description ? `SPECIAL REQUIREMENTS:\n${formData.description}\n` : ""
}

ACTION REQUIRED:
===============
1. Check availability for ${formattedDate}
2. Prepare quote for ${totalPassengers} passengers
3. Contact customer within 4-6 hours
4. Send booking options and payment details
5. Process booking upon confirmation

Reference: ${bookingRef}
Submitted: ${new Date().toLocaleString()}
      `,
      replyTo: formData.email,
    };
    // Confirmation email to customer
    const customerMailOptions = {
      from: process.env.EMAIL,
      to: formData.email,
      subject: `✅ Travel Booking Request Received - ${bookingRef}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Booking Confirmation</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .booking-ref { background: rgba(255,255,255,0.2); padding: 15px; border-radius: 5px; margin: 15px 0; font-size: 18px; font-weight: bold; }
            .section { background: white; margin: 20px 0; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .highlight { background: #ecfdf5; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0; border-radius: 5px; }
            .next-steps { background: #eff6ff; border: 1px solid #dbeafe; padding: 20px; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Booking Request Received!</h1>
              <div class="booking-ref">Reference: ${bookingRef}</div>
              <p>Thank you for choosing our travel services</p>
            </div>
            
            <div class="content">
              <div class="highlight">
                <strong>Hello ${formData.name},</strong><br>
                We have successfully received your travel booking request for your ${
                  formData.ticketType
                } ${formData.tourType.split("-").join(" ")} trip from ${
        formData.destinationFrom
      } to ${formData.destinationTo} on ${formattedDate}.
              </div>

              <div class="section">
                <h3>📋 Your Booking Summary</h3>
                <p><strong>Travel Details:</strong><br>
                ${formData.ticketType.toUpperCase()} • ${formData.tourType
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")}<br>
                ${formData.destinationFrom} → ${formData.destinationTo}<br>
                Departure: ${formattedDate}</p>
                
                <p><strong>Passengers:</strong> ${totalPassengers} person${
        totalPassengers > 1 ? "s" : ""
      } (${formData.adults} Adult${formData.adults > 1 ? "s" : ""}${
        formData.children > 0
          ? `, ${formData.children} Child${formData.children > 1 ? "ren" : ""}`
          : ""
      }${
        formData.infants > 0
          ? `, ${formData.infants} Infant${formData.infants > 1 ? "s" : ""}`
          : ""
      }${
        formData.seniors > 0
          ? `, ${formData.seniors} Senior${formData.seniors > 1 ? "s" : ""}`
          : ""
      })</p>
              </div>

              <div class="next-steps">
                <h3>🔄 What happens next?</h3>
                <ol>
                  <li><strong>Review Process (Within 2-4 hours):</strong> Our travel experts will review your request and check availability for your preferred dates.</li>
                  <li><strong>Quote Preparation (Within 24 hours):</strong> We'll prepare a detailed quote with the best available options and pricing.</li>
                  <li><strong>Contact & Confirmation:</strong> Our team will contact you via email or phone with your booking options and next steps.</li>
                  <li><strong>Final Booking:</strong> Once you approve the details and complete payment, your booking will be confirmed.</li>
                </ol>
              </div>

              <div class="section">
                <h3>📞 Need to make changes or have questions?</h3>
                <p>Contact us with your booking reference number <strong>${bookingRef}</strong>:</p>
                <ul>
                  <li>Email: ${
                    process.env.SITE_MAIL_RECEIVER ||
                    "bookings@travelagency.com"
                  }</li>
                  <li>Phone: Available in your quote email</li>
                </ul>
              </div>

              <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f3f4f6; border-radius: 5px;">
                <p><strong>Thank you for choosing us for your travel needs!</strong><br>
                We're committed to making your journey memorable and hassle-free.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Travel Booking Request Received - ${bookingRef}
=============================================

Hello ${formData.name},

Thank you for submitting your travel booking request. We have received your request for:

TRIP DETAILS:
- Type: ${formData.ticketType.toUpperCase()} ${formData.tourType
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")}
- Route: ${formData.destinationFrom} to ${formData.destinationTo}
- Date: ${formattedDate}
- Passengers: ${totalPassengers}

WHAT'S NEXT:
1. Our team will review your request within 2-4 hours
2. We'll prepare a detailed quote within 24 hours
3. You'll receive booking options via email or phone
4. Complete payment to confirm your booking

Your booking reference: ${bookingRef}

For any questions, contact us with this reference number.

Thank you for choosing our travel services!
      `,
    };

    // Send both emails
    const adminInfo = await transporter.sendMail(bookingDataEmail);
    const customerInfo = await transporter.sendMail(customerMailOptions);

    return new Response(
      JSON.stringify({
        success: true,
        bookingReference: bookingRef,
        adminMessageId: adminInfo.messageId,
        customerMessageId: customerInfo.messageId,
        message:
          "Booking request submitted successfully. Confirmation emails sent.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing booking request:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to process booking request. Please try again later.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
