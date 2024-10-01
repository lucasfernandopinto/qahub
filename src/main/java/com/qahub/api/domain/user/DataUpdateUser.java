package com.qahub.api.domain.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record DataUpdateUser(
        @NotNull
        Long id,
        @NotNull
        String name,
        @NotNull
        @Email
        String email,
        @NotNull
        String password,
        @NotNull
        Boolean active,
        @NotNull
        Type type
        )
{
        public DataUpdateUser(User user) {
                this(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getPassword(),
                        user.getActive(),
                        user.getType()
                );
        }
}
