package com.qahub.api.controller;

import com.qahub.api.domain.property.*;
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
@RequestMapping("properties")
public class PropertyController {

    @Autowired
    private PropertyRepository propertyRepository;

    @PostMapping
    @Transactional
    public ResponseEntity create(@RequestBody @Valid DataCreateProperty data, UriComponentsBuilder uriBuilder) {
        var property = new Property(data);
        propertyRepository.save(property);

        var uri = uriBuilder.path("/properties/{id}").buildAndExpand(property.getId()).toUri();

        return ResponseEntity.created(uri).body(new DataListProperty(property));
    }

    @GetMapping
    public ResponseEntity<Page<DataListProperty>> list(@PageableDefault(size = 10, sort = {"name"}) Pageable pagination) {
        var page = propertyRepository.findAll(pagination).map(DataListProperty::new);
        return ResponseEntity.ok(page);
    }

    @PutMapping
    @Transactional
    public ResponseEntity update(@RequestBody @Valid DataUpdateProperty data) {
        var property = propertyRepository.getReferenceById(data.id());
        property.updateProperty(data);

        return ResponseEntity.ok(new DataUpdateProperty(property));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity delete(@PathVariable Long id) {
        var property = propertyRepository.getReferenceById(id);
        if (propertyRepository.existsById(id)) {
            propertyRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
