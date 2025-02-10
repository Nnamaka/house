import { NextResponse } from "next/server";
// import {prisma} from "@/lib/db";

export async function POST(req: Request) {
  const { houseId, email } = await req.json();
//   const { houseId, email, message } = await req.json();

  // Here you can store the quote request in your database or send an email
  console.log(`New quote request: ${email} for house ${houseId}`);

  return NextResponse.json({ success: true });
}
