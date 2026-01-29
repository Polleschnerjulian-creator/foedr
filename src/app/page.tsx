import Link from "next/link";
import { ArrowRight, Check, Zap, Clock, Shield, Target, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1100px] mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-[17px] font-bold tracking-tight">
            foedr<span className="text-white/30">.</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#problem" className="text-[13px] text-white/40 hover:text-white transition-colors">Problem</Link>
            <Link href="#how" className="text-[13px] text-white/40 hover:text-white transition-colors">Prozess</Link>
          </div>
          <Link href="/auth/signup" className="text-[13px] px-4 py-1.5 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors">
            Starten
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-white/[0.07] via-white/[0.03] to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-white/[0.03] rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-white/[0.02] rounded-full blur-3xl" />
        </div>

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        <div className="relative z-10 max-w-[1000px] mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="text-[12px] text-white/60 font-medium">127 Unternehmen in der Beta</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-[clamp(40px,8vw,90px)] font-bold leading-[0.95] tracking-[-0.03em] mb-6">
            Fördermittel
            <br />
            <span className="bg-gradient-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent">
              automatisiert.
            </span>
          </h1>

          {/* Sub */}
          <p className="text-white/40 text-[18px] max-w-[500px] mx-auto mb-10 leading-relaxed">
            120 Mrd. € jährlich. 2.500+ Programme. Eine Plattform, 
            die findet, was deinem Unternehmen zusteht.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/auth/signup"
              className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full text-[15px] font-semibold hover:scale-[1.02] transition-transform"
            >
              Förderpotenzial berechnen
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Trust */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-[12px] text-white/30">
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> Kostenlos</span>
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> 2 Minuten Setup</span>
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> DSGVO-konform</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 px-6 border-y border-white/5">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "120 Mrd €", label: "Fördervolumen/Jahr" },
              { value: "2.500+", label: "Programme" },
              { value: "94%", label: "verpassen Förderungen" },
              { value: "5 Min", label: "bis zum Ergebnis" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-[28px] md:text-[36px] font-bold tracking-tight">{stat.value}</p>
                <p className="text-white/30 text-[12px] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-24 px-6">
        <div className="max-w-[1000px] mx-auto">
          
          <div className="text-center mb-16">
            <p className="text-[11px] text-white/30 font-semibold uppercase tracking-widest mb-4">Das Problem</p>
            <h2 className="text-[clamp(28px,5vw,44px)] font-bold leading-tight tracking-tight">
              Deutsche KMU lassen Milliarden
              <br />
              <span className="text-white/30">auf dem Tisch liegen.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "Zu komplex", desc: "2.500+ Programme mit unterschiedlichen Anforderungen, Fristen und Kriterien." },
              { title: "Zu zeitaufwändig", desc: "Durchschnittlich 40+ Stunden Recherche pro Unternehmen." },
              { title: "Zu riskant", desc: "73% Ablehnungsquote bei Erstanträgen wegen formaler Fehler." },
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                <h3 className="text-[18px] font-semibold mb-3">{item.title}</h3>
                <p className="text-white/40 text-[14px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-24 px-6">
        <div className="max-w-[1000px] mx-auto">
          
          <div className="relative rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 p-12 md:p-16 overflow-hidden">
            
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px]" />
            
            <div className="relative z-10 text-center">
              <p className="text-[11px] text-white/30 font-semibold uppercase tracking-widest mb-4">Die Lösung</p>
              <h2 className="text-[clamp(28px,5vw,44px)] font-bold leading-tight tracking-tight mb-4">
                foedr. erledigt das für dich.
              </h2>
              <p className="text-white/40 text-[16px] max-w-[500px] mx-auto mb-12">
                Unsere KI analysiert dein Unternehmen und matcht es mit 
                passenden Förderprogrammen – in unter 5 Minuten.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: Zap, label: "5 Min statt 40h" },
                  { icon: Target, label: "95% Genauigkeit" },
                  { icon: Clock, label: "Fristen-Alerts" },
                  { icon: Shield, label: "DSGVO-konform" },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3">
                      <item.icon className="w-5 h-5 text-white/60" />
                    </div>
                    <p className="text-[13px] text-white/60">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24 px-6">
        <div className="max-w-[800px] mx-auto">
          
          <div className="text-center mb-16">
            <p className="text-[11px] text-white/30 font-semibold uppercase tracking-widest mb-4">Prozess</p>
            <h2 className="text-[clamp(28px,5vw,40px)] font-bold leading-tight tracking-tight">
              3 Schritte. Das war's.
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { num: "01", title: "Profil erstellen", desc: "5 kurze Fragen zu deinem Unternehmen.", time: "2 Min" },
              { num: "02", title: "KI analysiert", desc: "Wir durchsuchen 2.500+ Förderprogramme.", time: "30 Sek" },
              { num: "03", title: "Matches erhalten", desc: "Sieh sofort, welche Programme passen.", time: "Sofort" },
            ].map((step, i) => (
              <div key={i} className="group flex items-center gap-6 p-6 rounded-2xl border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all">
                <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center text-[15px] font-bold flex-shrink-0">
                  {step.num}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-[17px] font-semibold">{step.title}</h3>
                    <span className="text-[11px] text-white/30 px-2 py-0.5 rounded-full bg-white/5">{step.time}</span>
                  </div>
                  <p className="text-white/40 text-[14px] mt-1">{step.desc}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-white/40 group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 px-6 border-y border-white/5">
        <div className="max-w-[700px] mx-auto text-center">
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <blockquote className="text-[22px] font-medium leading-relaxed mb-6">
            "In 10 Minuten hatten wir 3 passende Programme gefunden. 
            Das hätte uns sonst Wochen gekostet."
          </blockquote>
          <p className="text-[14px] font-semibold">Michael K.</p>
          <p className="text-[13px] text-white/30">Geschäftsführer, Tech-Startup München</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="text-[clamp(32px,6vw,52px)] font-bold tracking-tight mb-4">
            Bereit?
          </h2>
          <p className="text-white/40 text-[16px] mb-10">
            Finde in 5 Minuten heraus, welche Fördermittel 
            deinem Unternehmen zustehen.
          </p>
          <Link
            href="/auth/signup"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full text-[16px] font-semibold hover:scale-[1.02] transition-transform"
          >
            Jetzt kostenlos starten
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="mt-6 text-[12px] text-white/20">
            Keine Kreditkarte · Keine Verpflichtung
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[15px] font-bold">foedr<span className="text-white/30">.</span></span>
          <div className="flex gap-6 text-[12px] text-white/30">
            <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
          </div>
          <span className="text-[12px] text-white/20">© 2026</span>
        </div>
      </footer>
    </div>
  );
}
