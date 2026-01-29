import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30">
      {/* Grain overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            foedr<span className="text-emerald-400">.</span>
          </Link>
          <div className="flex items-center gap-8">
            <Link href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
              Features
            </Link>
            <Link href="#how" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
              So funktioniert's
            </Link>
            <Link
              href="/auth/signup"
              className="text-sm px-4 py-2 bg-white text-black rounded-full font-medium hover:bg-emerald-400 transition-colors"
            >
              Starten
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-16 relative overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-sm text-zinc-300">Beta • Jetzt kostenlos starten</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Fördermittel
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600">
              finden lassen.
            </span>
          </h1>

          {/* Subline */}
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            120 Mrd. € Fördermittel. 2.500+ Programme. 
            <br className="hidden sm:block" />
            foedr<span className="text-emerald-400">.</span> findet in Minuten, was dir zusteht.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/signup"
              className="group flex items-center gap-2 px-6 py-3.5 bg-white text-black rounded-full font-medium hover:bg-emerald-400 transition-all duration-300"
            >
              Kostenlos starten
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#how"
              className="flex items-center gap-2 px-6 py-3.5 text-zinc-400 hover:text-white transition-colors"
            >
              So funktioniert's
            </Link>
          </div>

          {/* Trust */}
          <p className="mt-12 text-sm text-zinc-600">
            Keine Kreditkarte • Setup in 2 Minuten • DSGVO-konform
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden sm:block">
          <div className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center p-1.5">
            <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Bento Grid Stats */}
      <section className="py-24 sm:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Big stat */}
            <div className="md:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.03] border border-white/10 backdrop-blur-sm">
              <p className="text-5xl sm:text-8xl font-bold tracking-tight">
                120<span className="text-emerald-400">Mrd.</span>
              </p>
              <p className="text-zinc-400 mt-4 text-lg">
                Euro Fördermittel-Volumen jährlich in Deutschland. 
                Der Großteil bleibt ungenutzt.
              </p>
            </div>
            
            {/* Small stat */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20">
              <p className="text-5xl font-bold tracking-tight text-emerald-400">94%</p>
              <p className="text-zinc-400 mt-4">
                der KMU kennen ihre Fördermöglichkeiten nicht.
              </p>
            </div>

            {/* Small stat */}
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10">
              <p className="text-5xl font-bold tracking-tight">2.500<span className="text-zinc-600">+</span></p>
              <p className="text-zinc-400 mt-4">
                Programme von Bund, Ländern und EU.
              </p>
            </div>

            {/* CTA card */}
            <div className="md:col-span-2 p-8 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-2xl font-semibold">Das ändern wir.</p>
                <p className="text-zinc-400 mt-2">KI-gestütztes Matching in unter 5 Minuten.</p>
              </div>
              <Link 
                href="/auth/signup"
                className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full font-medium hover:bg-emerald-400 transition-colors"
              >
                Los geht's
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24 sm:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <p className="text-emerald-400 font-medium mb-4">SO FUNKTIONIERT'S</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              3 Schritte. Fertig.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                step: "01",
                title: "Profil anlegen",
                desc: "Beantworte 5 kurze Fragen zu deinem Unternehmen.",
                gradient: "from-emerald-500/20 to-transparent"
              },
              {
                step: "02", 
                title: "KI analysiert",
                desc: "Unser Algorithmus durchsucht 2.500+ Programme.",
                gradient: "from-purple-500/20 to-transparent"
              },
              {
                step: "03",
                title: "Matches erhalten",
                desc: "Sieh sofort welche Förderungen dir zustehen.",
                gradient: "from-blue-500/20 to-transparent"
              }
            ].map((item, i) => (
              <div 
                key={i}
                className="group relative p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative">
                  <span className="text-6xl sm:text-7xl font-bold text-white/5">{item.step}</span>
                  <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
                  <p className="text-zinc-400 mt-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 sm:py-32 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-emerald-400 font-medium mb-4">FEATURES</p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
                Gebaut für den
                <br />
                deutschen Mittelstand.
              </h2>
              <p className="text-zinc-400 mt-6 text-lg leading-relaxed">
                Keine generische Lösung. foedr. versteht die Komplexität 
                deutscher Förderlandschaft – von Forschungszulage bis Digitalbonus.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "⚡", title: "Schnell", desc: "Ergebnisse in Minuten, nicht Wochen" },
                { icon: "🎯", title: "Präzise", desc: "KI-Scoring für beste Trefferquote" },
                { icon: "🔔", title: "Alerts", desc: "Nie wieder Fristen verpassen" },
                { icon: "🔒", title: "Sicher", desc: "DSGVO-konform, deutsche Server" },
              ].map((f, i) => (
                <div key={i} className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                  <span className="text-2xl">{f.icon}</span>
                  <h3 className="font-semibold mt-3">{f.title}</h3>
                  <p className="text-sm text-zinc-400 mt-1">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-8 sm:p-12 rounded-[2rem] bg-gradient-to-b from-white/10 to-white/5 border border-white/10 relative overflow-hidden">
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative">
              <Sparkles className="w-10 h-10 text-emerald-400 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Bereit dein Förderpotenzial
                <br className="hidden sm:block" />
                zu entdecken?
              </h2>
              <p className="text-zinc-400 mt-4 mb-8">
                Kostenlos starten. Keine Kreditkarte nötig.
              </p>
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-emerald-400 transition-colors"
              >
                Jetzt starten
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold">foedr<span className="text-emerald-400">.</span></span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="text-sm text-zinc-500 hidden sm:inline">Fördermittel. Automatisiert.</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
          </div>
          <p className="text-sm text-zinc-600">© 2026 foedr</p>
        </div>
      </footer>
    </div>
  );
}
