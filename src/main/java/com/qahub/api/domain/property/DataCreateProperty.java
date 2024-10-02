package com.qahub.api.domain.property;

import jakarta.validation.constraints.NotNull;

public record DataCreateProperty(
        @NotNull String name,
        @NotNull Boolean available,
        String obs
) {
}
