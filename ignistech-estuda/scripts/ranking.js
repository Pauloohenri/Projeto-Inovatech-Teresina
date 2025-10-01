/**
 * IgnisTech - Estuda+ | Ranking JavaScript
 * Sistema de ranking gamificado com leaderboard e conquistas
 * Inclui animações, pontuação e sistema de metas
 */

// Dados simulados do ranking
const rankingData = {
  students: [
    {
      id: 1,
      name: "João Santos",
      avatar: "/student-avatar-1.png",
      points: 3120,
      weeklyChange: 280,
      subjects: { matematica: 850, historia: 720, ciencias: 680, geografia: 520, portugues: 350 },
      achievements: ["first-quiz", "math-master", "streak-7", "top-student"],
    },
    {
      id: 2,
      name: "Maria Silva",
      avatar: "/student-avatar-2.png",
      points: 2450,
      weeklyChange: 150,
      subjects: { matematica: 520, historia: 680, ciencias: 590, geografia: 380, portugues: 280 },
      achievements: ["first-quiz", "history-buff", "streak-5"],
    },
    {
      id: 3,
      name: "Ana Costa",
      avatar: "/student-avatar-3.png",
      points: 1890,
      weeklyChange: 95,
      subjects: { matematica: 380, historia: 420, ciencias: 450, geografia: 340, portugues: 300 },
      achievements: ["first-quiz", "science-explorer"],
    },
    {
      id: 4,
      name: "Pedro Oliveira",
      avatar: "/student-avatar-4.png",
      points: 1720,
      weeklyChange: -20,
      subjects: { matematica: 420, historia: 350, ciencias: 380, geografia: 290, portugues: 280 },
      achievements: ["first-quiz"],
    },
    {
      id: 5,
      name: "Aluno", // Usuário atual
      avatar: "/current-user-avatar.png",
      points: 1650,
      weeklyChange: 120,
      subjects: { matematica: 350, historia: 320, ciencias: 400, geografia: 310, portugues: 270 },
      achievements: ["first-quiz", "flashcard-fan"],
    },
    {
      id: 6,
      name: "Lucas Ferreira",
      avatar: "/student-avatar-6.png",
      points: 1420,
      weeklyChange: 80,
      subjects: { matematica: 280, historia: 290, ciencias: 320, geografia: 260, portugues: 270 },
      achievements: ["first-quiz"],
    },
    {
      id: 7,
      name: "Carla Santos",
      avatar: "/student-avatar-7.png",
      points: 1180,
      weeklyChange: 60,
      subjects: { matematica: 240, historia: 250, ciencias: 280, geografia: 220, portugues: 190 },
      achievements: ["first-quiz"],
    },
  ],
}

// Definições de conquistas
const achievements = {
  "first-quiz": {
    name: "Primeira Tentativa",
    icon: "🎯",
    description: "Completou seu primeiro quiz",
    points: 50,
  },
  "math-master": {
    name: "Mestre da Matemática",
    icon: "📐",
    description: "Acertou 90% em matemática",
    points: 100,
  },
  "history-buff": {
    name: "Historiador",
    icon: "📜",
    description: "Expert em história",
    points: 100,
  },
  "science-explorer": {
    name: "Explorador Científico",
    icon: "🔬",
    description: "Descobridor de ciências",
    points: 100,
  },
  "flashcard-fan": {
    name: "Mestre dos Flashcards",
    icon: "🧠",
    description: "Completou 50 flashcards",
    points: 75,
  },
  "streak-5": {
    name: "Sequência de 5",
    icon: "🔥",
    description: "5 dias consecutivos estudando",
    points: 150,
  },
  "streak-7": {
    name: "Sequência de 7",
    icon: "⚡",
    description: "7 dias consecutivos estudando",
    points: 200,
  },
  "top-student": {
    name: "Aluno Destaque",
    icon: "👑",
    description: "Ficou em 1º lugar",
    points: 300,
  },
}

// Metas do usuário
const userGoals = [
  {
    title: "Subir para 4º lugar",
    progress: 85,
    target: "Ganhe mais 70 pontos",
  },
  {
    title: "Completar 10 quizzes",
    progress: 60,
    target: "4 quizzes restantes",
  },
  {
    title: "Sequência de 5 dias",
    progress: 40,
    target: "2 dias restantes",
  },
]

// Estado atual
const currentFilter = {
  period: "semanal",
  subject: "todas",
}

/**
 * Inicializa a página de ranking
 */
document.addEventListener("DOMContentLoaded", () => {
  initializeRanking()
})

/**
 * Configura todos os elementos e eventos da página
 */
