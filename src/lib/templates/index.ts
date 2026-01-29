// Templates for different funding programs

export interface EditorField {
  id: string;
  label: string;
  description: string;
  placeholder: string;
  helpText: string;
  minChars: number;
  maxChars: number;
  tips: string[];
}

export interface ProgramTemplate {
  programId: string;
  programName: string;
  sections: {
    id: string;
    title: string;
    description: string;
    fields: EditorField[];
  }[];
}

// ZIM Template
export const zimTemplate: ProgramTemplate = {
  programId: "zim",
  programName: "ZIM - Zentrales Innovationsprogramm Mittelstand",
  sections: [
    {
      id: "problem",
      title: "Ausgangssituation & Problemstellung",
      description: "Beschreiben Sie den aktuellen Stand und das Problem, das gelöst werden soll.",
      fields: [
        {
          id: "currentState",
          label: "Aktuelle Situation",
          description: "Was ist der Ist-Zustand? Welches Problem besteht?",
          placeholder: "Beschreiben Sie die aktuelle Marktsituation und technische Ausgangslage...",
          helpText: "Erklären Sie, warum bestehende Lösungen nicht ausreichen.",
          minChars: 500,
          maxChars: 1500,
          tips: [
            "Beschreiben Sie konkrete Defizite bestehender Lösungen",
            "Nennen Sie messbare Probleme (Kosten, Zeit, Qualität)",
            "Vermeiden Sie zu allgemeine Aussagen"
          ]
        },
        {
          id: "marketNeed",
          label: "Marktbedarf",
          description: "Welchen Bedarf gibt es am Markt für Ihre Lösung?",
          placeholder: "Der Markt für... zeigt einen wachsenden Bedarf an...",
          helpText: "Belegen Sie den Bedarf mit Zahlen oder Quellen wenn möglich.",
          minChars: 300,
          maxChars: 1000,
          tips: [
            "Nennen Sie Marktgrößen oder Wachstumsraten",
            "Beschreiben Sie die Zielkunden",
            "Erklären Sie, warum der Bedarf jetzt besteht"
          ]
        }
      ]
    },
    {
      id: "innovation",
      title: "Innovationsgehalt",
      description: "Beschreiben Sie die technische Innovation und Neuheit Ihres Vorhabens.",
      fields: [
        {
          id: "innovationDescription",
          label: "Technische Innovation",
          description: "Was ist das technisch Neue an Ihrem Vorhaben?",
          placeholder: "Die Innovation besteht in...",
          helpText: "Grenzen Sie klar vom Stand der Technik ab.",
          minChars: 800,
          maxChars: 2000,
          tips: [
            "Beschreiben Sie den konkreten technischen Fortschritt",
            "Nennen Sie den aktuellen Stand der Technik",
            "Erklären Sie, was Ihr Ansatz anders/besser macht",
            "Vermeiden Sie: 'erstmalig', 'einzigartig' ohne Beleg"
          ]
        },
        {
          id: "novelty",
          label: "Neuheitsgrad",
          description: "Inwiefern geht Ihr Vorhaben über den Stand der Technik hinaus?",
          placeholder: "Im Vergleich zum aktuellen Stand der Technik...",
          helpText: "Referenzieren Sie Patente, Publikationen oder Wettbewerber.",
          minChars: 500,
          maxChars: 1500,
          tips: [
            "Führen Sie eine kurze Patentrecherche durch",
            "Nennen Sie vergleichbare Lösungen und deren Grenzen",
            "Quantifizieren Sie den Fortschritt wenn möglich"
          ]
        }
      ]
    },
    {
      id: "risk",
      title: "Technisches Risiko",
      description: "Erläutern Sie die technischen Herausforderungen und Risiken.",
      fields: [
        {
          id: "technicalChallenges",
          label: "Technische Herausforderungen",
          description: "Welche technischen Hürden müssen überwunden werden?",
          placeholder: "Die wesentlichen technischen Herausforderungen sind...",
          helpText: "ZIM fördert nur Projekte mit echtem technischem Risiko!",
          minChars: 500,
          maxChars: 1500,
          tips: [
            "Benennen Sie konkrete technische Unsicherheiten",
            "Erklären Sie, warum die Lösung nicht trivial ist",
            "Zeigen Sie, dass F&E-Arbeit notwendig ist",
            "Aber: Risiko muss beherrschbar erscheinen"
          ]
        },
        {
          id: "riskMitigation",
          label: "Lösungsansatz",
          description: "Wie wollen Sie diese Herausforderungen bewältigen?",
          placeholder: "Zur Bewältigung der Risiken planen wir...",
          helpText: "Zeigen Sie Ihre Kompetenz und Ihren Plan.",
          minChars: 300,
          maxChars: 1000,
          tips: [
            "Beschreiben Sie Ihren methodischen Ansatz",
            "Nennen Sie Fallback-Strategien",
            "Zeigen Sie relevante Vorarbeiten/Kompetenzen"
          ]
        }
      ]
    },
    {
      id: "workplan",
      title: "Arbeitsplan",
      description: "Strukturieren Sie Ihr Projekt in Arbeitspakete.",
      fields: [
        {
          id: "workPackages",
          label: "Arbeitspakete",
          description: "Gliedern Sie Ihr Projekt in 3-6 Arbeitspakete.",
          placeholder: "AP1: Konzeption und Spezifikation (Monat 1-3)\n- Aufgabe 1.1: ...\n- Aufgabe 1.2: ...\n\nAP2: Entwicklung Kernmodul (Monat 3-8)\n- Aufgabe 2.1: ...",
          helpText: "Jedes AP sollte klare Aufgaben und Meilensteine haben.",
          minChars: 800,
          maxChars: 3000,
          tips: [
            "3-6 Arbeitspakete sind üblich",
            "Jedes AP: Titel, Zeitraum, Aufgaben, Ergebnis",
            "Zeigen Sie logische Abhängigkeiten",
            "Planen Sie realistisch (12-24 Monate typisch)"
          ]
        },
        {
          id: "milestones",
          label: "Meilensteine",
          description: "Definieren Sie messbare Zwischenziele.",
          placeholder: "M1 (Monat 3): Spezifikation abgeschlossen\nM2 (Monat 8): Prototyp funktionsfähig\nM3 (Monat 12): Validierung abgeschlossen",
          helpText: "Meilensteine müssen überprüfbar sein.",
          minChars: 200,
          maxChars: 800,
          tips: [
            "3-5 Meilensteine für ein typisches Projekt",
            "Messbare Kriterien definieren",
            "Go/No-Go Entscheidungspunkte einbauen"
          ]
        }
      ]
    },
    {
      id: "utilization",
      title: "Verwertung",
      description: "Beschreiben Sie die geplante wirtschaftliche Nutzung der Ergebnisse.",
      fields: [
        {
          id: "utilizationPlan",
          label: "Verwertungsplan",
          description: "Wie wollen Sie die Ergebnisse wirtschaftlich nutzen?",
          placeholder: "Die Verwertung der Projektergebnisse erfolgt durch...",
          helpText: "Zeigen Sie den Weg vom F&E-Ergebnis zum Markterfolg.",
          minChars: 500,
          maxChars: 1500,
          tips: [
            "Beschreiben Sie Ihr Geschäftsmodell",
            "Nennen Sie Zielkunden und Vertriebswege",
            "Schätzen Sie Umsatzpotenziale",
            "Erklären Sie Ihre Wettbewerbsvorteile"
          ]
        }
      ]
    }
  ]
};

