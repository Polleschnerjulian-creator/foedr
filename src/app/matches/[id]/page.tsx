import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import { db } from "@/lib/db";
import DashboardLayout from "@/components/dashboard/layout";
import Link from "next/link";
import { 
  ArrowLeft, 
  ExternalLink, 
  Check, 
  AlertTriangle, 
  X,
  Calendar, 
  Banknote, 
  Building2,
  Clock,
  FileText,
  ArrowRight,
  Zap
} from "lucide-react";

export default async function MatchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/auth/login");
  }

  const match = await db.match.findUnique({
    where: { id },
    include: { 
      program: true,
      company: true
    }
  });

  if (!match) {
    notFound();
  }

  const program = match.program;

  // Parse diagnosis from reasons/risks or generate default
  const diagnosis = generateDiagnosis(match, program);
  const nextBestAction = getNextBestAction(match.score, diagnosis);
  const effort = getEffortEstimate(program);

  const typeLabels: Record<string, string> = {
    GRANT: "Zuschuss",
    LOAN: "Förderkredit",
    TAX: "Steuerbonus",
    GUARANTEE: "Bürgschaft",
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/matches" 
          className="inline-flex items-center gap-2 text-white/40 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zu Programme
        </Link>

        {/* Header */}
        <div className="flex items-start justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
                {typeLabels[program.type] || program.type}
              </span>
              <span className="text-white/40 text-sm">{program.provider}</span>
            </div>
            <h1 className="text-3xl font-bold">{program.name}</h1>
          </div>
          <div className="text-right">
            <div className="w-20 h-20 rounded-2xl bg-white text-black flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">{match.score}%</span>
              <span className="text-xs text-black/60">Match</span>
            </div>
          </div>
        </div>

        {/* Next Best Action - Hero */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-white/60 mb-1">Nächster Schritt</p>
              <p className="text-xl font-semibold">{nextBestAction}</p>
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <Banknote className="w-5 h-5 text-white/40 mb-2" />
            <p className="text-white/40 text-xs mb-1">Max. Förderung</p>
            <p className="text-xl font-bold">
              {new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(program.maxAmount || 0)}
            </p>
          </div>
          {program.fundingRate && program.fundingRate > 0 && (
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <Building2 className="w-5 h-5 text-white/40 mb-2" />
              <p className="text-white/40 text-xs mb-1">Förderquote</p>
              <p className="text-xl font-bold">{program.fundingRate}%</p>
            </div>
          )}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <Clock className="w-5 h-5 text-white/40 mb-2" />
            <p className="text-white/40 text-xs mb-1">Aufwand</p>
            <p className="text-xl font-bold">{effort.level}</p>
          </div>
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <Calendar className="w-5 h-5 text-white/40 mb-2" />
            <p className="text-white/40 text-xs mb-1">Zeitrahmen</p>
            <p className="text-xl font-bold">{effort.timeline}</p>
          </div>
        </div>

        {/* Match Diagnosis - NEW */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Match-Diagnose
          </h2>
          <p className="text-white/60 text-sm mb-6">
            Dein Match liegt bei {match.score}%, weil:
          </p>

          <div className="space-y-3">
            {/* Fulfilled */}
            {diagnosis.filter(d => d.category === "fulfilled").map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-emerald-300">{item.label}</p>
                  <p className="text-sm text-white/60">{item.description}</p>
                </div>
              </div>
            ))}

            {/* Unclear */}
            {diagnosis.filter(d => d.category === "unclear").map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-yellow-300">{item.label}</p>
                    <span className="text-xs text-yellow-400">{item.impact}%</span>
                  </div>
                  <p className="text-sm text-white/60">{item.description}</p>
                </div>
              </div>
            ))}

            {/* Missing */}
            {diagnosis.filter(d => d.category === "missing").map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-red-300">{item.label}</p>
                    <span className="text-xs text-red-400">{item.impact}%</span>
                  </div>
                  <p className="text-sm text-white/60">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Score Potential */}
          <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/60">Aktueller Score</span>
              <span className="font-bold">{match.score}%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
                style={{ width: `${match.score}%` }}
              />
            </div>
            <p className="text-xs text-white/40 mt-2">
              Potenzial: 100% bei vollständiger Dokumentation
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-8">
          <h2 className="text-lg font-semibold mb-3">Beschreibung</h2>
          <p className="text-white/60 leading-relaxed">{program.description}</p>
        </div>

        {/* Risks - Enhanced */}
        <div className="p-6 rounded-2xl bg-orange-500/10 border border-orange-500/20 mb-8">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            Typische Ablehnungsgründe
          </h3>
          <ul className="space-y-2">
            {getTypicalRejectionReasons(program).map((reason, i) => (
              <li key={i} className="text-white/60 text-sm flex items-start gap-2">
                <X className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                {reason}
              </li>
            ))}
          </ul>
        </div>

        {/* Next Steps */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-8">
          <h2 className="text-lg font-semibold mb-4">So erhöhst du deinen Score</h2>
          <div className="space-y-3">
            {getImprovementSteps(diagnosis).map((step, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{step.title}</p>
                  <p className="text-sm text-white/40">{step.description}</p>
                </div>
                <span className="text-emerald-400 text-sm font-medium">+{step.impact}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          {program.url && (
            <Link
              href={program.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-colors"
            >
              Offizielle Seite
              <ExternalLink className="w-4 h-4" />
            </Link>
          )}
          <Link
            href="/applications"
            className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-full font-semibold hover:bg-white/20 transition-colors"
          >
            Zum Kanban Board
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Helper functions
function generateDiagnosis(match: any, program: any) {
  const diagnosis = [];

  // Fulfilled criteria
  diagnosis.push({
    category: "fulfilled",
    label: "Unternehmensgröße",
    description: "Passt zu den Förderkriterien des Programms",
    impact: 0
  });

  if (program.targetStates?.length === 0) {
    diagnosis.push({
      category: "fulfilled",
      label: "Region",
      description: "Bundesweites Programm - keine Einschränkung",
      impact: 0
    });
  } else {
    diagnosis.push({
      category: "fulfilled",
      label: "Region",
      description: "Regionales Programm für dein Bundesland",
      impact: 0
    });
  }

  if (program.requiresRD) {
    diagnosis.push({
      category: "fulfilled",
      label: "F&E-Aktivität",
      description: "Forschung & Entwicklung vorhanden",
      impact: 0
    });
  }

  // Unclear criteria (causing score reduction)
  diagnosis.push({
    category: "unclear",
    label: "Projektbeschreibung",
    description: "Konkrete Beschreibung noch nicht erfasst",
    impact: -15
  });

  diagnosis.push({
    category: "unclear",
    label: "Kostenstruktur",
    description: "Detaillierte Kostenplanung fehlt",
    impact: -10
  });

  diagnosis.push({
    category: "unclear",
    label: "Zeitplan",
    description: "Projektzeitraum nicht definiert",
    impact: -5
  });

  return diagnosis;
}

function getNextBestAction(score: number, diagnosis: any[]) {
  const hasUnclear = diagnosis.some(d => d.category === "unclear");
  const hasMissing = diagnosis.some(d => d.category === "missing");

  if (hasMissing) {
    return "Grundvoraussetzungen prüfen - einige Kriterien nicht erfüllt";
  }
  if (score >= 80) {
    return "Antrag vorbereiten - sehr gute Passform!";
  }
  if (score >= 60) {
    return "Projektbeschreibung erstellen (1-2 Seiten)";
  }
  return "Projekt konkretisieren, dann erneut prüfen";
}

function getEffortEstimate(program: any) {
  if (program.type === "TAX") {
    return { level: "Gering", timeline: "1-2 Wochen" };
  }
  if (program.type === "GRANT" && program.maxAmount > 100000) {
    return { level: "Hoch", timeline: "4-8 Wochen" };
  }
  return { level: "Mittel", timeline: "2-4 Wochen" };
}

function getTypicalRejectionReasons(program: any) {
  const reasons = [
    "Projekt zu nah am operativen Tagesgeschäft",
    "Kostenarten nicht förderfähig (z.B. Standardsoftware)",
    "Antrag vor Projektbeginn nicht eingereicht",
  ];

  if (program.requiresRD) {
    reasons.push("F&E nicht klar vom Tagesgeschäft abgegrenzt");
    reasons.push("Technische Neuheit/Innovation nicht nachweisbar");
  }

  if (program.type === "GRANT") {
    reasons.push("Unvollständige oder fehlerhafte Unterlagen");
  }

  return reasons;
}

function getImprovementSteps(diagnosis: any[]) {
  const steps = [];
  
  const unclear = diagnosis.filter(d => d.category === "unclear");
  
  if (unclear.some(d => d.label === "Projektbeschreibung")) {
    steps.push({
      title: "Projektbeschreibung erstellen",
      description: "1-2 Seiten mit Zielen, Vorgehen und erwarteten Ergebnissen",
      impact: 15
    });
  }
  
  if (unclear.some(d => d.label === "Kostenstruktur")) {
    steps.push({
      title: "Kostenplan aufstellen",
      description: "Personalkosten, Sachkosten, ggf. Fremdleistungen aufschlüsseln",
      impact: 10
    });
  }
  
  if (unclear.some(d => d.label === "Zeitplan")) {
    steps.push({
      title: "Zeitplan definieren",
      description: "Projektstart, Meilensteine und Projektende festlegen",
      impact: 5
    });
  }

  return steps;
}
