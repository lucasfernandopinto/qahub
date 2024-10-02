package com.qahub.api.domain.property;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "property")
@Entity(name = "Property")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Property {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Boolean available;

    private String obs;

    public Property(DataCreateProperty data) {
        this.name = data.name();
        this.available = data.available();
        this.obs = data.obs();
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

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public String getObs() {
        return obs;
    }

    public void setObs(String obs) {
        this.obs = obs;
    }

    public void updateProperty(DataUpdateProperty data) {
        if (data.name() != null) {
            this.name = data.name();
        }
        if (data.available() != null) {
            this.available = data.available();
        }
        if (data.obs() != null) {
            this.obs = data.obs();
        }
    }
}
