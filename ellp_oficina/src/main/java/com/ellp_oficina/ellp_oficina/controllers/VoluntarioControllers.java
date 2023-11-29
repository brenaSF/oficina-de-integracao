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

    //Retornar todos os voluntários por id_voluntario
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

    //Registrar novo voluntário
    @PostMapping
    public ResponseEntity registrarVoluntario(@RequestBody @Valid RequestVoluntario data ){
        Voluntario newVoluntario = new Voluntario(data);
        System.out.println(data);
        repository.save(newVoluntario);
        return ResponseEntity.ok().build();
    }

    //Atualizar voluntário por ID
    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity atualizarVoluntario(@RequestBody @Valid RequestVoluntario data){

        Optional <Voluntario> optionalVoluntario = repository.findById(data.id_voluntario());
        if(optionalVoluntario.isPresent()){
            Voluntario voluntario = optionalVoluntario.get();
            voluntario.setNome(data.nome());
            voluntario.setEmail(data.email());
            voluntario.setTelefone(data.telefone());
            voluntario.setCurso(data.curso());
            voluntario.setPeriodo(data.periodo());
            return ResponseEntity.ok(voluntario);
        }else{
            return ResponseEntity.notFound().build();
        }

    }

    //Atualizar horas voluntário por ID
    @PutMapping("/horas_voluntariadas/{id_voluntario}")
    @Transactional
    public ResponseEntity atualizarHorasVoluntariadas(@RequestBody @Valid RequestVoluntario data) {
        Optional<Voluntario> optionalVoluntario = repository.findById(data.id_voluntario());
    
        if (optionalVoluntario.isPresent()) {
            Voluntario voluntario = optionalVoluntario.get();
            voluntario.setHorasVoluntariadas(data.horas_voluntariadas());
            repository.save(voluntario); 
            return ResponseEntity.ok(voluntario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    //Desativar voluntário por ID
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

    //Deletar voluntário por ID
    @DeleteMapping("/deletarVoluntario/{id}")
    @Transactional
    public ResponseEntity deletarVoluntario(@PathVariable String id) {
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

