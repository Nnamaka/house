import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const house = await prisma.house.findUnique({
      where: { id },
    });

    if (!house) {
      return NextResponse.json({ error: "House not found" }, { status: 404 });
    }

    return NextResponse.json(house);
  } catch (error) {
    console.error("Error fetching house:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    const house = await prisma.house.delete({
      where: { id },
    });

    if (!house) {
      return NextResponse.json({ error: "House not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "House deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting house:", error);

    return NextResponse.json(
      { message: "Error deleting house" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

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

    const updatedHouse = await prisma.house.update({
      where: { id },
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

    return NextResponse.json(updatedHouse, { status: 200 });
  } catch (error) {
    console.error("Error updating house:", error);

    return NextResponse.json(
      { message: "Error updating house" },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: "DELETE, PUT",
    },
  });
}
