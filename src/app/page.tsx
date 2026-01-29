import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-[15px] font-semibold tracking-tight">
            foedr.
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#how" className="text-[13px] text-black/50 hover:text-black transition-colors">
              Prozess
            </Link>
            <Link href="#features" className="text-[13px] text-black/50 hover:text-black transition-colors">
              Features
            </Link>
          </div>
          <Link
            href="/auth/signup"
            className="text-[13px] px-4 py-1.5 bg-black text-white rounded-full hover:bg-black/80 transition-colors"
          >
            Starten
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-[700px] mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></span>
            <span className="text-[11px] text-black/60 font-medium uppercase tracking-wider">Beta</span>
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(32px,7vw,64px)] font-semibold leading-[1.1] tracking-[-0.03em] mb-6">
            Fördermittel finden.
            <br />
            <span className="text-black/25">Automatisch.</span>
          </h1>

          {/* Subline */}
          <p className="text-black/50 text-[17px] max-w-[480px] mx-auto mb-10 leading-relaxed">
            120 Mrd. € liegen jährlich auf dem Tisch. foedr. zeigt dir in 
            Minuten, welche Programme zu deinem Unternehmen passen.
          </p>

          {/* CTA */}
          <Link
            href="/auth/signup"
            className="group inline-flex items-center gap-2 px-5 py-3 bg-black text-white rounded-full text-[14px] font-medium hover:bg-black/80 transition-all"
          >
            Kostenlos starten
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          {/* Trust */}
          <p className="mt-6 text-[12px] text-black/30">
            Keine Kreditkarte • 2 Min Setup
          </p>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-32 px-6 border-t border-black/5">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/5">
            {[
              { value: "120 Mrd €", label: "Fördermittel jährlich" },
              { value: "2.500+", label: "Programme in Deutschland" },
              { value: "94%", label: "der KMU verpassen Förderungen" },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-12 text-center">
                <p className="text-[clamp(36px,5vw,48px)] font-semibold tracking-tight">{stat.value}</p>
                <p className="text-black/40 text-[13px] mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How */}
      <section id="how" className="py-32 px-6">
        <div className="max-w-[1000px] mx-auto">
          
          <div className="mb-20">
            <p className="text-[11px] text-black/40 font-medium uppercase tracking-widest mb-4">Prozess</p>
            <h2 className="text-[clamp(28px,4vw,40px)] font-semibold tracking-tight">
              So einfach geht's.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { num: "01", title: "Profil erstellen", desc: "5 kurze Fragen zu deinem Unternehmen." },
              { num: "02", title: "KI analysiert", desc: "Wir durchsuchen 2.500+ Förderprogramme." },
              { num: "03", title: "Matches erhalten", desc: "Sieh sofort, was dir zusteht." },
            ].map((step, i) => (
              <div key={i}>
                <span className="text-[11px] text-black/20 font-medium">{step.num}</span>
                <h3 className="text-[18px] font-semibold mt-3 mb-2">{step.title}</h3>
                <p className="text-black/50 text-[14px] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 px-6 bg-black text-white">
        <div className="max-w-[1000px] mx-auto">
          
          <div className="mb-20">
            <p className="text-[11px] text-white/40 font-medium uppercase tracking-widest mb-4">Features</p>
            <h2 className="text-[clamp(28px,4vw,40px)] font-semibold tracking-tight">
              Gebaut für den Mittelstand.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { title: "Schnell", desc: "Ergebnisse in Minuten" },
              { title: "Präzise", desc: "KI-gestütztes Matching" },
              { title: "Aktuell", desc: "Fristen-Benachrichtigungen" },
              { title: "Sicher", desc: "DSGVO-konform" },
            ].map((f, i) => (
              <div key={i}>
                <h3 className="text-[15px] font-semibold mb-1">{f.title}</h3>
                <p className="text-white/40 text-[13px]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="text-[clamp(28px,5vw,44px)] font-semibold tracking-tight mb-4">
            Bereit zu starten?
          </h2>
          <p className="text-black/50 text-[15px] mb-8">
            Finde dein Förderpotenzial in unter 5 Minuten.
          </p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-black text-white rounded-full text-[14px] font-medium hover:bg-black/80 transition-colors"
          >
            Jetzt starten
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-black/5">
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[14px] font-semibold">foedr.</span>
          <div className="flex gap-6 text-[12px] text-black/40">
            <Link href="/impressum" className="hover:text-black transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-black transition-colors">Datenschutz</Link>
          </div>
          <span className="text-[12px] text-black/20">© 2026</span>
        </div>
      </footer>
    </div>
  );
}
