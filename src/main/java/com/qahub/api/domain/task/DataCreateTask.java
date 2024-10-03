package com.qahub.api.domain.task;

import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public record DataCreateTask(
        @NotNull
        String title,
        @NotNull
        String description,
        @NotNull
        TaskStatus status,
        @NotNull
        TaskPriority priority,
        @NotNull
        @DateTimeFormat
        Date startDate,
        @NotNull
        @DateTimeFormat
        Date endDate
) {
        public DataCreateTask(Task task) {
                this(
                        task.getTitle(),
                        task.getDescription(),
                        task.getStatus(),
                        task.getPriority(),
                        task.getStartDate(),
                        task.getEndDate()
                );
        }
}
