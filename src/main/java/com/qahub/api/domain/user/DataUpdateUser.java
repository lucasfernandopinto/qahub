package com.qahub.api.domain.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record DataUpdateUser(
        @NotNull Long id,
        @NotNull String name,
        @NotNull @Email String email,
        @NotNull String password,
        @NotNull Boolean active,
        @NotNull Type type,
        @NotNull List<Long> teamIds // IDs dos times para atualização
) {
        public DataUpdateUser(User user) {
                this(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getPassword(),
                        user.getActive(),
                        user.getType(),
                        user.getTeams().stream().map(team -> team.getId()).toList()
                );
        }
}
