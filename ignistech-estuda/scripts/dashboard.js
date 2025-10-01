/**
 * IgnisTech - Estuda+ | Dashboard JavaScript
 * Gerencia a funcionalidade dos resumos por matéria
 * Inclui navegação entre matérias, exibição de cards e modal
 */

// Dados dos resumos organizados por matéria
const summariesData = {
  matematica: [
    {
      id: 1,
      title: "Equações do 1º Grau",
      icon: "📐",
      preview: "Equações lineares são expressões matemáticas onde a incógnita tem expoente 1. Forma geral: ax + b = 0",
      difficulty: "facil",
      content: `
                <h4>Equações do 1º Grau</h4>
                <p><strong>Definição:</strong> Uma equação do 1º grau é uma igualdade que contém uma incógnita de expoente 1.</p>
                
                <p><strong>Forma Geral:</strong> ax + b = 0, onde a ≠ 0</p>
                
                <h5>Passos para Resolver:</h5>
                <ol>
                    <li>Isole os termos com incógnita de um lado</li>
                    <li>Isole os números do outro lado</li>
                    <li>Divida ambos os lados pelo coeficiente da incógnita</li>
                </ol>
                
                <h5>Exemplo:</h5>
                <p>2x + 6 = 14</p>
                <p>2x = 14 - 6</p>
                <p>2x = 8</p>
                <p>x = 4</p>
            `,
    },
    {
      id: 2,
      title: "Frações",
      icon: "🔢",
      preview: "Frações representam partes de um todo. Compostas por numerador e denominador.",
      difficulty: "medio",
      content: `
                <h4>Frações</h4>
                <p><strong>Definição:</strong> Uma fração representa uma ou mais partes iguais de um todo.</p>
                
                <p><strong>Componentes:</strong></p>
                <ul>
                    <li><strong>Numerador:</strong> número de partes consideradas</li>
                    <li><strong>Denominador:</strong> número total de partes</li>
                </ul>
                
                <h5>Operações com Frações:</h5>
                <p><strong>Soma:</strong> Mesmo denominador: some os numeradores</p>
                <p><strong>Multiplicação:</strong> Multiplique numerador por numerador e denominador por denominador</p>
                
                <h5>Exemplo:</h5>
                <p>1/4 + 2/4 = 3/4</p>
                <p>2/3 × 3/4 = 6/12 = 1/2</p>
            `,
    },
    {
      id: 3,
      title: "Geometria Básica",
      icon: "📏",
      preview: "Estudo das formas, tamanhos e propriedades das figuras geométricas no plano e no espaço.",
      difficulty: "medio",
      content: `
                <h4>Geometria Básica</h4>
                <p><strong>Figuras Planas:</strong></p>
                
                <h5>Triângulo:</h5>
                <p>Área = (base × altura) ÷ 2</p>
                <p>Perímetro = soma dos três lados</p>
                
                <h5>Quadrado:</h5>
                <p>Área = lado²</p>
                <p>Perímetro = 4 × lado</p>
                
                <h5>Círculo:</h5>
                <p>Área = π × raio²</p>
                <p>Perímetro = 2 × π × raio</p>
            `,
    },
  ],
  historia: [
    {
      id: 4,
      title: "Brasil Colonial",
      icon: "🏛️",
      preview: "Período da história brasileira de 1500 a 1822, marcado pela colonização portuguesa.",
      difficulty: "medio",
      content: `
                <h4>Brasil Colonial (1500-1822)</h4>
                
                <h5>Principais Características:</h5>
                <ul>
                    <li>Economia baseada na agricultura de exportação</li>
                    <li>Uso de mão de obra escrava</li>
                    <li>Sistema de capitanias hereditárias</li>
                    <li>Pacto Colonial</li>
                </ul>
                
                <h5>Ciclos Econômicos:</h5>
                <p><strong>Pau-brasil (1500-1530):</strong> Primeira atividade econômica</p>
                <p><strong>Açúcar (1530-1700):</strong> Principal produto de exportação</p>
                <p><strong>Ouro (1700-1800):</strong> Mineração em Minas Gerais</p>
            `,
    },
    {
      id: 5,
      title: "Revolução Industrial",
      icon: "⚙️",
      preview: "Transformação econômica e social iniciada na Inglaterra no século XVIII.",
      difficulty: "dificil",
      content: `
                <h4>Revolução Industrial</h4>
                
                <h5>1ª Revolução Industrial (1760-1840):</h5>
                <ul>
                    <li>Máquina a vapor</li>
                    <li>Indústria têxtil</li>
                    <li>Transporte ferroviário</li>
                </ul>
                
                <h5>Consequências:</h5>
                <ul>
                    <li>Urbanização acelerada</li>
                    <li>Surgimento da classe operária</li>
                    <li>Mudanças nas relações de trabalho</li>
                    <li>Poluição ambiental</li>
                </ul>
            `,
    },
  ],
  ciencias: [
    {
      id: 6,
      title: "Sistema Solar",
      icon: "🌌",
      preview: "Conjunto de corpos celestes que orbitam o Sol, incluindo planetas, luas e asteroides.",
      difficulty: "facil",
      content: `
                <h4>Sistema Solar</h4>
                
                <h5>Planetas (em ordem de distância do Sol):</h5>
                <ol>
                    <li><strong>Mercúrio:</strong> Menor planeta, mais próximo do Sol</li>
                    <li><strong>Vênus:</strong> Planeta mais quente</li>
                    <li><strong>Terra:</strong> Único planeta com vida conhecida</li>
                    <li><strong>Marte:</strong> Planeta vermelho</li>
                    <li><strong>Júpiter:</strong> Maior planeta</li>
                    <li><strong>Saturno:</strong> Planeta com anéis</li>
                    <li><strong>Urano:</strong> Planeta inclinado</li>
                    <li><strong>Netuno:</strong> Planeta mais distante</li>
                </ol>
            `,
    },
    {
      id: 7,
      title: "Fotossíntese",
      icon: "🌱",
      preview: "Processo pelo qual as plantas produzem seu próprio alimento usando luz solar.",
      difficulty: "medio",
      content: `
                <h4>Fotossíntese</h4>
                
                <p><strong>Definição:</strong> Processo pelo qual plantas e alguns microrganismos convertem luz solar em energia química.</p>
                
                <h5>Equação da Fotossíntese:</h5>
                <p>6CO₂ + 6H₂O + luz solar → C₆H₁₂O₆ + 6O₂</p>
                
                <h5>Fases:</h5>
                <p><strong>Fase Clara:</strong> Ocorre nos tilacoides, produz ATP e NADPH</p>
                <p><strong>Fase Escura (Ciclo de Calvin):</strong> Ocorre no estroma, produz glicose</p>
                
                <h5>Importância:</h5>
                <ul>
                    <li>Produção de oxigênio</li>
                    <li>Base da cadeia alimentar</li>
                    <li>Remoção de CO₂ da atmosfera</li>
                </ul>
            `,
    },
  ],
  geografia: [
    {
      id: 8,
      title: "Relevo Brasileiro",
      icon: "🏔️",
      preview: "Características e formações do relevo do território brasileiro.",
      difficulty: "medio",
      content: `
                <h4>Relevo Brasileiro</h4>
                
                <h5>Principais Formas de Relevo:</h5>
                
                <p><strong>Planaltos (58%):</strong></p>
                <ul>
                    <li>Planalto Central</li>
                    <li>Planalto Atlântico</li>
                    <li>Planalto da Borborema</li>
                </ul>
                
                <p><strong>Planícies (41%):</strong></p>
                <ul>
                    <li>Planície Amazônica</li>
                    <li>Planície do Pantanal</li>
                    <li>Planície Costeira</li>
                </ul>
                
                <p><strong>Depressões (1%):</strong></p>
                <ul>
                    <li>Depressão Sertaneja</li>
                    <li>Depressão da Amazônia Ocidental</li>
                </ul>
            `,
    },
  ],
  portugues: [
    {
      id: 9,
      title: "Classes Gramaticais",
      icon: "📝",
      preview: "Classificação das palavras de acordo com sua função na frase.",
      difficulty: "medio",
      content: `
                <h4>Classes Gramaticais</h4>
                
                <h5>Classes Variáveis:</h5>
                <ul>
                    <li><strong>Substantivo:</strong> nomeia seres, objetos, sentimentos</li>
                    <li><strong>Adjetivo:</strong> caracteriza o substantivo</li>
                    <li><strong>Artigo:</strong> determina o substantivo (o, a, um, uma)</li>
                    <li><strong>Pronome:</strong> substitui ou acompanha o substantivo</li>
                    <li><strong>Numeral:</strong> indica quantidade ou ordem</li>
                    <li><strong>Verbo:</strong> indica ação, estado ou fenômeno</li>
                </ul>
                
                <h5>Classes Invariáveis:</h5>
                <ul>
                    <li><strong>Advérbio:</strong> modifica verbo, adjetivo ou outro advérbio</li>
                    <li><strong>Preposição:</strong> liga palavras (de, para, com, em)</li>
                    <li><strong>Conjunção:</strong> liga orações (e, mas, ou, porque)</li>
                    <li><strong>Interjeição:</strong> expressa emoção (ah!, oh!, uau!)</li>
                </ul>
            `,
    },
  ],
}

