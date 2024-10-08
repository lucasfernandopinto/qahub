package com.qahub.api.controller;

import com.qahub.api.domain.team.Team;
import com.qahub.api.domain.team.TeamRepository;
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

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TeamRepository teamRepository;

    @PostMapping
    @Transactional
    public ResponseEntity create(@RequestBody @Valid DataCreateUser data, UriComponentsBuilder uriBuilder) {
        List<Team> teams = teamRepository.findAllById(data.teamIds()); // Recupera os times pelo ID
        var user = new User(data);
        user.getTeams().addAll(teams); // Associa os times ao usuário

        userRepository.save(user);

        var uri = uriBuilder.path("/users/{id}").buildAndExpand(user.getId()).toUri();
        return ResponseEntity.created(uri).body(new DataListUser(user));
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

        // Atualizar a lista de times associados
        List<Team> teams = teamRepository.findAllById(data.teamIds());
        user.getTeams().clear(); // Limpa os times atuais
        user.getTeams().addAll(teams); // Adiciona os novos times

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
