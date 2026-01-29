import Link from "next/link";
import { ArrowRight, CheckCircle2, Zap, Shield, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-white">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-brand-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-brand-black">
            foedr.
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-gray-600 hover:text-brand-black transition"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="bg-brand-black text-brand-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition"
            >
              Kostenlos starten
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Jetzt in der Beta
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-brand-black leading-tight mb-6">
            Fördermittel.
            <br />
            <span className="text-gray-400">Automatisiert.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Deutsche Unternehmen lassen jährlich Milliarden an Fördermitteln
            ungenutzt. foedr. findet in Minuten, was dir zusteht.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/signup"
              className="w-full sm:w-auto bg-brand-black text-brand-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2"
            >
              Kostenlos starten
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#how-it-works"
              className="w-full sm:w-auto text-gray-600 hover:text-brand-black transition px-8 py-4"
            >
              So funktioniert's
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 border-y border-gray-200 bg-gray-50">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-brand-black">120 Mrd. €</p>
            <p className="text-gray-600 mt-1">Fördermittel-Volumen jährlich</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-brand-black">2.500+</p>
            <p className="text-gray-600 mt-1">Förderprogramme in Deutschland</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-brand-black">94%</p>
            <p className="text-gray-600 mt-1">der KMU kennen ihre Optionen nicht</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-black text-center mb-12">
            In 3 Schritten zu deiner Förderung
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Profil erstellen",
                description:
                  "Beantworte ein paar Fragen zu deinem Unternehmen. Dauert nur 2 Minuten.",
              },
              {
                step: "02",
                title: "KI-Matching",
                description:
                  "Unsere KI analysiert 2.500+ Programme und findet die besten Matches.",
              },
              {
                step: "03",
                title: "Antrag vorbereiten",
                description:
                  "Checklisten, Fristen-Alerts und Dokument-Vorlagen für jeden Antrag.",
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <p className="text-6xl font-bold text-gray-100 absolute -top-4 -left-2">
                  {item.step}
                </p>
                <div className="relative pt-8">
                  <h3 className="text-xl font-semibold text-brand-black mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-brand-black text-brand-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Warum foedr.?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Zap,
                title: "Schnell",
                description:
                  "Ergebnisse in Minuten statt Wochen. Kein Durchforsten von Datenbanken.",
              },
              {
                icon: Shield,
                title: "Zuverlässig",
                description:
                  "Fristen-Alerts und automatische Updates. Nie wieder eine Deadline verpassen.",
              },
              {
                icon: TrendingUp,
                title: "Datengetrieben",
                description:
                  "KI-Scoring zeigt dir die Programme mit der höchsten Erfolgschance.",
              },
              {
                icon: CheckCircle2,
                title: "Vollständig",
                description:
                  "Von Forschungszulage bis Digitalbonus – alle relevanten Programme.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="flex gap-4 p-6 rounded-xl bg-gray-900"
              >
                <feature.icon className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-brand-black mb-4">
            Bereit zu starten?
          </h2>
          <p className="text-gray-600 mb-8">
            Finde in unter 5 Minuten heraus, welche Fördermittel dir zustehen.
            Kostenlos.
          </p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 bg-brand-black text-brand-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition"
          >
            Jetzt Förderpotenzial entdecken
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-2xl font-bold text-brand-black">foedr.</p>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <Link href="/impressum" className="hover:text-brand-black transition">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-brand-black transition">
              Datenschutz
            </Link>
            <Link href="/kontakt" className="hover:text-brand-black transition">
              Kontakt
            </Link>
          </div>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} foedr. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </div>
  );
}
