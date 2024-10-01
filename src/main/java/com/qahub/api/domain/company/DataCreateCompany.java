package com.qahub.api.domain.company;

import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.br.CNPJ;

public record DataCreateCompany(
        @NotNull
        String name,
        @NotNull
        @CNPJ
        String CNPJ,
        @NotNull
        Boolean active
)
{

}
