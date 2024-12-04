   // Sample documents data
   let documents = [
    {
      id: 1,
      title: "Guia de Testes de API",
      category: "guide",
      author: "João Silva",
      content: "# Guia de Testes de API\n\nEste guia apresenta as melhores práticas para testes de API...",
      createdAt: "2023-06-15T10:00:00"
    },
    {
      id: 2,
      title: "Manual de Integração",
      category: "manual",
      author: "Maria Santos",
      content: "# Manual de Integração\n\nPasso a passo para integrar nossa plataforma...",
      createdAt: "2023-06-14T15:30:00"
    }
  ];

  function renderDocuments() {
    const tbody = document.getElementById('docsTableBody');
    tbody.innerHTML = '';

    documents.forEach(doc => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${doc.title}</td>
        <td><span class="document-category">${doc.category}</span></td>
        <td>${doc.author}</td>
        <td>${new Date(doc.createdAt).toLocaleString()}</td>
        <td class="action-buttons">
          <button class="action-btn" onclick="editDocument(${doc.id})">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-btn" onclick="viewDocument(${doc.id})">
            <i class="fas fa-eye"></i>
          </button>
          <button class="action-btn" onclick="deleteDocument(${doc.id})">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  function openDocModal(mode, docId) {
    const modal = document.getElementById('documentModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('documentForm');

    form.reset();

    if (mode === 'edit' && docId) {
      const doc = documents.find(d => d.id === docId);
      if (doc) {
        modalTitle.textContent = 'Editar Documento';
        document.getElementById('docTitle').value = doc.title;
        document.getElementById('docCategory').value = doc.category;
        document.getElementById('docContent').value = doc.content;
        form.dataset.docId = docId;
      }
    } else {
      modalTitle.textContent = 'Novo Documento';
      delete form.dataset.docId;
    }

    modal.style.display = 'flex';
  }

  function closeDocModal() {
    document.getElementById('documentModal').style.display = 'none';
  }

  function viewDocument(id) {
    const doc = documents.find(d => d.id === id);
    if (!doc) return;

    const modal = document.getElementById('viewDocModal');
    document.getElementById('viewDocTitle').textContent = doc.title;
    document.getElementById('docAuthor').textContent = doc.author;
    document.getElementById('docDate').textContent = new Date(doc.createdAt).toLocaleString();
    document.getElementById('docCategoryBadge').textContent = doc.category;
    document.getElementById('docPreview').textContent = doc.content;

    modal.style.display = 'flex';
  }

  function closeViewDocModal() {
    document.getElementById('viewDocModal').style.display = 'none';
  }

  function deleteDocument(id) {
    if (confirm('Tem certeza que deseja excluir este documento?')) {
      documents = documents.filter(d => d.id !== id);
      renderDocuments();
    }
  }

  function editDocument(id) {
    openDocModal('edit', id);
  }

  // Add form submission handler
  document.getElementById('documentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
      title: document.getElementById('docTitle').value,
      category: document.getElementById('docCategory').value,
      content: document.getElementById('docContent').value,
      author: "Usuário Atual", // In a real app, this would come from the logged-in user
      createdAt: new Date().toISOString()
    };

    if (this.dataset.docId) {
      const id = parseInt(this.dataset.docId);
      const index = documents.findIndex(d => d.id === id);
      if (index !== -1) {
        documents[index] = { ...documents[index], ...formData };
      }
    } else {
      const newId = Math.max(...documents.map(d => d.id), 0) + 1;
      documents.push({
        id: newId,
        ...formData
      });
    }

    renderDocuments();
    closeDocModal();
  });

  // Initialize the documents page
  renderDocuments();

  // Add event listeners for filters
  document.getElementById('searchDocs').addEventListener('input', (e) => {
    const search = e.target.value.toLowerCase();
    const filtered = documents.filter(doc => 
      doc.title.toLowerCase().includes(search) || 
      doc.content.toLowerCase().includes(search)
    );
    renderDocuments(filtered);
  });

  document.getElementById('categoryFilter').addEventListener('change', (e) => {
    const category = e.target.value;
    const filtered = category ? 
      documents.filter(doc => doc.category === category) : 
      documents;
    renderDocuments(filtered);
  });