/**
 * IgnisTech - Estuda+ | AI Assistant JavaScript
 * Sistema de IA simulada com análise de desempenho e chat interativo
 * Inclui feedback automatizado e insights personalizados
 */

// Dados simulados de desempenho do usuário
const userPerformance = {
  resumos: {
    visualizados: 0,
    materias: {},
  },
  flashcards: {
    tentativas: 0,
    acertos: 0,
    erros: 0,
  },
  quizzes: {
    realizados: 0,
    pontuacaoTotal: 0,
    acertos: 0,
    erros: 0,
  },
}

// Base de conhecimento da IA
const aiKnowledge = {
  responses: {
    greeting: [
      "Olá! Como posso ajudar você hoje?",
      "Oi! Pronto para melhorar seus estudos?",
      "Seja bem-vindo! Vamos analisar seu progresso?",
    ],
    performance: [
      "Analisando seu desempenho geral...",
      "Vamos ver como você está se saindo!",
      "Aqui está um resumo do seu progresso:",
    ],
    tips: [
      "Aqui estão algumas dicas personalizadas para você:",
      "Com base no seu desempenho, recomendo:",
      "Para melhorar seus estudos, sugiro:",
    ],
    encouragement: [
      "Você está indo muito bem! Continue assim!",
      "Excelente progresso! Mantenha o foco!",
      "Parabéns pelo seu esforço! Está no caminho certo!",
    ],
    weakAreas: [
      "Identifiquei algumas áreas que precisam de mais atenção:",
      "Vamos focar nestas matérias para melhorar:",
      "Estas são as áreas onde você pode crescer mais:",
    ],
  },
  studyTips: [
    "📚 Faça resumos com suas próprias palavras para fixar melhor o conteúdo",
    "🕐 Use a técnica Pomodoro: 25 min de estudo + 5 min de pausa",
    "🔄 Revise o conteúdo em intervalos crescentes (1 dia, 3 dias, 1 semana)",
    "✍️ Pratique exercícios regularmente para consolidar o aprendizado",
    "🎯 Defina metas pequenas e alcançáveis para manter a motivação",
    "💤 Durma bem! O sono é essencial para a consolidação da memória",
    "🏃 Faça exercícios físicos para melhorar a concentração",
    "📱 Evite distrações durante o estudo (celular, redes sociais)",
  ],
  subjectAdvice: {
    matematica: [
      "Pratique exercícios diariamente, a matemática requer repetição",
      "Entenda os conceitos antes de decorar fórmulas",
      "Use exemplos práticos para visualizar problemas abstratos",
    ],
    historia: [
      "Crie linhas do tempo para organizar eventos cronologicamente",
      "Relacione eventos históricos com o contexto atual",
      "Use mapas mentais para conectar causas e consequências",
    ],
    ciencias: [
      "Faça experimentos simples para entender conceitos na prática",
      "Use analogias do dia a dia para explicar fenômenos científicos",
      "Desenhe diagramas para visualizar processos complexos",
    ],
    geografia: [
      "Use mapas e atlas para localizar lugares estudados",
      "Relacione aspectos físicos com aspectos humanos",
      "Acompanhe notícias para entender geografia atual",
    ],
    portugues: [
      "Leia diversos tipos de texto para ampliar vocabulário",
      "Pratique redação regularmente",
      "Analise textos para entender estruturas gramaticais",
    ],
  },
}

// Estado do chat
const chatState = {
  messages: [],
  isTyping: false,
  lastActivity: Date.now(),
}

/**
 * Inicializa a página da IA
 */
document.addEventListener("DOMContentLoaded", () => {
  initializeAI()
})

/**
 * Configura todos os elementos e eventos da página
 */
function initializeAI() {
  setupEventListeners()
  loadUserPerformance()
  updatePerformanceDisplay()
  generateInitialInsights()

  // Simula análise inicial após 2 segundos
  setTimeout(() => {
    sendAIMessage("Analisei seu histórico de atividades. Vejo que você está começando sua jornada de aprendizado! 🚀")
  }, 2000)

  console.log("IgnisTech AI: Página inicializada com sucesso")
}

/**
 * Configura os event listeners
 */
function setupEventListeners() {
  const messageInput = document.getElementById("messageInput")
  const sendBtn = document.getElementById("sendBtn")

  // Enter para enviar mensagem
  messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  })

  // Atualiza estado do botão baseado no input
  messageInput.addEventListener("input", () => {
    const hasText = messageInput.value.trim().length > 0
    sendBtn.disabled = !hasText || chatState.isTyping
  })

  // Simula atividade periódica da IA
  setInterval(simulateAIActivity, 30000) // A cada 30 segundos
}