// Forschungszulage Template
export const fzulagTemplate: ProgramTemplate = {
  programId: "forschungszulage",
  programName: "Forschungszulage (FZulG)",
  sections: [
    {
      id: "project",
      title: "Projektbeschreibung",
      description: "Beschreiben Sie Ihr F&E-Vorhaben.",
      fields: [
        {
          id: "projectDescription",
          label: "Beschreibung des F&E-Vorhabens",
          description: "Was ist Gegenstand Ihres Forschungs- und Entwicklungsprojekts?",
          placeholder: "Das F&E-Vorhaben umfasst...",
          helpText: "Beschreiben Sie Ziele, Inhalte und erwartete Ergebnisse.",
          minChars: 500,
          maxChars: 2000,
          tips: [
            "Klar zwischen Forschung und Entwicklung unterscheiden",
            "Konkrete Ziele benennen",
            "Zeitraum und Umfang angeben"
          ]
        }
      ]
    },
    {
      id: "rdCriteria",
      title: "F&E-Kriterien",
      description: "Weisen Sie nach, dass es sich um förderfähige F&E handelt.",
      fields: [
        {
          id: "novelty",
          label: "Neuheit",
          description: "Inwiefern zielt das Vorhaben auf neue Erkenntnisse ab?",
          placeholder: "Das Vorhaben zielt auf neue Erkenntnisse ab, weil...",
          helpText: "Neu = nicht aus bestehendem Wissen ableitbar.",
          minChars: 300,
          maxChars: 1000,
          tips: [
            "Abgrenzung zum Stand der Technik",
            "Was ist das Neue/Unbekannte?",
            "Nicht: Anpassung bestehender Lösungen"
          ]
        },
        {
          id: "creativity",
          label: "Kreativität / Nicht-Offensichtlichkeit",
          description: "Warum ist die Lösung nicht offensichtlich?",
          placeholder: "Die Lösung erfordert kreative Leistung, da...",
          helpText: "Zeigen Sie, dass echte F&E-Arbeit nötig ist.",
          minChars: 300,
          maxChars: 1000,
          tips: [
            "Technische Herausforderungen benennen",
            "Warum gibt es die Lösung noch nicht?",
            "Welche Expertise ist erforderlich?"
          ]
        },
        {
          id: "uncertainty",
          label: "Unsicherheit",
          description: "Welche technischen Unsicherheiten bestehen?",
          placeholder: "Es bestehen Unsicherheiten hinsichtlich...",
          helpText: "F&E hat per Definition ein Ergebnis, das nicht feststeht.",
          minChars: 300,
          maxChars: 1000,
          tips: [
            "Technische Risiken benennen",
            "Ergebnis ist nicht vorhersagbar",
            "Mehrere Lösungswege möglich"
          ]
        },
        {
          id: "systematic",
          label: "Systematik",
          description: "Wie gehen Sie systematisch vor?",
          placeholder: "Das Vorhaben wird systematisch durchgeführt durch...",
          helpText: "Dokumentierte, planmäßige Vorgehensweise.",
          minChars: 200,
          maxChars: 800,
          tips: [
            "Projektplan vorhanden",
            "Dokumentation der Ergebnisse",
            "Qualifiziertes Personal"
          ]
        },
        {
          id: "transferability",
          label: "Übertragbarkeit",
          description: "Sind die Ergebnisse übertragbar/reproduzierbar?",
          placeholder: "Die Ergebnisse sind übertragbar, da...",
          helpText: "Ergebnisse müssen anderen zugänglich gemacht werden können.",
          minChars: 200,
          maxChars: 800,
          tips: [
            "Dokumentation ermöglicht Nachvollziehbarkeit",
            "Ergebnisse können publiziert werden",
            "Know-how ist übertragbar"
          ]
        }
      ]
    },
    {
      id: "costs",
      title: "Förderfähige Aufwendungen",
      description: "Beschreiben Sie die F&E-bezogenen Personalkosten.",
      fields: [
        {
          id: "personnel",
          label: "Personalaufwand",
          description: "Welche Mitarbeiter arbeiten wie viel am F&E-Projekt?",
          placeholder: "Am Projekt arbeiten:\n- [Name/Funktion]: X% der Arbeitszeit\n- [Name/Funktion]: Y% der Arbeitszeit",
          helpText: "Nur eigenes Personal, keine Fremdleistungen.",
          minChars: 200,
          maxChars: 1000,
          tips: [
            "Prozentuale Zuordnung zum Projekt",
            "Nur F&E-Tätigkeiten, nicht Administration",
            "Arbeitnehmer im Inland",
            "Dokumentation der Stunden empfohlen"
          ]
        }
      ]
    }
  ]
};

