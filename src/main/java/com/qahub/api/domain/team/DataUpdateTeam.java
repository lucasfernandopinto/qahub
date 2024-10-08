package com.qahub.api.domain.team;

import jakarta.validation.constraints.NotNull;
import java.util.List;

public record DataUpdateTeam(
        @NotNull Long id,
        @NotNull String name,
        @NotNull String description,
        List<Long> userIds // IDs dos usuários para atualização
) {
    public DataUpdateTeam(Team team) {
        this(
                team.getId(),
                team.getName(),
                team.getDescription(),
                team.getUsers().stream().map(user -> user.getId()).toList() // Mapear usuários para seus IDs
        );
    }
}
