import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Zap, Shield, Clock, Target } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#1a1a1a] selection:bg-emerald-200">
      
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#FAF9F7]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-semibold tracking-tight">
            foedr<span className="text-emerald-600">.</span>
          </Link>
          <div className="hidden md:flex items-center gap-10">
            <Link href="#features" className="text-sm text-zinc-600 hover:text-black transition-colors">
              Features
            </Link>
            <Link href="#how" className="text-sm text-zinc-600 hover:text-black transition-colors">
              So funktioniert's
            </Link>
            <Link href="#pricing" className="text-sm text-zinc-600 hover:text-black transition-colors">
              Preise
            </Link>
          </div>
          <Link
            href="/auth/signup"
            className="text-sm px-5 py-2.5 bg-[#1a1a1a] text-white rounded-full font-medium hover:bg-black transition-colors"
          >
            Beta starten
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-sm text-emerald-700 font-medium">Jetzt in der Beta</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Wo Fördermittel
            <br />
            <span className="text-zinc-400">gefunden werden.</span>
          </h1>

          {/* Subline */}
          <p className="text-lg sm:text-xl text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Eine intelligente Plattform, die passende Förderprogramme für dein Unternehmen findet – automatisch und in Minuten.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/signup"
              className="group flex items-center gap-2 px-7 py-4 bg-[#1a1a1a] text-white rounded-full font-medium hover:bg-black transition-all"
            >
              Kostenlos starten
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#how"
              className="flex items-center gap-2 px-7 py-4 text-zinc-500 hover:text-black transition-colors"
            >
              Mehr erfahren
            </Link>
          </div>
        </div>
      </section>

      {/* Bento Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Big Card */}
            <div className="md:col-span-2 p-10 rounded-[2rem] bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-100">
              <p className="text-6xl sm:text-8xl font-bold tracking-tight text-emerald-900">
                120 Mrd<span className="text-emerald-500">.</span>
              </p>
              <p className="text-zinc-600 mt-6 text-lg max-w-md">
                Euro Fördermittel-Volumen jährlich in Deutschland. Der Großteil bleibt ungenutzt – bis jetzt.
              </p>
            </div>
            
            {/* Small Card */}
            <div className="p-10 rounded-[2rem] bg-white border border-zinc-100">
              <p className="text-5xl sm:text-6xl font-bold tracking-tight">94<span className="text-emerald-500">%</span></p>
              <p className="text-zinc-500 mt-4">
                der KMU kennen ihre Fördermöglichkeiten nicht.
              </p>
            </div>

            {/* Small Card */}
            <div className="p-10 rounded-[2rem] bg-white border border-zinc-100">
              <p className="text-5xl sm:text-6xl font-bold tracking-tight">2.500<span className="text-zinc-300">+</span></p>
              <p className="text-zinc-500 mt-4">
                Programme von Bund, Ländern und EU.
              </p>
            </div>

            {/* CTA Card */}
            <div className="md:col-span-2 p-10 rounded-[2rem] bg-[#1a1a1a] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-2xl sm:text-3xl font-semibold">Das ändern wir.</p>
                <p className="text-zinc-400 mt-2">KI-gestütztes Matching in unter 5 Minuten.</p>
              </div>
              <Link 
                href="/auth/signup"
                className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-emerald-400 transition-colors"
              >
                Jetzt starten
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <p className="text-emerald-600 font-medium mb-3 text-sm tracking-wide uppercase">So funktioniert's</p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Drei Schritte.<br />Mehr nicht.
              </h2>
            </div>
            <Link 
              href="/auth/signup"
              className="flex items-center gap-2 px-5 py-2.5 bg-zinc-100 hover:bg-zinc-200 rounded-full text-sm font-medium transition-colors"
            >
              Jetzt ausprobieren
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Profil anlegen",
                desc: "Beantworte 5 kurze Fragen zu deinem Unternehmen. Dauert keine 2 Minuten.",
              },
              {
                step: "02", 
                title: "KI analysiert",
                desc: "Unser Algorithmus durchsucht 2.500+ Förderprogramme nach den besten Matches.",
              },
              {
                step: "03",
                title: "Ergebnisse erhalten",
                desc: "Sieh sofort welche Förderungen dir zustehen – mit allen Details und Fristen.",
              }
            ].map((item, i) => (
              <div 
                key={i}
                className="group p-8 rounded-[1.5rem] bg-white border border-zinc-100 hover:border-zinc-200 hover:shadow-lg hover:shadow-zinc-100 transition-all"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 text-sm font-semibold text-zinc-500 mb-6">
                  {item.step}
                </span>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-zinc-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-emerald-600 font-medium mb-3 text-sm tracking-wide uppercase">Features</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Gebaut für den Mittelstand.
            </h2>
            <p className="text-zinc-500 mt-4 text-lg max-w-2xl mx-auto">
              Keine generische Lösung. foedr. versteht die Komplexität deutscher Förderlandschaft.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Zap, title: "Schnell", desc: "Ergebnisse in Minuten, nicht Wochen" },
              { icon: Target, title: "Präzise", desc: "KI-Scoring für beste Trefferquote" },
              { icon: Clock, title: "Fristen-Alerts", desc: "Nie wieder Deadlines verpassen" },
              { icon: Shield, title: "DSGVO-konform", desc: "Deine Daten bleiben in Deutschland" },
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#FAF9F7] border border-zinc-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-zinc-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-6 border-y border-zinc-100 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm text-zinc-400 mb-8">Bekannt aus führenden Förderprogrammen</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-50">
            <span className="text-xl font-semibold text-zinc-400">BAFA</span>
            <span className="text-xl font-semibold text-zinc-400">KfW</span>
            <span className="text-xl font-semibold text-zinc-400">BMWK</span>
            <span className="text-xl font-semibold text-zinc-400">EU Horizon</span>
            <span className="text-xl font-semibold text-zinc-400">ZIM</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 sm:p-16 rounded-[2.5rem] bg-gradient-to-b from-emerald-50 to-emerald-100/30 border border-emerald-100">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
              Bereit dein Förderpotenzial<br />zu entdecken?
            </h2>
            <p className="text-zinc-500 mb-8 text-lg">
              Kostenlos starten. Keine Kreditkarte nötig.
            </p>
            
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a1a1a] text-white rounded-full font-semibold hover:bg-black transition-colors"
            >
              Jetzt starten
              <ArrowRight className="w-5 h-5" />
            </Link>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-zinc-500">
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Kostenlose Beta</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Setup in 2 Min</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> DSGVO-konform</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-zinc-100">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xl font-semibold">foedr<span className="text-emerald-600">.</span></span>
            <span className="text-zinc-300">|</span>
            <span className="text-sm text-zinc-400">Fördermittel. Automatisiert.</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-zinc-400">
            <Link href="/impressum" className="hover:text-black transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-black transition-colors">Datenschutz</Link>
            <Link href="/kontakt" className="hover:text-black transition-colors">Kontakt</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
