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

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/voluntario")
public class VoluntarioControllers {
    @Autowired
    private VoluntarioRepository repository;

    @GetMapping("/allVoluntarios") 
    public ResponseEntity getAllVoluntarios() {
        var allVoluntarios = repository.findAll();
        return ResponseEntity.ok(allVoluntarios);
    }

    @GetMapping("/allVoluntariosActive") 
    public ResponseEntity getAllActiveVoluntarios() {
        var allVoluntarios = repository.findAllByActiveTrue();
        return ResponseEntity.ok(allVoluntarios);
    }

    @GetMapping("/byName")
    public ResponseEntity getVoluntarioByName(@RequestParam String nome) {
        Optional<Voluntario> optionalVoluntario = repository.findByNome(nome);

        if (optionalVoluntario.isPresent()) {
            Voluntario voluntario = optionalVoluntario.get();
            return ResponseEntity.ok(voluntario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id_voluntario}")
    public ResponseEntity getOficinaId(@PathVariable String id_voluntario) {
        Optional<Voluntario> optionalVoluntario = repository.findById(id_voluntario);

        if (optionalVoluntario.isPresent()) {
            Voluntario voluntario = optionalVoluntario.get();
            return ResponseEntity.ok(voluntario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity registerVoluntario(@RequestBody @Valid RequestVoluntario data ){
        Voluntario newVoluntario = new Voluntario(data);
        System.out.println(data);
        repository.save(newVoluntario);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity updateVoluntario(@RequestBody @Valid RequestVoluntario data){

        Optional <Voluntario> optionalVoluntario = repository.findById(data.id_voluntario());
        if(optionalVoluntario.isPresent()){
            Voluntario voluntario = optionalVoluntario.get();
            voluntario.setNome(data.nome());
            voluntario.setRa(data.ra());
            voluntario.setEmail(data.email());
            voluntario.setTelefone(data.telefone());
            voluntario.setCurso(data.curso());
            voluntario.setPeriodo(data.periodo());
            return ResponseEntity.ok(voluntario);
        }else{
            return ResponseEntity.notFound().build();
        }

    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity desativarVoluntario(@PathVariable String id){
        Optional<Voluntario> optionalVoluntario = repository.findById(id);
        if (optionalVoluntario.isPresent()) {
            Voluntario voluntario = optionalVoluntario.get();
            voluntario.setActive(false);
            return ResponseEntity.noContent().build();
        } else {
            throw new EntityNotFoundException();
        }
    }

    @DeleteMapping("/deletarVoluntario/{id}")
    @Transactional
    public ResponseEntity deleteOficina(@PathVariable String id) {
        Optional<Voluntario> optionalVoluntario = repository.findById(id);
        if (optionalVoluntario.isPresent()) {
            Voluntario voluntario = optionalVoluntario.get();
            repository.delete(voluntario);
            return ResponseEntity.noContent().build();
        } else {
            throw new EntityNotFoundException();
        }
    }





}

