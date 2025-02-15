import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }>  }
) {
  try {
    const id = (await params).id;
    await prisma.quoteRequest.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      { message: "Quote request deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting quote request:", error);
    return NextResponse.json(
      { error: "Failed to delete quote request" },
      { status: 500 }
    );
  }
}