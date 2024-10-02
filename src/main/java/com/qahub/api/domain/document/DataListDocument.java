package com.qahub.api.domain.document;

import java.util.Date;

public record DataListDocument(
        Long id,
        String title,
        String content,
        Date date
) {
    public DataListDocument(Document doc){
        this(doc.getId(), doc.getTitle(), doc.getContent(), doc.getDate());
    }
}
