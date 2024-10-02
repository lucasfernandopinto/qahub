package com.qahub.api.domain.property;

import jakarta.validation.constraints.NotNull;

public record DataUpdateProperty(
        @NotNull Long id,
        @NotNull String name,
        @NotNull Boolean available,
        String obs
) {
    public DataUpdateProperty(Property property) {
        this(property.getId(), property.getName(), property.getAvailable(), property.getObs());
    }
}
