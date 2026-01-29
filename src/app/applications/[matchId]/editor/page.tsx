"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard/layout";
import Link from "next/link";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Loader2, 
  FileText, 
  Download,
  Lightbulb,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Save
} from "lucide-react";
import { getTemplateForProgram, ProgramTemplate, EditorField } from "@/lib/templates";

interface Match {
  id: string;
  score: number;
  program: {
    id: string;
    name: string;
    shortName: string;
    provider: string;
  };
}

export default function ApplicationEditorPage({ params }: { params: Promise<{ matchId: string }> }) {
  const router = useRouter();
  const [matchId, setMatchId] = useState<string>("");
  const [match, setMatch] = useState<Match | null>(null);
  const [template, setTemplate] = useState<ProgramTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [showTips, setShowTips] = useState<Record<string, boolean>>({});
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    params.then(p => {
      setMatchId(p.matchId);
      fetchMatch(p.matchId);
    });
  }, [params]);

  const fetchMatch = async (id: string) => {
    try {
      const res = await fetch(`/api/matches/${id}`);
      const data = await res.json();
      if (data.match) {
        setMatch(data.match);
        const tmpl = getTemplateForProgram(data.match.program.id);
        setTemplate(tmpl);
        
        // Load saved data from localStorage
        const saved = localStorage.getItem(`foedr-application-${id}`);
        if (saved) {
          setFormData(JSON.parse(saved));
        }
      }
    } catch (error) {
      console.error("Error fetching match:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveProgress = () => {
    setSaving(true);
    localStorage.setItem(`foedr-application-${matchId}`, JSON.stringify(formData));
    setTimeout(() => setSaving(false), 500);
  };

  const handleFieldChange = (fieldId: string, value: string) => {
    const newData = { ...formData, [fieldId]: value };
    setFormData(newData);
    // Auto-save
    localStorage.setItem(`foedr-application-${matchId}`, JSON.stringify(newData));
  };

  const getFieldStatus = (field: EditorField) => {
    const value = formData[field.id] || "";
    const charCount = value.length;
    
    if (charCount === 0) return "empty";
    if (charCount < field.minChars) return "short";
    if (charCount > field.maxChars) return "long";
    return "good";
  };

  const getSectionProgress = (sectionIndex: number) => {
    if (!template) return 0;
    const section = template.sections[sectionIndex];
    const fields = section.fields;
    const completed = fields.filter(f => getFieldStatus(f) === "good").length;
    return Math.round((completed / fields.length) * 100);
  };

  const getTotalProgress = () => {
    if (!template) return 0;
    const allFields = template.sections.flatMap(s => s.fields);
    const completed = allFields.filter(f => getFieldStatus(f) === "good").length;
    return Math.round((completed / allFields.length) * 100);
  };

  const generateDocument = async () => {
    setGenerating(true);
    
    // Create document content
    let content = `# ${template?.programName}\n`;
    content += `## Antrag für: ${match?.program.name}\n\n`;
    content += `Erstellt am: ${new Date().toLocaleDateString("de-DE")}\n\n`;
    content += `---\n\n`;

    template?.sections.forEach(section => {
      content += `## ${section.title}\n\n`;
      section.fields.forEach(field => {
        content += `### ${field.label}\n\n`;
        content += `${formData[field.id] || "[Noch nicht ausgefüllt]"}\n\n`;
      });
    });

    // Create and download file
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Antrag_${match?.program.shortName || "Foerderung"}_${new Date().toISOString().split("T")[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setGenerating(false);
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

  if (!match || !template) {
    return (
      <DashboardLayout>
        <div className="text-center py-16">
          <p className="text-white/40">Antrag nicht gefunden.</p>
          <Link href="/applications" className="text-white underline mt-2 inline-block">
            Zurück zu Anträge
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const currentSectionData = template.sections[currentSection];
  const totalProgress = getTotalProgress();

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link
              href="/applications"
              className="inline-flex items-center gap-2 text-white/40 hover:text-white mb-2 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück zu Anträge
            </Link>
            <h1 className="text-2xl font-bold">Antrag vorbereiten</h1>
            <p className="text-white/40 mt-1">
              {match.program.name} · {match.program.provider}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={saveProgress}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/15 rounded-xl text-sm transition-colors"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Speichern
            </button>
            <button
              onClick={generateDocument}
              disabled={generating || totalProgress < 50}
              className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-xl text-sm font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              Dokument erstellen
            </button>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/60">Gesamtfortschritt</span>
            <span className={`text-sm font-bold ${
              totalProgress >= 80 ? "text-emerald-400" :
              totalProgress >= 50 ? "text-yellow-400" :
              "text-white/60"
            }`}>
              {totalProgress}%
            </span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all ${
                totalProgress >= 80 ? "bg-emerald-500" :
                totalProgress >= 50 ? "bg-yellow-500" :
                "bg-white/30"
              }`}
              style={{ width: `${totalProgress}%` }}
            />
          </div>
        </div>

        {/* Section Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {template.sections.map((section, index) => {
            const progress = getSectionProgress(index);
            const isActive = index === currentSection;
            const isComplete = progress === 100;
            
            return (
              <button
                key={section.id}
                onClick={() => setCurrentSection(index)}
                className={`flex-shrink-0 px-4 py-3 rounded-xl border text-sm transition-all ${
                  isActive 
                    ? "bg-white text-black border-white" 
                    : isComplete
                    ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-300"
                    : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-2">
                  {isComplete && !isActive ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs">
                      {index + 1}
                    </span>
                  )}
                  {section.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Current Section */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{currentSectionData.title}</h2>
            <p className="text-white/60 text-sm">{currentSectionData.description}</p>
          </div>

          <div className="space-y-8">
            {currentSectionData.fields.map((field) => {
              const value = formData[field.id] || "";
              const charCount = value.length;
              const status = getFieldStatus(field);
              const tipsOpen = showTips[field.id] || false;

              return (
                <div key={field.id}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <label className="font-medium">{field.label}</label>
                      <p className="text-sm text-white/40">{field.description}</p>
                    </div>
                    <button
                      onClick={() => setShowTips({ ...showTips, [field.id]: !tipsOpen })}
                      className="flex items-center gap-1 text-xs text-white/40 hover:text-white/60 transition-colors"
                    >
                      <Lightbulb className="w-4 h-4" />
                      Tipps
                      {tipsOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  </div>

                  {/* Tips Panel */}
                  {tipsOpen && (
                    <div className="mb-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <div className="flex items-start gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-blue-400 mt-0.5" />
                        <span className="text-sm text-blue-300 font-medium">Tipps für dieses Feld</span>
                      </div>
                      <ul className="space-y-1 ml-6">
                        {field.tips.map((tip, i) => (
                          <li key={i} className="text-sm text-white/60 list-disc">{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <textarea
                    value={value}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    rows={6}
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 resize-none"
                  />

                  {/* Character Count & Status */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      {status === "good" && (
                        <span className="flex items-center gap-1 text-xs text-emerald-400">
                          <Check className="w-3 h-3" /> Passt
                        </span>
                      )}
                      {status === "short" && (
                        <span className="flex items-center gap-1 text-xs text-yellow-400">
                          <AlertCircle className="w-3 h-3" /> Noch {field.minChars - charCount} Zeichen benötigt
                        </span>
                      )}
                      {status === "long" && (
                        <span className="flex items-center gap-1 text-xs text-red-400">
                          <AlertCircle className="w-3 h-3" /> {charCount - field.maxChars} Zeichen zu viel
                        </span>
                      )}
                    </div>
                    <span className={`text-xs ${
                      status === "good" ? "text-emerald-400" :
                      status === "short" ? "text-yellow-400" :
                      status === "long" ? "text-red-400" :
                      "text-white/40"
                    }`}>
                      {charCount} / {field.minChars}-{field.maxChars} Zeichen
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/15 rounded-xl text-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück
          </button>

          <div className="flex items-center gap-2">
            {template.sections.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSection ? "bg-white w-4" : 
                  getSectionProgress(index) === 100 ? "bg-emerald-500" : "bg-white/20"
                }`}
              />
            ))}
          </div>

          {currentSection < template.sections.length - 1 ? (
            <button
              onClick={() => setCurrentSection(currentSection + 1)}
              className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-xl text-sm font-medium hover:bg-white/90 transition-colors"
            >
              Weiter
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={generateDocument}
              disabled={generating || totalProgress < 50}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition-colors disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              Dokument erstellen
            </button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
