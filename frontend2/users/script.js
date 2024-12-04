    // Sample data
    let users = [
        {
          id: 1,
          name: "João Silva",
          email: "joao.silva@qahub.com",
          type: "admin",
          status: "active"
        },
        {
          id: 2,
          name: "Maria Santos",
          email: "maria.santos@qahub.com",
          type: "qa",
          status: "active"
        },
        {
          id: 3,
          name: "Pedro Oliveira",
          email: "pedro.oliveira@qahub.com",
          type: "dev",
          status: "inactive"
        }
      ];
  
      // Render users
      function renderUsers(usersToRender = users) {
        const tbody = document.getElementById('usersTableBody');
        tbody.innerHTML = '';
  
        usersToRender.forEach(user => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><span class="user-type-${user.type}">${getUserTypeLabel(user.type)}</span></td>
            <td><span class="status-badge status-${user.status}">${getStatusLabel(user.status)}</span></td>
            <td class="action-buttons">
              <button class="action-btn" onclick="editUser(${user.id})">
                <i class="fas fa-edit"></i>
              </button>
              <button class="action-btn" onclick="toggleUserStatus(${user.id})">
                <i class="fas fa-${user.status === 'active' ? 'ban' : 'check'}"></i>
              </button>
            </td>
          `;
          tbody.appendChild(tr);
        });
      }
  
      // Utility functions
      function getUserTypeLabel(type) {
        const labels = {
          admin: 'Admin',
          qa: 'QA',
          dev: 'Desenvolvedor'
        };
        return labels[type];
      }
  
      function getStatusLabel(status) {
        return status === 'active' ? 'Ativo' : 'Inativo';
      }
  
      function togglePassword(inputId) {
        const input = document.getElementById(inputId);
        const icon = input.nextElementSibling.querySelector('i');
        
        if (input.type === 'password') {
          input.type = 'text';
          icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
          input.type = 'password';
          icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
      }
  
      // Modal functions
      function openModal(mode, userId = null) {
        const modal = document.getElementById('userModal');
        const modalTitle = document.getElementById('modalTitle');
        const passwordFields = document.querySelectorAll('.password-group');
        
        modal.style.display = 'flex';
        
        if (mode === 'edit' && userId) {
          modalTitle.textContent = 'Editar Usuário';
          const user = users.find(u => u.id === userId);
          if (user) {
            fillFormWithUser(user);
            passwordFields.forEach(field => field.style.display = 'none');
          }
        } else {
          modalTitle.textContent = 'Novo Usuário';
          document.getElementById('userForm').reset();
          passwordFields.forEach(field => field.style.display = 'block');
        }
      }
  
      function closeModal() {
        document.getElementById('userModal').style.display = 'none';
      }
  
      function fillFormWithUser(user) {
        document.getElementById('userName').value = user.name;
        document.getElementById('userEmail').value = user.email;
        document.getElementById('userType').value = user.type;
        document.getElementById('userStatus').value = user.status;
      }
  
      // CRUD operations
      function addUser(userData) {
        const newUser = {
          id: users.length + 1,
          ...userData
        };
        users.push(newUser);
        renderUsers();
      }
  
      function editUser(userId) {
        openModal('edit', userId);
      }
  
      function toggleUserStatus(userId) {
        const user = users.find(u => u.id === userId);
        if (user) {
          user.status = user.status === 'active' ? 'inactive' : 'active';
          renderUsers();
        }
      }
  
      // Form submission
      document.getElementById('userForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const password = document.getElementById('userPassword').value;
        const confirmPassword = document.getElementById('userPasswordConfirm').value;
        
        if (password !== confirmPassword) {
          alert('As senhas não coincidem!');
          return;
        }
  
        const userData = {
          name: document.getElementById('userName').value,
          email: document.getElementById('userEmail').value,
          type: document.getElementById('userType').value,
          status: document.getElementById('userStatus').value
        };
        
        addUser(userData);
        closeModal();
      });
  
      // Filter and search functionality
      function applyFilters() {
        let filteredUsers = [...users];
        const type = document.getElementById('typeFilter').value;
        const status = document.getElementById('statusFilter').value;
        const search = document.getElementById('searchUser').value.toLowerCase();
  
        if (type) {
          filteredUsers = filteredUsers.filter(user => user.type === type);
        }
        if (status) {
          filteredUsers = filteredUsers.filter(user => user.status === status);
        }
        if (search) {
          filteredUsers = filteredUsers.filter(user => 
            user.name.toLowerCase().includes(search) || 
            user.email.toLowerCase().includes(search)
          );
        }
  
        renderUsers(filteredUsers);
      }
  
      // Add event listeners for filters
      document.getElementById('typeFilter').addEventListener('change', applyFilters);
      document.getElementById('statusFilter').addEventListener('change', applyFilters);
      document.getElementById('searchUser').addEventListener('input', applyFilters);
  
      // Initial render
      renderUsers();