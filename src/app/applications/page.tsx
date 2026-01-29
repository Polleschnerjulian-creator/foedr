"use client";

import { useState, useEffect, DragEvent } from "react";
import DashboardLayout from "@/components/dashboard/layout";
import Link from "next/link";
import { 
  Loader2, 
  Search, 
  Check, 
  Clock, 
  Send, 
  Trophy, 
  XCircle, 
  GripVertical,
  FileText,
  Calculator,
  CalendarDays,
  CheckCircle2,
  Circle,
  PenTool
} from "lucide-react";

interface Program {
  id: string;
  name: string;
  shortName: string;
  provider: string;
  maxAmount: number | null;
}

interface Match {
  id: string;
  score: number;
  status: string;
  program: Program;
}

const COLUMNS = [
  { id: "NEW", label: "Entdeckt", icon: Search, color: "bg-white/10", borderColor: "border-white/20" },
  { id: "SAVED", label: "Shortlist", icon: Check, color: "bg-blue-500/20", borderColor: "border-blue-500/40" },
  { id: "PREPARING", label: "In Vorbereitung", icon: Clock, color: "bg-yellow-500/20", borderColor: "border-yellow-500/40" },
  { id: "SUBMITTED", label: "Eingereicht", icon: Send, color: "bg-purple-500/20", borderColor: "border-purple-500/40" },
  { id: "WON", label: "Bewilligt", icon: Trophy, color: "bg-emerald-500/20", borderColor: "border-emerald-500/40" },
  { id: "LOST", label: "Abgelehnt", icon: XCircle, color: "bg-red-500/20", borderColor: "border-red-500/40" },
];

const CHECKLIST_ITEMS = [
  { key: "hasProjectDescription", label: "Projektbeschreibung", icon: FileText },
  { key: "hasCostPlan", label: "Kostenplan", icon: Calculator },
  { key: "hasTimeline", label: "Zeitplan", icon: CalendarDays },
  { key: "hasFundingLogic", label: "Förderlogik geprüft", icon: CheckCircle2 },
];

