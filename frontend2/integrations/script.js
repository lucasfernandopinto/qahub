function openIntegrationModal(integration) {
    const modal = document.getElementById('integrationModal');
    const title = document.getElementById('integrationModalTitle');
    
    title.textContent = `Configurar ${integration.charAt(0).toUpperCase() + integration.slice(1)}`;
    modal.style.display = 'flex';
    
    // Load existing configuration if available
    const config = integrationConfigs[integration];
    if (config) {
      document.getElementById('apiKey').value = config.apiKey;
      document.getElementById('apiEndpoint').value = config.apiEndpoint;
      document.getElementById('webhookUrl').value = config.webhookUrl;
    }
  }

  function closeIntegrationModal() {
    document.getElementById('integrationModal').style.display = 'none';
  }

  function toggleIntegration(integration, status) {
    console.log(`${integration} integration ${status ? 'enabled' : 'disabled'}`);
    // Here you would typically make an API call to update the integration status
  }

  function testConnection() {
    // Simulate connection test
    const randomSuccess = Math.random() > 0.5;
    
    if (randomSuccess) {
      alert('Conexão estabelecida com sucesso!');
    } else {
      alert('Erro ao estabelecer conexão. Verifique as credenciais e tente novamente.');
    }
  }

  // Store integration configurations
  const integrationConfigs = {
    jira: {},
    gitlab: {},
    jenkins: {}
  };

  // Handle integration form submission
  document.getElementById('integrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const config = {
      apiKey: document.getElementById('apiKey').value,
      apiEndpoint: document.getElementById('apiEndpoint').value,
      webhookUrl: document.getElementById('webhookUrl').value
    };
    
    // Store configuration
    const integration = document.getElementById('integrationModalTitle').textContent
      .replace('Configurar ', '').toLowerCase();
    integrationConfigs[integration] = config;
    
    // Close modal
    closeIntegrationModal();
    alert('Configuração salva com sucesso!');
  });