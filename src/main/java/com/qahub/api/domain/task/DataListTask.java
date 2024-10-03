package com.qahub.api.domain.task;

import java.util.Date;

public record DataListTask(
        Long id,
        String title,
        String description,
        TaskStatus status,
        TaskPriority priority,
        Date startDate,
        Date endDate
) {
    public DataListTask(Task task) {
        this(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getPriority(),
                task.getStartDate(),
                task.getEndDate()
        );
    }
}
