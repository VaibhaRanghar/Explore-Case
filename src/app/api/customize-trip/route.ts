import nodemailer from "nodemailer";

interface CustomizeTripFormData {
  packageId: number;
  packageName: string;
  name: string;
  email: string;
  budget: string;
  tripDate: string;
  adults: number;
  children6to12: number;
  childrenBelow5: number;
  tripRequirement: string;
  accommodationType: string;
}

export async function POST(request: Request) {
  try {
    const formData: CustomizeTripFormData = await request.json();

    // Validate required fields
    const requiredFields = [
      "packageName",
      "name",
      "email",
      "budget",
      "tripDate",
      "accommodationType",
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof CustomizeTripFormData]) {
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

    // Calculate total travelers
    const totalTravelers =
      formData.adults + formData.children6to12 + formData.childrenBelow5;

    // Generate customization reference number
    const customizationRef = `CUST-${Date.now()
      .toString(36)
      .toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

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

    // Format trip date for display
    const formattedDate = new Date(formData.tripDate).toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

    // Map accommodation type to display name
    const accommodationDisplay =
      {
        budget: "Budget",
        standard: "Standard",
        deluxe: "Deluxe",
        premium: "Premium",
      }[formData.accommodationType] || formData.accommodationType;

    // Email to you (website owner/travel agency) with customization data
    const customizationDataEmail = {
      from: process.env.EMAIL,
      to: process.env.SITE_MAIL_RECEIVER,
      subject: `🎨 Trip Customization Request - ${formData.name} | ${formData.packageName} | ${totalTravelers} pax`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Trip Customization Request</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f5f5f5; }
            .container { max-width: 900px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981, #047857); color: white; padding: 40px 30px; text-align: center; border-radius: 15px 15px 0 0; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header h1 { margin: 0; font-size: 32px; font-weight: 700; }
            .customization-ref { background: rgba(255,255,255,0.15); padding: 12px 20px; border-radius: 8px; margin-top: 15px; font-weight: 600; font-size: 16px; border: 2px solid rgba(255,255,255,0.3); }
            .timestamp { font-size: 14px; opacity: 0.9; margin-top: 10px; }
            .content { background: white; padding: 40px 30px; border-radius: 0 0 15px 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .urgent-notice { background: linear-gradient(45deg, #8b5cf6, #7c3aed); color: white; padding: 20px; border-radius: 10px; margin: 0 0 30px 0; text-align: center; font-weight: 600; }
            .urgent-notice strong { font-size: 18px; }
            .package-banner { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; border-radius: 12px; text-align: center; margin: 0 0 30px 0; }
            .package-name { font-size: 28px; font-weight: 800; margin-bottom: 10px; }
            .package-details { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px; }
            .package-detail-item { background: rgba(255,255,255,0.2); padding: 15px; border-radius: 8px; }
            .package-label { font-size: 12px; opacity: 0.9; text-transform: uppercase; letter-spacing: 0.5px; }
            .package-value { font-size: 18px; font-weight: 700; margin-top: 5px; }
            .data-section { background: #f8fafc; border: 2px solid #e2e8f0; margin: 25px 0; padding: 30px; border-radius: 12px; position: relative; }
            .data-section::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 6px; background: #10b981; border-radius: 12px 0 0 12px; }
            .section-title { color: #1e293b; margin: 0 0 20px 0; font-size: 20px; font-weight: 700; display: flex; align-items: center; }
            .section-title::before { content: ""; width: 4px; height: 20px; background: #10b981; margin-right: 12px; border-radius: 2px; }
            .data-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
            .data-item { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
            .data-label { font-weight: 600; color: #374151; display: block; margin-bottom: 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
            .data-value { color: #1f2937; font-size: 16px; font-weight: 500; }
            .travelers-summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 20px 0; }
            .traveler-box { background: linear-gradient(135deg, #fef3c7, #fde68a); padding: 20px; border-radius: 10px; text-align: center; border: 2px solid #fbbf24; }
            .traveler-count { font-size: 28px; font-weight: 800; color: #92400e; margin-bottom: 5px; }
            .traveler-type { font-size: 12px; color: #78350f; font-weight: 600; text-transform: uppercase; }
            .total-banner { background: linear-gradient(135deg, #10b981, #047857); color: white; padding: 25px; border-radius: 12px; text-align: center; margin: 25px 0; }
            .total-count { font-size: 36px; font-weight: 800; margin-bottom: 5px; }
            .contact-info { background: #fff7ed; border: 2px solid #fed7aa; padding: 25px; border-radius: 10px; }
            .contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
            .contact-item { display: flex; align-items: center; }
            .contact-icon { width: 40px; height: 40px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0; }
            .contact-details { }
            .contact-label { font-size: 12px; color: #6b7280; font-weight: 600; text-transform: uppercase; }
            .contact-value { font-size: 16px; color: #111827; font-weight: 600; word-break: break-word; }
            .requirements-box { background: linear-gradient(135deg, #eff6ff, #dbeafe); border: 2px solid #93c5fd; padding: 25px; border-radius: 10px; margin-top: 20px; }
            .requirements-text { font-style: italic; color: #1e40af; line-height: 1.8; white-space: pre-wrap; }
            .action-checklist { background: #fefce8; border: 2px solid #fde047; padding: 25px; border-radius: 10px; margin-top: 30px; }
            .checklist-item { display: flex; align-items: flex-start; margin-bottom: 12px; }
            .checklist-number { background: #10b981; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 12px; margin-right: 12px; flex-shrink: 0; }
            .summary-table { width: 100%; border-collapse: collapse; margin: 25px 0; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
            .summary-table th { background: #f1f5f9; padding: 15px; text-align: left; font-weight: 600; color: #334155; border-bottom: 1px solid #e2e8f0; }
            .summary-table td { padding: 15px; border-bottom: 1px solid #f1f5f9; }
            .summary-table tr:last-child td { border-bottom: none; }
            .highlight-badge { background: linear-gradient(90deg, #8b5cf6, #7c3aed); color: white; padding: 4px 12px; border-radius: 20px; font-weight: 600; font-size: 14px; display: inline-block; }
            .accommodation-badge { background: linear-gradient(90deg, #f59e0b, #d97706); color: white; padding: 4px 12px; border-radius: 20px; font-weight: 600; font-size: 14px; display: inline-block; }
            @media (max-width: 768px) {
              .container { padding: 10px; }
              .header { padding: 30px 20px; }
              .content { padding: 25px 20px; }
              .data-grid { grid-template-columns: 1fr; }
              .travelers-summary { grid-template-columns: 1fr; }
              .contact-grid { grid-template-columns: 1fr; }
              .package-details { grid-template-columns: 1fr; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎨 Trip Customization Request</h1>
              <div class="customization-ref">Ref: ${customizationRef}</div>
              <div class="timestamp">📅 ${new Date().toLocaleDateString(
                "en-US",
                {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZoneName: "short",
                }
              )}</div>
            </div>
            
            <div class="content">
              <div class="urgent-notice">
                ⚡ <strong>CUSTOMIZATION REQUEST RECEIVED</strong> ⚡<br>
                Customer wants a personalized itinerary - Create custom package based on preferences
              </div>

              <div class="package-banner">
                <div class="package-name">📍 ${formData.packageName}</div>
                <div>Selected Destination Package</div>
                <div class="package-details">
                  <div class="package-detail-item">
                    <div class="package-label">Accommodation</div>
                    <div class="package-value">${accommodationDisplay}</div>
                  </div>
                  <div class="package-detail-item">
                    <div class="package-label">Budget Range</div>
                    <div class="package-value">${formData.budget}</div>
                  </div>
                  <div class="package-detail-item">
                    <div class="package-label">Travel Date</div>
                    <div class="package-value">${formattedDate}</div>
                  </div>
                  <div class="package-detail-item">
                    <div class="package-label">Total Travelers</div>
                    <div class="package-value">${totalTravelers}</div>
                  </div>
                </div>
              </div>

              <div class="data-section">
                <h2 class="section-title">📦 Package Customization Details</h2>
                <div class="data-grid">
                  <div class="data-item">
                    <span class="data-label">Selected Package</span>
                    <span class="data-value">${formData.packageName}</span>
                  </div>
                  <div class="data-item">
                    <span class="data-label">Accommodation Type</span>
                    <span class="data-value">
                      <span class="accommodation-badge">${accommodationDisplay}</span>
                    </span>
                  </div>
                  <div class="data-item">
                    <span class="data-label">Customer Budget</span>
                    <span class="data-value">
                      <span class="highlight-badge">${formData.budget}</span>
                    </span>
                  </div>
                  <div class="data-item">
                    <span class="data-label">Preferred Trip Date</span>
                    <span class="data-value">${formattedDate}</span>
                  </div>
                </div>
              </div>

              <div class="data-section">
                <h2 class="section-title">👥 Traveler Breakdown</h2>
                <div class="travelers-summary">
                  <div class="traveler-box">
                    <div class="traveler-count">${formData.adults}</div>
                    <div class="traveler-type">Adults</div>
                  </div>
                  <div class="traveler-box">
                    <div class="traveler-count">${formData.children6to12}</div>
                    <div class="traveler-type">Children (6-12 Yrs)</div>
                  </div>
                  <div class="traveler-box">
                    <div class="traveler-count">${formData.childrenBelow5}</div>
                    <div class="traveler-type">Children (Below 5)</div>
                  </div>
                </div>
                <div class="total-banner">
                  <div class="total-count">${totalTravelers}</div>
                  <div>Total Travelers</div>
                </div>
              </div>

              <div class="data-section">
                <h2 class="section-title">📞 Customer Contact Information</h2>
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
                  </div>
                </div>
              </div>

              ${
                formData.tripRequirement
                  ? `
              <div class="data-section">
                <h2 class="section-title">💬 Special Requirements & Preferences</h2>
                <div class="requirements-box">
                  <div class="requirements-text">"${formData.tripRequirement}"</div>
                </div>
                <p style="margin-top: 15px; color: #6b7280; font-size: 14px;">
                  <strong>Note:</strong> Make sure to incorporate these requirements into the customized itinerary.
                </p>
              </div>
              `
                  : `
              <div class="data-section">
                <h2 class="section-title">💬 Special Requirements & Preferences</h2>
                <p style="color: #6b7280; font-style: italic;">No special requirements mentioned by the customer.</p>
              </div>
              `
              }

              <div class="data-section">
                <h2 class="section-title">📊 Complete Customization Summary</h2>
                <table class="summary-table">
                  <tr>
                    <th>Reference Number</th>
                    <td><strong>${customizationRef}</strong></td>
                  </tr>
                  <tr>
                    <th>Customer Name</th>
                    <td>${formData.name}</td>
                  </tr>
                  <tr>
                    <th>Contact Email</th>
                    <td>${formData.email}</td>
                  </tr>
                  <tr>
                    <th>Package Selection</th>
                    <td><strong>${formData.packageName}</strong></td>
                  </tr>
                  <tr>
                    <th>Accommodation Level</th>
                    <td>${accommodationDisplay}</td>
                  </tr>
                  <tr>
                    <th>Budget Range</th>
                    <td><strong>${formData.budget}</strong></td>
                  </tr>
                  <tr>
                    <th>Travel Date</th>
                    <td>${formattedDate}</td>
                  </tr>
                  <tr>
                    <th>Travelers</th>
                    <td><strong>${totalTravelers} Total</strong> (${
        formData.adults
      } Adult${formData.adults > 1 ? "s" : ""}${
        formData.children6to12 > 0
          ? `, ${formData.children6to12} Children (6-12 yrs)`
          : ""
      }${
        formData.childrenBelow5 > 0
          ? `, ${formData.childrenBelow5} Children (Below 5)`
          : ""
      })</td>
                  </tr>
                  <tr>
                    <th>Special Requirements</th>
                    <td>${
                      formData.tripRequirement
                        ? "Yes - See details above"
                        : "None"
                    }</td>
                  </tr>
                  <tr>
                    <th>Submission Time</th>
                    <td>${new Date().toLocaleString()}</td>
                  </tr>
                </table>
              </div>

              <div class="action-checklist">
                <h2 class="section-title">✅ Your Action Plan</h2>
                <div class="checklist-item">
                  <div class="checklist-number">1</div>
                  <div><strong>Review Package Details:</strong> Check ${
                    formData.packageName
                  } base itinerary and available customization options for ${accommodationDisplay} accommodation level</div>
                </div>
                <div class="checklist-item">
                  <div class="checklist-number">2</div>
                  <div><strong>Create Custom Itinerary:</strong> Build personalized day-by-day itinerary based on ${
                    formData.budget
                  } budget and ${totalTravelers} traveler${
        totalTravelers > 1 ? "s" : ""
      }</div>
                </div>
                <div class="checklist-item">
                  <div class="checklist-number">3</div>
                  <div><strong>Incorporate Requirements:</strong> ${
                    formData.tripRequirement
                      ? "Address all special requirements mentioned by the customer"
                      : "Design standard package with flexibility options"
                  }</div>
                </div>
                <div class="checklist-item">
                  <div class="checklist-number">4</div>
                  <div><strong>Prepare Detailed Quote:</strong> Include accommodation (${accommodationDisplay}), meals, transport, activities, and any additional costs within the ${
        formData.budget
      } range</div>
                </div>
                <div class="checklist-item">
                  <div class="checklist-number">5</div>
                  <div><strong>Contact Customer:</strong> Send customized proposal to ${
                    formData.name
                  } at ${
        formData.email
      } within 24-48 hours with itinerary, pricing, inclusions/exclusions</div>
                </div>
                <div class="checklist-item">
                  <div class="checklist-number">6</div>
                  <div><strong>Schedule Discussion:</strong> Arrange call to discuss the proposal, answer questions, and make any adjustments before finalizing</div>
                </div>
                <div class="checklist-item">
                  <div class="checklist-number">7</div>
                  <div><strong>Finalize & Book:</strong> Once approved, process booking confirmation and payment for trip on ${formattedDate}</div>
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
🎨 TRIP CUSTOMIZATION REQUEST - ${customizationRef}
=====================================================

⚡ CUSTOMIZATION REQUEST RECEIVED ⚡
Customer: ${formData.name}
Contact: ${formData.email}

SELECTED PACKAGE:
=================
Package: ${formData.packageName}
Accommodation: ${accommodationDisplay}
Budget Range: ${formData.budget}
Travel Date: ${formattedDate}

TRAVELERS:
==========
Adults: ${formData.adults}
Children (6-12 Yrs): ${formData.children6to12}
Children (Below 5 Yrs): ${formData.childrenBelow5}
TOTAL: ${totalTravelers}

CUSTOMER DETAILS:
=================
Name: ${formData.name}
Email: ${formData.email}

${
  formData.tripRequirement
    ? `SPECIAL REQUIREMENTS:\n${formData.tripRequirement}\n`
    : "SPECIAL REQUIREMENTS:\nNone specified\n"
}

ACTION PLAN:
============
1. Review ${formData.packageName} base itinerary
2. Create custom itinerary for ${totalTravelers} travelers
3. Incorporate special requirements
4. Prepare detailed quote within ${formData.budget} budget
5. Send proposal to ${formData.email} within 24-48 hours
6. Schedule discussion call
7. Finalize and process booking for ${formattedDate}

Reference: ${customizationRef}
Submitted: ${new Date().toLocaleString()}
      `,
      replyTo: formData.email,
    };

    // Send email
    const info = await transporter.sendMail(customizationDataEmail);

    return new Response(
      JSON.stringify({
        success: true,
        customizationReference: customizationRef,
        messageId: info.messageId,
        message:
          "Trip customization request submitted successfully. Email sent to agency.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing trip customization request:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error:
          "Failed to process trip customization request. Please try again later.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