function initializeRanking() {
  setupEventListeners()
  updateRankingDisplay()
  updateUserStats()
  loadAchievements()
  loadGoals()

  // Simula nova conquista após 3 segundos
  setTimeout(() => {
    if (Math.random() > 0.7) {
      showAchievementModal("streak-5")
    }
  }, 3000)

  console.log("IgnisTech Ranking: Página inicializada com sucesso")
}

/**
 * Configura os event listeners
 */
function setupEventListeners() {
  const periodFilter = document.getElementById("periodFilter")
  const subjectFilter = document.getElementById("subjectFilter")

  periodFilter.addEventListener("change", (e) => {
    currentFilter.period = e.target.value
    updateRankingDisplay()
  })

  subjectFilter.addEventListener("change", (e) => {
    currentFilter.subject = e.target.value
    updateRankingDisplay()
  })
}

/**
 * Atualiza a exibição do ranking
 */
function updateRankingDisplay() {
  const rankingList = document.getElementById("rankingList")
  let students = [...rankingData.students]

  // Filtra por matéria se necessário
  if (currentFilter.subject !== "todas") {
    students = students
      .map((student) => ({
        ...student,
        points: student.subjects[currentFilter.subject] || 0,
      }))
      .sort((a, b) => b.points - a.points)
  } else {
    students.sort((a, b) => b.points - a.points)
  }

  // Gera HTML do ranking
  const rankingHTML = students
    .map((student, index) => {
      const position = index + 1
      const isCurrentUser = student.name === "Aluno"
      const trendClass = student.weeklyChange > 0 ? "trend-up" : student.weeklyChange < 0 ? "trend-down" : ""
      const trendIcon = student.weeklyChange > 0 ? "↗" : student.weeklyChange < 0 ? "↘" : "→"

      return `
                <div class="ranking-item ${isCurrentUser ? "current-user" : ""}" data-student-id="${student.id}">
                    <div class="item-position">${position}º</div>
                    <img src="${student.avatar}" alt="${student.name}" class="item-avatar">
                    <div class="item-info">
                        <div class="item-name">${student.name}</div>
                        <div class="item-details">${student.achievements.length} conquistas</div>
                    </div>
                    <div class="item-points">${student.points.toLocaleString()}</div>
                    <div class="item-trend ${trendClass}">
                        ${trendIcon} ${Math.abs(student.weeklyChange)}
                    </div>
                </div>
            `
    })
    .join("")

  rankingList.innerHTML = rankingHTML

  // Adiciona animações
  setTimeout(() => {
    const items = document.querySelectorAll(".ranking-item")
    items.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`
      item.classList.add("animate-in")
    })
  }, 100)
}

/**
 * Atualiza as estatísticas do usuário
 */
function updateUserStats() {
  const currentUser = rankingData.students.find((s) => s.name === "Aluno")
  if (!currentUser) return

  // Encontra posição do usuário
  const sortedStudents = [...rankingData.students].sort((a, b) => b.points - a.points)
  const userPosition = sortedStudents.findIndex((s) => s.name === "Aluno") + 1

  // Atualiza interface
  document.getElementById("userPosition").textContent = `${userPosition}º`
  document.getElementById("userPoints").textContent = currentUser.points.toLocaleString()

  const weeklyChange = currentUser.weeklyChange
  const trendElement = document.getElementById("userTrend")
  trendElement.textContent = weeklyChange > 0 ? `+${weeklyChange}` : weeklyChange.toString()
  trendElement.style.color = weeklyChange > 0 ? "#4caf50" : weeklyChange < 0 ? "#f44336" : "#666"
}

/**
 * Carrega as conquistas do usuário
 */
function loadAchievements() {
  const achievementsGrid = document.getElementById("achievementsGrid")
  const currentUser = rankingData.students.find((s) => s.name === "Aluno")
  const userAchievements = currentUser ? currentUser.achievements : []

  // Lista todas as conquistas possíveis
  const allAchievements = Object.keys(achievements)

  const achievementsHTML = allAchievements
    .map((achievementId) => {
      const achievement = achievements[achievementId]
      const isUnlocked = userAchievements.includes(achievementId)

      return `
                <div class="achievement-badge ${isUnlocked ? "unlocked" : "locked"}" 
                     onclick="showAchievementDetails('${achievementId}')"
                     title="${achievement.description}">
                    <div class="achievement-icon">${achievement.icon}</div>
                    <div class="achievement-name">${achievement.name}</div>
                </div>
            `
    })
    .join("")

  achievementsGrid.innerHTML = achievementsHTML
}

/**
 * Carrega as metas do usuário
 */
function loadGoals() {
  const goalsList = document.getElementById("goalsList")

  const goalsHTML = userGoals
    .map(
      (goal) => `
            <div class="goal-item">
                <div class="goal-title">${goal.title}</div>
                <div class="goal-progress">${goal.target}</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${goal.progress}%"></div>
                </div>
            </div>
        `,
    )
    .join("")

  goalsList.innerHTML = goalsHTML
}

/**
 * Exibe modal de conquista
 * @param {string} achievementId - ID da conquista
 */
function showAchievementModal(achievementId) {
  const achievement = achievements[achievementId]
  if (!achievement) return

  // Atualiza conteúdo do modal
  document.getElementById("modalAchievementBadge").textContent = achievement.icon
  document.getElementById("modalAchievementTitle").textContent = achievement.name
  document.getElementById("modalAchievementDesc").textContent = achievement.description
  document.getElementById("modalPointsEarned").textContent = `+${achievement.points} pontos`

  // Exibe modal
  const modal = document.getElementById("achievementModal")
  modal.classList.add("show")

  // Adiciona conquista ao usuário se não tiver
  const currentUser = rankingData.students.find((s) => s.name === "Aluno")
  if (currentUser && !currentUser.achievements.includes(achievementId)) {
    currentUser.achievements.push(achievementId)
    currentUser.points += achievement.points

    // Atualiza displays
    setTimeout(() => {
      updateUserStats()
      loadAchievements()
      updateRankingDisplay()
    }, 2000)

    // Mostra animação de pontos
    showPointsAnimation(achievement.points)
  }
}

/**
 * Fecha modal de conquista
 */
function closeAchievementModal() {
  const modal = document.getElementById("achievementModal")
  modal.classList.remove("show")
}

/**
 * Exibe detalhes de uma conquista
 * @param {string} achievementId - ID da conquista
 */
function showAchievementDetails(achievementId) {
  const achievement = achievements[achievementId]
  const currentUser = rankingData.students.find((s) => s.name === "Aluno")
  const isUnlocked = currentUser && currentUser.achievements.includes(achievementId)

  if (isUnlocked) {
    alert(`🏆 ${achievement.name}\n\n${achievement.description}\n\nPontos: ${achievement.points}`)
  } else {
    alert(
      `🔒 ${achievement.name}\n\n${achievement.description}\n\nPontos: ${achievement.points}\n\n(Ainda não desbloqueada)`,
    )
  }
}

/**
 * Mostra animação de pontos ganhos
 * @param {number} points - Pontos ganhos
 */
function showPointsAnimation(points) {
  const popup = document.createElement("div")
  popup.className = "points-popup"
  popup.textContent = `+${points} pontos!`

  document.body.appendChild(popup)

  setTimeout(() => {
    popup.remove()
  }, 2000)
}

/**
 * Simula ganho de pontos (para demonstração)
 */
function simulatePointsGain() {
  const currentUser = rankingData.students.find((s) => s.name === "Aluno")
  if (!currentUser) return

  const pointsGained = Math.floor(Math.random() * 100) + 50
  currentUser.points += pointsGained
  currentUser.weeklyChange += pointsGained

  showPointsAnimation(pointsGained)
  updateUserStats()
  updateRankingDisplay()

  // Chance de desbloquear conquista
  if (Math.random() > 0.8) {
    const availableAchievements = Object.keys(achievements).filter((id) => !currentUser.achievements.includes(id))
    if (availableAchievements.length > 0) {
      const randomAchievement = availableAchievements[Math.floor(Math.random() * availableAchievements.length)]
      setTimeout(() => showAchievementModal(randomAchievement), 1000)
    }
  }
}

/**
 * Adiciona efeitos visuais aos elementos do ranking
 */
function addVisualEffects() {
  // Efeito hover nos itens do ranking
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(".ranking-item")) {
      const item = e.target.closest(".ranking-item")
      item.style.transform = "translateX(10px) scale(1.02)"
    }
  })

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(".ranking-item")) {
      const item = e.target.closest(".ranking-item")
      item.style.transform = ""
    }
  })

  // Efeito de clique nos cards de estatística
  document.querySelectorAll(".stat-card").forEach((card) => {
    card.addEventListener("click", () => {
      card.style.transform = "scale(0.95)"
      setTimeout(() => {
        card.style.transform = ""
      }, 150)
    })
  })
}

/**
 * Função de logout
 */
function logout() {
  if (confirm("Tem certeza que deseja sair?")) {
    document.body.style.opacity = "0"
    document.body.style.transition = "opacity 0.5s ease"

    setTimeout(() => {
      window.location.href = "index.html"
    }, 500)
  }
}

// Adiciona efeitos visuais após carregamento
setTimeout(addVisualEffects, 1000)

// Simula atividade periódica (para demonstração)
setInterval(() => {
  if (Math.random() > 0.95) {
    // 5% de chance a cada intervalo
    simulatePointsGain()
  }
}, 10000) // A cada 10 segundos

// Adiciona CSS para animações dinâmicas
const style = document.createElement("style")
style.textContent = `
    .animate-in {
        animation: slideInUp 0.5s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`
document.head.appendChild(style)
