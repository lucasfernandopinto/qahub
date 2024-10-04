package com.qahub.api.controller;

import com.qahub.api.domain.automation.*;
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
@RequestMapping("automations")
public class AutomationController {

    @Autowired
    private AutomationRepository automationRepository;

    @PostMapping
    @Transactional
    public ResponseEntity create(@RequestBody @Valid DataCreateAutomation data, UriComponentsBuilder uriBuilder) {
        var automation = new Automation(data);
        automationRepository.save(automation);

        var uri = uriBuilder.path("/automations/{id}").buildAndExpand(automation.getId()).toUri();

        return ResponseEntity.created(uri).body(new DataCreateAutomation(automation));
    }

    @GetMapping
    public ResponseEntity<Page<DataListAutomation>> list(@PageableDefault(size = 10, sort = {"startDate"}) Pageable pagination) {
        var page = automationRepository.findAll(pagination).map(DataListAutomation::new);
        return ResponseEntity.ok(page);
    }

    @PutMapping
    @Transactional
    public ResponseEntity update(@RequestBody @Valid DataUpdateAutomation data) {
        var automation = automationRepository.getReferenceById(data.id());
        automation.updateAutomation(data);

        return ResponseEntity.ok(new DataUpdateAutomation(automation));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity delete(@PathVariable Long id) {
        if (automationRepository.existsById(id)) {
            automationRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
