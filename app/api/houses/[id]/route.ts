import { NextResponse } from "next/server";
import {prisma} from "@/lib/db";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const house = await prisma.house.findUnique({
    where: { id: params.id },
  });

  if (!house) {
    return NextResponse.json({ error: "House not found" }, { status: 404 });
  }

  return NextResponse.json(house);
}
