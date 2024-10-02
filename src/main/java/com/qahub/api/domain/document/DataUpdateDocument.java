package com.qahub.api.domain.document;

import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public record DataUpdateDocument(
        @NotNull
        Long id,
        @NotNull
        String title,
        @NotNull
        String content,
        @NotNull
        @DateTimeFormat
        Date date
)
{
    public DataUpdateDocument(Document document) {
        this(
                document.getId(),
                document.getTitle(),
                document.getContent(),
                document.getDate()
        );
    }
}
