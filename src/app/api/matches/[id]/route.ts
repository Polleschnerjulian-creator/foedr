import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });
    }

    const match = await db.match.findUnique({
      where: { id },
      include: { 
        program: true,
        company: true 
      },
    });

    if (!match) {
      return NextResponse.json({ error: "Match nicht gefunden" }, { status: 404 });
    }

    return NextResponse.json({ match });
  } catch (error) {
    console.error("Error fetching match:", error);
    return NextResponse.json({ error: "Fehler" }, { status: 500 });
  }
}
