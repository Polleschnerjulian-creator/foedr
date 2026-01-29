import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import DashboardLayout from "@/components/dashboard/layout";
import Link from "next/link";
import { ArrowRight, TrendingUp, Sparkles, FileText, Clock } from "lucide-react";

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/auth/login");
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: { company: true }
  });

  if (!user?.company?.onboardingComplete) {
    redirect("/onboarding");
  }

  // Get matches for this company
  const matches = await db.match.findMany({
    where: { companyId: user.company.id },
    include: { program: true },
    orderBy: { score: "desc" },
    take: 5
  });

  const totalPotential = matches.reduce((sum, m) => sum + (m.program.maxAmount || 0), 0);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">
            Willkommen zurück, {user.company.name}
          </h1>
          <p className="text-white/40 mt-1">
            Hier ist dein Förderpotenzial auf einen Blick.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white/60" />
              </div>
              <span className="text-sm text-white/40">Potenzial erkannt</span>
            </div>
            <p className="text-3xl font-bold">
              €{totalPotential.toLocaleString("de-DE")}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white/60" />
              </div>
              <span className="text-sm text-white/40">Passende Programme</span>
            </div>
            <p className="text-3xl font-bold">{matches.length}</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <FileText className="w-5 h-5 text-white/60" />
              </div>
              <span className="text-sm text-white/40">Anträge offen</span>
            </div>
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>

        {/* Top Matches */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Top Matches</h2>
            <Link href="/matches" className="text-sm text-white/40 hover:text-white flex items-center gap-1">
              Alle anzeigen <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {matches.length > 0 ? (
            <div className="space-y-3">
              {matches.map((match) => (
                <div
                  key={match.id}
                  className="flex items-center justify-between p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center font-bold">
                      {match.score}%
                    </div>
                    <div>
                      <p className="font-semibold">{match.program.name}</p>
                      <p className="text-sm text-white/40">
                        {match.program.provider} · Bis zu €{(match.program.maxAmount || 0).toLocaleString("de-DE")}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/matches/${match.id}`}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors"
                  >
                    Details
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-xl bg-white/5 border border-white/10 text-center">
              <Sparkles className="w-10 h-10 text-white/20 mx-auto mb-4" />
              <p className="text-white/40 mb-4">Noch keine Matches berechnet.</p>
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full text-sm font-medium"
              >
                Profil vervollständigen
              </Link>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
