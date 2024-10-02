package com.qahub.api.domain.document;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Table(name = "document")
@Entity(name = "Document")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Document {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;
    private Date date;

    public Document(DataCreateDocument data){
        this.title = data.title();
        this.content = data.content();
        this.date = data.date();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void updateDocument(DataUpdateDocument data) {
        if (data.title() != null) {
            this.title = data.title();
        }
        if (data.content() != null) {
            this.content = data.content();
        }
        if (data.date() != null) {
            this.date = data.date();
        }

    }
}
