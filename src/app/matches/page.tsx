import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import DashboardLayout from "@/components/dashboard/layout";
import Link from "next/link";
import { Search, Filter, ArrowUpRight } from "lucide-react";

export default async function MatchesPage() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/auth/login");
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: { company: true }
  });

  if (!user?.company) {
    redirect("/onboarding");
  }

  const matches = await db.match.findMany({
    where: { companyId: user.company.id },
    include: { program: true },
    orderBy: { score: "desc" }
  });

  const typeLabels: Record<string, string> = {
    GRANT: "Zuschuss",
    LOAN: "Kredit",
    TAX: "Steuer",
    GUARANTEE: "Bürgschaft",
  };

  const typeColors: Record<string, string> = {
    GRANT: "bg-emerald-500/20 text-emerald-300",
    LOAN: "bg-blue-500/20 text-blue-300",
    TAX: "bg-purple-500/20 text-purple-300",
    GUARANTEE: "bg-orange-500/20 text-orange-300",
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Passende Programme</h1>
            <p className="text-white/40 mt-1">
              {matches.length} Programme gefunden für {user.company.name}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Programme durchsuchen..."
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/20"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:text-white hover:border-white/20 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* List */}
        <div className="space-y-3">
          {matches.map((match) => (
            <Link
              key={match.id}
              href={`/matches/${match.id}`}
              className="block p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-xl bg-white text-black flex items-center justify-center text-lg font-bold">
                    {match.score}%
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{match.program.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[match.program.type] || "bg-white/10"}`}>
                        {typeLabels[match.program.type] || match.program.type}
                      </span>
                    </div>
                    <p className="text-white/40 text-sm">
                      {match.program.provider} · Bis zu €{(match.program.maxAmount || 0).toLocaleString("de-DE")}
                      {match.program.fundingRate && ` · ${match.program.fundingRate}% Förderquote`}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white/60 transition-colors" />
              </div>
            </Link>
          ))}
        </div>

        {matches.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/40">Keine passenden Programme gefunden.</p>
            <Link href="/onboarding" className="text-white underline mt-2 inline-block">
              Profil aktualisieren
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
