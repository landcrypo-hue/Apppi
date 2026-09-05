"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, X, Languages, Sparkles, Coins } from "lucide-react"
import { usePiAuth } from "@/components/pi-auth-provider"

type Message = {
  role: "assistant" | "user"
  content: string
  language?: string
}

const knowledgeBase = {
  en: {
    welcome:
      "Hello! I'm your multilingual AI assistant for Eservices. I can help you with:\n\n• Document requests (certificates, attestations)\n• Pi Coin payments (0.25 Pi per service)\n• Company lookup (RC, ICE, dirigeants)\n• Real estate/Syndic services\n• Identity vault & biometric login\n• Administrative guidance\n• Payment & billing\n• Support tickets\n\nHow can I assist you today?",
    certificates:
      "To request a certificate:\n\n1. Navigate to 'Request Document' or tap the Documents tab\n2. Select certificate type (Birth, Residence, Tax, etc.)\n3. Upload required documents (CIN, proof of address)\n4. Pay 0.25 Pi via Pi Network\n5. Track status in 'My Requests'\n\nProcessing time: 2-3 business days\nYou'll receive notifications at each step.\n\nNeed help with a specific certificate type?",
    payments:
      "We accept multiple payment methods:\n\n• Pi Coin (0.25 Pi per service) - Recommended\n• Credit/Debit cards\n• Bank transfers\n• Mobile money\n\nPi Coin Benefits:\n✓ Instant processing\n✓ Low fees\n✓ Secure blockchain verification\n✓ Global acceptance\n\nAll transactions are PCI DSS compliant and encrypted. Payment history available in your dashboard.",
    piCoin:
      "Pi Coin Integration:\n\n• Standard fee: 0.25 Pi per service\n• Instant approval & completion\n• Secure Pi Network authentication\n• Transaction history tracking\n• Automatic conversion available\n\nTo pay with Pi:\n1. Connect your Pi wallet (Login with Pi)\n2. Select service\n3. Confirm payment (0.25 Pi)\n4. Wait for blockchain confirmation\n\nYour Pi balance is debited instantly upon confirmation.",
    company:
      "Company Lookup Services:\n\n• RC (Commercial Registry) search\n• ICE (Tax ID) verification\n• Dirigeant (manager) information\n• Company legal status\n• Financial records access\n• Invoice management\n\nFee: 0.25 Pi per lookup\n\nProvide RC or ICE number to get started. All data is sourced from official government registries.",
    syndic:
      "Real Estate/Syndic Services:\n\n• Request repairs & maintenance\n• Pay syndic fees (0.25 Pi + fees)\n• Book common areas\n• View meeting minutes\n• Online voting for residents\n• Financial transparency dashboard\n• Residency announcements\n\nAll syndic communications are secure and GDPR compliant.",
    identity:
      "Identity Vault Features:\n\n• Biometric login (fingerprint/face)\n• Secure document storage\n• CIN, Passport, RC, ICE, Tax ID\n• Encrypted cloud backup\n• Multi-factor authentication\n• AML/KYC integration\n\nYour identity data is encrypted and stored in your selected region (EU/US/APAC). We comply with GDPR, CCPA, and local data protection laws.",
    support:
      "Need human support?\n\n• Live chat: Available 24/7\n• Support tickets: Create in 'Support' section\n• Email: support@eservices.app\n• Phone: +212 XXX XXX XXX\n\nAverage response time: < 2 hours\nTicket resolution: < 24 hours\n\nOur chatbot deflection rate is 80% - I can help with most questions!",
  },
  fr: {
    welcome:
      "Bonjour! Je suis votre assistant IA multilingue pour Eservices. Je peux vous aider avec:\n\n• Demandes de documents (certificats, attestations)\n• Paiements Pi Coin (0,25 Pi par service)\n• Recherche d'entreprise (RC, ICE, dirigeants)\n• Services immobiliers/Syndic\n• Coffre-fort d'identité & connexion biométrique\n• Orientation administrative\n• Paiement et facturation\n• Tickets de support\n\nComment puis-je vous aider aujourd'hui?",
    certificates:
      "Pour demander un certificat:\n\n1. Accédez à 'Demander un document'\n2. Sélectionnez le type de certificat\n3. Téléchargez les documents requis\n4. Payez 0,25 Pi via Pi Network\n5. Suivez le statut dans 'Mes demandes'\n\nDélai de traitement: 2-3 jours ouvrables\nNotifications à chaque étape.\n\nBesoin d'aide pour un type spécifique?",
    payments:
      "Nous acceptons plusieurs méthodes de paiement:\n\n• Pi Coin (0,25 Pi/service) - Recommandé\n• Cartes bancaires\n• Virements bancaires\n• Mobile money\n\nAvantages Pi Coin:\n✓ Traitement instantané\n✓ Frais réduits\n✓ Vérification blockchain sécurisée\n✓ Acceptation mondiale\n\nToutes les transactions sont conformes PCI DSS.",
    piCoin:
      "Intégration Pi Coin:\n\n• Frais standard: 0,25 Pi par service\n• Approbation & finalisation instantanées\n• Authentification Pi Network sécurisée\n• Suivi de l'historique\n• Conversion automatique disponible\n\nPour payer avec Pi:\n1. Connectez votre portefeuille Pi\n2. Sélectionnez le service\n3. Confirmez (0,25 Pi)\n4. Attendez la confirmation blockchain",
    company:
      "Services de recherche d'entreprise:\n\n• Recherche RC (Registre Commercial)\n• Vérification ICE (Identifiant Fiscal)\n• Informations sur les dirigeants\n• Statut juridique de l'entreprise\n• Accès aux dossiers financiers\n• Gestion des factures\n\nFrais: 0,25 Pi par recherche",
    syndic:
      "Services Immobiliers/Syndic:\n\n• Demandes de réparation\n• Payer les frais de syndic\n• Réserver les espaces communs\n• Consulter les PV de réunions\n• Vote en ligne\n• Tableau de transparence financière\n\nToutes les communications sont sécurisées et conformes RGPD.",
    identity:
      "Fonctionnalités du coffre-fort d'identité:\n\n• Connexion biométrique\n• Stockage sécurisé de documents\n• CIN, Passeport, RC, ICE, ID fiscal\n• Sauvegarde cloud cryptée\n• Authentification multi-facteurs\n• Intégration AML/KYC\n\nVos données sont cryptées et stockées dans votre région (UE/US/APAC). Conformité RGPD.",
    support:
      "Besoin d'assistance humaine?\n\n• Chat en direct: 24/7\n• Tickets de support: Section 'Support'\n• Email: support@eservices.app\n• Téléphone: +212 XXX XXX XXX\n\nTemps de réponse moyen: < 2 heures\nRésolution: < 24 heures",
  },
  ar: {
    welcome:
      "مرحبا! أنا مساعدك الذكي متعدد اللغات. يمكنني المساعدة في:\n\n• طلبات الوثائق (الشهادات، الشواهد)\n• دفع Pi Coin (0.25 Pi للخدمة)\n• البحث عن الشركات (RC، ICE، المدراء)\n• خدمات العقارات/السنديك\n• خزينة الهوية والدخول البيومتري\n• الإرشاد الإداري\n• الدفع والفواتير\n• تذاكر الدعم\n\nكيف يمكنني مساعدتك اليوم؟",
    certificates:
      "باش تطلب شهادة:\n\n1. مشي لـ 'طلب وثيقة'\n2. اختار نوع الشهادة (ميلاد، إقامة، ضريبة)\n3. حمّل الوثائق المطلوبة (البطاقة، إثبات السكن)\n4. خلص 0.25 Pi بواسطة Pi Network\n5. تابع الطلب في 'طلباتي'\n\nوقت المعالجة: 2-3 أيام عمل\nغادي توصلك إشعارات في كل مرحلة.\n\nمحتاج مساعدة في نوع معين؟",
    payments:
      "كنقبلو طرق دفع متعددة:\n\n• Pi Coin (0.25 Pi للخدمة) - موصى بيه\n• البطاقات البنكية\n• التحويلات البنكية\n• المحفظة الإلكترونية\n\nمزايا Pi Coin:\n✓ معالجة فورية\n✓ رسوم قليلة\n✓ تحقق آمن عبر البلوكشين\n✓ قبول عالمي\n\nكاملين المعاملات آمنة ومشفرة. التاريخ متوفر في لوحة التحكم.",
    piCoin:
      "تكامل Pi Coin:\n\n• الرسوم: 0.25 Pi للخدمة\n• موافقة وإتمام فوري\n• مصادقة Pi Network آمنة\n• تتبع سجل المعاملات\n• تحويل تلقائي متاح\n\nباش تخلص بـ Pi:\n1. ربط محفظة Pi ديالك\n2. اختار الخدمة\n3. أكد الدفع (0.25 Pi)\n4. استنى تأكيد البلوكشين\n\nالرصيد ديالك غادي ينقص فورا.",
    company:
      "خدمات البحث عن الشركات:\n\n• بحث RC (السجل التجاري)\n• تحقق ICE (المعرف الضريبي)\n• معلومات المدراء\n• الوضع القانوني للشركة\n• الوصول للسجلات المالية\n• إدارة الفواتير\n\nالرسوم: 0.25 Pi للبحث\n\nعطيني رقم RC أو ICE باش نبداو.",
    syndic:
      "خدمات العقارات/السنديك:\n\n• طلب إصلاحات وصيانة\n• دفع رسوم السنديك (0.25 Pi + الرسوم)\n• حجز المساحات المشتركة\n• مشاهدة محاضر الاجتماعات\n• التصويت أونلاين\n• لوحة الشفافية المالية\n• إعلانات السكن\n\nكامل الاتصالات آمنة ومتوافقة مع GDPR.",
    identity:
      "ميزات خزينة الهوية:\n\n• دخول بيومتري (البصمة/الوجه)\n• تخزين آمن للوثائق\n• البطاقة الوطنية، الجواز، RC، ICE، المعرف الضريبي\n• نسخ احتياطي مشفر\n• مصادقة متعددة العوامل\n• تكامل AML/KYC\n\nبياناتك مشفرة ومخزنة في المنطقة اللي اخترتيها (EU/US/APAC). متوافق مع GDPR وCCPA.",
    support:
      "محتاج دعم بشري؟\n\n• دردشة مباشرة: 24/7\n• تذاكر الدعم: قسم 'الدعم'\n• البريد: support@eservices.app\n• الهاتف: +212 XXX XXX XXX\n\nوقت الاستجابة: أقل من ساعتين\nحل التذاكر: أقل من 24 ساعة\n\nمعدل الانحراف للشاتبوت 80% - نقدر نساعد في أغلب الأسئلة!",
  },
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [language, setLanguage] = useState<"en" | "fr" | "ar">("en")
  const { isAuthenticated } = usePiAuth()
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: knowledgeBase[language].welcome,
    },
  ])

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: knowledgeBase[language].welcome,
      },
    ])
  }, [language])

  const quickQuestions = {
    en: [
      { text: "How to request a certificate?", topic: "certificates" },
      { text: "Pi Coin payment info", topic: "piCoin" },
      { text: "Company lookup (RC/ICE)", topic: "company" },
    ],
    fr: [
      { text: "Comment demander un certificat?", topic: "certificates" },
      { text: "Info paiement Pi Coin", topic: "piCoin" },
      { text: "Recherche entreprise (RC/ICE)", topic: "company" },
    ],
    ar: [
      { text: "كيفاش نطلب شهادة؟", topic: "certificates" },
      { text: "معلومات دفع Pi Coin", topic: "piCoin" },
      { text: "بحث شركة (RC/ICE)", topic: "company" },
    ],
  }

  const handleSend = () => {
    if (!message.trim()) return

    const userMsg: Message = { role: "user", content: message }
    setMessages([...messages, userMsg])

    setTimeout(() => {
      let aiResponse = ""
      const msg = message.toLowerCase()

      // Knowledge base matching with multiple keywords
      if (msg.includes("certificate") || msg.includes("certificat") || msg.includes("شهادة") || msg.includes("وثيقة")) {
        aiResponse = knowledgeBase[language].certificates
      } else if (
        msg.includes("payment") ||
        msg.includes("payer") ||
        msg.includes("pay") ||
        msg.includes("خلاص") ||
        msg.includes("دفع")
      ) {
        aiResponse = knowledgeBase[language].payments
      } else if (msg.includes("pi") || msg.includes("coin") || msg.includes("crypto")) {
        aiResponse = knowledgeBase[language].piCoin
      } else if (
        msg.includes("company") ||
        msg.includes("entreprise") ||
        msg.includes("rc") ||
        msg.includes("ice") ||
        msg.includes("شركة")
      ) {
        aiResponse = knowledgeBase[language].company
      } else if (
        msg.includes("syndic") ||
        msg.includes("real estate") ||
        msg.includes("immobilier") ||
        msg.includes("سنديك") ||
        msg.includes("عقار")
      ) {
        aiResponse = knowledgeBase[language].syndic
      } else if (
        msg.includes("identity") ||
        msg.includes("vault") ||
        msg.includes("biometric") ||
        msg.includes("identité") ||
        msg.includes("هوية")
      ) {
        aiResponse = knowledgeBase[language].identity
      } else if (
        msg.includes("support") ||
        msg.includes("help") ||
        msg.includes("aide") ||
        msg.includes("مساعدة") ||
        msg.includes("دعم")
      ) {
        aiResponse = knowledgeBase[language].support
      } else {
        // Default response - guide to available services
        aiResponse = knowledgeBase[language].welcome
      }

      setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }])
    }, 800)

    setMessage("")
  }

  return (
    <>
      {/* Floating Action Button */}
      <Button
        size="icon"
        className="fixed bottom-20 right-6 h-14 w-14 rounded-full shadow-lg z-40 bg-gradient-to-br from-primary to-accent"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <div className="relative">
            <MessageCircle className="h-6 w-6" />
            <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
          </div>
        )}
      </Button>

      {/* Assistant Panel */}
      {isOpen && (
        <Card className="fixed bottom-36 right-6 z-40 w-[calc(100vw-3rem)] max-w-md shadow-2xl border-2">
          <div className="flex flex-col h-[500px] max-h-[70vh]">
            {/* Header */}
            <div className="flex items-center justify-between border-b p-4 bg-gradient-to-r from-primary/5 to-accent/5">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground relative">
                  <MessageCircle className="h-5 w-5" />
                  <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-300" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">AI Assistant</h3>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs text-muted-foreground">Online & Ready</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Language Selector */}
            <div className="flex gap-2 p-3 border-b bg-muted/30">
              <Button
                variant={language === "en" ? "default" : "secondary"}
                size="sm"
                className="text-xs h-7"
                onClick={() => setLanguage("en")}
              >
                <Languages className="h-3 w-3 mr-1" />
                EN
              </Button>
              <Button
                variant={language === "fr" ? "default" : "secondary"}
                size="sm"
                className="text-xs h-7"
                onClick={() => setLanguage("fr")}
              >
                FR
              </Button>
              <Button
                variant={language === "ar" ? "default" : "secondary"}
                size="sm"
                className="text-xs h-7"
                onClick={() => setLanguage("ar")}
              >
                AR
              </Button>
              {isAuthenticated && (
                <div className="ml-auto flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                  <Coins className="h-3 w-3" />
                  Pi Connected
                </div>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                  {msg.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground">
                      <MessageCircle className="h-4 w-4" />
                    </div>
                  )}
                  <div className={`flex-1 max-w-[80%] ${msg.role === "user" ? "ml-auto" : ""}`}>
                    <Card className={`p-3 ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                      <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
                    </Card>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Questions */}
            <div className="border-t p-3 bg-muted/30">
              <p className="text-xs text-muted-foreground mb-2">
                {language === "en" ? "Quick questions:" : language === "fr" ? "Questions rapides:" : "أسئلة سريعة:"}
              </p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions[language].map((q, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    className="text-xs h-auto py-1 bg-transparent"
                    onClick={() => setMessage(q.text)}
                  >
                    {q.text}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex gap-2"
              >
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    language === "en"
                      ? "Type your question..."
                      : language === "fr"
                        ? "Tapez votre question..."
                        : "اكتب سؤالك..."
                  }
                  className="flex-1"
                  dir={language === "ar" ? "rtl" : "ltr"}
                />
                <Button type="submit" size="icon" disabled={!message.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}
