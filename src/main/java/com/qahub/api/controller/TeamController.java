package com.qahub.api.controller;

import com.qahub.api.domain.team.*;
import com.qahub.api.domain.user.User;
import com.qahub.api.domain.user.UserRepository;
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

@RestController
@RequestMapping("teams")
public class TeamController {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    @Transactional
    public ResponseEntity create(@RequestBody @Valid DataCreateTeam data, UriComponentsBuilder uriBuilder) {
        var team = new Team(data);
        teamRepository.save(team);

        var uri = uriBuilder.path("/teams/{id}").buildAndExpand(team.getId()).toUri();

        return ResponseEntity.created(uri).body(new DataListTeam(team));
    }


    @GetMapping
    public ResponseEntity<Page<DataListTeam>> list(@PageableDefault(size = 10, sort = {"name"}) Pageable pagination) {
        var page = teamRepository.findAll(pagination).map(DataListTeam::new);
        return ResponseEntity.ok(page);
    }

    @PutMapping
    @Transactional
    public ResponseEntity update(@RequestBody @Valid DataUpdateTeam data) {
        var team = teamRepository.getReferenceById(data.id());
        team.updateTeam(data);

        // Atualizar a lista de usuários associados
        List<User> users = userRepository.findAllById(data.userIds());
        team.getUsers().clear(); // Limpa os usuários atuais
        team.getUsers().addAll(users); // Adiciona os novos usuários

        return ResponseEntity.ok(new DataUpdateTeam(team));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity delete(@PathVariable Long id) {
        var team = teamRepository.getReferenceById(id);
        if (teamRepository.existsById(id)) {
            teamRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
