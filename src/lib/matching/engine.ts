import { Company, Program } from "@prisma/client";

interface DiagnosisItem {
  category: "fulfilled" | "unclear" | "missing";
  label: string;
  description: string;
  impact: number; // negative impact on score
}

interface MatchResult {
  programId: string;
  score: number;
  maxPotentialScore: number;
  eligible: boolean;
  diagnosis: DiagnosisItem[];
  reasons: string[];
  risks: string[];
  nextSteps: string[];
  nextBestAction: string;
  estimatedEffort: string;
  estimatedTimeline: string;
}

export function calculateMatches(company: Company, programs: Program[]): MatchResult[] {
  const results: MatchResult[] = [];

  for (const program of programs) {
    const result = scoreProgram(company, program);
    if (result.score > 0 || result.eligible) {
      results.push(result);
    }
  }

  return results.sort((a, b) => b.score - a.score);
}

function scoreProgram(company: Company, program: Program): MatchResult {
  let score = 100; // Start at 100, deduct for issues
  let eligible = true;
  const diagnosis: DiagnosisItem[] = [];
  const reasons: string[] = [];
  const risks: string[] = [];
  const nextSteps: string[] = [];

  // === HARD CRITERIA (Eligibility) ===
  
  // Size check
  if (program.targetSizes.length > 0) {
    if (program.targetSizes.includes(company.size)) {
      diagnosis.push({
        category: "fulfilled",
        label: "Unternehmensgröße",
        description: `${getSizeLabel(company.size)} passt zu den Förderkriterien`,
        impact: 0
      });
      reasons.push("Unternehmensgröße passt");
    } else {
      eligible = false;
      diagnosis.push({
        category: "missing",
        label: "Unternehmensgröße",
        description: `Programm nur für ${program.targetSizes.map(getSizeLabel).join(", ")}`,
        impact: -100
      });
    }
  }

  // State/Region check
  if (program.targetStates.length > 0) {
    if (program.targetStates.includes(company.state)) {
      diagnosis.push({
        category: "fulfilled",
        label: "Bundesland",
        description: `Regionales Programm für ${getStateLabel(company.state)}`,
        impact: 0
      });
      reasons.push("Regionales Förderprogramm für dein Bundesland");
    } else {
      eligible = false;
      diagnosis.push({
        category: "missing",
        label: "Bundesland",
        description: `Nur verfügbar in: ${program.targetStates.map(getStateLabel).join(", ")}`,
        impact: -100
      });
    }
  } else {
    diagnosis.push({
      category: "fulfilled",
      label: "Bundesland",
      description: "Bundesweites Programm - keine regionale Einschränkung",
      impact: 0
    });
  }

  // === ACTIVITY REQUIREMENTS ===

  // R&D requirement
  if (program.requiresRD) {
    if (company.rdActive || company.planInnovation) {
      diagnosis.push({
        category: "fulfilled",
        label: "F&E-Aktivität",
        description: "Forschung & Entwicklung vorhanden",
        impact: 0
      });
      reasons.push("F&E-Aktivitäten erfüllen Grundvoraussetzung");
    } else {
      eligible = false;
      score -= 30;
      diagnosis.push({
        category: "missing",
        label: "F&E-Aktivität",
        description: "Programm erfordert nachweisbare F&E-Tätigkeit",
        impact: -30
      });
    }
  }

  // Digital requirement
  if (program.requiresDigital) {
    if (company.digitalActive || company.planDigital) {
      diagnosis.push({
        category: "fulfilled",
        label: "Digitalisierung",
        description: "Digitalisierungsvorhaben geplant",
        impact: 0
      });
      reasons.push("Digitalisierungsvorhaben passt zum Programm");
    } else {
      eligible = false;
      score -= 30;
      diagnosis.push({
        category: "missing",
        label: "Digitalisierung",
        description: "Programm erfordert Digitalisierungsprojekt",
        impact: -30
      });
    }
  }

  // Green requirement
  if (program.requiresGreen) {
    if (company.greenActive || company.planGreen) {
      diagnosis.push({
        category: "fulfilled",
        label: "Nachhaltigkeit",
        description: "Nachhaltigkeitsmaßnahmen geplant",
        impact: 0
      });
      reasons.push("Nachhaltigkeitsvorhaben erfüllt Kriterien");
    } else {
      eligible = false;
      score -= 30;
      diagnosis.push({
        category: "missing",
        label: "Nachhaltigkeit",
        description: "Programm erfordert Klimaschutz-/Nachhaltigkeitsprojekt",
        impact: -30
      });
    }
  }

  // === SOFT CRITERIA (Score Deductions) ===

  // Missing project description (always unclear for now)
  diagnosis.push({
    category: "unclear",
    label: "Projektbeschreibung",
    description: "Konkrete Projektbeschreibung noch nicht erfasst",
    impact: -15
  });
  score -= 15;

  // Missing cost structure
  diagnosis.push({
    category: "unclear",
    label: "Kostenstruktur",
    description: "Detaillierte Kostenplanung fehlt noch",
    impact: -10
  });
  score -= 10;

  // Timeline unclear
  diagnosis.push({
    category: "unclear",
    label: "Zeitplan",
    description: "Projektzeitraum nicht definiert",
    impact: -5
  });
  score -= 5;

  // === RISKS ===
  if (program.type === "LOAN") {
    risks.push("Kredit muss zurückgezahlt werden");
    risks.push("Zinsen können je nach Bonität variieren");
  }

  if (program.type === "GRANT") {
    risks.push("Bewilligung nicht garantiert - Antragsqualität entscheidend");
    if (program.fundingRate && program.fundingRate < 50) {
      risks.push(`Eigenanteil von ${100 - program.fundingRate}% erforderlich`);
    }
  }

  if (program.requiresRD) {
    risks.push("F&E muss klar vom Tagesgeschäft abgegrenzt sein");
    risks.push("Technisches Risiko/Neuheit muss nachweisbar sein");
  }

  // === NEXT STEPS ===
  const missingItems = diagnosis.filter(d => d.category === "missing" || d.category === "unclear");
  
  if (missingItems.some(d => d.label === "Projektbeschreibung")) {
    nextSteps.push("Projektbeschreibung erstellen (1-2 Seiten)");
  }
  if (missingItems.some(d => d.label === "Kostenstruktur")) {
    nextSteps.push("Kostenplan mit Kostenarten aufstellen");
  }
  if (missingItems.some(d => d.label === "Zeitplan")) {
    nextSteps.push("Projektzeitraum und Meilensteine definieren");
  }
  nextSteps.push("Förderfähigkeit im Detail prüfen");

  // === NEXT BEST ACTION ===
  let nextBestAction = "Förderfähigkeit prüfen";
  if (!eligible) {
    nextBestAction = "Programm nicht geeignet - andere Option prüfen";
  } else if (score >= 80) {
    nextBestAction = "Antrag vorbereiten - gute Passform!";
  } else if (score >= 60) {
    nextBestAction = "Projektbeschreibung konkretisieren";
  } else {
    nextBestAction = "Erst Projekt schärfen, dann erneut prüfen";
  }

  // === EFFORT ESTIMATION ===
  let estimatedEffort = "Mittel";
  let estimatedTimeline = "2-4 Wochen";
  
  if (program.type === "TAX") {
    estimatedEffort = "Gering";
    estimatedTimeline = "1-2 Wochen";
  } else if (program.type === "GRANT" && program.maxAmount && program.maxAmount > 100000) {
    estimatedEffort = "Hoch";
    estimatedTimeline = "4-8 Wochen";
  }

  // Cap score
  score = Math.max(0, Math.min(100, score));

  return {
    programId: program.id,
    score: eligible ? score : 0,
    maxPotentialScore: 100,
    eligible,
    diagnosis,
    reasons,
    risks,
    nextSteps,
    nextBestAction,
    estimatedEffort,
    estimatedTimeline,
  };
}

function getSizeLabel(size: string): string {
  const labels: Record<string, string> = {
    MICRO: "Kleinstunternehmen (1-9 MA)",
    SMALL: "Kleinunternehmen (10-49 MA)",
    MEDIUM: "Mittelstand (50-249 MA)",
    LARGE: "Großunternehmen (250+ MA)",
  };
  return labels[size] || size;
}

function getStateLabel(state: string): string {
  const labels: Record<string, string> = {
    BW: "Baden-Württemberg",
    BY: "Bayern",
    BE: "Berlin",
    BB: "Brandenburg",
    HB: "Bremen",
    HH: "Hamburg",
    HE: "Hessen",
    MV: "Mecklenburg-Vorpommern",
    NI: "Niedersachsen",
    NW: "Nordrhein-Westfalen",
    RP: "Rheinland-Pfalz",
    SL: "Saarland",
    SN: "Sachsen",
    ST: "Sachsen-Anhalt",
    SH: "Schleswig-Holstein",
    TH: "Thüringen",
  };
  return labels[state] || state;
}
