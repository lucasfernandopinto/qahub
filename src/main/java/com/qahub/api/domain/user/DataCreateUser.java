package com.qahub.api.domain.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record DataCreateUser(
        @NotNull String name,
        @NotNull @Email String email,
        @NotNull String password,
        @NotNull Boolean active,
        @NotNull Type type,
        @NotNull List<Long> teamIds // IDs dos times aos quais o usuário pertence
) {
        public DataCreateUser(User user) {
                this(
                        user.getName(),
                        user.getEmail(),
                        user.getPassword(),
                        user.getActive(),
                        user.getType(),
                        user.getTeams().stream().map(team -> team.getId()).toList() // Mapear times para seus IDs
                );
        }
}
