import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const data = await req.json();

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
    const newQuote = await prisma.quoteRequest.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        customizationRequests: data.customizationRequests,
        houseId: data.houseId, // Ensure this is provided
      },
    });

    return NextResponse.json(newQuote, { status: 201 });
  } catch (error) {
    console.error("Error creating quote:", error);

    if (error) {
      console.error("Error message:", error); // Try to access the message
      return NextResponse.json(
        { error: error || "Internal Server Error" },
        { status: 500 }
      );
    } else {
      console.error("Unknown error occurred.");
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
