package com.qahub.api.controller;

import com.qahub.api.domain.document.*;
import com.qahub.api.domain.user.UserRepository; // Importa o repositório de usuários
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("documents")
public class DocumentController {

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private UserRepository userRepository; // Autowired para o UserRepository

    @PostMapping
    @Transactional
    public ResponseEntity create(@RequestBody @Valid DataCreateDocument data, UriComponentsBuilder uriBuilder) {
        // Busca o autor (usuário) pelo ID antes de criar o documento
        var author = userRepository.findById(data.authorId())
                .orElseThrow(() -> new IllegalArgumentException("Author not found"));

        // Cria o documento associando o autor
        var document = new Document(data, author);
        documentRepository.save(document);

        var uri = uriBuilder.path("/documents/{id}").buildAndExpand(document.getId()).toUri();

        return ResponseEntity.created(uri).body(new DataListDocument(document));
    }

    @GetMapping
    public ResponseEntity<Page<DataListDocument>> list(@PageableDefault(size = 10, sort = {"date"}) Pageable pagination) {
        var page = documentRepository.findAll(pagination).map(DataListDocument::new);
        return ResponseEntity.ok(page);
    }

    @PutMapping
    @Transactional
    public ResponseEntity update(@RequestBody @Valid DataUpdateDocument data) {
        var author = userRepository.findById(data.authorId())
                .orElseThrow(() -> new IllegalArgumentException("Author not found"));

        var document = documentRepository.getReferenceById(data.id());
        document.updateDocument(data, author);

        return ResponseEntity.ok(new DataUpdateDocument(document));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity delete(@PathVariable Long id) {
        var document = documentRepository.getReferenceById(id);
        if (documentRepository.existsById(id)) {
            documentRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
