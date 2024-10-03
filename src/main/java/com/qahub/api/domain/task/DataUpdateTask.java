package com.qahub.api.domain.task;

import jakarta.validation.constraints.NotNull;

import java.util.Date;

public record DataUpdateTask(
        @NotNull
        Long id,

        String title,
        String description,
        TaskStatus status,
        TaskPriority priority,
        Date startDate,
        Date endDate
) {
    public DataUpdateTask(Task task) {
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
