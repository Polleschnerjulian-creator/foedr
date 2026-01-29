import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import { db } from "@/lib/db";
import DashboardLayout from "@/components/dashboard/layout";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Check, AlertTriangle, Calendar, Banknote, Building2 } from "lucide-react";

export default async function MatchDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/auth/login");
  }

  const match = await db.match.findUnique({
    where: { id: params.id },
    include: { 
      program: true,
      company: true
    }
  });

  if (!match) {
    notFound();
  }

  const program = match.program;

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
          href="/dashboard" 
          className="inline-flex items-center gap-2 text-white/40 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zum Dashboard
        </Link>

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
            <div className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center text-2xl font-bold">
              {match.score}%
            </div>
            <p className="text-white/40 text-sm mt-2">Match-Score</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <Banknote className="w-5 h-5 text-white/40 mb-3" />
            <p className="text-white/40 text-sm">Maximale Förderung</p>
            <p className="text-2xl font-bold mt-1">
              {new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(program.maxAmount || 0)}
            </p>
          </div>
          {program.fundingRate && program.fundingRate > 0 && (
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <Building2 className="w-5 h-5 text-white/40 mb-3" />
              <p className="text-white/40 text-sm">Förderquote</p>
              <p className="text-2xl font-bold mt-1">{program.fundingRate}%</p>
            </div>
          )}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <Calendar className="w-5 h-5 text-white/40 mb-3" />
            <p className="text-white/40 text-sm">Verfügbarkeit</p>
            <p className="text-2xl font-bold mt-1">
              {program.isRecurring ? "Laufend" : "Begrenzt"}
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-8">
          <h2 className="text-lg font-semibold mb-3">Beschreibung</h2>
          <p className="text-white/60 leading-relaxed">{program.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-400" />
              Warum es passt
            </h3>
            <ul className="space-y-2">
              {match.reasons.map((reason, i) => (
                <li key={i} className="text-white/60 text-sm flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          {match.risks.length > 0 && (
            <div className="p-6 rounded-2xl bg-orange-500/10 border border-orange-500/20">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                Zu beachten
              </h3>
              <ul className="space-y-2">
                {match.risks.map((risk, i) => (
                  <li key={i} className="text-white/60 text-sm flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-8">
          <h2 className="text-lg font-semibold mb-4">Nächste Schritte</h2>
          <div className="space-y-3">
            {match.nextSteps.map((step, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold">
                  {i + 1}
                </div>
                <p className="text-white/60">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {program.url && (
            <Link
              href={program.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-colors"
            >
              Offizielle Seite besuchen
              <ExternalLink className="w-4 h-4" />
            </Link>
          )}
          <button className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-full font-semibold hover:bg-white/20 transition-colors">
            Als interessant markieren
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
