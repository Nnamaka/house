import { NextResponse } from "next/server";
import {prisma} from "@/lib/db";

export async function GET() {
  const houses = await prisma.house.findMany();
  return NextResponse.json(houses);
}
