package com.qahub.api.domain.user;

import com.qahub.api.domain.team.DataListTeam;
import java.util.List;

public record DataListUser(
        Long id,
        String name,
        String email,
        Boolean active,
        Type type,
        List<DataListTeam> teams // Lista de times aos quais o usuário pertence
) {
    public DataListUser(User user) {
        this(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getActive(),
                user.getType(),
                user.getTeams().stream().map(DataListTeam::new).toList() // Mapear times para DataListTeam
        );
    }
}
