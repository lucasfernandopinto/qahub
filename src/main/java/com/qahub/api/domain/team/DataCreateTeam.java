package com.qahub.api.domain.team;

import jakarta.validation.constraints.NotNull;

public record DataCreateTeam(
        @NotNull
        String name,
        @NotNull
        String description
)
{
}
