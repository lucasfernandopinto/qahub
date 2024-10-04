package com.qahub.api.domain.automation;

import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public record DataUpdateAutomation(
        @NotNull Long id,
        @NotNull String pipeline,
        @NotNull String result,
        @NotNull @DateTimeFormat Date startDate,
        @NotNull @DateTimeFormat Date endDate
) {
    public DataUpdateAutomation(Automation automation) {
        this(
                automation.getId(),
                automation.getPipeline(),
                automation.getResult(),
                automation.getStartDate(),
                automation.getEndDate()
        );
    }
}
