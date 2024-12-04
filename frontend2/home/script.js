// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Cache DOM elements
  const loginBtn = document.getElementById('loginBtn');
  const authModal = document.getElementById('authModal');
  const closeModal = document.querySelector('.close-modal');
  const authTabs = document.querySelectorAll('.auth-tab');
  const authForms = document.querySelectorAll('.auth-form');

  // Initialize the login button text
  loginBtn.textContent = 'Login / Cadastro';

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // FAQ toggles
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const isActive = question.classList.contains('active');
      
      document.querySelectorAll('.faq-question').forEach(q => {
        q.classList.remove('active');
        q.nextElementSibling.classList.remove('active');
      });
      
      if (!isActive) {
        question.classList.add('active');
        answer.classList.add('active');
      }
    });
  });

  // User management functions
  const users = {
    register: function(name, email, password) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      if (users.some(user => user.email === email)) {
        throw new Error('Este email já está cadastrado');
      }
      
      users.push({ name, email, password });
      localStorage.setItem('users', JSON.stringify(users));
    },
    
    login: function(email, password) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Email ou senha inválidos');
      }
      
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    }
  };

  // Form handling
  document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelectorAll('input[type="password"]')[0].value;
    const confirmPassword = e.target.querySelectorAll('input[type="password"]')[1].value;
    
    try {
      if (password !== confirmPassword) {
        throw new Error('As senhas não coincidem');
      }
      
      users.register(name, email, password);
      alert('Cadastro realizado com sucesso!');
      document.querySelector('[data-tab="login"]').click();
      e.target.reset();
      
    } catch (error) {
      alert(error.message);
    }
  });

  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;
    
    try {
      const user = users.login(email, password);
      alert(`Bem vindo(a), ${user.name}!`);
      authModal.style.display = 'none';
      
      // Create dropdown structure
      const dropdownHtml = `
        <div class="user-dropdown">
          <span class="user-name">${user.name}</span>
          <div class="dropdown-content">
            <a href="../tasks/tasks.html">QAHub</a>
          </div>
        </div>
      `;
      
      loginBtn.innerHTML = dropdownHtml;
      setupDropdownListener();
      e.target.reset();
      
    } catch (error) {
      alert(error.message);
    }
  });

  // Add this function to handle dropdown toggling
  function setupDropdownListener() {
    const userDropdown = document.querySelector('.user-dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');
    
    if (userDropdown && dropdownContent) {
      userDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownContent.classList.toggle('show');
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!userDropdown.contains(e.target)) {
          dropdownContent.classList.remove('show');
        }
      });
    }
  }

  // Logout functionality
  loginBtn.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      localStorage.removeItem('currentUser');
      loginBtn.innerHTML = 'Login / Cadastro';
      alert('Logout realizado com sucesso!');
    }
  });

  // Modal controls
  loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    authModal.style.display = 'flex';
  });

  closeModal.addEventListener('click', () => {
    authModal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === authModal) {
      authModal.style.display = 'none';
    }
  });

  // Tab switching
  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      authTabs.forEach(t => t.classList.remove('active'));
      authForms.forEach(f => f.classList.remove('active'));
      
      tab.classList.add('active');
      document.getElementById(`${tab.dataset.tab}Form`).classList.add('active');
    });
  });
});