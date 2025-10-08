import nodemailer from "nodemailer";

interface OnlineBookingFormData {
  packageId: number;
  packageName: string;
  arrivalDate: string;
  departureDate: string;
  name: string;
  phone: string;
  email: string;
  country: string;
  state: string;
  city: string;
  streetAddress: string;
  carCoach: string;
}

export async function POST(request: Request) {
  try {
    const formData: OnlineBookingFormData = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'packageName', 'arrivalDate', 'departureDate', 'name', 'phone', 'email'
    ];
    
    for (const field of requiredFields) {
      if (!formData[field as keyof OnlineBookingFormData]) {
        return new Response(
          JSON.stringify({ success: false, error: `Missing required field: ${field}` }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    // Calculate trip duration
    const arrivalDate = new Date(formData.arrivalDate);
    const departureDate = new Date(formData.departureDate);
    const tripDuration = Math.ceil((departureDate.getTime() - arrivalDate.getTime()) / (1000 * 60 * 60 * 24));
    const nights = tripDuration - 1;

    // Generate booking reference number
    const bookingRef = `BK-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Format dates for display
    const formattedArrival = arrivalDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const formattedDeparture = departureDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Build full address
    const addressParts = [
      formData.streetAddress,
      formData.city,
      formData.state,
      formData.country
    ].filter(part => part && part.trim());
    const fullAddress = addressParts.length > 0 ? addressParts.join(', ') : 'Not provided';

    // Email to you (website owner/travel agency) with booking data
    const bookingDataEmail = {
      from: process.env.EMAIL,
      to: process.env.SITE_MAIL_RECEIVER,
      subject: `🎫 New Online Booking - ${formData.name} | ${formData.packageName} | ${tripDuration}D/${nights}N`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Online Booking</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f5f5f5; }
            .container { max-width: 900px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981, #047857); color: white; padding: 40px 30px; text-align: center; border-radius: 15px 15px 0 0; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header h1 { margin: 0; font-size: 32px; font-weight: 700; }
            .booking-ref { background: rgba(255,255,255,0.15); padding: 12px 20px; border-radius: 8px; margin-top: 15px; font-weight: 600; font-size: 16px; border: 2px solid rgba(255,255,255,0.3); }
            .timestamp { font-size: 14px; opacity: 0.9; margin-top: 10px; }
            .content { background: white; padding: 40px 30px; border-radius: 0 0 15px 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .urgent-notice { background: linear-gradient(45deg, #ef4444, #dc2626); color: white; padding: 20px; border-radius: 10px; margin: 0 0 30px 0; text-align: center; font-weight: 600; }
            .urgent-notice strong { font-size: 18px; }
            .package-banner { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; border-radius: 12px; text-align: center; margin: 0 0 30px 0; }
            .package-name { font-size: 28px; font-weight: 800; margin-bottom: 10px; }
            .trip-details { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px; }
            .trip-detail-item { background: rgba(255,255,255,0.2); padding: 15px; border-radius: 8px; }
            .trip-label { font-size: 12px; opacity: 0.9; text-transform: uppercase; letter-spacing: 0.5px; }
            .trip-value { font-size: 18px; font-weight: 700; margin-top: 5px; }
            .duration-banner { background: linear-gradient(135deg, #fbbf24, #f59e0b); color: white; padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0; }
            .duration-text { font-size: 24px; font-weight: 800; }
            .data-section { background: #f8fafc; border: 2px solid #e2e8f0; margin: 25px 0; padding: 30px; border-radius: 12px; position: relative; }
            .data-section::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 6px; background: #10b981; border-radius: 12px 0 0 12px; }
            .section-title { color: #1e293b; margin: 0 0 20px 0; font-size: 20px; font-weight: 700; display: flex; align-items: center; }
            .section-title::before { content: ""; width: 4px; height: 20px; background: #10b981; margin-right: 12px; border-radius: 2px; }
            .data-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
            .data-item { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
            .data-label { font-weight: 600; color: #374151; display: block; margin-bottom: 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
            .data-value { color: #1f2937; font-size: 16px; font-weight: 500; word-break: break-word; }
            .contact-info { background: #fff7ed; border: 2px solid #fed7aa; padding: 25px; border-radius: 10px; }
            .contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
            .contact-item { display: flex; align-items: center; }
            .contact-icon { width: 40px; height: 40px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0; color: white; font-weight: bold; }
            .contact-details { }
            .contact-label { font-size: 12px; color: #6b7280; font-weight: 600; text-transform: uppercase; }
            .contact-value { font-size: 16px; color: #111827; font-weight: 600; word-break: break-word; }
            .address-box { background: linear-gradient(135deg, #eff6ff, #dbeafe); border: 2px solid #93c5fd; padding: 25px; border-radius: 10px; margin-top: 20px; }
            .address-text { color: #1e40af; font-weight: 500; line-height: 1.8; }
            .transport-box { background: linear-gradient(135deg, #fef3c7, #fde68a); border: 2px solid #fbbf24; padding: 20px; border-radius: 10px; text-align: center; }
            .transport-icon { font-size: 40px; margin-bottom: 10px; }
            .transport-text { font-size: 18px; font-weight: 700; color: #92400e; }
            .action-checklist { background: #fefce8; border: 2px solid #fde047; padding: 25px; border-radius: 10px; margin-top: 30px; }
            .checklist-item { display: flex; align-items: flex-start; margin-bottom: 12px; }
            .checklist-number { background: #10b981; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 12px; margin-right: 12px; flex-shrink: 0; }
            .summary-table { width: 100%; border-collapse: collapse; margin: 25px 0; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
            .summary-table th { background: #f1f5f9; padding: 15px; text-align: left; font-weight: 600; color: #334155; border-bottom: 1px solid #e2e8f0; }
            .summary-table td { padding: 15px; border-bottom: 1px solid #f1f5f9; }
            .summary-table tr:last-child td { border-bottom: none; }
            .highlight-badge { background: linear-gradient(90deg, #10b981, #059669); color: white; padding: 4px 12px; border-radius: 20px; font-weight: 600; font-size: 14px; display: inline-block; }
            @media (max-width: 768px) {
              .container { padding: 10px; }
              .header { padding: 30px 20px; }
              .content { padding: 25px 20px; }
              .data-grid { grid-template-columns: 1fr; }
              .contact-grid { grid-template-columns: 1fr; }
              .trip-details { grid-template-columns: 1fr; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎫 New Online Booking Received</h1>
              <div class="booking-ref">Booking Ref: ${bookingRef}</div>
              <div class="timestamp">📅 ${new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
              })}</div>
            </div>
            
            <div class="content">
              <div class="urgent-notice">
                🔥 <strong>IMMEDIATE BOOKING CONFIRMATION REQUIRED</strong> 🔥<br>
                Customer has submitted online booking - Verify availability and send confirmation
              </div>

              <div class="package-banner">
                <div class="package-name">📍 ${formData.packageName}</div>
                <div>Selected Package</div>
                <div class="trip-details">
                  <div class="trip-detail-item">
                    <div class="trip-label">Arrival Date</div>
                    <div class="trip-value">${arrivalDate.getDate()} ${arrivalDate.toLocaleString('en-US', { month: 'short' })}</div>
                  </div>
                  <div class="trip-detail-item">
                    <div class="trip-label">Departure Date</div>
                    <div class="trip-value">${departureDate.getDate()} ${departureDate.toLocaleString('en-US', { month: 'short' })}</div>
                  </div>
                  <div class="trip-detail-item">
                    <div class="trip-label">Duration</div>
                    <div class="trip-value">${tripDuration}D/${nights}N</div>
                  </div>
                </div>
              </div>

              <div class="duration-banner">
                <div class="duration-text">
                  ${tripDuration} ${tripDuration === 1 ? 'Day' : 'Days'} • ${nights} ${nights === 1 ? 'Night' : 'Nights'}
                </div>
                <div style="margin-top: 10px; font-size: 14px;">
                  ${formattedArrival} → ${formattedDeparture}
                </div>
              </div>

              <div class="data-section">
                <h2 class="section-title">📅 Trip Schedule</h2>
                <div class="data-grid">
                  <div class="data-item">
                    <span class="data-label">Arrival Date</span>
                    <span class="data-value">${formattedArrival}</span>
                  </div>
                  <div class="data-item">
                    <span class="data-label">Departure Date</span>
                    <span class="data-value">${formattedDeparture}</span>
                  </div>
                  <div class="data-item">
                    <span class="data-label">Trip Duration</span>
                    <span class="data-value">
                      <span class="highlight-badge">${tripDuration} Days, ${nights} Nights</span>
                    </span>
                  </div>
                  <div class="data-item">
                    <span class="data-label">Package Selected</span>
                    <span class="data-value">${formData.packageName}</span>
                  </div>
                </div>
              </div>

              <div class="data-section">
                <h2 class="section-title">👤 Customer Information</h2>
                <div class="contact-info">
                  <div class="contact-grid">
                    <div class="contact-item">
                      <div class="contact-icon">👤</div>
                      <div class="contact-details">
                        <div class="contact-label">Full Name</div>
                        <div class="contact-value">${formData.name}</div>
                      </div>
                    </div>
                    <div class="contact-item">
                      <div class="contact-icon">📧</div>
                      <div class="contact-details">
                        <div class="contact-label">Email Address</div>
                        <div class="contact-value">${formData.email}</div>
                      </div>
                    </div>
                    <div class="contact-item">
                      <div class="contact-icon">📱</div>
                      <div class="contact-details">
                        <div class="contact-label">Phone Number</div>
                        <div class="contact-value">${formData.phone}</div>
                      </div>
                    </div>
                    <div class="contact-item">
                      <div class="contact-icon">📍</div>
                      <div class="contact-details">
                        <div class="contact-label">Location</div>
                        <div class="contact-value">${formData.city || 'N/A'}${formData.state ? ', ' + formData.state : ''}${formData.country ? ', ' + formData.country : ''}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                ${addressParts.length > 0 ? `
                <div class="address-box">
                  <h3 style="margin-top: 0; color: #1e40af; font-size: 16px;">📮 Full Address</h3>
                  <div class="address-text">${fullAddress}</div>
                </div>
                ` : ''}
              </div>

              ${formData.carCoach && formData.carCoach !== 'Not Required' ? `
              <div class="data-section">
                <h2 class="section-title">🚗 Transportation Requirement</h2>
                <div class="transport-box">
                  <div class="transport-icon">🚙</div>
                  <div class="transport-text">${formData.carCoach}</div>
                  <p style="margin: 10px 0 0; color: #78350f; font-size: 14px;">Arrange vehicle booking for the trip duration</p>
                </div>
              </div>
              ` : `
              <div class="data-section">
                <h2 class="section-title">🚗 Transportation Requirement</h2>
                <p style="color: #6b7280; font-style: italic;">No transportation service requested by customer.</p>
              </div>
              `}

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
                    <th>Contact Details</th>
                    <td>${formData.email} | ${formData.phone}</td>
                  </tr>
                  <tr>
                    <th>Package Name</th>
                    <td><strong>${formData.packageName}</strong></td>
                  </tr>
                  <tr>
                    <th>Check-in Date</th>
                    <td>${formattedArrival}</td>
                  </tr>
                  <tr>
                    <th>Check-out Date</th>
                    <td>${formattedDeparture}</td>
                  </tr>
                  <tr>
                    <th>Trip Duration</th>
                    <td><strong>${tripDuration} Days / ${nights} Nights</strong></td>
                  </tr>
                  <tr>
                    <th>Customer Address</th>
                    <td>${fullAddress}</td>
                  </tr>
                  <tr>
                    <th>Transportation</th>
                    <td>${formData.carCoach || 'Not Required'}</td>
                  </tr>
                  <tr>
                    <th>Booking Time</th>
                    <td>${new Date().toLocaleString()}</td>
                  </tr>
                </table>
              </div>

              <div class="action-checklist">
                <h2 class="section-title">✅ Booking Processing Checklist</h2>
                <div class="checklist-item">
                  <div class="checklist-number">1</div>
                  <div><strong>Verify Availability:</strong> Check ${formData.packageName} availability for ${formattedArrival} to ${formattedDeparture} (${tripDuration}D/${nights}N)</div>
                </div>
                <div class="checklist-item">
                  <div class="checklist-number">2</div>
                  <div><strong>Calculate Final Pricing:</strong> Prepare quote including accommodation, meals, transport${formData.carCoach && formData.carCoach !== 'Not Required' ? ` (${formData.carCoach})` : ''}, and all taxes</div>
                </div>
                <div class="checklist-item">
                  <div class="checklist-number">3</div>
                  <div><strong>Send Confirmation Email:</strong> Email ${formData.name} at ${formData.email} with booking confirmation and payment details within 1 hour</div>
                </div>
                <div class="checklist-item">
                  <div class="checklist-number">4</div>
                  <div><strong>Arrange Transportation:</strong> ${formData.carCoach && formData.carCoach !== 'Not Required' ? `Book ${formData.carCoach} for the trip dates` : 'No vehicle booking required'}</div>
                </div>
                <div class="checklist-item">
                  <div class="checklist-number">5</div>
                  <div><strong>Prepare Itinerary:</strong> Create detailed day-by-day itinerary for ${tripDuration} days including activities, meal times, and check-in/out procedures</div>
                </div>
                <div class="checklist-item">
                  <div class="checklist-number">6</div>
                  <div><strong>Final Confirmation:</strong> Send booking voucher and complete travel documents 48 hours before ${formattedArrival}</div>
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
🎫 NEW ONLINE BOOKING - ${bookingRef}
======================================

🔥 IMMEDIATE CONFIRMATION REQUIRED 🔥
Customer: ${formData.name}
Contact: ${formData.email} | ${formData.phone}

PACKAGE DETAILS:
================
Package: ${formData.packageName}
Arrival: ${formattedArrival}
Departure: ${formattedDeparture}
Duration: ${tripDuration} Days / ${nights} Nights

CUSTOMER INFORMATION:
=====================
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${fullAddress}

TRANSPORTATION:
===============
${formData.carCoach || 'Not Required'}

ACTION REQUIRED:
================
1. Verify availability for ${formattedArrival} to ${formattedDeparture}
2. Calculate pricing and prepare quote
3. Send confirmation email to ${formData.email} within 1 hour
4. ${formData.carCoach && formData.carCoach !== 'Not Required' ? `Arrange ${formData.carCoach} booking` : 'No vehicle booking needed'}
5. Prepare detailed ${tripDuration}-day itinerary
6. Follow up on payment within 24 hours
7. Send final documents 48 hours before arrival

Booking Reference: ${bookingRef}
Submitted: ${new Date().toLocaleString()}
      `,
      replyTo: formData.email,
    };

    // Send email
    const info = await transporter.sendMail(bookingDataEmail);

    return new Response(
      JSON.stringify({ 
        success: true, 
        bookingReference: bookingRef,
        messageId: info.messageId,
        message: "Online booking submitted successfully. Confirmation email sent to agency."
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing online booking:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Failed to process online booking. Please try again later." 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}