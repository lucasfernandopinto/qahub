package com.qahub.api.controller;

import com.qahub.api.domain.user.*;
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
@RequestMapping("users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    @Transactional
    public ResponseEntity create(@RequestBody @Valid DataCreateUser data, UriComponentsBuilder uriBuilder) {
        var user = new User(data);
        userRepository.save(user);

        var uri = uriBuilder.path("/users/{id}").buildAndExpand(user.getId()).toUri();

        return ResponseEntity.created(uri).body(new DataCreateUser(user));
    }

    @GetMapping
    public ResponseEntity<Page<DataListUser>> list(@PageableDefault(size = 10, sort = {"name"}) Pageable pagination) {
        var page = userRepository.findAllByActiveTrue(pagination).map(DataListUser::new);
        return ResponseEntity.ok(page);
    }

    @PutMapping
    @Transactional
    public ResponseEntity update(@RequestBody @Valid DataUpdateUser data) {
        var user = userRepository.getReferenceById(data.id());
        user.updateUser(data);

        return ResponseEntity.ok(new DataUpdateUser(user));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity delete(@PathVariable Long id) {
        var user = userRepository.getReferenceById(id);
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