// Estado atual da aplicação
let currentSubject = "matematica"

/**
 * Inicializa a página do dashboard
 */
document.addEventListener("DOMContentLoaded", () => {
  initializeDashboard()
})

/**
 * Configura todos os elementos e eventos da página
 */
function initializeDashboard() {
  setupSubjectButtons()
  setupNavigation()
  loadSummaries(currentSubject)
  setupModalEvents()

  console.log("IgnisTech Dashboard: Página inicializada com sucesso")
}

/**
 * Configura os botões de matérias
 */
function setupSubjectButtons() {
  const subjectButtons = document.querySelectorAll(".subject-btn")

  subjectButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove classe active de todos os botões
      subjectButtons.forEach((btn) => btn.classList.remove("active"))

      // Adiciona classe active ao botão clicado
      button.classList.add("active")

      // Atualiza matéria atual
      currentSubject = button.dataset.subject

      // Carrega resumos da matéria selecionada
      loadSummaries(currentSubject)
    })
  })
}

/**
 * Configura a navegação entre páginas
 */
function setupNavigation() {
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Adiciona efeito visual de clique
      link.style.transform = "scale(0.95)"
      setTimeout(() => {
        link.style.transform = ""
      }, 150)
    })
  })
}

/**
 * Carrega e exibe os resumos da matéria selecionada
 * @param {string} subject - Matéria selecionada
 */
