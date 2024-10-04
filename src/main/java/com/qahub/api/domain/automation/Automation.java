package com.qahub.api.domain.automation;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Table(name = "automation")
@Entity(name = "Automation")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Automation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String pipeline;
    private String result;
    private Date startDate;
    private Date endDate;

    public Automation(DataCreateAutomation data) {
        this.pipeline = data.pipeline();
        this.result = data.result();
        this.startDate = data.startDate();
        this.endDate = data.endDate();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPipeline() {
        return pipeline;
    }

    public void setPipeline(String pipeline) {
        this.pipeline = pipeline;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public void updateAutomation(DataUpdateAutomation data) {
        if (data.pipeline() != null) {
            this.pipeline = data.pipeline();
        }
        if (data.result() != null) {
            this.result = data.result();
        }
        if (data.startDate() != null) {
            this.startDate = data.startDate();
        }
        if (data.endDate() != null) {
            this.endDate = data.endDate();
        }
    }
}
