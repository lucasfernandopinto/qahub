package com.qahub.api.domain.property;

public record DataListProperty(
        Long id,
        String name,
        Boolean available,
        String obs
) {
    public DataListProperty(Property property) {
        this(property.getId(), property.getName(), property.getAvailable(), property.getObs());
    }
}