/**
 * Carrega dados de performance do localStorage
 */
function loadUserPerformance() {
  const saved = localStorage.getItem("ignistech_performance")
  if (saved) {
    Object.assign(userPerformance, JSON.parse(saved))
  }

  // Simula alguns dados se não houver nenhum
  if (userPerformance.resumos.visualizados === 0) {
    userPerformance.resumos.visualizados = Math.floor(Math.random() * 10) + 1
    userPerformance.flashcards.tentativas = Math.floor(Math.random() * 20) + 5
    userPerformance.flashcards.acertos = Math.floor(userPerformance.flashcards.tentativas * 0.7)
    userPerformance.flashcards.erros = userPerformance.flashcards.tentativas - userPerformance.flashcards.acertos
    userPerformance.quizzes.realizados = Math.floor(Math.random() * 5) + 1
    userPerformance.quizzes.pontuacaoTotal = Math.floor(Math.random() * 1000) + 200
    userPerformance.quizzes.acertos = Math.floor(Math.random() * 30) + 10
    userPerformance.quizzes.erros = Math.floor(Math.random() * 15) + 5
  }
}

/**
 * Atualiza a exibição de performance
 */
function updatePerformanceDisplay() {
  document.getElementById("resumosCount").textContent = userPerformance.resumos.visualizados

  const flashcardAccuracy =
    userPerformance.flashcards.tentativas > 0
      ? Math.round((userPerformance.flashcards.acertos / userPerformance.flashcards.tentativas) * 100)
      : 0
  document.getElementById("flashcardsAccuracy").textContent = `${flashcardAccuracy}%`

  document.getElementById("quizzesScore").textContent = userPerformance.quizzes.pontuacaoTotal
}

/**
 * Gera insights iniciais baseados na performance
 */
function generateInitialInsights() {
  const insightsList = document.getElementById("insightsList")
  const insights = []

  // Análise de resumos
  if (userPerformance.resumos.visualizados < 5) {
    insights.push({
      icon: "📚",
      text: "Explore mais resumos para ampliar seu conhecimento base",
    })
  }

  // Análise de flashcards
  const flashcardAccuracy =
    userPerformance.flashcards.tentativas > 0
      ? (userPerformance.flashcards.acertos / userPerformance.flashcards.tentativas) * 100
      : 0

  if (flashcardAccuracy < 70) {
    insights.push({
      icon: "🎯",
      text: "Pratique mais flashcards para melhorar a retenção",
    })
  } else if (flashcardAccuracy > 85) {
    insights.push({
      icon: "🌟",
      text: "Excelente performance nos flashcards! Continue assim!",
    })
  }

  // Análise de quizzes
  if (userPerformance.quizzes.realizados < 3) {
    insights.push({
      icon: "❓",
      text: "Faça mais quizzes para testar seus conhecimentos",
    })
  }

  // Se não há insights específicos, adiciona um genérico
  if (insights.length === 0) {
    insights.push({
      icon: "🚀",
      text: "Você está no caminho certo! Continue estudando regularmente",
    })
  }

  // Atualiza a interface
  insightsList.innerHTML = insights
    .map(
      (insight) => `
        <div class="insight-item">
            <span class="insight-icon">${insight.icon}</span>
            <span class="insight-text">${insight.text}</span>
        </div>
    `,
    )
    .join("")
}

/**
 * Envia uma mensagem do usuário
 */
function sendMessage() {
  const messageInput = document.getElementById("messageInput")
  const message = messageInput.value.trim()

  if (!message || chatState.isTyping) return

  // Adiciona mensagem do usuário
  addMessage(message, "user")
  messageInput.value = ""

  // Processa resposta da IA
  setTimeout(() => {
    processAIResponse(message)
  }, 500)
}

/**
 * Envia uma pergunta rápida
 * @param {string} type - Tipo da pergunta rápida
 */
function askQuickQuestion(type) {
  const questions = {
    performance: "Como está meu desempenho geral?",
    tips: "Me dê algumas dicas de estudo",
    "weak-areas": "Quais são minhas áreas mais fracas?",
  }

  const question = questions[type]
  if (question) {
    addMessage(question, "user")
    setTimeout(() => {
      processAIResponse(question)
    }, 500)
  }
}

