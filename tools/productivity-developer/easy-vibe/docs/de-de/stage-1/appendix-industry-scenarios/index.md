---
title: 'B2B-Branchenszenarien - Inspirationsreferenz'
description: 'Dieses Dokument sammelt praktische LLM-Anwendungen fuer B2B-Unternehmensszenarien, darunter Fertigung, intelligenter Kundenservice, Bildung, Programmierung, Gesundheitswesen, Cybersicherheit, Finanzdienstleistungen und Unternehmensservices. Es dient als Referenz fuer Entwickler von AI-Anwendungen im B2B-Bereich.'
---

<script setup>
import { computed, ref } from 'vue'

const duration = 'ca. <strong>6 Stunden</strong>'

const interestPoint = ref('')
const purpose = ref('')

const topicPool = {
  manufacturing: [
    { title: 'AI-gestuetzte Designplattform', desc: 'Konzeptdesign fuer Produktoptik mit Bildgenerierungsmodellen' },
    { title: 'Intelligenter Assistent fuer Zeichnungspruefung', desc: 'Designnormen mit RAG als Wissensbasis nutzbar machen' },
    { title: 'Automatische technische Dokumentation', desc: 'Spezifikationen und Handbuecher mit LLM erzeugen' },
    { title: 'Automatische Anlagen-Inspektionsberichte', desc: 'Sprachbeschreibung in strukturierte Berichte umwandeln' },
    { title: 'Q&A fuer Industrieanlagen-Fehlerdiagnose', desc: 'Historische Fehlerfaelle als Vektor-Wissensbasis nutzen' }
  ],
  'customer-service': [
    { title: 'Multikanal-Kundenservice mit Auto-Antworten', desc: 'Nachrichten verstehen, Antworten erzeugen und Tickets anlegen' },
    { title: 'Lead-Erkennung und Follow-up-Empfehlungen', desc: 'Dialoghistorien analysieren und Kaufabsicht bewerten' },
    { title: 'Interner Wissens-Q&A-Assistent', desc: 'Interne Dokumente als RAG-Wissensbasis erschliessen' },
    { title: 'Gespraechszusammenfassung und Ticket-Erstellung', desc: 'Kerninformationen extrahieren und Felder automatisch fuellen' },
    { title: 'Best-Practice-Skript-Wissensbasis', desc: 'Erfolgreiche Servicefaelle in Skriptvorlagen verdichten' }
  ],
  education: [
    { title: 'Personalisierter Sprachlernpfad', desc: 'Lernniveau einschaetzen und taegliche Aufgaben planen' },
    { title: 'Automatische Unterrichtsentwuerfe', desc: 'Aus Lehrplaenen Unterrichtsrahmen und Ressourcen erzeugen' },
    { title: 'Automatische Korrektur und Lernanalyse', desc: 'Subjektive Aufgaben bewerten und Hinweise geben' },
    { title: 'Kompetenzmodell und Lernlandkarte', desc: 'Stellenanforderungen in Lernpfade uebersetzen' },
    { title: 'Fremdsprachen-Szenariotraining', desc: 'LLM spielt Rollen fuer muendliche Uebungen' }
  ],
  programming: [
    { title: 'Code-Vervollstaendigung und Bug-Fix', desc: 'IDE-Plugin liefert Vorschlaege und Reparaturen' },
    { title: 'Low-Code-App-Bau und Automatisierung', desc: 'Natuerliche Sprache in Low-Code-Konfigurationen umwandeln' },
    { title: 'Unit-Test-Generator', desc: 'Code per AST analysieren und Grenzfaelle erzeugen' },
    { title: 'Code-Analyse und Sprachmigration', desc: 'Qualitaet pruefen und Migrationsvorschlaege geben' },
    { title: 'Frontend-UI-Codegenerierung', desc: 'Designbilder erkennen und responsives CSS erzeugen' }
  ],
  healthcare: [
    { title: 'Intelligente Laborbefund-Interpretation', desc: 'Kennzahlen per OCR erkennen und Auffaelligkeiten erklaeren' },
    { title: 'Gesundheitsberatung mit Wissens-Retrieval', desc: 'Medizinische Wissensgraphen und RAG fuer Antworten nutzen' },
    { title: 'Datenanalyse fuer klinische Forschung', desc: 'EMR-Daten integrieren und Auswertungscode unterstuetzen' },
    { title: 'Automatische Bildbefunde', desc: 'Bildmerkmale in strukturierte Berichte ueberfuehren' },
    { title: 'Medikationsassistent fuer chronische Krankheiten', desc: 'Erinnerungen erzeugen und Kontraindikationen pruefen' }
  ],
  security: [
    { title: 'Code-Sicherheitsluecken erkennen und beheben', desc: 'SAST-Ergebnisse mit LLM erklaeren und Fixes vorschlagen' },
    { title: 'AI-Phishing-Mail-Erkennung', desc: 'Mailinhalte, Absender und Links auf Risiken pruefen' },
    { title: 'Automatische Security-Tagesberichte', desc: 'Logs zusammenfassen und Schluesselereignisse extrahieren' },
    { title: 'Penetrationstest-Berichtsgenerator', desc: 'Schwachstellenbeschreibungen in Berichte umwandeln' },
    { title: 'Threat-Intelligence-Analyse', desc: 'Mehrere Quellen anbinden und Auswirkungen bewerten' }
  ],
  finance: [
    { title: 'Kredit-Due-Diligence-Berichte', desc: 'Finanzdaten analysieren und Risikoberichte erzeugen' },
    { title: 'Private-Banking-Vermoegensberater', desc: 'Risikoprofil analysieren und Allokation empfehlen' },
    { title: 'IPO-Prospekt und Compliance-Pruefung', desc: 'Vorlagen fuellen und Konsistenz pruefen' },
    { title: 'Finanzbericht und Anomaliewarnung', desc: 'Finanzanalyse automatisieren und Abweichungen markieren' },
    { title: 'Training fuer Versicherungsagenten', desc: 'Kundendialoge simulieren und Skripte bewerten' }
  ],
  enterprise: [
    { title: 'Compliance-Pruefung im Vertragslebenszyklus', desc: 'Klauseln mit Regeln vergleichen und Aenderungen vorschlagen' },
    { title: 'Verkaufsgespraech-Transkription', desc: 'ASR nutzen und passende Skripte empfehlen' },
    { title: 'Marketing-Content und Design', desc: 'Verkaufstexte und Kernargumente erzeugen' },
    { title: 'Analyse von Wettbewerber-Werbung', desc: 'Anzeigen sammeln und Platzierungsstrategien auswerten' },
    { title: 'Netzweite Trendanalyse', desc: 'Hot Topics erkennen und Themenwinkel empfehlen' }
  ],
  content: [
    { title: 'Assistenz fuer Film- und Romaninhalte', desc: 'Outline, Figuren und Dialoge erzeugen' },
    { title: 'Markengeschichte und PR-Artikel', desc: 'Markenkeywords in mehrere Textstile uebersetzen' },
    { title: 'Virtueller Avatar fuer Livestreams', desc: 'Digitaler Mensch, TTS und LLM-Dialog kombinieren' },
    { title: 'Short-Video-Skript und Schnitt', desc: 'Skripte, Storyboards und Schnittvorschlaege erzeugen' },
    { title: 'Marketing-Content-System', desc: 'Copy und Selling Points strukturiert generieren' }
  ],
  government: [
    { title: 'Buergerhotline mit Sprachdialog und Dispatch', desc: 'Anliegen erkennen und automatisch weiterleiten' },
    { title: 'Service-Wegweiser und Politik-Q&A', desc: 'Verwaltungswissen per RAG abrufbar machen' },
    { title: 'Foerderpolitik-Matching', desc: 'Unternehmensprofile mit passenden Programmen abgleichen' },
    { title: 'Vorpruefung von Verwaltungsunterlagen', desc: 'Dokumente per OCR erkennen und Vollstaendigkeit pruefen' },
    { title: 'Stadt-Grid-Ereignismanagement', desc: 'Ereignistypen erkennen und Einsatzstellen zuteilen' }
  ],
  legal: [
    { title: 'Agent fuer Vertragsrisiken', desc: 'Klauseln mit Risikolisten vergleichen und markieren' },
    { title: 'AI-Berater fuer Gewinnwahrscheinlichkeit', desc: 'Fallmerkmale extrahieren und aehnliche Faelle finden' },
    { title: 'Monitoring von Gesetzesaenderungen', desc: 'Aenderungen auswerten und Auswirkungen analysieren' },
    { title: 'AIGC-Entwurf fuer Anwaltsschreiben', desc: 'Sachverhalte in standardisierte Schreiben ueberfuehren' },
    { title: 'Rechtsklauseln in Alltagssprache', desc: 'Komplexe Klauseln verstaendlich erklaeren' }
  ],
  travel: [
    { title: 'AIGC-Reisefuehrer-Generator', desc: 'Aus Praeferenzen Tagesplaene erzeugen' },
    { title: 'Flug- und Hotelpreisprognose', desc: 'OTA-Daten sammeln und Preistrends vorhersagen' },
    { title: 'Reiseplan-Reorganisation bei Flugausfall', desc: 'Alternativen analysieren und Notfallplaene empfehlen' },
    { title: 'Visa-Unterlagen-Pruefung', desc: 'Fotos per OCR auswerten und Formulare fuellen' },
    { title: 'Sprach- und Menueuebersetzung auf Reisen', desc: 'Offline-Sprache und Menuebilder uebersetzen' }
  ],
  emotion: [
    { title: 'Virtueller 24-Stunden-Begleiter', desc: 'Gespraechshistorie merken und empathisch antworten' },
    { title: 'Multimodale Emotionserkennung', desc: 'Stimme und Text fuer Unterstuetzung auswerten' },
    { title: 'Kognitives Training fuer Alzheimer', desc: 'Spiele und Erinnerungsimpulse kombinieren' },
    { title: 'Sozialtraining bei sozialer Angst', desc: 'Szenarien simulieren und Tipps geben' },
    { title: 'Stimmungsmonitoring und positive Impulse', desc: 'Trends erkennen und ermutigende Inhalte erzeugen' }
  ],
  entertainment: [
    { title: 'Open-World-NPC-Entscheidungsengine', desc: 'Verhaltensbaeume mit LLM-Entscheidungen kombinieren' },
    { title: 'Murder-Mystery-DM-Assistent', desc: 'Spielerentscheidungen in Handlungszweige uebersetzen' },
    { title: 'Interaktive Romanenden', desc: 'Leserentscheidungen generieren neue Enden' },
    { title: 'E-Sport-Analyse und AI-Kommentar', desc: 'Spielbilder analysieren und Kommentare erzeugen' },
    { title: 'Mehrrollen-TTS-Hoerbuch', desc: 'Textrollen verteilen und Stimmen erzeugen' }
  ],
  ecommerce: [
    { title: 'Produktdetailseiten in hoher Konversion', desc: 'Selling Points und Szenenbeschreibungen erzeugen' },
    { title: 'Virtuelle Kleidermodelle und Try-on', desc: 'Anprobeeffekte und Praesentationsvideos generieren' },
    { title: 'Mehrsprachige E-Commerce-Lokalisierung', desc: 'Produkttexte uebersetzen und kulturell polieren' },
    { title: 'Digitaler Livestream-Verkauf', desc: 'Avatar, Echtzeit-Skript und Produktdaten verbinden' },
    { title: 'Trend-Insight und Bestseller-Prognose', desc: 'Social- und Shopdaten fuer Produktauswahl auswerten' }
  ],
  energy: [
    { title: 'Stromverbrauchsanalyse im Haushalt', desc: 'Verbrauchsmuster erkennen und Sparstrategien ableiten' },
    { title: 'PV-Defekterkennung per Drohne', desc: 'Thermische Bilder analysieren und Defekte markieren' },
    { title: 'Strompreisprognose und Handelsstrategie', desc: 'Preise vorhersagen und Strategien erzeugen' },
    { title: 'CO2-Footprint und ESG-Bericht', desc: 'Emissionsfaktoren berechnen und Berichte erstellen' },
    { title: 'Lastprognose bei Extremwetter', desc: 'Wetterdaten anbinden und Notfalldispatch planen' }
  ],
  'av-media': [
    { title: 'Highlight-Erkennung und Short-Video-Schnitt', desc: 'Keyframes finden und Clips automatisch schneiden' },
    { title: 'Rauschtrennung und Stimmverstaerkung', desc: 'Audio separieren und Sprache verbessern' },
    { title: '4K-Restauration alter Aufnahmen', desc: 'Super-Resolution und Kolorierung einsetzen' },
    { title: 'Realistische TTS-Synchronisation', desc: 'Mehrstimmige TTS mit Emotionssteuerung nutzen' },
    { title: 'Meeting-Transkription und To-do-Extraktion', desc: 'Sprecher trennen und Aufgaben extrahieren' }
  ],
  'ai-marketing': [
    { title: 'Virale Social-Copy mit AIGC', desc: 'Themen, Emojis und Hashtags optimieren' },
    { title: 'Marketing-Poster mit AI-Layout', desc: 'Poster automatisch an Formate anpassen' },
    { title: 'Markenlogo und VI-System', desc: 'Logoideen und visuelle Regeln generieren' },
    { title: 'Trend-Hunting fuer Marketingideen', desc: 'Hot Topics finden und kreative Winkel ableiten' },
    { title: 'Short-Video-Skript und Storyboard', desc: 'Skripte, Shots und Drehhinweise erzeugen' }
  ],
  'data-intelligence': [
    { title: 'Natural-Language-to-SQL', desc: 'Natuerliche Sprache in SQL-Abfragen umwandeln' },
    { title: 'Datenasset-Katalog und Klassifikation', desc: 'Metadaten sammeln und automatisch klassifizieren' },
    { title: 'Datenqualitaets-Anomalien', desc: 'Regeln und ML fuer Erkennung und Reparaturhinweise nutzen' },
    { title: 'Intelligente Berichte und Visualisierung', desc: 'Berichte dialogisch konfigurieren' },
    { title: 'Q&A fuer Datenkennzahlen', desc: 'Kennzahlendefinitionen als Wissensbasis nutzen' }
  ]
}

