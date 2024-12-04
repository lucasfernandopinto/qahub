    // Sample data
    let tasks = [
        {
          id: 1,
          title: "Implementar testes automatizados",
          description: "Criar suite de testes para o módulo de autenticação",
          status: "progress",
          priority: "high",
          startDate: "2024-02-01",
          endDate: "2024-02-15",
          responsible: "joão"
        },
        {
          id: 2,
          title: "Revisar documentação",
          description: "Atualizar documentação técnica do projeto",
          status: "todo",
          priority: "medium",
          startDate: "2024-02-10",
          endDate: "2024-02-20",
          responsible: "maria"
        }
      ];
  
      // Render tasks
      function renderTasks(tasksToRender = tasks) {
        const tbody = document.getElementById('tasksTableBody');
        tbody.innerHTML = '';
  
        tasksToRender.forEach(task => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td><span class="status-badge status-${task.status}">${getStatusLabel(task.status)}</span></td>
            <td><span class="priority-${task.priority}">${getPriorityLabel(task.priority)}</span></td>
            <td>${formatDate(task.startDate)}</td>
            <td>${formatDate(task.endDate)}</td>
            <td>${getResponsibleName(task.responsible)}</td>
            <td class="action-buttons">
              <button class="action-btn" onclick="editTask(${task.id})">
                <i class="fas fa-edit"></i>
              </button>
              <button class="action-btn" onclick="deleteTask(${task.id})">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          `;
          tbody.appendChild(tr);
        });
      }
  
      // Utility functions
      function getStatusLabel(status) {
        const labels = {
          todo: 'To-Do',
          progress: 'In Progress',
          done: 'Done'
        };
        return labels[status];
      }
  
      function getPriorityLabel(priority) {
        const labels = {
          high: 'Alta',
          medium: 'Média',
          low: 'Baixa'
        };
        return labels[priority];
      }
  
      function getResponsibleName(responsible) {
        const names = {
          joão: 'João Silva',
          maria: 'Maria Santos',
          pedro: 'Pedro Oliveira'
        };
        return names[responsible];
      }
  
      function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('pt-BR');
      }
  
      // Modal functions
      function openModal(mode, taskId = null) {
        const modal = document.getElementById('taskModal');
        const modalTitle = document.getElementById('modalTitle');
        modal.style.display = 'flex';
        
        if (mode === 'edit' && taskId) {
          modalTitle.textContent = 'Editar Tarefa';
          const task = tasks.find(t => t.id === taskId);
          if (task) {
            fillFormWithTask(task);
          }
        } else {
          modalTitle.textContent = 'Nova Tarefa';
          document.getElementById('taskForm').reset();
        }
      }
  
      function closeModal() {
        document.getElementById('taskModal').style.display = 'none';
      }
  
      function fillFormWithTask(task) {
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDescription').value = task.description;
        document.getElementById('taskStatus').value = task.status;
        document.getElementById('taskPriority').value = task.priority;
        document.getElementById('taskStartDate').value = task.startDate;
        document.getElementById('taskEndDate').value = task.endDate;
        document.getElementById('taskResponsible').value = task.responsible;
      }
  
      // CRUD operations
      function addTask(taskData) {
        const newTask = {
          id: tasks.length + 1,
          ...taskData
        };
        tasks.push(newTask);
        renderTasks();
      }
  
      function editTask(taskId) {
        openModal('edit', taskId);
      }
  
      function deleteTask(taskId) {
        if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
          tasks = tasks.filter(task => task.id !== taskId);
          renderTasks();
        }
      }
  
      // Form submission
      document.getElementById('taskForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const taskData = {
          title: document.getElementById('taskTitle').value,
          description: document.getElementById('taskDescription').value,
          status: document.getElementById('taskStatus').value,
          priority: document.getElementById('taskPriority').value,
          startDate: document.getElementById('taskStartDate').value,
          endDate: document.getElementById('taskEndDate').value,
          responsible: document.getElementById('taskResponsible').value
        };
        addTask(taskData);
        closeModal();
      });
  
      // Filter and search functionality
      function applyFilters() {
        let filteredTasks = [...tasks];
        const status = document.getElementById('statusFilter').value;
        const priority = document.getElementById('priorityFilter').value;
        const responsible = document.getElementById('responsibleFilter').value;
        const search = document.getElementById('searchTask').value.toLowerCase();
  
        if (status) {
          filteredTasks = filteredTasks.filter(task => task.status === status);
        }
        if (priority) {
          filteredTasks = filteredTasks.filter(task => task.priority === priority);
        }
        if (responsible) {
          filteredTasks = filteredTasks.filter(task => task.responsible === responsible);
        }
        if (search) {
          filteredTasks = filteredTasks.filter(task => 
            task.title.toLowerCase().includes(search) || 
            task.description.toLowerCase().includes(search)
          );
        }
  
        renderTasks(filteredTasks);
      }
  
      // Add event listeners for filters
      document.getElementById('statusFilter').addEventListener('change', applyFilters);
      document.getElementById('priorityFilter').addEventListener('change', applyFilters);
      document.getElementById('responsibleFilter').addEventListener('change', applyFilters);
      document.getElementById('searchTask').addEventListener('input', applyFilters);
  
      // Initial render
      renderTasks();