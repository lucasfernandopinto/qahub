package com.qahub.api.domain.document;

import java.util.Date;

public record DataListDocument(
        Long id,
        String title,
        String content,
        Date date,
        Long authorId, // ID do autor
        String authorName // Nome do autor
) {
    public DataListDocument(Document doc){
        this(
                doc.getId(),
                doc.getTitle(),
                doc.getContent(),
                doc.getDate(),
                doc.getAuthor().getId(), // Pega o ID do autor
                doc.getAuthor().getName() // Pega o nome do autor
        );
    }
}
