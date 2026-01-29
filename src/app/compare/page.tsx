"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/layout";
import Link from "next/link";
import { 
  ArrowLeft, 
  Check, 
  X, 
  Loader2, 
  Plus, 
  Trash2, 
  ExternalLink,
  Zap,
  Clock,
  TrendingUp,
  Shield,
  Award
} from "lucide-react";

interface Program {
  id: string;
  name: string;
  shortName: string;
  provider: string;
  type: string;
  maxAmount: number | null;
  fundingRate: number | null;
  isRecurring: boolean;
  url: string | null;
  description: string;
  requiresRD: boolean;
  requiresDigital: boolean;
  requiresGreen: boolean;
}

interface Match {
  id: string;
  score: number;
  reasons: string[];
  risks: string[];
  program: Program;
}

interface Recommendation {
  matchId: string;
  type: "primary" | "alternative";
  reason: string;
  bestFor: string;
  icon: any;
}

export default function ComparePage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [selected, setSelected] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/matches")
      .then((res) => res.json())
      .then((data) => {
        setMatches(data.matches || []);
        setSelected((data.matches || []).slice(0, 3));
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleSelect = (match: Match) => {
    if (selected.find((s) => s.id === match.id)) {
      setSelected(selected.filter((s) => s.id !== match.id));
    } else if (selected.length < 4) {
      setSelected([...selected, match]);
    }
  };

  // Generate smart recommendations
  const getRecommendations = (): Recommendation[] => {
    if (selected.length === 0) return [];

    const recommendations: Recommendation[] = [];
    
    // Sort by different criteria
    const byScore = [...selected].sort((a, b) => b.score - a.score);
    const byAmount = [...selected].sort((a, b) => (b.program.maxAmount || 0) - (a.program.maxAmount || 0));
    const byEffort = [...selected].sort((a, b) => {
      const effortA = a.program.type === "TAX" ? 1 : a.program.type === "LOAN" ? 2 : 3;
      const effortB = b.program.type === "TAX" ? 1 : b.program.type === "LOAN" ? 2 : 3;
      return effortA - effortB;
    });

    // Primary recommendation (best overall fit)
    if (byScore[0]) {
      recommendations.push({
        matchId: byScore[0].id,
        type: "primary",
        reason: `Beste Passform mit ${byScore[0].score}% Match-Score`,
        bestFor: "Höchste Erfolgswahrscheinlichkeit",
        icon: Award
      });
    }

    // Alternative: Highest amount (if different from primary)
    if (byAmount[0] && byAmount[0].id !== byScore[0]?.id) {
      recommendations.push({
        matchId: byAmount[0].id,
        type: "alternative",
        reason: `Höchste Fördersumme: ${formatCurrency(byAmount[0].program.maxAmount)}`,
        bestFor: "Maximale Liquidität",
        icon: TrendingUp
      });
    }

    // Alternative: Lowest effort (if different)
    if (byEffort[0] && byEffort[0].id !== byScore[0]?.id && byEffort[0].id !== byAmount[0]?.id) {
      recommendations.push({
        matchId: byEffort[0].id,
        type: "alternative",
        reason: byEffort[0].program.type === "TAX" ? "Steuerbonus - einfachste Beantragung" : "Geringster Aufwand",
        bestFor: "Schnelle Umsetzung",
        icon: Clock
      });
    }

    return recommendations;
  };

  const getEffortLevel = (program: Program) => {
    if (program.type === "TAX") return { level: "Gering", color: "text-emerald-400" };
    if (program.type === "LOAN") return { level: "Mittel", color: "text-yellow-400" };
    if (program.maxAmount && program.maxAmount > 100000) return { level: "Hoch", color: "text-orange-400" };
    return { level: "Mittel", color: "text-yellow-400" };
  };

  const getDecisionHelper = () => {
    if (selected.length < 2) return null;

    const hasGrant = selected.some(m => m.program.type === "GRANT");
    const hasTax = selected.some(m => m.program.type === "TAX");
    const hasLoan = selected.some(m => m.program.type === "LOAN");

    const tips = [];

    if (hasGrant && hasTax) {
      const grant = selected.find(m => m.program.type === "GRANT");
      const tax = selected.find(m => m.program.type === "TAX");
      tips.push({
        condition: "Wenn du schnell Geld brauchst",
        recommendation: grant?.program.shortName || grant?.program.name,
        reason: "Zuschuss = direkter Liquiditätszufluss"
      });
      tips.push({
        condition: "Wenn du langfristig sparen willst",
        recommendation: tax?.program.shortName || tax?.program.name,
        reason: "Steuerbonus = jährlich wiederkehrend"
      });
    }

    if (hasGrant && hasLoan) {
      const grant = selected.find(m => m.program.type === "GRANT");
      const loan = selected.find(m => m.program.type === "LOAN");
      tips.push({
        condition: "Wenn du kein Risiko willst",
        recommendation: grant?.program.shortName || grant?.program.name,
        reason: "Zuschuss muss nicht zurückgezahlt werden"
      });
      tips.push({
        condition: "Wenn du hohe Summen brauchst",
        recommendation: loan?.program.shortName || loan?.program.name,
        reason: "Kredite haben oft höhere Volumina"
      });
    }

    return tips;
  };

  const typeLabels: Record<string, string> = {
    GRANT: "Zuschuss",
    LOAN: "Förderkredit",
    TAX: "Steuerbonus",
    GUARANTEE: "Bürgschaft",
  };

  const formatCurrency = (amount: number | null) => {
    if (!amount) return "—";
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const recommendations = getRecommendations();
  const decisionTips = getDecisionHelper();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-white/40" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/matches"
              className="inline-flex items-center gap-2 text-white/40 hover:text-white mb-2 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück
            </Link>
            <h1 className="text-2xl font-bold">Programme vergleichen</h1>
            <p className="text-white/40 mt-1">
              Wähle bis zu 4 Programme zum Vergleichen
            </p>
          </div>
        </div>

        {/* Recommendation Cards */}
        {recommendations.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-medium text-white/60 mb-3">Unsere Empfehlung</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendations.map((rec, i) => {
                const match = selected.find(m => m.id === rec.matchId);
                if (!match) return null;
                const Icon = rec.icon;
                
                return (
                  <div 
                    key={i}
                    className={`p-5 rounded-2xl border ${
                      rec.type === "primary" 
                        ? "bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border-emerald-500/30" 
                        : "bg-white/5 border-white/10"
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        rec.type === "primary" ? "bg-emerald-500/20" : "bg-white/10"
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          rec.type === "primary" ? "text-emerald-400" : "text-white/60"
                        }`} />
                      </div>
                      <div>
                        {rec.type === "primary" && (
                          <span className="text-xs text-emerald-400 font-medium">EMPFOHLEN</span>
                        )}
                        <p className="font-semibold">{match.program.shortName || match.program.name}</p>
                      </div>
                    </div>
                    <p className="text-sm text-white/60 mb-2">{rec.reason}</p>
                    <p className="text-xs text-white/40">
                      <span className="text-white/60">Ideal für:</span> {rec.bestFor}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Decision Helper */}
        {decisionTips && decisionTips.length > 0 && (
          <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-8">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-400" />
              Entscheidungshilfe
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {decisionTips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1 h-full bg-blue-500/30 rounded-full" />
                  <div>
                    <p className="text-sm text-white/60">{tip.condition}:</p>
                    <p className="font-medium text-blue-300">→ {tip.recommendation}</p>
                    <p className="text-xs text-white/40">{tip.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selection Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {matches.map((match) => {
            const isSelected = selected.find((s) => s.id === match.id);
            const isPrimary = recommendations[0]?.matchId === match.id;
            return (
              <button
                key={match.id}
                onClick={() => toggleSelect(match)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  isSelected
                    ? isPrimary 
                      ? "bg-emerald-500 text-white"
                      : "bg-white text-black"
                    : "bg-white/5 border border-white/10 text-white/60 hover:border-white/20"
                }`}
              >
                {isSelected ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                {match.program.shortName || match.program.name}
                {isPrimary && isSelected && <Award className="w-3 h-3" />}
              </button>
            );
          })}
        </div>

        {/* Comparison Table */}
        {selected.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-4 text-white/40 font-medium text-sm w-48">
                    Kriterium
                  </th>
                  {selected.map((match) => {
                    const isPrimary = recommendations[0]?.matchId === match.id;
                    return (
                      <th key={match.id} className="p-4 text-left min-w-[250px]">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-white">
                                {match.program.name}
                              </p>
                              {isPrimary && (
                                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                                  Empfohlen
                                </span>
                              )}
                            </div>
                            <p className="text-white/40 text-sm">
                              {match.program.provider}
                            </p>
                          </div>
                          <button
                            onClick={() => toggleSelect(match)}
                            className="p-1 text-white/20 hover:text-white/60"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {/* Match Score */}
                <tr className="bg-white/5">
                  <td className="p-4 text-white/60 text-sm">Match-Score</td>
                  {selected.map((match) => {
                    const isHighest = match.score === Math.max(...selected.map(s => s.score));
                    return (
                      <td key={match.id} className="p-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold ${
                          isHighest ? "bg-emerald-500 text-white" : "bg-white text-black"
                        }`}>
                          {match.score}%
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* Type */}
                <tr>
                  <td className="p-4 text-white/60 text-sm">Förderart</td>
                  {selected.map((match) => (
                    <td key={match.id} className="p-4">
                      <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
                        {typeLabels[match.program.type] || match.program.type}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Max Amount */}
                <tr className="bg-white/5">
                  <td className="p-4 text-white/60 text-sm">Max. Fördersumme</td>
                  {selected.map((match) => {
                    const isHighest = (match.program.maxAmount || 0) === Math.max(...selected.map(s => s.program.maxAmount || 0));
                    return (
                      <td key={match.id} className={`p-4 font-semibold text-lg ${isHighest ? "text-emerald-400" : ""}`}>
                        {formatCurrency(match.program.maxAmount)}
                        {isHighest && <span className="text-xs ml-2">↑ Höchste</span>}
                      </td>
                    );
                  })}
                </tr>

                {/* Funding Rate */}
                <tr>
                  <td className="p-4 text-white/60 text-sm">Förderquote</td>
                  {selected.map((match) => (
                    <td key={match.id} className="p-4">
                      {match.program.fundingRate
                        ? `${match.program.fundingRate}%`
                        : "—"}
                    </td>
                  ))}
                </tr>

                {/* Effort */}
                <tr className="bg-white/5">
                  <td className="p-4 text-white/60 text-sm">Aufwand</td>
                  {selected.map((match) => {
                    const effort = getEffortLevel(match.program);
                    return (
                      <td key={match.id} className="p-4">
                        <span className={effort.color}>{effort.level}</span>
                      </td>
                    );
                  })}
                </tr>

                {/* Recurring */}
                <tr>
                  <td className="p-4 text-white/60 text-sm">Verfügbarkeit</td>
                  {selected.map((match) => (
                    <td key={match.id} className="p-4">
                      {match.program.isRecurring ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <Check className="w-4 h-4" /> Laufend
                        </span>
                      ) : (
                        <span className="text-orange-400 flex items-center gap-1">
                          <Clock className="w-4 h-4" /> Befristet
                        </span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Requirements */}
                <tr className="bg-white/5">
                  <td className="p-4 text-white/60 text-sm">Voraussetzungen</td>
                  {selected.map((match) => (
                    <td key={match.id} className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {match.program.requiresRD && (
                          <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded text-xs">
                            F&E
                          </span>
                        )}
                        {match.program.requiresDigital && (
                          <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded text-xs">
                            Digital
                          </span>
                        )}
                        {match.program.requiresGreen && (
                          <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-xs">
                            Green
                          </span>
                        )}
                        {!match.program.requiresRD &&
                          !match.program.requiresDigital &&
                          !match.program.requiresGreen && (
                            <span className="text-white/40">Keine speziellen</span>
                          )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Link */}
                <tr>
                  <td className="p-4 text-white/60 text-sm">Offizielle Seite</td>
                  {selected.map((match) => (
                    <td key={match.id} className="p-4">
                      {match.program.url ? (
                        <Link
                          href={match.program.url}
                          target="_blank"
                          className="text-sm text-white/60 hover:text-white flex items-center gap-1"
                        >
                          Mehr erfahren
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      ) : (
                        <span className="text-white/40">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 text-white/40">
            <p>Wähle mindestens ein Programm zum Vergleichen.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
