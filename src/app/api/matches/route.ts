import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ matches: [] });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
      include: { company: true },
    });

    if (!user?.company) {
      return NextResponse.json({ matches: [] });
    }

    const matches = await db.match.findMany({
      where: { companyId: user.company.id },
      include: { program: true },
      orderBy: { score: "desc" },
    });

    return NextResponse.json({ matches });
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json({ matches: [] });
  }
}
