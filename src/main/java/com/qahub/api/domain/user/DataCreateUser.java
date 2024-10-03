package com.qahub.api.domain.user;

import com.qahub.api.domain.task.Task;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record DataCreateUser(
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
        public DataCreateUser(User user) {
                this(
                        user.getName(),
                        user.getEmail(),
                        user.getPassword(),
                        user.getActive(),
                        user.getType()
                );
        }
}
