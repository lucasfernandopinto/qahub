package com.qahub.api.controller;

import com.qahub.api.domain.company.*;
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
@RequestMapping("companies")
public class CompanyController {

    @Autowired
    private CompanyRepository companyRepository;

    @PostMapping
    @Transactional
    public ResponseEntity create(@RequestBody @Valid DataCreateCompany data, UriComponentsBuilder uriBuilder) {
        var company = new Company(data);
        companyRepository.save(company);

        var uri = uriBuilder.path("/companies/{id}").buildAndExpand(company.getId()).toUri();

        return ResponseEntity.created(uri).body(new DataListCompany(company));
    }

    @GetMapping
    public ResponseEntity<Page<DataListCompany>> list(@PageableDefault(size = 10, sort = {"name"}) Pageable pagination) {
        var page = companyRepository.findAllByActiveTrue(pagination).map(DataListCompany::new);
        return ResponseEntity.ok(page);
    }

    @PutMapping
    @Transactional
    public ResponseEntity update(@RequestBody @Valid DataUpdateCompany data) {
        var company = companyRepository.getReferenceById(data.id());
        company.updateCompany(data);

        return ResponseEntity.ok(new DataUpdateCompany(company));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity delete(@PathVariable Long id) {
        var company = companyRepository.getReferenceById(id);
        if (companyRepository.existsById(id)) {
            companyRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
