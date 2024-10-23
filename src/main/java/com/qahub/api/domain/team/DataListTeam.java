package com.qahub.api.domain.team;

import com.qahub.api.domain.user.DataListUser;

import java.util.List;

public record DataListTeam(
        Long id,
        String name,
        String description
        //List<DataListUser> users // Lista de usuários associados ao time
) {
    public DataListTeam(Team team) {
        this(
                team.getId(),
                team.getName(),
                team.getDescription()
               // team.getUsers().stream().map(DataListUser::new).toList() // Mapear usuários para DataListUser
        );
    }
}
