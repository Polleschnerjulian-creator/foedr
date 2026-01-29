import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { calculateMatches } from "@/lib/matching/engine";

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

    // Create or update company
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

    // Get all active programs
    const programs = await db.program.findMany({
      where: { isActive: true }
    });

    // Calculate matches
    const matchResults = calculateMatches(company, programs);

    // Delete old matches for this company
    await db.match.deleteMany({
      where: { companyId: company.id }
    });

    // Create new matches
    for (const result of matchResults) {
      if (result.eligible && result.score >= 40) {
        await db.match.create({
          data: {
            companyId: company.id,
            programId: result.programId,
            score: result.score,
            eligible: result.eligible,
            reasons: result.reasons,
            risks: result.risks,
            nextSteps: result.nextSteps,
            status: "NEW",
          }
        });
      }
    }

    return NextResponse.json({ 
      company,
      matchCount: matchResults.filter(r => r.eligible && r.score >= 40).length
    });
  } catch (error) {
    console.error("Company creation error:", error);
    return NextResponse.json({ error: "Fehler beim Speichern" }, { status: 500 });
  }
}
