import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#FAFAF8]/90 backdrop-blur-md border-b border-black/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl tracking-tight">
            <span className="font-serif font-semibold">foedr</span><span className="text-emerald-600 font-serif">.</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#how" className="text-[13px] text-neutral-500 hover:text-black transition-colors">
              So funktioniert's
            </Link>
            <Link href="#features" className="text-[13px] text-neutral-500 hover:text-black transition-colors">
              Features
            </Link>
          </div>
          <Link
            href="/auth/signup"
            className="text-[13px] px-4 py-2 bg-neutral-900 text-white rounded-full hover:bg-black transition-colors"
          >
            Beta beitreten
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-[90vh] flex items-center justify-center px-6 pt-16">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs text-emerald-700 font-medium tracking-wide">BETA LIVE</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-[clamp(2.5rem,8vw,5.5rem)] font-medium leading-[1.05] tracking-tight text-neutral-900 mb-6">
            Fördermittel,
            <br />
            <span className="text-neutral-300">die du verdienst.</span>
          </h1>

          {/* Subline */}
          <p className="text-neutral-500 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            2.500+ Programme. Eine Plattform. foedr findet in Minuten, 
            welche Förderungen zu deinem Unternehmen passen.
          </p>

          {/* CTA */}
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/auth/signup"
              className="group inline-flex items-center gap-2 px-6 py-3.5 bg-neutral-900 text-white rounded-full text-sm font-medium hover:bg-black transition-all"
            >
              Kostenlos starten
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Trust */}
          <p className="mt-8 text-xs text-neutral-400">
            Keine Kreditkarte · 2 Min Setup · DSGVO-konform
          </p>
        </div>
      </section>

      {/* Stats Bento */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-6 gap-3">
            
            {/* Main Stat */}
            <div className="col-span-6 md:col-span-4 bg-emerald-600 rounded-[1.75rem] p-10 text-white">
              <p className="font-serif text-[clamp(3rem,10vw,6rem)] font-medium leading-none tracking-tight">
                120 Mrd€
              </p>
              <p className="text-emerald-100 mt-4 text-base max-w-sm">
                Fördermittel-Volumen jährlich in Deutschland – der Großteil ungenutzt.
              </p>
            </div>

            {/* Side Stat */}
            <div className="col-span-6 md:col-span-2 bg-white rounded-[1.75rem] p-8 border border-neutral-100">
              <p className="font-serif text-5xl font-medium text-neutral-900">94%</p>
              <p className="text-neutral-500 mt-3 text-sm">
                der KMU kennen ihre Optionen nicht
              </p>
            </div>

            {/* Bottom Left */}
            <div className="col-span-6 md:col-span-2 bg-white rounded-[1.75rem] p-8 border border-neutral-100">
              <p className="font-serif text-5xl font-medium text-neutral-900">2.500<span className="text-neutral-200">+</span></p>
              <p className="text-neutral-500 mt-3 text-sm">
                Förderprogramme durchsuchbar
              </p>
            </div>

            {/* CTA Card */}
            <div className="col-span-6 md:col-span-4 bg-neutral-900 rounded-[1.75rem] p-10 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <p className="font-serif text-2xl font-medium">Das ändern wir.</p>
                <p className="text-neutral-400 mt-1 text-sm">KI-Matching in unter 5 Minuten.</p>
              </div>
              <Link 
                href="/auth/signup"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-neutral-900 rounded-full text-sm font-medium hover:bg-emerald-400 transition-colors"
              >
                Starten
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* How */}
      <section id="how" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          
          <div className="mb-16">
            <p className="text-xs text-emerald-600 font-medium tracking-widest uppercase mb-3">Prozess</p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-neutral-900">
              Drei Schritte. Das war's.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { num: "01", title: "Profil", desc: "5 Fragen zu deinem Unternehmen. Dauert 2 Minuten." },
              { num: "02", title: "Analyse", desc: "KI durchsucht 2.500+ Programme nach Matches." },
              { num: "03", title: "Ergebnis", desc: "Passende Förderungen mit Details und Fristen." },
            ].map((step, i) => (
              <div key={i} className="p-8 rounded-2xl bg-[#FAFAF8] border border-neutral-100 hover:border-neutral-200 transition-colors">
                <span className="text-xs text-neutral-300 font-medium">{step.num}</span>
                <h3 className="font-serif text-xl font-medium mt-4 mb-2 text-neutral-900">{step.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-16">
            <p className="text-xs text-emerald-600 font-medium tracking-widest uppercase mb-3">Features</p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-neutral-900">
              Für den Mittelstand gebaut.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { emoji: "⚡", label: "Schnell" },
              { emoji: "🎯", label: "Präzise" },
              { emoji: "🔔", label: "Alerts" },
              { emoji: "🔒", label: "DSGVO" },
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-neutral-100 text-center">
                <span className="text-3xl">{f.emoji}</span>
                <p className="text-sm font-medium text-neutral-900 mt-3">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-b from-emerald-50 to-emerald-100/50 rounded-[2rem] p-12 md:p-16 text-center border border-emerald-100">
            <h2 className="font-serif text-3xl md:text-5xl font-medium text-neutral-900 mb-4">
              Bereit?
            </h2>
            <p className="text-neutral-500 mb-8">Finde in 5 Minuten dein Förderpotenzial.</p>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-colors"
            >
              Jetzt starten
              <ArrowRight className="w-5 h-5" />
            </Link>
            <div className="flex flex-wrap justify-center gap-4 mt-8 text-xs text-neutral-500">
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" />Kostenlos</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" />2 Min Setup</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" />DSGVO</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-neutral-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-serif text-lg">foedr<span className="text-emerald-600">.</span></span>
          <div className="flex gap-6 text-xs text-neutral-400">
            <Link href="/impressum" className="hover:text-black transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-black transition-colors">Datenschutz</Link>
          </div>
          <span className="text-xs text-neutral-300">© 2026</span>
        </div>
      </footer>
    </div>
  );
}
