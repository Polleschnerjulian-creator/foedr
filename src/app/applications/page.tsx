"use client";

import { useState, useEffect, DragEvent } from "react";
import DashboardLayout from "@/components/dashboard/layout";
import { Loader2, Search, Check, Clock, Send, Trophy, XCircle, GripVertical } from "lucide-react";

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

export default function ApplicationsPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggedItem, setDraggedItem] = useState<Match | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

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
    setMatches(matches.map(m => 
      m.id === matchId ? { ...m, status: newStatus } : m
    ));

    await fetch("/api/matches/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matchId, status: newStatus }),
    });
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
            Ziehe Programme zwischen den Spalten um den Status zu ändern.
          </p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4">
          {COLUMNS.map((column) => {
            const columnMatches = getMatchesByStatus(column.id);
            const Icon = column.icon;
            const isDragOver = dragOverColumn === column.id;
            
            return (
              <div
                key={column.id}
                className="flex-shrink-0 w-72"
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
                  className={`bg-white/5 rounded-b-xl p-2 min-h-[400px] space-y-2 transition-all duration-200 ${
                    isDragOver ? `ring-2 ${column.borderColor} bg-white/10` : ""
                  }`}
                >
                  {columnMatches.map((match) => (
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
                        <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {match.score}%
                        </div>
                      </div>

                      {match.program.maxAmount && (
                        <p className="text-emerald-400 text-sm font-medium ml-6">
                          {formatCurrency(match.program.maxAmount)}
                        </p>
                      )}
                    </div>
                  ))}

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
