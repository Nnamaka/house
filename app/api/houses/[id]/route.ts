import { NextResponse } from "next/server";
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
