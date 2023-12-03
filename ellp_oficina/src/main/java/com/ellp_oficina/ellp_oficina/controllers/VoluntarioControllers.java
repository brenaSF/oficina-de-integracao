package com.ellp_oficina.ellp_oficina.controllers;


import com.ellp_oficina.ellp_oficina.domain.ellp.Oficina;
import com.ellp_oficina.ellp_oficina.domain.ellp.RequestVoluntario;
import com.ellp_oficina.ellp_oficina.domain.ellp.Voluntario;
import com.ellp_oficina.ellp_oficina.domain.ellp.VoluntarioRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


import java.util.HashMap;
import java.util.Optional;
import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/voluntario")
public class VoluntarioControllers {
    @Autowired
    private VoluntarioRepository repository;

    //Retornar todos os voluntários cadastrados
    @GetMapping("/allVoluntarios") 
    public ResponseEntity getAllVoluntarios() {
        var allVoluntarios = repository.findAll();
        return ResponseEntity.ok(allVoluntarios);
    }

    //Retornar todos os voluntários cadastrados e que estão ativos
    @GetMapping("/allVoluntariosActive") 
    public ResponseEntity getAllActiveVoluntarios() {
        var allVoluntarios = repository.findAllByActiveTrue();
        return ResponseEntity.ok(allVoluntarios);
    }


    @GetMapping("/nome/{nome}")
    public ResponseEntity getVoluntarioPorNome(@PathVariable String nome) {
        List<Voluntario> voluntariosEncontrados = repository.findByNomeIgnoreCaseStartingWith(nome);
    
        if (!voluntariosEncontrados.isEmpty()) {
            return ResponseEntity.ok(voluntariosEncontrados);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    

    //Registrar novo voluntário
    @PostMapping
    public ResponseEntity registrarVoluntario(@RequestBody @Valid RequestVoluntario data ){
        Voluntario newVoluntario = new Voluntario(data);
        System.out.println(data);
        repository.save(newVoluntario);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{nome}")
    @Transactional
    public ResponseEntity atualizarVoluntario(@RequestBody @Valid RequestVoluntario data, @PathVariable String nome) {
        Optional<Voluntario> optionalVoluntario = repository.findByNomeIgnoreCase(nome);
    
        if (optionalVoluntario.isPresent()) {
            Voluntario voluntario = optionalVoluntario.get();
    
            if (data.nome() != null) {
                voluntario.setNome(data.nome());
            }
            if (data.email() != null) {
                voluntario.setEmail(data.email());
            }
            if (data.telefone() != null) {
                voluntario.setTelefone(data.telefone());
            }
            if (data.curso() != null) {
                voluntario.setCurso(data.curso());
            }
            if (data.periodo() != null) {
                voluntario.setPeriodo(data.periodo());
            }
            if (data.departamento() != null) {
                voluntario.setDepartamento(data.departamento());
            }
    
            repository.save(voluntario);
    
            return ResponseEntity.ok(voluntario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    //Atualizar horas voluntário por nome
    @PutMapping("/horas/{nome}")
    @Transactional
    public ResponseEntity atualizarHoras(@RequestBody @Valid RequestVoluntario data, @PathVariable String nome) {
        Optional<Voluntario> optionalVoluntario = repository.findByNomeIgnoreCase(nome);
    
        if (optionalVoluntario.isPresent()) {
            Voluntario voluntario = optionalVoluntario.get();

            int horasInseridas = data.horas_voluntariadas(); 

            int horasAtuais = voluntario.getHoras_voluntariadas();

            voluntario.setHorasVoluntariadas(horasAtuais + horasInseridas);
    
            repository.save(voluntario);
    
            return ResponseEntity.ok(voluntario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    //Deletar voluntário por nome
    @DeleteMapping("/deletarVoluntarioNome/{nome}")
    @Transactional
    public ResponseEntity deletarVoluntarioNome(@PathVariable String nome) {
        Optional<Voluntario> optionalVoluntario = repository.findByNomeIgnoreCase(nome);
        if (optionalVoluntario.isPresent()) {
            Voluntario voluntario = optionalVoluntario.get();
            repository.delete(voluntario);
            return ResponseEntity.noContent().build();
        } else {
            throw new EntityNotFoundException("Voluntário com o nome '" + nome + "' não encontrado.");        }
    }


}

