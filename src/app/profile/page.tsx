"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard/layout";
import { Save, Loader2, Building2, MapPin, Users, Lightbulb, Check } from "lucide-react";

const INDUSTRIES = [
  { value: "manufacturing", label: "Produktion / Fertigung" },
  { value: "it", label: "IT / Software" },
  { value: "consulting", label: "Beratung / Dienstleistung" },
  { value: "retail", label: "Handel / E-Commerce" },
  { value: "healthcare", label: "Gesundheit / Medizin" },
  { value: "construction", label: "Bau / Handwerk" },
  { value: "logistics", label: "Logistik / Transport" },
  { value: "food", label: "Lebensmittel / Gastronomie" },
  { value: "energy", label: "Energie / Umwelt" },
  { value: "other", label: "Andere" },
];

const STATES = [
  { value: "BW", label: "Baden-Württemberg" },
  { value: "BY", label: "Bayern" },
  { value: "BE", label: "Berlin" },
  { value: "BB", label: "Brandenburg" },
  { value: "HB", label: "Bremen" },
  { value: "HH", label: "Hamburg" },
  { value: "HE", label: "Hessen" },
  { value: "MV", label: "Mecklenburg-Vorpommern" },
  { value: "NI", label: "Niedersachsen" },
  { value: "NW", label: "Nordrhein-Westfalen" },
  { value: "RP", label: "Rheinland-Pfalz" },
  { value: "SL", label: "Saarland" },
  { value: "SN", label: "Sachsen" },
  { value: "ST", label: "Sachsen-Anhalt" },
  { value: "SH", label: "Schleswig-Holstein" },
  { value: "TH", label: "Thüringen" },
];

const SIZES = [
  { value: "MICRO", label: "1-9 Mitarbeiter" },
  { value: "SMALL", label: "10-49 Mitarbeiter" },
  { value: "MEDIUM", label: "50-249 Mitarbeiter" },
  { value: "LARGE", label: "250+ Mitarbeiter" },
];

const PLANS = [
  { key: "planInnovation", label: "Innovation / F&E" },
  { key: "planDigital", label: "Digitalisierung" },
  { key: "planGreen", label: "Nachhaltigkeit" },
  { key: "planInvestment", label: "Investitionen" },
  { key: "planHiring", label: "Personal" },
];

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: "",
    industry: "",
    state: "",
    size: "",
    planInnovation: false,
    planDigital: false,
    planGreen: false,
    planInvestment: false,
    planHiring: false,
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/company/me");
        if (res.ok) {
          const data = await res.json();
          if (data.company) {
            setForm({
              name: data.company.name || "",
              industry: data.company.industry || "",
              state: data.company.state || "",
              size: data.company.size || "",
              planInnovation: data.company.planInnovation || false,
              planDigital: data.company.planDigital || false,
              planGreen: data.company.planGreen || false,
              planInvestment: data.company.planInvestment || false,
              planHiring: data.company.planHiring || false,
            });
          }
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      const res = await fetch("/api/company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error("Error saving:", error);
    } finally {
      setSaving(false);
    }
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
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Unternehmensprofil</h1>
          <p className="text-white/40 mt-1">Aktualisiere deine Daten für bessere Matches.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-5 h-5 text-white/40" />
              <h2 className="font-semibold">Unternehmen</h2>
            </div>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/20"
              placeholder="Firmenname"
            />
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-5 h-5 text-white/40" />
              <h2 className="font-semibold">Branche</h2>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind.value}
                  type="button"
                  onClick={() => setForm({ ...form, industry: ind.value })}
                  className={`p-3 rounded-xl border text-left text-sm transition-all ${
                    form.industry === ind.value ? "bg-white text-black border-white" : "bg-white/5 border-white/10 hover:border-white/20"
                  }`}
                >
                  {ind.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-5 h-5 text-white/40" />
              <h2 className="font-semibold">Bundesland</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {STATES.map((st) => (
                <button
                  key={st.value}
                  type="button"
                  onClick={() => setForm({ ...form, state: st.value })}
                  className={`p-3 rounded-xl border text-left text-sm transition-all ${
                    form.state === st.value ? "bg-white text-black border-white" : "bg-white/5 border-white/10 hover:border-white/20"
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-white/40" />
              <h2 className="font-semibold">Größe</h2>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {SIZES.map((sz) => (
                <button
                  key={sz.value}
                  type="button"
                  onClick={() => setForm({ ...form, size: sz.value })}
                  className={`p-3 rounded-xl border text-left text-sm transition-all ${
                    form.size === sz.value ? "bg-white text-black border-white" : "bg-white/5 border-white/10 hover:border-white/20"
                  }`}
                >
                  {sz.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-5 h-5 text-white/40" />
              <h2 className="font-semibold">Vorhaben</h2>
            </div>
            <div className="space-y-2">
              {PLANS.map((plan) => {
                const isSelected = form[plan.key as keyof typeof form] as boolean;
                return (
                  <button
                    key={plan.key}
                    type="button"
                    onClick={() => setForm({ ...form, [plan.key]: !isSelected })}
                    className={`w-full p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${
                      isSelected ? "bg-white text-black border-white" : "bg-white/5 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${isSelected ? "bg-black border-black" : "border-white/20"}`}>
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                    {plan.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-colors disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-4 h-4" /> Speichern</>}
            </button>
            {saved && <span className="text-emerald-400 text-sm flex items-center gap-1"><Check className="w-4 h-4" /> Gespeichert!</span>}
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
