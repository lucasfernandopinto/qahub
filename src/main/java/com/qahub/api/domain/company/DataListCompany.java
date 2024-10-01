package com.qahub.api.domain.company;

public record DataListCompany(
        Long id,
        String name,
        String CNPJ,
        Boolean active
) {
    public DataListCompany(Company company){
        this(company.getId(), company.getName(), company.getCNPJ(), company.getActive());
    }
}
