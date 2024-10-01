package com.qahub.api.domain.company;

import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.br.CNPJ;

public record DataUpdateCompany(
        @NotNull
        Long id,
        @NotNull
        String name,
        @NotNull
        @CNPJ
        String CNPJ,
        @NotNull
        Boolean active
)
{
    public DataUpdateCompany(Company company) {
        this(
                company.getId(),
                company.getName(),
                company.getCNPJ(),
                company.getActive()
        );
    }
}
