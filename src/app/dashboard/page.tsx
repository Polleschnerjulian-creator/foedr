import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/dashboard/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  FileText,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

// Mock data - replace with real data later
const stats = [
  {
    label: "Potenzial erkannt",
    value: "€ 847.500",
    icon: TrendingUp,
    change: "+3 neue",
  },
  {
    label: "Programme aktiv",
    value: "12",
    icon: Sparkles,
    change: "für dich",
  },
  {
    label: "Anträge offen",
    value: "2",
    icon: FileText,
    change: "in Bearbeitung",
  },
];

const topMatches = [
  {
    id: "1",
    name: "Forschungszulage",
    provider: "BAFA",
    score: 94,
    maxAmount: 1050000,
    deadline: "31.12.2026",
  },
  {
    id: "2",
    name: "Digitalbonus Bayern",
    provider: "Bayern",
    score: 87,
    maxAmount: 50000,
    deadline: "Laufend",
  },
  {
    id: "3",
    name: "go-digital",
    provider: "BMWK",
    score: 82,
    maxAmount: 16500,
    deadline: "Laufend",
  },
];

const upcomingDeadlines = [
  { name: "BAFA Beratungsförderung", days: 14 },
  { name: "KfW-Antrag Entwurf", days: 7 },
];

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/auth/login");
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-brand-black">
            Willkommen zurück
          </h1>
          <p className="text-gray-600 mt-1">
            3 neue Programme passen zu deinem Profil
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-brand-black mt-1">
                      {stat.value}
                    </p>
                    <p className="text-xs text-emerald-600 mt-1">
                      {stat.change}
                    </p>
                  </div>
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <stat.icon className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Matches */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Top Matches</CardTitle>
                <Link href="/matches">
                  <Button variant="ghost" size="sm">
                    Alle anzeigen
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {topMatches.map((match) => (
                  <div
                    key={match.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <Badge
                        variant={match.score >= 90 ? "success" : "warning"}
                      >
                        {match.score}% Match
                      </Badge>
                      <div>
                        <p className="font-medium text-brand-black">
                          {match.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {match.provider} • Bis €
                          {(match.maxAmount / 1000).toFixed(0)}k
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Frist</p>
                      <p className="text-sm font-medium">{match.deadline}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Deadlines */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Fristen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingDeadlines.map((deadline) => (
                  <div
                    key={deadline.name}
                    className="flex items-center justify-between"
                  >
                    <p className="text-sm text-gray-600">{deadline.name}</p>
                    <Badge
                      variant={deadline.days <= 7 ? "danger" : "warning"}
                    >
                      {deadline.days} Tage
                    </Badge>
                  </div>
                ))}
                {upcomingDeadlines.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-4">
                    Keine anstehenden Fristen
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Schnellaktionen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/onboarding" className="block">
                  <Button variant="secondary" className="w-full justify-start">
                    <Sparkles className="w-4 h-4" />
                    Neues Matching starten
                  </Button>
                </Link>
                <Link href="/applications" className="block">
                  <Button variant="secondary" className="w-full justify-start">
                    <FileText className="w-4 h-4" />
                    Antrag beginnen
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
