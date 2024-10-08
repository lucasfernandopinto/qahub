package com.qahub.api.domain.team;

import jakarta.validation.constraints.NotNull;
import java.util.List;

public record DataCreateTeam(
        @NotNull String name,
        @NotNull String description,
        List<Long> userIds // IDs dos usuários associados ao time
) {
}
