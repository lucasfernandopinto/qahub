package com.qahub.api.domain.company;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "company")
@Entity(name = "Company")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Company {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String CNPJ;
    private Boolean active;

    public Company(DataCreateCompany data){
        this.name = data.name();
        this.CNPJ = data.CNPJ();
        this.active = true;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCNPJ() {
        return CNPJ;
    }

    public void setCNPJ(String CNPJ) {
        this.CNPJ = CNPJ;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public void updateCompany(DataUpdateCompany data) {
        if (data.name() != null) {
            this.name = data.name();
        }
        if (data.CNPJ() != null) {
            this.CNPJ = data.CNPJ();
        }
        if (data.active() != null) {
            this.active = data.active();
        }

    }
}