const recommendationMap = {
  'creative-content': {
    'increase-efficiency': ['content', 'av-media', 'ai-marketing', 'entertainment'],
    'reduce-cost': ['content', 'ecommerce', 'ai-marketing'],
    'improve-experience': ['entertainment', 'emotion', 'travel', 'content'],
    'innovate-business': ['ai-marketing', 'content', 'av-media', 'entertainment']
  },
  'tech-service': {
    'increase-efficiency': ['programming', 'enterprise', 'data-intelligence', 'customer-service'],
    'reduce-cost': ['programming', 'enterprise', 'manufacturing'],
    'improve-experience': ['customer-service', 'enterprise', 'programming'],
    'innovate-business': ['data-intelligence', 'programming', 'security', 'enterprise']
  },
  'data-intel': {
    'increase-efficiency': ['data-intelligence', 'finance', 'enterprise', 'manufacturing'],
    'reduce-cost': ['data-intelligence', 'manufacturing', 'energy'],
    'improve-experience': ['data-intelligence', 'customer-service', 'ecommerce'],
    'innovate-business': ['data-intelligence', 'finance', 'security', 'ai-marketing']
  },
  'user-service': {
    'increase-efficiency': ['customer-service', 'ecommerce', 'travel', 'enterprise'],
    'reduce-cost': ['customer-service', 'ecommerce', 'enterprise'],
    'improve-experience': ['customer-service', 'emotion', 'travel', 'ecommerce', 'entertainment'],
    'innovate-business': ['ecommerce', 'travel', 'emotion', 'entertainment']
  },
  'industry-solution': {
    'increase-efficiency': ['manufacturing', 'healthcare', 'finance', 'government'],
    'reduce-cost': ['manufacturing', 'energy', 'enterprise', 'finance'],
    'improve-experience': ['healthcare', 'education', 'government', 'travel'],
    'innovate-business': ['finance', 'security', 'legal', 'healthcare', 'government']
  }
}

