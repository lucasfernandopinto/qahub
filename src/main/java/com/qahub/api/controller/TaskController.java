package com.qahub.api.controller;

import com.qahub.api.domain.task.*;
import com.qahub.api.domain.user.DataListUser;
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
@RequestMapping("tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @PostMapping
    @Transactional
    public ResponseEntity create(@RequestBody @Valid DataCreateTask data, UriComponentsBuilder uriBuilder) {
        var task = new Task(data);
        taskRepository.save(task);

        var uri = uriBuilder.path("/tasks/{id}").buildAndExpand(task.getId()).toUri();

        return ResponseEntity.created(uri).body(new DataCreateTask(task));
    }

    @GetMapping
    public ResponseEntity<Page<DataListTask>> list(@PageableDefault(size = 10) Pageable pagination) {
        var page = taskRepository.findAll(pagination).map(DataListTask::new);
        return ResponseEntity.ok(page);
    }

    @PutMapping
    @Transactional
    public ResponseEntity update(@RequestBody @Valid DataUpdateTask data) {
        var task = taskRepository.getReferenceById(data.id());
        task.updateTask(data);

        return ResponseEntity.ok(new DataUpdateTask(task));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity delete(@PathVariable Long id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
