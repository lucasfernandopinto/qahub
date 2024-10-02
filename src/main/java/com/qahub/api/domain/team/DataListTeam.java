package com.qahub.api.domain.team;

public record DataListTeam(
        Long id,
        String name,
        String description
) {
    public DataListTeam(Team team){
        this(team.getId(), team.getName(), team.getDescription());
    }
}