const interestOptions = [
  { label: 'Kreative Inhalte', value: 'creative-content', desc: 'Texte, Bilder, Videos und andere Inhalte' },
  { label: 'Technische Services', value: 'tech-service', desc: 'Entwicklungstools, Automatisierung, Code-Assistenz' },
  { label: 'Datenintelligenz', value: 'data-intel', desc: 'Analyse, Prognose und Entscheidungsunterstuetzung' },
  { label: 'Nutzerservice', value: 'user-service', desc: 'Kundenservice, Marketing und Nutzererlebnis' },
  { label: 'Branchenloesungen', value: 'industry-solution', desc: 'Tiefe Anwendungen fuer konkrete Branchen' }
]

const purposeOptions = [
  { label: 'Effizienz steigern', value: 'increase-efficiency', desc: 'Automatisieren und Prozesse beschleunigen' },
  { label: 'Kosten senken', value: 'reduce-cost', desc: 'Personalaufwand und Ressourcenverbrauch reduzieren' },
  { label: 'Erlebnis verbessern', value: 'improve-experience', desc: 'Servicequalitaet und Zufriedenheit erhoehen' },
  { label: 'Geschaeft erneuern', value: 'innovate-business', desc: 'Neue Produkte und neue Modelle erkunden' }
]

const industries = [
  { key: 'manufacturing', name: 'Industriefertigung', anchor: '#_1-industriefertigung' },
  { key: 'customer-service', name: 'Intelligenter Kundenservice', anchor: '#_2-intelligenter-kundenservice' },
  { key: 'education', name: 'Bildungswesen', anchor: '#_3-bildungswesen' },
  { key: 'programming', name: 'Intelligentes Programmieren', anchor: '#_4-intelligentes-programmieren' },
  { key: 'healthcare', name: 'Gesundheitswesen', anchor: '#_5-gesundheitswesen' },
  { key: 'security', name: 'Cybersicherheit', anchor: '#_6-cybersicherheit' },
  { key: 'finance', name: 'Finanzen und Versicherung', anchor: '#_7-finanzen-und-versicherung' },
  { key: 'enterprise', name: 'Unternehmensservices', anchor: '#_8-unternehmensservices' },
  { key: 'content', name: 'Content-Produktion und Betrieb', anchor: '#_9-content-produktion-und-betrieb' },
  { key: 'government', name: 'Smart Government', anchor: '#_10-smart-government' },
  { key: 'legal', name: 'Recht und Vertragsmanagement', anchor: '#_11-recht-und-vertragsmanagement' },
  { key: 'travel', name: 'Reise und Mobilitaet', anchor: '#_12-reise-und-mobilitaet' },
  { key: 'emotion', name: 'Emotionale Begleitung', anchor: '#_13-emotionale-begleitung' },
  { key: 'entertainment', name: 'Unterhaltung und Freizeit', anchor: '#_14-unterhaltung-und-freizeit' },
  { key: 'ecommerce', name: 'E-Commerce Services', anchor: '#_15-e-commerce-services' },
  { key: 'energy', name: 'Energie', anchor: '#_16-energie' },
  { key: 'av-media', name: 'Audio und Video', anchor: '#_17-audio-und-video' },
  { key: 'ai-marketing', name: 'AI-Marketing', anchor: '#_18-ai-marketing' },
  { key: 'data-intelligence', name: 'Datenintelligenz', anchor: '#_19-datenintelligenz' }
]

const recommendationTopics = computed(() => {
  if (!interestPoint.value || !purpose.value) return []

  const keys = recommendationMap[interestPoint.value]?.[purpose.value] || []
  const topics = []

  keys.forEach(key => {
    const industry = industries.find(item => item.key === key)
    const industryTopics = topicPool[key] || []

    if (industry && industryTopics.length > 0) {
      const count = Math.floor(Math.random() * 2) + 1
      const shuffled = [...industryTopics].sort(() => Math.random() - 0.5)
      const selected = shuffled.slice(0, Math.min(count, shuffled.length))

      selected.forEach(topic => {
        topics.push({
          ...topic,
          industryKey: key,
          industryName: industry.name,
          industryAnchor: industry.anchor
        })
      })
    }
  })

  return topics.sort(() => Math.random() - 0.5).slice(0, 8)
})

const currentSelection = computed(() => {
  const interest = interestOptions.find(i => i.value === interestPoint.value)
  const pur = purposeOptions.find(p => p.value === purpose.value)
  return {
    interest: interest?.label || '',
    purpose: pur?.label || ''
  }
})

