import Link from "next/link";
import { ArrowRight, Check, Zap, Clock, Shield, Target, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-[1100px] mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-[15px] font-semibold tracking-tight">
            foedr.
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#problem" className="text-[13px] text-black/50 hover:text-black transition-colors">Problem</Link>
            <Link href="#solution" className="text-[13px] text-black/50 hover:text-black transition-colors">Lösung</Link>
            <Link href="#how" className="text-[13px] text-black/50 hover:text-black transition-colors">Prozess</Link>
          </div>
          <Link href="/auth/signup" className="text-[13px] px-4 py-1.5 bg-black text-white rounded-full hover:bg-black/80 transition-colors">
            Kostenlos starten
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-[900px] mx-auto text-center">
          
          {/* Social Proof Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-black/10 bg-black/[0.02] mb-8">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-black/20 to-black/5 border-2 border-white" />
              ))}
            </div>
            <span className="text-[13px] text-black/60">
              <span className="font-semibold text-black">127 Unternehmen</span> nutzen foedr bereits
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(36px,6vw,56px)] font-semibold leading-[1.1] tracking-[-0.02em] mb-6">
            Dein Unternehmen lässt
            <br />
            <span className="text-black/25">Geld auf dem Tisch liegen.</span>
          </h1>

          {/* Subline */}
          <p className="text-black/60 text-[18px] max-w-[520px] mx-auto mb-8 leading-relaxed">
            94% der deutschen KMU verpassen Fördermittel, die ihnen zustehen. 
            foedr. findet sie – in unter 5 Minuten.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <Link
              href="/auth/signup"
              className="group flex items-center gap-2 px-6 py-3.5 bg-black text-white rounded-full text-[15px] font-medium hover:bg-black/80 transition-all"
            >
              Förderpotenzial berechnen
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <span className="text-[13px] text-black/40">Kostenlos · 2 Minuten</span>
          </div>

          {/* Trust Row */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-black/40">
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-black" /> Keine Kreditkarte</span>
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-black" /> DSGVO-konform</span>
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-black" /> Sofortige Ergebnisse</span>
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="py-12 px-6 border-y border-black/5">
        <div className="max-w-[900px] mx-auto">
          <p className="text-center text-[11px] text-black/30 uppercase tracking-widest mb-6">Förderprogramme die wir durchsuchen</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {["KfW", "BAFA", "BMWK", "ZIM", "EU Horizon", "DLR"].map((logo) => (
              <span key={logo} className="text-[14px] font-semibold text-black/20">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-24 px-6">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[11px] text-black/40 font-semibold uppercase tracking-widest mb-4">Das Problem</p>
              <h2 className="text-[32px] font-semibold leading-tight tracking-tight mb-6">
                120 Milliarden Euro.
                <br />
                <span className="text-black/30">Jedes Jahr ungenutzt.</span>
              </h2>
              <p className="text-black/60 text-[15px] leading-relaxed mb-6">
                Deutschland hat eines der größten Fördersysteme der Welt. Aber die Komplexität 
                aus 2.500+ Programmen, unterschiedlichen Anforderungen und Fristen macht es 
                für KMU fast unmöglich, passende Förderungen zu finden.
              </p>
              <div className="space-y-3">
                {[
                  "Stundenlange Recherche in Förderdatenbanken",
                  "Unklare Kriterien und komplizierte Anträge", 
                  "Verpasste Fristen und abgelehnte Anträge"
                ].map((pain, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-black/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-black/40" />
                    </span>
                    <span className="text-[14px] text-black/60">{pain}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black text-white p-8 rounded-2xl">
                <p className="text-[40px] font-semibold tracking-tight">94%</p>
                <p className="text-white/60 text-[13px] mt-2">der KMU kennen ihre Fördermöglichkeiten nicht</p>
              </div>
              <div className="bg-black/[0.03] p-8 rounded-2xl">
                <p className="text-[40px] font-semibold tracking-tight">2.500+</p>
                <p className="text-black/50 text-[13px] mt-2">verschiedene Förderprogramme</p>
              </div>
              <div className="bg-black/[0.03] p-8 rounded-2xl">
                <p className="text-[40px] font-semibold tracking-tight">40h</p>
                <p className="text-black/50 text-[13px] mt-2">durchschnittliche Recherchezeit</p>
              </div>
              <div className="bg-black/[0.03] p-8 rounded-2xl">
                <p className="text-[40px] font-semibold tracking-tight">73%</p>
                <p className="text-black/50 text-[13px] mt-2">Ablehnungsquote bei Erstanträgen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-24 px-6 bg-black text-white">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] text-white/40 font-semibold uppercase tracking-widest mb-4">Die Lösung</p>
            <h2 className="text-[32px] font-semibold leading-tight tracking-tight mb-4">
              foedr. macht Fördermittel einfach.
            </h2>
            <p className="text-white/50 text-[15px] max-w-[500px] mx-auto">
              Unsere KI analysiert dein Unternehmen und findet passende Programme – 
              mit allem was du für den Antrag brauchst.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: "5 Min statt 40h", desc: "KI-Matching in Minuten" },
              { icon: Target, title: "95% Genauigkeit", desc: "Präzise Programmauswahl" },
              { icon: Clock, title: "Fristen-Alerts", desc: "Nie wieder verpassen" },
              { icon: Shield, title: "DSGVO-konform", desc: "Daten bleiben in DE" },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/10">
                <feature.icon className="w-5 h-5 text-white/60 mb-4" />
                <h3 className="text-[15px] font-semibold mb-1">{feature.title}</h3>
                <p className="text-white/40 text-[13px]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24 px-6">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] text-black/40 font-semibold uppercase tracking-widest mb-4">So funktioniert's</p>
            <h2 className="text-[32px] font-semibold leading-tight tracking-tight">
              In 3 Schritten zu deiner Förderung
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { num: "1", title: "Profil erstellen", desc: "Beantworte 5 kurze Fragen zu deinem Unternehmen. Branche, Größe, Vorhaben – das war's.", time: "2 Min" },
              { num: "2", title: "KI analysiert", desc: "Unser Algorithmus durchsucht 2.500+ Förderprogramme und berechnet deine Matches.", time: "30 Sek" },
              { num: "3", title: "Ergebnisse erhalten", desc: "Sieh sofort welche Programme passen, wie viel Geld möglich ist und was die nächsten Schritte sind.", time: "Sofort" },
            ].map((step, i) => (
              <div key={i} className="flex gap-6 p-6 rounded-2xl border border-black/5 hover:border-black/10 hover:bg-black/[0.01] transition-all">
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-[18px] font-semibold flex-shrink-0">
                  {step.num}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-[17px] font-semibold">{step.title}</h3>
                    <span className="text-[11px] text-black/40 px-2 py-0.5 rounded-full bg-black/5">{step.time}</span>
                  </div>
                  <p className="text-black/50 text-[14px] leading-relaxed">{step.desc}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-black/20 flex-shrink-0 self-center" />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link
              href="/auth/signup"
              className="group inline-flex items-center gap-2 px-6 py-3.5 bg-black text-white rounded-full text-[15px] font-medium hover:bg-black/80 transition-all"
            >
              Jetzt Förderpotenzial berechnen
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 px-6 bg-black/[0.02]">
        <div className="max-w-[800px] mx-auto text-center">
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <blockquote className="text-[20px] font-medium leading-relaxed mb-6">
            "Wir haben innerhalb von 10 Minuten 3 passende Förderprogramme gefunden. 
            Hätte uns sonst Wochen gekostet."
          </blockquote>
          <div>
            <p className="text-[14px] font-semibold">Michael K.</p>
            <p className="text-[13px] text-black/40">Geschäftsführer, Tech-Startup München</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-[700px] mx-auto">
          <div className="bg-black text-white rounded-3xl p-12 text-center">
            <h2 className="text-[28px] font-semibold tracking-tight mb-3">
              Bereit zu sehen, was dir zusteht?
            </h2>
            <p className="text-white/50 text-[15px] mb-8">
              Keine Kreditkarte. Keine Verpflichtung. Nur dein Förderpotenzial.
            </p>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full text-[15px] font-semibold hover:bg-white/90 transition-colors"
            >
              Kostenlos starten
              <ArrowRight className="w-5 h-5" />
            </Link>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-[12px] text-white/40">
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> 2 Min Setup</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> Sofortige Ergebnisse</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> DSGVO-konform</span>
            </div>
          </div>
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
