package com.qahub.api.domain.user;

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

}