const scrollToAnchor = (anchor) => {
  setTimeout(() => {
    let element = document.querySelector(anchor)

    if (!element) {
      const altAnchor = anchor.replace('#_', '#')
      element = document.querySelector(altAnchor)
    }

    if (!element) {
      const anchorText = decodeURIComponent(anchor.replace('#', '').replace(/^_/, ''))
      const headings = document.querySelectorAll('h2, h3')

      for (let heading of headings) {
        const headingText = heading.textContent.trim()
        const cleanHeading = headingText.replace(/^\d+\.\s*/, '')
        if (cleanHeading === anchorText || headingText.includes(anchorText)) {
          element = heading
          break
        }
      }
    }

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
      element.style.backgroundColor = '#f0f9ff'
      element.style.transition = 'background-color 0.3s'
      element.style.padding = '8px'
      element.style.borderRadius = '4px'
      setTimeout(() => {
        element.style.backgroundColor = ''
        element.style.padding = ''
      }, 2000)
    }
  }, 100)
}

const resetSelection = () => {
  interestPoint.value = ''
  purpose.value = ''
}
</script>

# B2B-Branchenszenarien - Inspirationsreferenz

## Kapiteluebersicht

<ChapterIntroduction :duration="duration" :tags="['B2B-Anwendungen', 'Industrie', 'AI-Szenarien', 'Umsetzung', 'Branchenloesungen']" coreOutput="15+ B2B-Branchenszenarien verstehen" expectedOutput="Eine passende Richtung fuer Unternehmenskunden finden">

Dieses Dokument sammelt <strong>praktische LLM-Anwendungen in B2B-Unternehmensszenarien</strong>. Im Unterschied zu B2C-Produkten stehen hier reale Geschaeftsprobleme, Effizienzsteigerung, Kostensenkung und Prozesssicherheit im Vordergrund. Die Beispiele helfen dabei, von der Anforderungsanalyse bis zur technischen Umsetzung konkrete Projektideen zu finden.

</ChapterIntroduction>

## Branchenschnellauswahl

