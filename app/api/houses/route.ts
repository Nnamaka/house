import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const houses = await prisma.house.findMany();
    return NextResponse.json(houses, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Error fetching houses" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      price,
      description,
      images,
      features,
      sections,
      bedrooms,
      bathrooms,
      sleeps,
      dimension,
    } = body;

    const newHouse = await prisma.house.create({
      data: {
        title,
        price,
        description,
        images,
        features,
        sections,
        bedrooms,
        bathrooms,
        sleeps,
        dimension,
      },
    });
    console.log("Created house")

    return NextResponse.json(newHouse, { status: 201 });
  } catch {
    console.log("could not create house")
    return NextResponse.json(
      { message: "Error creating house" },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: "GET, POST",
    },
  });
}
