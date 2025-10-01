/**
 * IgnisTech - Estuda+ | Login Page JavaScript
 * Gerencia a funcionalidade de login, validação e animações
 * Inclui efeitos visuais e transições suaves
 */

// Aguarda o carregamento completo da página
document.addEventListener("DOMContentLoaded", () => {
  initializeLoginPage()
})

/**
 * Inicializa todas as funcionalidades da página de login
 */
function initializeLoginPage() {
  const loginForm = document.getElementById("loginForm")
  const loginBtn = document.getElementById("loginBtn")
  const usernameInput = document.getElementById("username")
  const passwordInput = document.getElementById("password")

  // Adiciona listeners para o formulário
  loginForm.addEventListener("submit", handleLogin)

  // Adiciona efeitos visuais nos inputs
  addInputEffects()

  // Adiciona animações de entrada
  addEntryAnimations()

  console.log("IgnisTech Login: Página inicializada com sucesso")
}

/**
 * Gerencia o processo de login
 * @param {Event} event - Evento de submit do formulário
 */
function handleLogin(event) {
  event.preventDefault()

  const username = document.getElementById("username").value.trim()
  const password = document.getElementById("password").value.trim()
  const loginBtn = document.getElementById("loginBtn")

  // Validação básica
  if (!username || !password) {
    showMessage("Por favor, preencha todos os campos.", "error")
    return
  }

  // Adiciona estado de carregamento
  loginBtn.classList.add("loading")
  loginBtn.disabled = true

  // Simula processo de autenticação
  setTimeout(() => {
    if (validateCredentials(username, password)) {
      showMessage("Login realizado com sucesso!", "success")

      // Redireciona para a página principal após 1.5 segundos
      setTimeout(() => {
        window.location.href = "dashboard.html"
      }, 1500)
    } else {
      showMessage("Usuário ou senha incorretos. Tente: aluno/123", "error")
      loginBtn.classList.remove("loading")
      loginBtn.disabled = false
    }
  }, 1500)
}

/**
 * Valida as credenciais de login
 * @param {string} username - Nome de usuário
 * @param {string} password - Senha
 * @returns {boolean} - True se as credenciais são válidas
 */
function validateCredentials(username, password) {
  // Credenciais de demonstração
  const validCredentials = [
    { username: "aluno", password: "123" },
    { username: "estudante", password: "456" },
    { username: "demo", password: "demo" },
  ]

  return validCredentials.some((cred) => cred.username === username && cred.password === password)
}

/**
 * Exibe mensagens de feedback para o usuário
 * @param {string} message - Mensagem a ser exibida
 * @param {string} type - Tipo da mensagem (success, error, info)
 */
function showMessage(message, type = "info") {
  // Remove mensagem anterior se existir
  const existingMessage = document.querySelector(".message")
  if (existingMessage) {
    existingMessage.remove()
  }

  // Cria nova mensagem
  const messageDiv = document.createElement("div")
  messageDiv.className = `message message-${type}`
  messageDiv.textContent = message

  // Estilos da mensagem
  messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `

  // Define cor baseada no tipo
  switch (type) {
    case "success":
      messageDiv.style.background = "linear-gradient(135deg, #4caf50, #45a049)"
      break
    case "error":
      messageDiv.style.background = "linear-gradient(135deg, #f44336, #d32f2f)"
      break
    default:
      messageDiv.style.background = "linear-gradient(135deg, #2196f3, #1976d2)"
  }

  document.body.appendChild(messageDiv)

  // Remove mensagem após 4 segundos
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.style.animation = "slideOut 0.3s ease"
      setTimeout(() => messageDiv.remove(), 300)
    }
  }, 4000)
}

/**
 * Adiciona efeitos visuais aos campos de input
 */
function addInputEffects() {
  const inputs = document.querySelectorAll("input")

  inputs.forEach((input) => {
    // Efeito de foco
    input.addEventListener("focus", function () {
      this.parentElement.style.transform = "scale(1.02)"
      this.parentElement.style.transition = "transform 0.2s ease"
    })

    // Remove efeito ao perder foco
    input.addEventListener("blur", function () {
      this.parentElement.style.transform = "scale(1)"
    })

    // Efeito de digitação
    input.addEventListener("input", function () {
      if (this.value.length > 0) {
        this.style.borderColor = "#4caf50"
      } else {
        this.style.borderColor = "#e0e0e0"
      }
    })
  })
}

/**
 * Adiciona animações de entrada na página
 */
function addEntryAnimations() {
  // Adiciona CSS para animações
  const style = document.createElement("style")
  style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes fadeInUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-entry {
            animation: fadeInUp 0.6s ease forwards;
        }
    `
  document.head.appendChild(style)

  // Aplica animação aos elementos
  const loginContainer = document.querySelector(".login-container")
  loginContainer.style.opacity = "0"
  loginContainer.style.transform = "translateY(30px)"

  setTimeout(() => {
    loginContainer.classList.add("animate-entry")
    loginContainer.style.opacity = "1"
  }, 100)
}

/**
 * Adiciona funcionalidade de Enter para submit
 */
document.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const loginBtn = document.getElementById("loginBtn")
    if (loginBtn && !loginBtn.disabled) {
      loginBtn.click()
    }
  }
})

// Adiciona efeitos de partículas no fundo (opcional)
function createParticleEffect() {
  const particleCount = 20
  const particles = []

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: particleFloat ${3 + Math.random() * 4}s linear infinite;
        `

    particle.style.left = Math.random() * 100 + "%"
    particle.style.animationDelay = Math.random() * 4 + "s"

    document.querySelector(".bg-elements").appendChild(particle)
  }

  // CSS para animação das partículas
  const particleStyle = document.createElement("style")
  particleStyle.textContent = `
        @keyframes particleFloat {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
    `
  document.head.appendChild(particleStyle)
}

// Inicializa efeito de partículas
setTimeout(createParticleEffect, 1000)
