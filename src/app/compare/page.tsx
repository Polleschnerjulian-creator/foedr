"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/layout";
import Link from "next/link";
import { ArrowLeft, Check, X, Loader2, Plus, Trash2, ExternalLink } from "lucide-react";

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

export default function ComparePage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [selected, setSelected] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/matches")
      .then((res) => res.json())
      .then((data) => {
        setMatches(data.matches || []);
        // Auto-select top 3
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

        {/* Selection Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {matches.map((match) => {
            const isSelected = selected.find((s) => s.id === match.id);
            return (
              <button
                key={match.id}
                onClick={() => toggleSelect(match)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  isSelected
                    ? "bg-white text-black"
                    : "bg-white/5 border border-white/10 text-white/60 hover:border-white/20"
                }`}
              >
                {isSelected ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                {match.program.shortName || match.program.name}
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
                  {selected.map((match) => (
                    <th key={match.id} className="p-4 text-left min-w-[250px]">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-white">
                            {match.program.name}
                          </p>
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
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {/* Match Score */}
                <tr className="bg-white/5">
                  <td className="p-4 text-white/60 text-sm">Match-Score</td>
                  {selected.map((match) => (
                    <td key={match.id} className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center font-bold">
                          {match.score}%
                        </div>
                      </div>
                    </td>
                  ))}
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
                  {selected.map((match) => (
                    <td key={match.id} className="p-4 font-semibold text-lg">
                      {formatCurrency(match.program.maxAmount)}
                    </td>
                  ))}
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

                {/* Recurring */}
                <tr className="bg-white/5">
                  <td className="p-4 text-white/60 text-sm">Verfügbarkeit</td>
                  {selected.map((match) => (
                    <td key={match.id} className="p-4">
                      {match.program.isRecurring ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <Check className="w-4 h-4" /> Laufend
                        </span>
                      ) : (
                        <span className="text-orange-400 flex items-center gap-1">
                          <X className="w-4 h-4" /> Befristet
                        </span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Requirements */}
                <tr>
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

                {/* Why it fits */}
                <tr className="bg-white/5">
                  <td className="p-4 text-white/60 text-sm align-top">
                    Warum es passt
                  </td>
                  {selected.map((match) => (
                    <td key={match.id} className="p-4">
                      <ul className="space-y-1">
                        {match.reasons.slice(0, 3).map((reason, i) => (
                          <li
                            key={i}
                            className="text-sm text-white/60 flex items-start gap-2"
                          >
                            <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Risks */}
                <tr>
                  <td className="p-4 text-white/60 text-sm align-top">
                    Risiken
                  </td>
                  {selected.map((match) => (
                    <td key={match.id} className="p-4">
                      <ul className="space-y-1">
                        {match.risks.length > 0 ? (
                          match.risks.slice(0, 3).map((risk, i) => (
                            <li
                              key={i}
                              className="text-sm text-white/60 flex items-start gap-2"
                            >
                              <X className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                              {risk}
                            </li>
                          ))
                        ) : (
                          <li className="text-white/40 text-sm">Keine bekannt</li>
                        )}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Link */}
                <tr className="bg-white/5">
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