export default function ApplicationsPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggedItem, setDraggedItem] = useState<Match | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [readiness, setReadiness] = useState<Record<string, Record<string, boolean>>>({});

  useEffect(() => {
    fetchMatches();
    const saved = localStorage.getItem("foedr-readiness");
    if (saved) {
      setReadiness(JSON.parse(saved));
    }
  }, []);

  const fetchMatches = async () => {
    const res = await fetch("/api/matches");
    const data = await res.json();
    setMatches(data.matches || []);
    setLoading(false);
  };

  const updateStatus = async (matchId: string, newStatus: string) => {
    setMatches(matches.map(m => 
      m.id === matchId ? { ...m, status: newStatus } : m
    ));

    await fetch("/api/matches/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matchId, status: newStatus }),
    });
  };

  const toggleReadinessItem = (matchId: string, key: string) => {
    const newReadiness = {
      ...readiness,
      [matchId]: {
        ...(readiness[matchId] || {}),
        [key]: !(readiness[matchId]?.[key] || false)
      }
    };
    setReadiness(newReadiness);
    localStorage.setItem("foedr-readiness", JSON.stringify(newReadiness));
  };

  const getReadinessScore = (matchId: string) => {
    const items = readiness[matchId] || {};
    const completed = Object.values(items).filter(Boolean).length;
    return Math.round((completed / CHECKLIST_ITEMS.length) * 100);
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>, match: Match) => {
    setDraggedItem(match);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", match.id);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>, columnId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, columnId: string) => {
    e.preventDefault();
    setDragOverColumn(null);
    
    if (draggedItem && draggedItem.status !== columnId) {
      updateStatus(draggedItem.id, columnId);
    }
    setDraggedItem(null);
  };

  const getMatchesByStatus = (status: string) => {
    return matches.filter((m) => m.status === status);
  };

  const formatCurrency = (amount: number | null) => {
    if (!amount) return "";
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalPotential = matches
    .filter(m => m.status === "WON")
    .reduce((sum, m) => sum + (m.program.maxAmount || 0), 0);

  const inProgress = getMatchesByStatus("SAVED").length + getMatchesByStatus("PREPARING").length;

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
      <div className="max-w-full mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Anträge verwalten</h1>
          <p className="text-white/40 mt-1">
            Ziehe Programme zwischen den Spalten. In "In Vorbereitung" kannst du den Antrag vorbereiten.
          </p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4">
          {COLUMNS.map((column) => {
            const columnMatches = getMatchesByStatus(column.id);
            const Icon = column.icon;
            const isDragOver = dragOverColumn === column.id;
            const showChecklist = column.id === "PREPARING";
            
            return (
              <div
                key={column.id}
                className="flex-shrink-0 w-80"
                onDragOver={(e) => handleDragOver(e, column.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                <div className={`p-3 rounded-t-xl ${column.color} flex items-center justify-between`}>
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="font-medium text-sm">{column.label}</span>
                  </div>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                    {columnMatches.length}
                  </span>
                </div>

                <div 
                  className={`bg-white/5 rounded-b-xl p-2 min-h-[500px] space-y-2 transition-all duration-200 ${
                    isDragOver ? `ring-2 ${column.borderColor} bg-white/10` : ""
                  }`}
                >
                  {columnMatches.map((match) => {
                    const readinessScore = getReadinessScore(match.id);
                    const matchReadiness = readiness[match.id] || {};

                    return (
                      <div
                        key={match.id}
                        draggable="true"
                        onDragStart={(e) => handleDragStart(e, match)}
                        onDragEnd={handleDragEnd}
                        className={`p-4 bg-[#0A0A0A] rounded-xl border border-white/10 hover:border-white/30 transition-all cursor-grab active:cursor-grabbing select-none ${
                          draggedItem?.id === match.id ? "opacity-50 scale-95" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-start gap-2">
                            <GripVertical className="w-4 h-4 text-white/30 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-sm">
                                {match.program.shortName || match.program.name}
                              </p>
                              <p className="text-white/40 text-xs">
                                {match.program.provider}
                              </p>
                            </div>
                          </div>
                          <div className="w-10 h-10 rounded-lg bg-white text-black flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {match.score}%
                          </div>
                        </div>

                        {match.program.maxAmount && (
                          <p className="text-emerald-400 text-sm font-medium ml-6 mb-3">
                            {formatCurrency(match.program.maxAmount)}
                          </p>
                        )}

                        {/* Readiness Section - Only in PREPARING */}
                        {showChecklist && (
                          <div className="mt-3 pt-3 border-t border-white/10">
                            {/* Editor Button */}
                            <Link
                              href={`/applications/${match.id}/editor`}
                              className="w-full flex items-center justify-center gap-2 px-3 py-2 mb-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/30 rounded-lg text-sm font-medium transition-all"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <PenTool className="w-4 h-4 text-blue-400" />
                              Antrag vorbereiten
                            </Link>

                            {/* Readiness Score Bar */}
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-white/40">Readiness</span>
                              <span className={`text-xs font-bold ${
                                readinessScore >= 75 ? "text-emerald-400" :
                                readinessScore >= 50 ? "text-yellow-400" :
                                "text-white/60"
                              }`}>
                                {readinessScore}%
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-3">
                              <div 
                                className={`h-full rounded-full transition-all ${
                                  readinessScore >= 75 ? "bg-emerald-500" :
                                  readinessScore >= 50 ? "bg-yellow-500" :
                                  "bg-white/30"
                                }`}
                                style={{ width: `${readinessScore}%` }}
                              />
                            </div>

                            {/* Checklist */}
                            <div className="space-y-1.5">
                              {CHECKLIST_ITEMS.map((item) => {
                                const isChecked = matchReadiness[item.key] || false;
                                const ItemIcon = item.icon;
                                return (
                                  <button
                                    key={item.key}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleReadinessItem(match.id, item.key);
                                    }}
                                    className={`w-full flex items-center gap-2 p-2 rounded-lg text-xs transition-all ${
                                      isChecked 
                                        ? "bg-emerald-500/20 text-emerald-300" 
                                        : "bg-white/5 text-white/40 hover:bg-white/10"
                                    }`}
                                  >
                                    {isChecked ? (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    ) : (
                                      <Circle className="w-4 h-4" />
                                    )}
                                    <ItemIcon className="w-3 h-3" />
                                    {item.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Won Amount Display */}
                        {column.id === "WON" && match.program.maxAmount && (
                          <div className="mt-3 pt-3 border-t border-emerald-500/20">
                            <p className="text-xs text-emerald-400">🎉 Bewilligt!</p>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {columnMatches.length === 0 && (
                    <div className={`flex items-center justify-center h-32 text-sm border-2 border-dashed rounded-xl transition-all ${
                      isDragOver ? "border-white/40 text-white/60 bg-white/5" : "border-white/10 text-white/20"
                    }`}>
                      {isDragOver ? "Hier ablegen" : "Keine Programme"}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-white/40 text-sm">Entdeckt</p>
            <p className="text-2xl font-bold">{getMatchesByStatus("NEW").length}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-white/40 text-sm">In Bearbeitung</p>
            <p className="text-2xl font-bold">{inProgress}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-white/40 text-sm">Eingereicht</p>
            <p className="text-2xl font-bold">{getMatchesByStatus("SUBMITTED").length}</p>
          </div>
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <p className="text-emerald-400 text-sm">Bewilligt</p>
            <p className="text-2xl font-bold text-emerald-400">
              {formatCurrency(totalPotential) || getMatchesByStatus("WON").length}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
