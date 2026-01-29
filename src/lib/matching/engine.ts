import { Company, Program } from "@prisma/client";

interface MatchResult {
  programId: string;
  score: number;
  eligible: boolean;
  reasons: string[];
  risks: string[];
  nextSteps: string[];
}

export function calculateMatches(company: Company, programs: Program[]): MatchResult[] {
  const results: MatchResult[] = [];

  for (const program of programs) {
    const result = scoreProgram(company, program);
    if (result.score > 0) {
      results.push(result);
    }
  }

  return results.sort((a, b) => b.score - a.score);
}

function scoreProgram(company: Company, program: Program): MatchResult {
  let score = 0;
  let eligible = true;
  const reasons: string[] = [];
  const risks: string[] = [];
  const nextSteps: string[] = [];

  if (program.targetSizes.length > 0 && !program.targetSizes.includes(company.size)) {
    return { programId: program.id, score: 0, eligible: false, reasons, risks, nextSteps };
  }

  if (program.targetStates.length > 0 && !program.targetStates.includes(company.state)) {
    return { programId: program.id, score: 0, eligible: false, reasons, risks, nextSteps };
  }

  score += 40;
  reasons.push("Unternehmensgröße passt");

  if (program.requiresRD) {
    if (company.rdActive) {
      score += 25;
      reasons.push("F&E-Aktivitäten vorhanden");
    } else {
      return { programId: program.id, score: 0, eligible: false, reasons, risks, nextSteps };
    }
  }

  if (program.requiresDigital) {
    if (company.digitalActive) {
      score += 25;
      reasons.push("Digitalisierung geplant");
    } else {
      return { programId: program.id, score: 0, eligible: false, reasons, risks, nextSteps };
    }
  }

  if (program.requiresGreen) {
    if (company.greenActive) {
      score += 25;
      reasons.push("Nachhaltigkeit geplant");
    } else {
      return { programId: program.id, score: 0, eligible: false, reasons, risks, nextSteps };
    }
  }

  if (program.targetStates.includes(company.state)) {
    score += 10;
    reasons.push("Regionales Förderprogramm");
  }

  score = Math.min(score, 100);

  if (program.type === "LOAN") {
    risks.push("Kredit muss zurückgezahlt werden");
  }

  nextSteps.push("Förderfähigkeit prüfen");
  nextSteps.push("Unterlagen zusammenstellen");

  return { programId: program.id, score, eligible, reasons, risks, nextSteps };
}
