package com.qahub.api.domain.document;

import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public record DataCreateDocument(
        @NotNull
        String title,
        @NotNull
        String content,
        @NotNull
        @DateTimeFormat
        Date date
)
{

}