<el-card shadow="hover" style="margin-top: 16px; margin-bottom: 24px; border-left: 5px solid #409EFF;">
  <div style="font-weight: 600; margin-bottom: 8px;">Passende Anwendungsszenarien finden</div>
  <div style="color: #606266; font-size: 14px; line-height: 1.6; margin-bottom: 12px;">
    Waehlen Sie Interessengebiet und Ziel. Das System empfiehlt passende Branchenrichtungen; ein Klick auf eine Zeile springt direkt zum Abschnitt.
  </div>
  <el-row :gutter="16">
    <el-col :span="12">
      <el-select v-model="interestPoint" placeholder="Interessengebiet waehlen" style="width: 100%;">
        <el-option v-for="item in interestOptions" :key="item.value" :label="item.label" :value="item.value">
          <div style="display: flex; flex-direction: column;">
            <span>{{ item.label }}</span>
            <span style="font-size: 12px; color: #909399;">{{ item.desc }}</span>
          </div>
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="12">
      <el-select v-model="purpose" placeholder="Ziel waehlen" style="width: 100%;">
        <el-option v-for="item in purposeOptions" :key="item.value" :label="item.label" :value="item.value">
          <div style="display: flex; flex-direction: column;">
            <span>{{ item.label }}</span>
            <span style="font-size: 12px; color: #909399;">{{ item.desc }}</span>
          </div>
        </el-option>
      </el-select>
    </el-col>
  </el-row>

  <div v-if="recommendationTopics.length > 0" style="margin-top: 16px;">
    <div style="font-weight: 600; margin-bottom: 10px; color: #409EFF;">
      Empfohlen: {{ recommendationTopics.length }} Anwendungsszenarien
      <span style="font-weight: normal; color: #909399; font-size: 13px; margin-left: 8px;">
        ({{ currentSelection.interest }} + {{ currentSelection.purpose }})
      </span>
    </div>
    <el-table :data="recommendationTopics" style="width: 100%; cursor: pointer;" @row-click="(row) => scrollToAnchor(row.industryAnchor)" highlight-current-row>
      <el-table-column prop="title" label="Anwendungsszenario" min-width="300">
        <template #default="scope">
          <div style="font-weight: 500; color: #303133;">{{ scope.row.title }}</div>
          <div style="font-size: 12px; color: #909399; margin-top: 4px;">{{ scope.row.desc }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="industryName" label="Branche" width="180" align="center">
        <template #default="scope">
          <el-tag type="info" effect="light" size="small">{{ scope.row.industryName }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 10px; font-size: 12px; color: #909399;">
      Klicken Sie auf eine Tabellenzeile, um zum passenden Branchenkapitel zu springen.
    </div>
  </div>

  <div v-else-if="!interestPoint || !purpose" style="margin-top: 14px; color: #909399; font-size: 13px;">
    <span v-if="!interestPoint && !purpose">Bitte Interessengebiet und Ziel waehlen.</span>
    <span v-else-if="!interestPoint">Bitte Interessengebiet waehlen.</span>
    <span v-else>Bitte Ziel waehlen.</span>
  </div>

  <div v-if="interestPoint || purpose" style="margin-top: 12px;">
    <el-button size="small" @click="resetSelection">Auswahl zuruecksetzen</el-button>
  </div>
</el-card>

## Branchenschnellvorstellung

### Gängige Technologieauswahl

In AI-Anwendungsprojekten tauchen besonders haeufig drei technische Richtungen auf:

1. **LLM**: gut fuer Sprache, Dialoge, Zusammenfassungen, Textgenerierung, Uebersetzung und Wissens-Q&A.
2. **VLM**: verbindet Bildverstehen und Sprache, etwa fuer Bildbeschreibung, visuelle Q&A, Medizinbilder, Qualitaetspruefung und Design.
3. **GenAI**: erzeugt Texte, Bilder, Audio oder Video und eignet sich fuer Designassistenz, Marketingmaterial, Training und Content-Produktion.

### Auswahlstrategie

Wählen Sie eine Richtung nicht nur nach Trend, sondern nach drei praktischen Kriterien:

1. **Interesse**: Wer sich fuer Design interessiert, kann Content oder Industriedesign testen; wer technische Tiefe sucht, kann Security, Medizin oder Entwicklungswerkzeuge waehlen.
2. **Branchennaehe**: Eigene Ressourcen senken die Einstiegskosten. Fertigung, Bildung, Medizin, Handel oder Verwaltung liefern jeweils andere Daten, Workflows und Fachwoerter.
3. **Schwierigkeit**: Einsteiger starten mit Kundenservice, Content oder einfachen Q&A-Systemen; Fortgeschrittene koennen Qualitaetspruefung, medizinische Bildanalyse oder Code-Assistenz bearbeiten.

## 1. Industriefertigung

Fertigungsszenarien drehen sich um Design, Produktion, Qualitaetspruefung und Wartung. AI kann Informationen strukturieren, wiederkehrende Dokumente erzeugen und Expertenwissen leichter nutzbar machen.

| Nr. | Anwendungsszenario | Umsetzungsreferenz |
| :--: | --- | --- |
| 1 | AI-gestuetzte Designplattform | Bildmodelle erzeugen Konzepte; LLM prueft Designregeln; Three.js zeigt 3D-Ansichten. |
| 2 | Zeichnungspruefungsassistent | CAD-Daten analysieren; RAG greift auf Konstruktionsnormen zu. |
| 3 | Technische Dokumentation | Produktdatenbank plus LLM erzeugt Spezifikationen und Handbuecher. |
| 4 | Anlagen-Inspektionsbericht | Spracheingabe wird transkribiert und als strukturierter Bericht gespeichert. |
| 5 | Stapler-Dispatch und Routenplanung | Auftraege, Lagerorte und Karten-API erzeugen optimale Fahrwege. |
| 6 | Datenabfrage per natuerlicher Sprache | Text-to-SQL fragt OLAP-Systeme wie Doris oder ClickHouse ab. |
| 7 | Fehlerdiagnose-Q&A | Historische Stoerfaelle werden als Vektorwissen abgefragt. |
| 8 | Qualitaetspruefbericht | OCR und CV erkennen Defekte; LLM erzeugt Bericht und Klassifikation. |
| 9 | Inventurassistent | Bestandsdaten werden abgeglichen; Abweichungen und Warnungen entstehen automatisch. |
| 10 | Prozessoptimierungs-Q&A | Produktionswissen wird per RAG erschlossen und in Verbesserungsvorschlaege ueberfuehrt. |

## 2. Intelligenter Kundenservice

Kundenservice profitiert stark von LLM, weil viel Kommunikation, Zusammenfassung, Klassifikation und Wissenssuche anfallen.

| Nr. | Anwendungsszenario | Umsetzungsreferenz |
| :--: | --- | --- |
| 1 | Multikanal-Auto-Antworten | Website, App und Messenger anbinden; LLM erkennt Absicht und erstellt Tickets. |
| 2 | Lead-Erkennung | Dialoge analysieren, Kaufabsicht bewerten und Follow-up empfehlen. |
| 3 | Internes Wissens-Q&A | Confluence und Dokumente vektorisieren; RAG erzeugt Antworten. |
| 4 | Zufriedenheitsanalyse | Gespraeche nach Sentiment, Problemtyp und Loesungsstatus auswerten. |
| 5 | Gespraechszusammenfassung | Nach Chatende Zusammenfassung und Ticketfelder automatisch ausfuellen. |
| 6 | Skript-Compliance | Antworten auf verbotene Aussagen und Compliance-Risiken pruefen. |
| 7 | Ticket-Klassifikation | Lange Gespraeche zusammenfassen und mit Tags versehen. |
| 8 | Emotionswarnung | Tonfall und Textsignal auswerten; bei Risiko per WebSocket warnen. |
| 9 | Best-Practice-Skripte | Gute Faelle analysieren und passende Vorlagen im Kontext empfehlen. |
| 10 | Outbound-Qualitaetspruefung | Telefonaufnahmen transkribieren, Kernaussagen extrahieren und QA-Berichte erzeugen. |

## 3. Bildungswesen

AI kann Unterricht individualisieren, Lernstaende erfassen und Lehrkraefte bei Material, Feedback und Verwaltung entlasten.

| Nr. | Anwendungsszenario | Umsetzungsreferenz |
| :--: | --- | --- |
| 1 | Personalisierter Lernpfad | Niveau und Ziel analysieren; taegliche Aufgaben und Ressourcen empfehlen. |
| 2 | Unterrichtsentwurf | Lehrplan eingeben; LLM erzeugt Ziele, Ablauf und Materialien. |
| 3 | Korrektur und Lernanalyse | Aufgaben bewerten; Wissensluecken ueber Graphen lokalisieren. |
| 4 | Kompetenzmodell | Stellenanzeigen analysieren und Lernlandkarten ableiten. |
| 5 | Schulcurriculum | Schulprofil und Lernbedarf in Kursrahmen und Folien ueberfuehren. |
| 6 | Fremdsprachenpraxis | LLM spielt Rollen; ASR bewertet Aussprache; TTS liefert Vorbild. |
| 7 | Studien- und Karriereberatung | Punktzahlen, Interessen und Zulassungsdaten kombinieren. |
| 8 | Programmiercoach fuer Kinder | Code erklaeren und zwischen Blocksprache und Python vermitteln. |
| 9 | Wissens-Mindmap | Kursthema in Mindmap und naechste Lernschritte umwandeln. |
| 10 | Essay-Bewertung | Struktur, Sprache und Argumentation bewerten und kommentieren. |

## 4. Intelligentes Programmieren

Entwicklungswerkzeuge sind naheliegende B2B-Szenarien, weil Code, Logs, Tickets und Dokumentation bereits stark strukturiert sind.

| Nr. | Anwendungsszenario | Umsetzungsreferenz |
| :--: | --- | --- |
| 1 | Code-Vervollstaendigung und Bug-Fix | IDE-Plugin, Fehlerspur-Analyse und automatische Reparaturvorschlaege. |
| 2 | Low-Code-App-Bau | Natuerliche Sprache in Komponenten, Datenmodelle und Workflows ueberfuehren. |
| 3 | Unit-Test-Generator | AST analysieren und Grenzfaelle fuer Jest oder Pytest erzeugen. |
| 4 | Code-Analyse und Migration | Tree-sitter, Regeln und LLM fuer Qualitaet und Sprachwechsel kombinieren. |
| 5 | Natural-Language-to-SQL | Datenfragen in sichere SQL-Abfragen uebersetzen. |
| 6 | API-Test und Dokumentation | Schnittstellenbeschreibungen in Testfaelle und API-Doku umwandeln. |
| 7 | UI-Testwartung | Browseraktionen aufzeichnen und instabile Selektoren reparieren. |
| 8 | Loganalyse | ELK-Daten auswerten, Ursachen verdichten und Fixes empfehlen. |
| 9 | UI-Codegenerierung | Designbilder per OCR/VLM auswerten und Komponenten erzeugen. |
| 10 | Datenbankschema-Design | Anforderungen in ER-Modelle und DDL-Skripte ueberfuehren. |

## 5. Gesundheitswesen

Gesundheitsszenarien verlangen Fachwissen, Datenschutz und menschliche Pruefung. AI eignet sich vor allem fuer Assistenz, Strukturierung und Erklaerung.

| Nr. | Anwendungsszenario | Umsetzungsreferenz |
| :--: | --- | --- |
| 1 | Laborbefund-Interpretation | Berichtsbilder erkennen, Werte extrahieren und Auffaelligkeiten erklaeren. |
| 2 | Gesundheitsberatung mit RAG | Leitlinien, ICD-10 und Arzneimittelinformationen abrufbar machen. |
| 3 | Klinische Forschungsanalyse | EMR-Daten integrieren und Analysecode erzeugen. |
| 4 | Medizinische Uebungsfragen | Lehrbuchkapitel in Aufgaben, Loesungen und Fehleranalysen umwandeln. |
| 5 | Pharma-Forschungs-Q&A | Wirkstoff-, Ziel- und Krankheitsgraph fuer Recherche nutzen. |
| 6 | Arzneimittel-Q&A | Beipackzettel erkennen und Dosierung, Risiken und Hinweise beantworten. |
| 7 | Patientenverstaendliche Artikel | Krankheitsname und Zielgruppe in einfache Texte ueberfuehren. |
| 8 | Bildbefund-Generator | Radiologische Merkmale in strukturierte Berichtsvorlagen schreiben. |
| 9 | OP-Bericht | Sprachaufzeichnungen in codierte, strukturierte OP-Dokumentation ueberfuehren. |
| 10 | Medikations-Erinnerung | Medikamentenliste analysieren und Erinnerungen samt Warnungen erzeugen. |

## 6. Cybersicherheit

Security-Szenarien verbinden Logdaten, Code, Bedrohungswissen und klare Handlungsablaeufe. LLM hilft beim Erklaeren und Priorisieren.

| Nr. | Anwendungsszenario | Umsetzungsreferenz |
| :--: | --- | --- |
| 1 | Code-Schwachstellen-Fix | SAST-Ergebnisse erklaeren und Pull-Request-Vorschlaege erzeugen. |
| 2 | Phishing-Erkennung | Mailtext, Sender und Links analysieren und Gateway-Regeln anstossen. |
| 3 | Security-Tagesbericht | Logs zusammenfassen und wichtige Ereignisse hervorheben. |
| 4 | Security-Wissens-Q&A | CVE- und interne Dokumente als RAG-Wissen nutzen. |
| 5 | Penetrationstest-Bericht | Schwachstellen in Berichte und Reparaturhinweise ueberfuehren. |
| 6 | Malware- und Datenschutzmonitoring | Sandboxsignale auswerten und sensible Daten erkennen. |
| 7 | Compliance-Checkliste | Systemtyp in Sicherheitschecklisten nach CIS oder anderen Standards umsetzen. |
| 8 | Threat-Intelligence-Q&A | Externe und interne Quellen verbinden und auf eigene Assets beziehen. |
| 9 | Incident-Postmortem | Zeitlinie, Ursache und Verbesserungen aus Ereignisdaten erzeugen. |
| 10 | Globales Threat-Monitoring | Sicherheitsnews und Disclosure-Daten sammeln, bewerten und melden. |

## 7. Finanzen und Versicherung

Finanzszenarien drehen sich um Risiko, Compliance, Dokumente, Beratung und Berichte. AI sollte hier immer mit Audit- und Review-Prozessen gekoppelt werden.

| Nr. | Anwendungsszenario | Umsetzungsreferenz |
| :--: | --- | --- |
| 1 | Kredit-Due-Diligence | Unternehmens- und Finanzdaten in Risikoberichte ueberfuehren. |
| 2 | Vermoegensberatung | Risikopraeferenz und Zielportfolio analysieren. |
| 3 | IPO-Prospekt | Vorlagen fuellen und Datenkonsistenz pruefen. |
| 4 | Finanzbericht | Managementanalyse und Warnungen vor Kennzahlenabweichungen erzeugen. |
| 5 | Beleg-Q&A | Rechnungen per OCR erkennen und Rueckfragen beantworten. |
| 6 | Compliance-Fallrecherche | Straf- und Regulierungsfaelle abrufbar machen. |
| 7 | Versicherungscoach | Kundenszenarien simulieren und Skripte bewerten. |
| 8 | Versicherungsproduktvergleich | Klauseln strukturieren und Unterschiede hervorheben. |
| 9 | Emotionserkennung im Vertrieb | Stimme und Formulierungen fuer Coachinghinweise auswerten. |
| 10 | Schadenstatus-Dialog | Police oder Fallnummer abfragen und Status erklaeren. |

## 8. Unternehmensservices

Unternehmensservices betreffen CRM, HR, Marketing, Meeting-Workflows und interne Verwaltung. Gute Projekte starten meist bei einem konkreten, wiederkehrenden Prozess.

| Nr. | Anwendungsszenario | Umsetzungsreferenz |
| :--: | --- | --- |
| 1 | Kundenabwanderungswarnung | Verhalten erfassen, Churn-Risiko modellieren und Rueckgewinnung empfehlen. |
| 2 | B2B-Outreach | Firmendaten filtern und personalisierte E-Mails erzeugen. |
| 3 | Sales-Pipeline-Prognose | CRM-Daten analysieren und Zielerreichung vorhersagen. |
| 4 | Markenmonitoring | Nachrichten und Social Media auswerten und Krisen frueh erkennen. |
| 5 | E-Mail-Assistent | Kontext verstehen und professionelle Antwortentwuerfe erzeugen. |
| 6 | CV-Parsing und Matching | Lebenslaeufe extrahieren und passende Stellen empfehlen. |
| 7 | Onboarding-Q&A | Handbuecher und Prozesse fuer neue Mitarbeiter abrufbar machen. |
| 8 | OKR-Feedback | Zielerreichung analysieren und Feedbackvorschlaege erzeugen. |
| 9 | Meeting-Notizen | Transkription, Entscheidungen und Aufgaben automatisch erfassen. |
| 10 | Rechnungs- und Spesenprozess | OCR, Plausibilitaetspruefung und Finanzsystemanbindung kombinieren. |

## 9. Content-Produktion und Betrieb

Content-Prozesse sind gut geeignet, weil Entwurf, Varianten, Bewertung und Distribution stark wiederholbar sind.

| Nr. | Anwendungsszenario | Umsetzungsreferenz |
| :--: | --- | --- |
| 1 | Film- und Romanassistenz | Outline, Figuren, Dialoge und Storystruktur erzeugen. |
| 2 | Markenstory und PR-Text | Markenkeywords in mehrere Versionen fuer A/B-Tests umwandeln. |
| 3 | Virtueller Livestream-Avatar | Avatar, TTS, LLM-Dialog und OBS-Streaming verbinden. |
| 4 | Short-Video-Skript und Schnitt | Skript, Storyboard und Highlight-Clips generieren. |
| 5 | Verkaufsgespraech-Skripte | Telefonaufnahmen analysieren und erfolgreiche Formulierungen empfehlen. |
| 6 | Marketing-Content-System | Produktdaten in Copy, Bilder und Kampagnenvarianten ueberfuehren. |
| 7 | ROI-Monitoring fuer Ads | Plattform-APIs auswerten und Optimierungen vorschlagen. |
| 8 | Keyword- und Traffic-Analyse | Suchdaten analysieren und Content-Themen empfehlen. |
| 9 | Wettbewerber-Werbung | Anzeigen sammeln und Strategien sowie Creatives vergleichen. |
| 10 | Trendanalyse und Redaktionsplan | Hot Topics auswerten und Kalenderplaene erzeugen. |

## 10. Smart Government

Verwaltungsprojekte muessen Verstaendlichkeit, Nachvollziehbarkeit und Sicherheit verbinden. AI kann Buergeranliegen strukturieren und interne Arbeit beschleunigen.

| Nr. | Anwendungsszenario | Umsetzungsreferenz |
| :--: | --- | --- |
| 1 | Buergerhotline-Dispatch | Anruf erkennen, Anliegen klassifizieren und an Abteilungen leiten. |
| 2 | Service-Wegweiser | Verwaltungswissen per RAG fuer Verfahren und Politikfragen nutzen. |
| 3 | Foerderpolitik-Matching | Unternehmensprofile mit passenden Programmen abgleichen. |
| 4 | Unterlagen-Vorpruefung | OCR und Regeln pruefen Vollstaendigkeit und Compliance. |
| 5 | Videoanomalie im oeffentlichen Raum | CV erkennt Schlaegerei, Sturz oder andere Risiken. |
| 6 | Stadt-Grid-Dispatch | IoT- und Kameradaten in Ereignistypen und Arbeitsauftraege ueberfuehren. |
| 7 | Oeffentliche Meinung und Risiko | Hotline, Netzbeobachtung und Umfragen zusammen analysieren. |
| 8 | Digitale Archivierung | OCR extrahiert Text; LLM klassifiziert Akten. |
| 9 | Notfallressourcen-Dispatch | Ereignisdaten in Reaktionsplaene und Ressourcenverteilung ueberfuehren. |
| 10 | Umweltmonitoring | Luftsensoren und CV-Quellen auswerten und Trends erklaeren. |

## 11. Recht und Vertragsmanagement

Rechtliche Szenarien profitieren von Dokumentenstrukturierung, Aehnlichkeitssuche und klarer Risikoerklaerung. Fachliche Pruefung bleibt zwingend.

| Nr. | Anwendungsszenario | Umsetzungsreferenz |
| :--: | --- | --- |
| 1 | Vertragsrisiko-Agent | Vertragsklauseln gegen Risikolisten pruefen. |
| 2 | Vertragslebenszyklus-Review | Regelwerke vergleichen und Aenderungsvorschlaege verfolgen. |
| 3 | Gewinnwahrscheinlichkeitsanalyse | Fallmerkmale und aehnliche Urteile auswerten. |
| 4 | Gesetzesaenderungsradar | Aenderungen erkennen, zusammenfassen und Auswirkungen melden. |
| 5 | Anwaltsschreiben-Entwurf | Sachverhalte in formale Schreiben und Checklisten ueberfuehren. |
| 6 | Gerichtstranskription | Audio transkribieren und Streitpunkte mit Zeitstempeln extrahieren. |
| 7 | IP-Verletzungsmonitoring | Plattformen beobachten und Beweise sichern. |
| 8 | IPO-Datenkonsistenz | Prospektkapitel vergleichen und Abweichungen markieren. |
| 9 | Klauseln in Alltagssprache | Markierte Rechtsklauseln einfach erklaeren. |
| 10 | Beweisketten-Visualisierung | Materialien hochladen, Beziehungen und Zeitlinien analysieren. |

## 12. Reise und Mobilitaet

Reiseszenarien verbinden Planung, Preise, Uebersetzung, Bewertungen und Echtzeitdaten. AI macht aus vielen kleinen Informationen nutzbare Empfehlungen.

| Nr. | Anwendungsszenario | Umsetzungsreferenz |
| :--: | --- | --- |
| 1 | AIGC-Reisefuehrer | Tage, Budget und Interessen in Reiseplaene umwandeln. |
| 2 | Preisprognose fuer Flug und Hotel | OTA-Daten sammeln, Trends modellieren und Warnungen senden. |
| 3 | Reorganisation bei Flugausfall | Statusdaten pruefen und Alternativrouten empfehlen. |
| 4 | Visa-Unterlagen-Assistent | Dokumente erkennen, Vollstaendigkeit pruefen und Formulare fuellen. |
| 5 | Reiseuebersetzung | Sprache offline uebersetzen und Menuebilder per OCR erklaeren. |
| 6 | Hotelbewertungsanalyse | Bewertungen auswerten und Risiken sowie Vorteile verdichten. |
| 7 | VR-Zielvorschau | 360-Grad-Bilder und virtuelle Zimmerbesichtigung kombinieren. |
| 8 | Reisebericht aus Fotos | Zeit und Ort extrahieren und Social Copy erzeugen. |
| 9 | Geschaeftsreise-Abrechnung | Plattform-APIs und Rechnungen fuer Compliance pruefen. |
| 10 | Besucherflussprognose | Auslastungsdaten modellieren und Routen mit weniger Andrang empfehlen. |

## 13. Emotionale Begleitung

Emotionale AI-Anwendungen verlangen besondere Vorsicht, Datenschutz und klare Eskalationsmechanismen. Sie eignen sich eher als begleitende Assistenz als als Ersatz fuer Fachhilfe.

| Nr. | Anwendungsszenario | Umsetzungsreferenz |
| :--: | --- | --- |
| 1 | Virtueller Begleiter | Dialogverlauf speichern und personalisierte Antworten erzeugen. |
| 2 | Emotionserkennung und Beratung | Stimme und Text analysieren; Krisenhinweise erkennen. |
| 3 | Alzheimer-Training | Kognitive Spiele und Erinnerungsmedien kombinieren. |
| 4 | Sozialangst-Coach | Virtuelle soziale Situationen simulieren. |
| 5 | Gute-Nacht-Geschichten fuer Kinder | Thema und Vorlieben in personalisierte Geschichten verwandeln. |
| 6 | Digitale Erinnerungsperson | Vorhandene Texte und Stimmen fuer Erinnerungsdialoge nutzen. |
| 7 | Persoenlichkeitsspiegel | Testdaten in Analyse und empathische Antworten ueberfuehren. |
| 8 | Stimmungsmonitor | Tagebuchdaten auswerten und positive Impulse senden. |
| 9 | Anonyme Jugendberatung | Niedrigschwellige Gespraeche mit Sicherheitswarnungen kombinieren. |
| 10 | Virtuelles Haustier | Persoenlichkeitsmodell und Interaktion wachsen lassen. |

## 14. Unterhaltung und Freizeit

Unterhaltungsszenarien nutzen AI fuer Story, Personalisierung, Audio, Video und Gameplay. Der Kern ist meist ein besseres Erlebnis, nicht nur Automatisierung.

| Nr. | Anwendungsszenario | Umsetzungsreferenz |
| :--: | --- | --- |
| 1 | Open-World-NPC-Engine | Verhaltensbaum und LLM-Dialoge verbinden. |
| 2 | Murder-Mystery-DM-Assistent | Entscheidungen in Hinweise, Logik und Zweige ueberfuehren. |
| 3 | Interaktive Romanenden | Leserwahl in alternative Enden umwandeln. |
| 4 | 3D-Charaktergenerierung | Textbeschreibung in Skizze, Modell und Material ueberfuehren. |
| 5 | E-Sport-Kommentator | Spielbild analysieren und Kommentare erzeugen. |
| 6 | Humor-Empfehlung | Nutzerprofil mit passenden Inhalten abgleichen. |
| 7 | AI-Stimmkorrektur | Rauschen reduzieren und Gesangsstimme verbessern. |
| 8 | Serienclip-Extraktion | Figurenbezogene Szenen erkennen und schneiden. |
| 9 | Mehrrollen-Hoerbuch | Rollen verteilen, Stimmen erzeugen und Effekte mischen. |
| 10 | Spielanalyse-Coach | Partien auswerten und Trainingshinweise geben. |

## 15. E-Commerce Services

E-Commerce-Projekte zielen auf schnellere Content-Produktion, bessere Conversion, Kundenservice und Preis- oder Trendanalyse.

| Nr. | Anwendungsszenario | Umsetzungsreferenz |
| :--: | --- | --- |
| 1 | Produktdetailseiten-Batchproduktion | Produktdaten in Selling Points, Szenen und Bilder ueberfuehren. |
| 2 | Virtuelles Kleidermodel | Produktbilder in Try-on und Demo-Videos umwandeln. |
| 3 | Mehrsprachige Lokalisierung | Produkttexte uebersetzen und kulturell anpassen. |
| 4 | Sentimentbasierter Kundenbot | Beratungsgespräche analysieren und passende Antworten erzeugen. |
| 5 | Digitaler Livestream-Verkauf | Avatar, Produktdaten und Echtzeitskript verbinden. |
| 6 | Preisvergleichs-Plugin | Preise crawlen, Trends zeigen und Warnungen ausloesen. |
| 7 | Kaeuferbild-Auswahl und Short-Video | UGC bewerten und in Video-Vorlagen einsetzen. |
| 8 | Verkaufsdialog-Analyse | ASR und Compliance-Check mit Skriptempfehlung kombinieren. |
| 9 | Trend- und Bestseller-Prognose | Social- und Shopdaten fuer Produktauswahl analysieren. |
| 10 | Private-Traffic-Cluster | Nutzerverhalten clustern und Marketingautomatisierung ausloesen. |

## 16. Energie

Energieszenarien verbinden Messdaten, Prognosen, Inspektion und Nachhaltigkeitsberichte. AI hilft vor allem bei Analyse und operativer Empfehlung.

| Nr. | Anwendungsszenario | Umsetzungsreferenz |
| :--: | --- | --- |
| 1 | Stromverbrauchsanalyse | Smart-Meter-Daten auswerten und Sparhinweise geben. |
| 2 | PV-Defekterkennung | Drohnenbilder und Thermodaten fuer Defektmarkierung nutzen. |
| 3 | Strompreisstrategie | Marktpreise prognostizieren und Handelsstrategie erzeugen. |
| 4 | Batteriegesundheit | Betriebsdaten analysieren und Thermal-Runaway-Risiken warnen. |
| 5 | CO2-Footprint und ESG | Energieverbrauch in Emissionen und Berichte umrechnen. |
| 6 | Netzlast bei Extremwetter | Wetter- und Lastdaten fuer Dispatch-Strategien nutzen. |
| 7 | Tankstellen-Sicherheitsvideo | Riskante Handlungen erkennen und Alarm senden. |
| 8 | Pipeline-Lecksuche | Akustiksensoren analysieren und Leckposition berechnen. |
| 9 | Virtuelles Kraftwerk | Dezentrale Ressourcen buendeln und Handelsentscheidungen unterstuetzen. |
| 10 | Minensicherheit | Standortdaten verfolgen und Sperrzonenalarm ausloesen. |

## 17. Audio und Video

Audio- und Videoszenarien verbessern Produktion, Restauration, Transkription und Wiederverwertung von Medieninhalten.

| Nr. | Anwendungsszenario | Umsetzungsreferenz |
| :--: | --- | --- |
| 1 | Highlight-Erkennung | Langvideos analysieren und kurze Clips schneiden. |
| 2 | Rauschtrennung | Audiomodelle entfernen Hintergrund und verstaerken Stimme. |
| 3 | 4K-Restauration | Super-Resolution und Kolorierung fuer alte Aufnahmen nutzen. |
| 4 | TTS-Synchronisation | Mehrere Stimmen und Emotionen generieren. |
| 5 | Bilinguale Untertitel | ASR, Uebersetzung und Untertitel-Overlay kombinieren. |
| 6 | Objektentfernung im Video | Tracking und Inpainting fuer konsistente Frames nutzen. |
| 7 | Lizenzfreie Musik | Musikmodelle erzeugen Stilvarianten und pruefen Rechte. |
| 8 | Stimmklon und Voice Conversion | Wenige Samples fuer personalisierte Stimmen nutzen. |
| 9 | Drehbuch zu Storyboard | Skripte parsen und Vorschauvideos generieren. |
| 10 | Meeting-Transkription | Sprechertrennung, Aufgabenextraktion und Zeitstempel erzeugen. |

## 18. AI-Marketing

AI-Marketing kombiniert Content-Erstellung, Layout, Trendanalyse, Budgetsteuerung und Markenmonitoring.

| Nr. | Anwendungsszenario | Umsetzungsreferenz |
| :--: | --- | --- |
| 1 | Virale Social-Copy | Themen in kurze, teilbare Copy mit Hashtags umsetzen. |
| 2 | Posterlayout | Copy und Vorlage in mehrere Formate exportieren. |
| 3 | Markenlogo und VI | Markenkeywords in Logoideen und visuelle Regeln verwandeln. |
| 4 | Trend-Hunting | Hot Topics sammeln und Marketingwinkel ableiten. |
| 5 | ROI- und Budgetsteuerung | Ad-Plattformdaten analysieren und Gebote optimieren. |
| 6 | Wettbewerber-Wochenbericht | Konkurrenzinhalte sammeln, Strategien erkennen und berichten. |
| 7 | SEO-Artikel-Batch | Keywords analysieren und Artikel mit Optimierungshinweisen erzeugen. |
| 8 | Personalisierte Marketingmail | Nutzerprofile in individuelle E-Mails und A/B-Tests uebersetzen. |
| 9 | Markenreputation | Netzweite Stimmung auswerten und Krisenwarnungen senden. |
| 10 | Short-Video-Storyboard | Thema in Skript, Shots und Drehhinweise ueberfuehren. |

## 19. Datenintelligenz

Datenintelligenz macht Daten fuer Fachbereiche nutzbar: Fragen, Visualisierungen, Qualitaet, Governance und Kennzahlendefinitionen.

| Nr. | Anwendungsszenario | Umsetzungsreferenz |
| :--: | --- | --- |
| 1 | Text-to-SQL-Datenabfrage | Natuerliche Sprache in SQL und Visualisierung umwandeln. |
| 2 | Dialogisches BI | Eine Frage erzeugt Diagramme und alternative Darstellungen. |
| 3 | Screenshot zu Excel | Tabellenstrukturen per VLM erkennen und exportieren. |
| 4 | Bild zu Tabelle | OCR erkennt Zellstruktur und Daten. |
| 5 | Wissensgraph aus heterogenen Daten | Entitaeten und Beziehungen extrahieren und speichern. |
| 6 | Berichtserklaerung | Diagramme oder Daten hochladen und Trends erklaeren lassen. |
| 7 | Schema-Q&A | Tabellen und Felder erklaeren und Beispiel-SQL erzeugen. |
| 8 | Master-Data-Deduplizierung | Mehrere Quellen abgleichen und Dubletten zusammenfuehren. |
| 9 | Datenanforderung zu Testfaellen | Anforderungen in Pruefszenarien und Validierungen uebersetzen. |
| 10 | Kennzahlen-Q&A | Definitionen, Berechnungslogik und Abhaengigkeiten abrufbar machen. |
