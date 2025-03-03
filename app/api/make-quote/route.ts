import { NextResponse } from "next/server";
import { FinancingType } from "@prisma/client";
import nodemailer from "nodemailer";
// import {prisma} from "@/lib/db"

type QuoteEmailData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  customizationRequests: string;
  houseId: string;
  houseTitle: string;
  preferredFinancing?: FinancingType;
  desiredMoveInDate?: string;
  estimatedBudget?: string;
};

// const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "nnamaka7@gmail.com";
const ADMIN_EMAIL = ["qualityproperty28@gmail.com", "nnamaka7@gmail.com"]; // Change this to your admin email

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (
      !data.firstName ||
      !data.lastName ||
      !data.email ||
      !data.phone ||
      !data.customizationRequests ||
      !data.houseId ||
      !data.houseTitle
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send email notification
    await sendQuoteEmail(data);

    return NextResponse.json(
      { message: "Quote sent successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to process quote request" },
      { status: 500 }
    );
  }
}

async function sendQuoteEmail(quoteData: QuoteEmailData) {
  const transporter = nodemailer.createTransport({
    service: "yahoo",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: ADMIN_EMAIL[0],
    subject: "New Quote Request",
    text: `New Quote Request:

    House: ${quoteData.houseTitle}
    Customer Name: ${quoteData.firstName} ${quoteData.lastName}
    Email: ${quoteData.email}
    Phone: ${quoteData.phone}
    House ID: ${quoteData.houseId}
    Customization Requests: ${quoteData.customizationRequests}
    Preferred Financing: ${quoteData.preferredFinancing || "Not specified"}
    Desired Move-in Date: ${quoteData.desiredMoveInDate || "Not specified"}
    Estimated Budget: ${quoteData.estimatedBudget || "Not specified"}
    `,
  };

  await transporter.sendMail(mailOptions);
}
