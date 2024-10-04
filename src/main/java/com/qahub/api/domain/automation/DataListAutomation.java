package com.qahub.api.domain.automation;

import java.util.Date;

public record DataListAutomation(
        Long id,
        String pipeline,
        String result,
        Date startDate,
        Date endDate
) {
    public DataListAutomation(Automation automation) {
        this(automation.getId(), automation.getPipeline(), automation.getResult(), automation.getStartDate(), automation.getEndDate());
    }
}
