import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });
    }

    const { matchId, status } = await req.json();

    if (!matchId || !status) {
      return NextResponse.json({ error: "matchId und status erforderlich" }, { status: 400 });
    }

    // Verify user owns this match
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      include: { company: true },
    });

    if (!user?.company) {
      return NextResponse.json({ error: "Kein Unternehmen gefunden" }, { status: 404 });
    }

    const match = await db.match.findUnique({
      where: { id: matchId },
    });

    if (!match || match.companyId !== user.company.id) {
      return NextResponse.json({ error: "Match nicht gefunden" }, { status: 404 });
    }

    // Update status
    const updated = await db.match.update({
      where: { id: matchId },
      data: { status },
    });

    return NextResponse.json({ match: updated });
  } catch (error) {
    console.error("Error updating status:", error);
    return NextResponse.json({ error: "Fehler beim Aktualisieren" }, { status: 500 });
  }
}
