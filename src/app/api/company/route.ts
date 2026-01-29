import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: "User nicht gefunden" }, { status: 404 });
    }

    const data = await req.json();

    const company = await db.company.upsert({
      where: { userId: user.id },
      update: {
        name: data.name,
        industry: data.industry,
        state: data.state,
        size: data.size,
        planInnovation: data.planInnovation,
        planDigital: data.planDigital,
        planGreen: data.planGreen,
        planInvestment: data.planInvestment,
        planHiring: data.planHiring,
        rdActive: data.planInnovation,
        digitalActive: data.planDigital,
        greenActive: data.planGreen,
        onboardingComplete: true,
      },
      create: {
        userId: user.id,
        name: data.name,
        industry: data.industry,
        state: data.state,
        size: data.size,
        planInnovation: data.planInnovation,
        planDigital: data.planDigital,
        planGreen: data.planGreen,
        planInvestment: data.planInvestment,
        planHiring: data.planHiring,
        rdActive: data.planInnovation,
        digitalActive: data.planDigital,
        greenActive: data.planGreen,
        onboardingComplete: true,
      }
    });

    return NextResponse.json({ company });
  } catch (error) {
    console.error("Company creation error:", error);
    return NextResponse.json({ error: "Fehler beim Speichern" }, { status: 500 });
  }
}
