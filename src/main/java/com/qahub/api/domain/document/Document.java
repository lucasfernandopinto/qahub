package com.qahub.api.domain.document;

import com.qahub.api.domain.user.User; // Assumindo que a classe User está no pacote user
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
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;
    private Date date;

    @ManyToOne
    @JoinColumn(name = "author_id") // Relacionamento com a tabela de usuários
    private User author; // Novo campo autor

    public Document(DataCreateDocument data, User author){
        this.title = data.title();
        this.content = data.content();
        this.date = data.date();
        this.author = author; // Setando o autor
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

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public void updateDocument(DataUpdateDocument data, User author) {
        if (data.title() != null) {
            this.title = data.title();
        }
        if (data.content() != null) {
            this.content = data.content();
        }
        if (data.date() != null) {
            this.date = data.date();
        }
        if (author != null) {
            this.author = author;
        }
    }
}
