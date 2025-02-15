import { NextResponse } from "next/server";
import {  FinancingType } from "@prisma/client";
// import { z } from "zod";
import nodemailer from "nodemailer";
import {prisma} from "@/lib/db"



type QuoteEmailData = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    customizationRequests: string;
    houseId: string;
    preferredFinancing?: FinancingType;
    desiredMoveInDate?: string;
    estimatedBudget?: string;
  };
  
// Zod schema for validation
// const quoteSchema = z.object({
//   userId: z.string().optional(), // User might not be logged in
//   firstName: z.string().min(1, "First name is required"),
//   lastName: z.string().min(1, "Last name is required"),
//   email: z.string().email("Invalid email address"),
//   phone: z.string().min(10, "Phone number must be at least 10 digits"),
//   customizationRequests: z.string().min(5, "Customization request must be at least 5 characters"),
//   houseId: z.string().min(1, "House ID is required"),
//   preferredFinancing: z.nativeEnum(FinancingType).optional(),
//   desiredMoveInDate: z.string().datetime().optional(),
//   estimatedBudget: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid budget format").optional(),
// });

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "nnamaka7@gmail.com";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // const parsedData = quoteSchema.parse(body);
     // Validate that required fields exist
     if (
      !data.firstName ||
      !data.lastName ||
      !data.email ||
      !data.phone ||
      !data.customizationRequests ||
      !data.houseId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }


    // Store quote request
   const newQuote = await prisma.quoteRequest.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        customizationRequests: data.customizationRequests,
        houseId: data.houseId,
        // Optional fields
        preferredFinancing: data.preferredFinancing || undefined,
        desiredMoveInDate: data.desiredMoveInDate
          ? new Date(data.desiredMoveInDate)
          : undefined,
        estimatedBudget: data.estimatedBudget
          ? parseFloat(data.estimatedBudget)
          : undefined,
        // Default status is PENDING as defined in the schema
      },
    });
    // Send email notification
    await sendQuoteEmail(data);

    return NextResponse.json({ message: "Quote created successfully", newQuote }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to process quote request" }, { status: 500 });
  }
}

// Email function
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
    to: ADMIN_EMAIL,
    subject: "New Quote Request",
    text: `New Quote Request:
    
    Name: ${quoteData.firstName} ${quoteData.lastName}
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
