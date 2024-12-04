   // Sample automation data
   let automations = [
    {
      id: 1,
      name: "Testes de Regressão",
      description: "Pipeline de testes automatizados de regressão",
      status: "success",
      startDate: "2023-06-15T10:00:00",
      endDate: "2023-06-15T10:30:00",
      logs: "10:00:00 - Iniciando testes\n10:15:00 - Executando suite de testes\n10:30:00 - Testes concluídos com sucesso",
      relatedTasks: [1, 2]
    },
    {
      id: 2,
      name: "Deploy Staging",
      description: "Pipeline de deploy no ambiente de staging",
      status: "failure",
      startDate: "2023-06-15T11:00:00",
      endDate: "2023-06-15T11:15:00",
      logs: "11:00:00 - Iniciando deploy\n11:10:00 - Erro na compilação\n11:15:00 - Deploy falhou",
      relatedTasks: [3]
    }
  ];

  // Sample tasks data for related tasks
  const tasks = [
    { id: 1, title: "Implementar testes de API" },
    { id: 2, title: "Configurar ambiente de teste" },
    { id: 3, title: "Deploy em staging" }
  ];

  function renderAutomations() {
    const tbody = document.getElementById('automationTableBody');
    tbody.innerHTML = '';

    automations.forEach(automation => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${automation.name}</td>
        <td>
          <span class="status-badge status-${automation.status}">
            ${automation.status === 'success' ? 'Sucesso' : 'Falha'}
          </span>
        </td>
        <td>${new Date(automation.startDate).toLocaleString()}</td>
        <td>${new Date(automation.endDate).toLocaleString()}</td>
        <td class="action-buttons">
          <button class="action-btn" onclick="editAutomation(${automation.id})">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-btn" onclick="viewAutomationDetails(${automation.id})">
            <i class="fas fa-eye"></i>
          </button>
          <button class="action-btn" onclick="deleteAutomation(${automation.id})">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  function viewAutomationDetails(id) {
    const automation = automations.find(a => a.id === id);
    if (!automation) return;

    const detailsModal = document.getElementById('detailsModal');
    const logsContainer = document.getElementById('pipelineLogs');
    const relatedTasksList = document.getElementById('relatedTasksList');

    logsContainer.textContent = automation.logs;
    
    relatedTasksList.innerHTML = '';
    automation.relatedTasks.forEach(taskId => {
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        const div = document.createElement('div');
        div.className = 'related-tasks-item';
        div.textContent = task.title;
        relatedTasksList.appendChild(div);
      }
    });

    detailsModal.style.display = 'flex';
  }

  function closeDetailsModal() {
    document.getElementById('detailsModal').style.display = 'none';
  }

  function openModal(mode, automationId) {
    const modal = document.getElementById('automationModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('automationForm');

    // Clear form
    form.reset();

    if (mode === 'edit' && automationId) {
      const automation = automations.find(a => a.id === automationId);
      if (automation) {
        modalTitle.textContent = 'Editar Automação';
        document.getElementById('pipelineName').value = automation.name;
        document.getElementById('pipelineDescription').value = automation.description;
        document.getElementById('startDate').value = automation.startDate.slice(0, 16);
        document.getElementById('endDate').value = automation.endDate.slice(0, 16);
        form.dataset.automationId = automationId;
      }
    } else {
      modalTitle.textContent = 'Nova Automação';
      delete form.dataset.automationId;
    }

    modal.style.display = 'flex';
  }

  function closeModal() {
    document.getElementById('automationModal').style.display = 'none';
  }

  // Add form submission handler
  document.getElementById('automationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('pipelineName').value,
      description: document.getElementById('pipelineDescription').value,
      startDate: document.getElementById('startDate').value,
      endDate: document.getElementById('endDate').value,
      status: 'success', // Default status
      logs: '', // Empty logs for new automation
      relatedTasks: [] // Empty related tasks for new automation
    };

    if (this.dataset.automationId) {
      // Edit existing automation
      const id = parseInt(this.dataset.automationId);
      const index = automations.findIndex(a => a.id === id);
      if (index !== -1) {
        automations[index] = { ...automations[index], ...formData };
      }
    } else {
      // Add new automation
      const newId = Math.max(...automations.map(a => a.id), 0) + 1;
      automations.push({
        id: newId,
        ...formData
      });
    }

    renderAutomations();
    closeModal();
  });

  function editAutomation(id) {
    openModal('edit', id);
  }

  function deleteAutomation(id) {
    if (confirm('Tem certeza que deseja excluir esta automação?')) {
      automations = automations.filter(a => a.id !== id);
      renderAutomations();
    }
  }

  // Initialize the automations page
  renderAutomations();

  // Add event listeners for filters
  document.getElementById('searchAutomation').addEventListener('input', (e) => {
    const search = e.target.value.toLowerCase();
    const filteredAutomations = automations.filter(automation => 
      automation.name.toLowerCase().includes(search) || 
      automation.description.toLowerCase().includes(search)
    );
    renderAutomations(filteredAutomations);
  });

  document.getElementById('statusFilter').addEventListener('change', (e) => {
    const status = e.target.value;
    const filteredAutomations = status ? 
      automations.filter(automation => automation.status === status) : 
      automations;
    renderAutomations(filteredAutomations);
  });