package com.qahub.api.domain.team;

import jakarta.validation.constraints.NotNull;

public record DataUpdateTeam(
        @NotNull
        Long id,
        @NotNull
        String name,
        @NotNull
        String description
)
{
    public DataUpdateTeam(Team team) {
        this(
                team.getId(),
                team.getName(),
                team.getDescription()
        );
    }
}
