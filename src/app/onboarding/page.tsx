"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ArrowRight, ArrowLeft, Loader2, Building2, MapPin, Users, Lightbulb, Check } from "lucide-react";

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
  { value: "MICRO", label: "1-9 Mitarbeiter", sub: "Kleinstunternehmen" },
  { value: "SMALL", label: "10-49 Mitarbeiter", sub: "Kleinunternehmen" },
  { value: "MEDIUM", label: "50-249 Mitarbeiter", sub: "Mittelstand" },
  { value: "LARGE", label: "250+ Mitarbeiter", sub: "Großunternehmen" },
];

const PLANS = [
  { key: "planInnovation", label: "Innovation / F&E", desc: "Neue Produkte oder Verfahren entwickeln" },
  { key: "planDigital", label: "Digitalisierung", desc: "Software, Automatisierung, IT-Infrastruktur" },
  { key: "planGreen", label: "Nachhaltigkeit", desc: "Energieeffizienz, Umweltschutz, Klimaneutralität" },
  { key: "planInvestment", label: "Investitionen", desc: "Maschinen, Anlagen, Gebäude" },
  { key: "planHiring", label: "Personal", desc: "Neue Mitarbeiter einstellen" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
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

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const canContinue = () => {
    switch (step) {
      case 1: return form.name.length >= 2;
      case 2: return form.industry !== "";
      case 3: return form.state !== "";
      case 4: return form.size !== "";
      case 5: return Object.entries(form).filter(([k, v]) => k.startsWith("plan") && v).length > 0;
      default: return false;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error("Fehler beim Speichern");

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/5">
        <div 
          className="h-full bg-white transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <span className="text-lg font-bold">foedr<span className="text-white/30">.</span></span>
          <span className="text-sm text-white/40">Schritt {step} von {totalSteps}</span>
        </div>
      </header>

      {/* Content */}
      <main className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-xl">
          
          {/* Step 1: Company Name */}
          {step === 1 && (
            <div className="space-y-8">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Building2 className="w-7 h-7 text-white/60" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">Wie heißt dein Unternehmen?</h1>
                <p className="text-white/40">Der offizielle Name deiner Firma.</p>
              </div>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
                placeholder="Mustermann GmbH"
                autoFocus
              />
            </div>
          )}

          {/* Step 2: Industry */}
          {step === 2 && (
            <div className="space-y-8">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Lightbulb className="w-7 h-7 text-white/60" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">In welcher Branche?</h1>
                <p className="text-white/40">Wähle die passendste Kategorie.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {INDUSTRIES.map((ind) => (
                  <button
                    key={ind.value}
                    onClick={() => setForm({ ...form, industry: ind.value })}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      form.industry === ind.value 
                        ? "bg-white text-black border-white" 
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <span className="text-sm font-medium">{ind.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: State */}
          {step === 3 && (
            <div className="space-y-8">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <MapPin className="w-7 h-7 text-white/60" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">Wo ist dein Firmensitz?</h1>
                <p className="text-white/40">Bundesland für regionale Förderprogramme.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
                {STATES.map((st) => (
                  <button
                    key={st.value}
                    onClick={() => setForm({ ...form, state: st.value })}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      form.state === st.value 
                        ? "bg-white text-black border-white" 
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <span className="text-sm font-medium">{st.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Size */}
          {step === 4 && (
            <div className="space-y-8">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Users className="w-7 h-7 text-white/60" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">Wie groß ist dein Team?</h1>
                <p className="text-white/40">Die Unternehmensgröße bestimmt viele Förderkriterien.</p>
              </div>
              <div className="space-y-3">
                {SIZES.map((sz) => (
                  <button
                    key={sz.value}
                    onClick={() => setForm({ ...form, size: sz.value })}
                    className={`w-full p-5 rounded-xl border text-left transition-all ${
                      form.size === sz.value 
                        ? "bg-white text-black border-white" 
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <span className="font-semibold">{sz.label}</span>
                    <span className={`block text-sm mt-0.5 ${form.size === sz.value ? "text-black/60" : "text-white/40"}`}>
                      {sz.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Plans */}
          {step === 5 && (
            <div className="space-y-8">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Lightbulb className="w-7 h-7 text-white/60" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">Was planst du?</h1>
                <p className="text-white/40">Wähle alle zutreffenden Vorhaben aus.</p>
              </div>
              <div className="space-y-3">
                {PLANS.map((plan) => {
                  const isSelected = form[plan.key as keyof typeof form];
                  return (
                    <button
                      key={plan.key}
                      onClick={() => setForm({ ...form, [plan.key]: !isSelected })}
                      className={`w-full p-5 rounded-xl border text-left transition-all flex items-center gap-4 ${
                        isSelected 
                          ? "bg-white text-black border-white" 
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected ? "bg-black border-black" : "border-white/20"
                      }`}>
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </div>
                      <div>
                        <span className="font-semibold">{plan.label}</span>
                        <span className={`block text-sm mt-0.5 ${isSelected ? "text-black/60" : "text-white/40"}`}>
                          {plan.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 px-5 py-3 text-white/60 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Zurück
              </button>
            ) : (
              <div />
            )}

            {step < totalSteps ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canContinue()}
                className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Weiter
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canContinue() || loading}
                className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Matches finden
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