/**
 * Adiciona uma mensagem ao chat
 * @param {string} text - Texto da mensagem
 * @param {string} sender - Remetente ('user' ou 'ai')
 */
function addMessage(text, sender) {
  const chatMessages = document.getElementById("chatMessages")
  const messageDiv = document.createElement("div")
  messageDiv.className = `message ${sender}-message`

  const avatar = sender === "user" ? "👤" : "🤖"
  const time = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })

  messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <div class="message-text">${text}</div>
            <div class="message-time">${time}</div>
        </div>
    `

  chatMessages.appendChild(messageDiv)
  chatMessages.scrollTop = chatMessages.scrollHeight

  // Adiciona à lista de mensagens
  chatState.messages.push({ text, sender, time: Date.now() })
}

/**
 * Envia uma mensagem da IA
 * @param {string} message - Mensagem da IA
 */
function sendAIMessage(message) {
  showTypingIndicator()

  setTimeout(() => {
    hideTypingIndicator()
    addMessage(message, "ai")
  }, 1500)
}

/**
 * Processa a resposta da IA baseada na mensagem do usuário
 * @param {string} userMessage - Mensagem do usuário
 */
function processAIResponse(userMessage) {
  const message = userMessage.toLowerCase()
  let response = ""

  // Análise de intenção simples
  if (message.includes("desempenho") || message.includes("performance")) {
    response = generatePerformanceResponse()
  } else if (message.includes("dica") || message.includes("ajuda") || message.includes("como")) {
    response = generateTipsResponse()
  } else if (message.includes("fraca") || message.includes("melhorar") || message.includes("dificuldade")) {
    response = generateWeakAreasResponse()
  } else if (message.includes("obrigad") || message.includes("valeu") || message.includes("legal")) {
    response = getRandomResponse(aiKnowledge.responses.encouragement)
  } else if (message.includes("oi") || message.includes("olá") || message.includes("hello")) {
    response = getRandomResponse(aiKnowledge.responses.greeting)
  } else {
    response = generateContextualResponse(message)
  }

  sendAIMessage(response)
}

/**
 * Gera resposta sobre performance
 */
function generatePerformanceResponse() {
  const intro = getRandomResponse(aiKnowledge.responses.performance)
  const flashcardAccuracy =
    userPerformance.flashcards.tentativas > 0
      ? Math.round((userPerformance.flashcards.acertos / userPerformance.flashcards.tentativas) * 100)
      : 0

  let analysis = `\n\n📊 **Seu Resumo:**\n`
  analysis += `• Resumos visualizados: ${userPerformance.resumos.visualizados}\n`
  analysis += `• Precisão nos flashcards: ${flashcardAccuracy}%\n`
  analysis += `• Pontuação total em quizzes: ${userPerformance.quizzes.pontuacaoTotal}\n\n`

  if (flashcardAccuracy >= 80) {
    analysis += "🌟 Excelente performance! Você está dominando bem o conteúdo."
  } else if (flashcardAccuracy >= 60) {
    analysis += "👍 Bom progresso! Continue praticando para melhorar ainda mais."
  } else {
    analysis += "💪 Há espaço para melhoria. Que tal revisar os resumos antes dos flashcards?"
  }

  return intro + analysis
}

/**
 * Gera resposta com dicas de estudo
 */
function generateTipsResponse() {
  const intro = getRandomResponse(aiKnowledge.responses.tips)
  const tips = getRandomItems(aiKnowledge.studyTips, 3)

  return intro + "\n\n" + tips.join("\n\n")
}

/**
 * Gera resposta sobre áreas fracas
 */
function generateWeakAreasResponse() {
  const intro = getRandomResponse(aiKnowledge.responses.weakAreas)
  const flashcardAccuracy =
    userPerformance.flashcards.tentativas > 0
      ? (userPerformance.flashcards.acertos / userPerformance.flashcards.tentativas) * 100
      : 0

  let suggestions = "\n\n"

  if (userPerformance.resumos.visualizados < 5) {
    suggestions += "📚 **Resumos:** Explore mais conteúdos para ampliar sua base de conhecimento\n\n"
  }

  if (flashcardAccuracy < 70) {
    suggestions += "🧠 **Flashcards:** Pratique mais para melhorar a retenção de informações\n\n"
  }

  if (userPerformance.quizzes.realizados < 3) {
    suggestions += "❓ **Quizzes:** Faça mais testes para avaliar seu conhecimento\n\n"
  }

  if (suggestions === "\n\n") {
    suggestions = "\n\n🎉 Na verdade, você está indo muito bem em todas as áreas! Continue assim!"
  }

  return intro + suggestions
}

/**
 * Gera resposta contextual baseada na mensagem
 * @param {string} message - Mensagem do usuário
 */
function generateContextualResponse(message) {
  // Detecta matérias mencionadas
  const subjects = ["matemática", "história", "ciências", "geografia", "português"]
  const mentionedSubject = subjects.find((subject) => message.includes(subject))

  if (mentionedSubject) {
    const advice = getRandomResponse(aiKnowledge.subjectAdvice[mentionedSubject] || [])
    return `Sobre ${mentionedSubject}: ${advice}`
  }

  // Resposta genérica
  const genericResponses = [
    "Interessante pergunta! Com base no seu perfil de estudos, recomendo focar na prática regular.",
    "Entendo sua dúvida. Que tal explorar mais os resumos da matéria que você tem mais dificuldade?",
    "Boa pergunta! Lembre-se: a consistência nos estudos é mais importante que a intensidade.",
    "Vejo que você está engajado nos estudos! Continue assim e os resultados virão.",
  ]

  return getRandomResponse(genericResponses)
}

/**
 * Mostra indicador de digitação
 */
function showTypingIndicator() {
  if (chatState.isTyping) return

  chatState.isTyping = true
  const chatMessages = document.getElementById("chatMessages")
  const typingDiv = document.createElement("div")
  typingDiv.className = "message ai-message typing-indicator-message"
  typingDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <div class="message-text typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `

  chatMessages.appendChild(typingDiv)
  chatMessages.scrollTop = chatMessages.scrollHeight

  // Desabilita botão de envio
  document.getElementById("sendBtn").disabled = true
}

