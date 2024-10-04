package com.qahub.api.domain.automation;

import com.qahub.api.domain.automation.Automation;
import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public record DataCreateAutomation(
        @NotNull String pipeline,
        @NotNull String result,
        @NotNull @DateTimeFormat Date startDate,
        @NotNull @DateTimeFormat Date endDate
) {

        public DataCreateAutomation(Automation automation) {
                this(
                        automation.getPipeline(),
                        automation.getResult(),
                        automation.getStartDate(),
                        automation.getEndDate()
                );
        }
}