// Digitalbonus Bayern Template
export const digitalbonusBayernTemplate: ProgramTemplate = {
  programId: "digitalbonus-bayern",
  programName: "Digitalbonus Bayern",
  sections: [
    {
      id: "status",
      title: "Ausgangssituation",
      description: "Beschreiben Sie den aktuellen Digitalisierungsstand.",
      fields: [
        {
          id: "currentState",
          label: "Ist-Zustand",
          description: "Wie ist der aktuelle Stand der Digitalisierung in Ihrem Unternehmen?",
          placeholder: "Aktuell nutzen wir...",
          helpText: "Seien Sie ehrlich über Defizite.",
          minChars: 300,
          maxChars: 1000,
          tips: [
            "Welche Systeme/Prozesse sind veraltet?",
            "Wo entstehen Ineffizienzen?",
            "Was fehlt für die Wettbewerbsfähigkeit?"
          ]
        },
        {
          id: "targetState",
          label: "Soll-Zustand",
          description: "Wie sieht der gewünschte Zustand nach dem Projekt aus?",
          placeholder: "Nach Abschluss des Projekts...",
          helpText: "Beschreiben Sie konkrete Verbesserungen.",
          minChars: 300,
          maxChars: 1000,
          tips: [
            "Messbare Ziele definieren",
            "Welche neuen Fähigkeiten?",
            "Welche Prozesse werden verbessert?"
          ]
        }
      ]
    },
    {
      id: "project",
      title: "Digitalisierungsvorhaben",
      description: "Beschreiben Sie Ihr geplantes Projekt.",
      fields: [
        {
          id: "projectDescription",
          label: "Projektbeschreibung",
          description: "Was genau wollen Sie umsetzen?",
          placeholder: "Das Digitalisierungsprojekt umfasst...",
          helpText: "Konkrete Maßnahmen und Investitionen.",
          minChars: 500,
          maxChars: 1500,
          tips: [
            "Hardware und/oder Software benennen",
            "Implementierungsschritte beschreiben",
            "Schulungsbedarf berücksichtigen"
          ]
        },
        {
          id: "benefits",
          label: "Erwarteter Nutzen",
          description: "Welchen Nutzen erwarten Sie?",
          placeholder: "Durch das Projekt erwarten wir...",
          helpText: "Quantifizieren Sie wenn möglich.",
          minChars: 300,
          maxChars: 1000,
          tips: [
            "Zeitersparnis in Stunden/Woche",
            "Kostenreduktion in Euro",
            "Qualitätsverbesserungen",
            "Neue Geschäftsmöglichkeiten"
          ]
        }
      ]
    },
    {
      id: "investment",
      title: "Investitionsplan",
      description: "Listen Sie die geplanten Investitionen auf.",
      fields: [
        {
          id: "investments",
          label: "Geplante Investitionen",
          description: "Welche Investitionen planen Sie?",
          placeholder: "1. [Produkt/Dienstleistung]: € X.XXX\n2. [Produkt/Dienstleistung]: € X.XXX\n\nGesamt: € XX.XXX",
          helpText: "Alle förderfähigen Kosten auflisten.",
          minChars: 200,
          maxChars: 1500,
          tips: [
            "IT-Hardware (Server, Computer)",
            "Software und Lizenzen",
            "IT-Sicherheit",
            "Externe Dienstleistungen",
            "Keine laufenden Kosten!"
          ]
        }
      ]
    }
  ]
};

// Template registry
export const programTemplates: Record<string, ProgramTemplate> = {
  "zim": zimTemplate,
  "forschungszulage": fzulagTemplate,
  "digitalbonus-bayern": digitalbonusBayernTemplate,
};

// Get template by program ID (fuzzy match)
export function getTemplateForProgram(programId: string): ProgramTemplate | null {
  // Direct match
  if (programTemplates[programId]) {
    return programTemplates[programId];
  }
  
  // Fuzzy match
  const lowerProgramId = programId.toLowerCase();
  if (lowerProgramId.includes("zim")) return zimTemplate;
  if (lowerProgramId.includes("forschungszulage") || lowerProgramId.includes("fzul")) return fzulagTemplate;
  if (lowerProgramId.includes("digitalbonus") && lowerProgramId.includes("bayern")) return digitalbonusBayernTemplate;
  
  // Default to ZIM as most comprehensive
  return zimTemplate;
}