/**
 * Remove indicador de digitação
 */
function hideTypingIndicator() {
  chatState.isTyping = false
  const typingIndicator = document.querySelector(".typing-indicator-message")
  if (typingIndicator) {
    typingIndicator.remove()
  }

  // Reabilita botão se há texto
  const messageInput = document.getElementById("messageInput")
  document.getElementById("sendBtn").disabled = messageInput.value.trim().length === 0
}

/**
 * Simula atividade periódica da IA
 */
function simulateAIActivity() {
  const timeSinceLastActivity = Date.now() - chatState.lastActivity

  // Se passou muito tempo sem atividade, envia uma mensagem motivacional
  if (timeSinceLastActivity > 60000 && chatState.messages.length > 0) {
    const motivationalMessages = [
      "👋 Ainda por aí? Que tal fazer um quiz rápido para manter o ritmo?",
      "💡 Lembrete amigável: revisar os flashcards por alguns minutos pode fazer toda a diferença!",
      "🎯 Vejo que você está focado! Lembre-se de fazer pausas regulares.",
      "📚 Que tal explorar um novo resumo? Sempre há algo interessante para aprender!",
    ]

    const message = getRandomResponse(motivationalMessages)
    sendAIMessage(message)
    chatState.lastActivity = Date.now()
  }
}

/**
 * Limpa o chat
 */
function clearChat() {
  if (confirm("Tem certeza que deseja limpar a conversa?")) {
    const chatMessages = document.getElementById("chatMessages")
    chatMessages.innerHTML = `
            <div class="message ai-message">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <div class="message-text">
                        Chat limpo! Como posso ajudar você agora?
                    </div>
                    <div class="message-time">Agora</div>
                </div>
            </div>
        `
    chatState.messages = []
  }
}

/**
 * Gera relatório de desempenho
 */
function generateReport() {
  const report =
    `📊 **Relatório de Desempenho**\n\n` + `${generatePerformanceResponse()}\n\n` + `${generateTipsResponse()}`

  sendAIMessage(report)
}

/**
 * Utilitários
 */
function getRandomResponse(responses) {
  return responses[Math.floor(Math.random() * responses.length)]
}

function getRandomItems(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

/**
 * Função de logout
 */
function logout() {
  if (confirm("Tem certeza que deseja sair?")) {
    // Salva dados de performance
    localStorage.setItem("ignistech_performance", JSON.stringify(userPerformance))

    document.body.style.opacity = "0"
    document.body.style.transition = "opacity 0.5s ease"

    setTimeout(() => {
      window.location.href = "index.html"
    }, 500)
  }
}

// Atualiza timestamp de atividade quando há interação
document.addEventListener("click", () => {
  chatState.lastActivity = Date.now()
})

document.addEventListener("keypress", () => {
  chatState.lastActivity = Date.now()
})
