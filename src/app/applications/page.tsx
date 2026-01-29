"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/layout";
import { Loader2, Plus, GripVertical, ExternalLink, X, Check, Clock, Send, Trophy, XCircle } from "lucide-react";

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
  { id: "NEW", label: "Entdeckt", icon: Search, color: "bg-white/10" },
  { id: "SAVED", label: "Shortlist", icon: Check, color: "bg-blue-500/20" },
  { id: "PREPARING", label: "In Vorbereitung", icon: Clock, color: "bg-yellow-500/20" },
  { id: "SUBMITTED", label: "Eingereicht", icon: Send, color: "bg-purple-500/20" },
  { id: "WON", label: "Bewilligt", icon: Trophy, color: "bg-emerald-500/20" },
  { id: "LOST", label: "Abgelehnt", icon: XCircle, color: "bg-red-500/20" },
];

import { Search } from "lucide-react";

export default function ApplicationsPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    const res = await fetch("/api/matches");
    const data = await res.json();
    setMatches(data.matches || []);
    setLoading(false);
  };

  const updateStatus = async (matchId: string, newStatus: string) => {
    setUpdating(matchId);
    
    // Optimistic update
    setMatches(matches.map(m => 
      m.id === matchId ? { ...m, status: newStatus } : m
    ));

    await fetch("/api/matches/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matchId, status: newStatus }),
    });

    setUpdating(null);
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Anträge verwalten</h1>
          <p className="text-white/40 mt-1">
            Ziehe Programme zwischen den Spalten um den Status zu ändern.
          </p>
        </div>

        {/* Kanban Board */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {COLUMNS.map((column) => {
            const columnMatches = getMatchesByStatus(column.id);
            const Icon = column.icon;
            
            return (
              <div
                key={column.id}
                className="flex-shrink-0 w-72"
              >
                {/* Column Header */}
                <div className={`p-3 rounded-t-xl ${column.color} flex items-center justify-between`}>
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="font-medium text-sm">{column.label}</span>
                  </div>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                    {columnMatches.length}
                  </span>
                </div>

                {/* Column Content */}
                <div className="bg-white/5 rounded-b-xl p-2 min-h-[400px] space-y-2">
                  {columnMatches.map((match) => (
                    <div
                      key={match.id}
                      className={`p-4 bg-[#0A0A0A] rounded-xl border border-white/10 hover:border-white/20 transition-all ${
                        updating === match.id ? "opacity-50" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-sm">
                            {match.program.shortName || match.program.name}
                          </p>
                          <p className="text-white/40 text-xs">
                            {match.program.provider}
                          </p>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center text-xs font-bold">
                          {match.score}%
                        </div>
                      </div>

                      {match.program.maxAmount && (
                        <p className="text-emerald-400 text-sm font-medium mb-3">
                          {formatCurrency(match.program.maxAmount)}
                        </p>
                      )}

                      {/* Status Buttons */}
                      <div className="flex flex-wrap gap-1">
                        {COLUMNS.filter(c => c.id !== column.id).slice(0, 3).map((col) => (
                          <button
                            key={col.id}
                            onClick={() => updateStatus(match.id, col.id)}
                            disabled={updating === match.id}
                            className="text-xs px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-white/40 hover:text-white transition-colors"
                          >
                            → {col.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  {columnMatches.length === 0 && (
                    <div className="flex items-center justify-center h-32 text-white/20 text-sm">
                      Keine Programme
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
            <p className="text-2xl font-bold">
              {getMatchesByStatus("SAVED").length + getMatchesByStatus("PREPARING").length}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-white/40 text-sm">Eingereicht</p>
            <p className="text-2xl font-bold">{getMatchesByStatus("SUBMITTED").length}</p>
          </div>
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <p className="text-emerald-400 text-sm">Bewilligt</p>
            <p className="text-2xl font-bold text-emerald-400">{getMatchesByStatus("WON").length}</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