function loadSummaries(subject) {
  const summariesGrid = document.getElementById("summariesGrid")
  const summaries = summariesData[subject] || []

  // Mostra estado de carregamento
  summariesGrid.innerHTML = `
        <div class="loading-state">
            <div class="loading-spinner"></div>
            <span>Carregando resumos...</span>
        </div>
    `

  // Simula carregamento
  setTimeout(() => {
    if (summaries.length === 0) {
      summariesGrid.innerHTML = `
                <div class="loading-state">
                    <span>📚 Resumos em breve para esta matéria!</span>
                </div>
            `
      return
    }

    // Gera HTML dos cards
    const cardsHTML = summaries
      .map(
        (summary, index) => `
            <div class="summary-card card-animate" style="animation-delay: ${index * 0.1}s" onclick="openModal(${summary.id})">
                <div class="card-header">
                    <div class="card-icon">${summary.icon}</div>
                    <h3 class="card-title">${summary.title}</h3>
                </div>
                <div class="card-content">
                    ${summary.preview}
                </div>
                <div class="card-footer">
                    <span class="card-difficulty difficulty-${summary.difficulty}">
                        ${getDifficultyText(summary.difficulty)}
                    </span>
                    <a href="#" class="read-more" onclick="event.stopPropagation(); openModal(${summary.id})">
                        Ler mais →
                    </a>
                </div>
            </div>
        `,
      )
      .join("")

    summariesGrid.innerHTML = cardsHTML
  }, 800)
}

/**
 * Retorna o texto da dificuldade
 * @param {string} difficulty - Nível de dificuldade
 * @returns {string} Texto formatado da dificuldade
 */
function getDifficultyText(difficulty) {
  const difficulties = {
    facil: "Fácil",
    medio: "Médio",
    dificil: "Difícil",
  }
  return difficulties[difficulty] || "Médio"
}

/**
 * Abre o modal com o conteúdo completo do resumo
 * @param {number} summaryId - ID do resumo
 */
function openModal(summaryId) {
  // Encontra o resumo em todas as matérias
  let summary = null
  for (const subject in summariesData) {
    summary = summariesData[subject].find((s) => s.id === summaryId)
    if (summary) break
  }

  if (!summary) return

  // Atualiza conteúdo do modal
  document.getElementById("modalTitle").textContent = summary.title
  document.getElementById("modalBody").innerHTML = summary.content

  // Exibe modal
  const modalOverlay = document.getElementById("modalOverlay")
  modalOverlay.classList.add("active")

  // Adiciona listener para fechar com ESC
  document.addEventListener("keydown", handleEscapeKey)
}

/**
 * Fecha o modal
 */
function closeModal() {
  const modalOverlay = document.getElementById("modalOverlay")
  modalOverlay.classList.remove("active")

  // Remove listener do ESC
  document.removeEventListener("keydown", handleEscapeKey)
}

/**
 * Gerencia tecla ESC para fechar modal
 * @param {KeyboardEvent} event - Evento do teclado
 */
function handleEscapeKey(event) {
  if (event.key === "Escape") {
    closeModal()
  }
}

/**
 * Configura eventos do modal
 */
function setupModalEvents() {
  const modalOverlay = document.getElementById("modalOverlay")

  // Fecha modal ao clicar no overlay
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal()
    }
  })
}

/**
 * Função de logout
 */
function logout() {
  if (confirm("Tem certeza que deseja sair?")) {
    // Adiciona efeito de saída
    document.body.style.opacity = "0"
    document.body.style.transition = "opacity 0.5s ease"

    setTimeout(() => {
      window.location.href = "index.html"
    }, 500)
  }
}

/**
 * Adiciona efeitos visuais aos cards
 */
function addCardEffects() {
  const cards = document.querySelectorAll(".summary-card")

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-8px) scale(1.02)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)"
    })
  })
}

// Adiciona efeitos após carregamento dos cards
setTimeout(addCardEffects, 1000)
