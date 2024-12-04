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
  
      let teams = [
        {
          id: 1,
          name: "Time de Qualidade",
          description: "Responsável por garantir a qualidade do software",
          members: [1, 2] // User IDs
        },
        {
          id: 2,
          name: "Time de Desenvolvimento",
          description: "Responsável pelo desenvolvimento de novas features",
          members: [3]
        }
      ];
  
      function renderTeams() {
        const tbody = document.getElementById('teamsTableBody');
        tbody.innerHTML = '';
  
        teams.forEach(team => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${team.name}</td>
            <td>${team.description}</td>
            <td><span class="member-count">${team.members.length} membros</span></td>
            <td class="action-buttons">
              <button class="action-btn" onclick="editTeam(${team.id})">
                <i class="fas fa-edit"></i>
              </button>
              <button class="action-btn" onclick="viewTeamDetails(${team.id})">
                <i class="fas fa-eye"></i>
              </button>
              <button class="action-btn" onclick="deleteTeam(${team.id})">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          `;
          tbody.appendChild(tr);
        });
      }
  
      function openModal(mode) {
        const modal = document.getElementById('teamModal');
        modal.style.display = 'flex';
        document.getElementById('teamForm').reset();
      }
  
      function closeModal() {
        document.getElementById('teamModal').style.display = 'none';
      }
  
      function openMemberSelection() {
        const modal = document.getElementById('memberSelectionModal');
        modal.style.display = 'flex';
        renderAvailableMembers();
      }
  
      function closeMemberSelection() {
        document.getElementById('memberSelectionModal').style.display = 'none';
      }
  
      function renderAvailableMembers() {
        const container = document.getElementById('availableMembers');
        container.innerHTML = '';
  
        users.filter(user => user.status === 'active').forEach(user => {
          const memberOption = document.createElement('div');
          memberOption.className = 'member-option';
          memberOption.innerHTML = `
            <div class="member-info">
              <div class="member-avatar">${user.name.charAt(0)}</div>
              <div>
                <div>${user.name}</div>
                <div style="color: var(--gray); font-size: 0.875rem;">${user.email}</div>
              </div>
            </div>
          `;
          memberOption.onclick = () => addMemberToTeam(user.id);
          container.appendChild(memberOption);
        });
      }
  
      function addMemberToTeam(userId) {
        // Implementation for adding member to team
      }
  
      function renderTeamMembers(teamId) {
        const team = teams.find(t => t.id === teamId);
        const container = document.getElementById('teamMembers');
        container.innerHTML = '';
  
        if (team) {
          team.members.forEach(memberId => {
            const user = users.find(u => u.id === memberId);
            if (user) {
              const memberElement = document.createElement('div');
              memberElement.className = 'team-member';
              memberElement.innerHTML = `
                <div class="member-info">
                  <div class="member-avatar">${user.name.charAt(0)}</div>
                  <span>${user.name}</span>
                </div>
                <button class="remove-member" onclick="removeMember(${teamId}, ${user.id})">
                  <i class="fas fa-times"></i>
                </button>
              `;
              container.appendChild(memberElement);
            }
          });
        }
      }
  
      function removeMember(teamId, userId) {
        // Implementation for removing member from team
      }
  
      function deleteTeam(teamId) {
        // Implementation for deleting team
      }
  
      function viewTeamDetails(teamId) {
        // Implementation for viewing team details
      }
  
      // Initialize the teams page
      renderTeams();
  
      // Add event listener for team search
      document.getElementById('searchTeam').addEventListener('input', (e) => {
        const search = e.target.value.toLowerCase();
        const filteredTeams = teams.filter(team => 
          team.name.toLowerCase().includes(search) || 
          team.description.toLowerCase().includes(search)
        );
        renderTeams(filteredTeams);
      });