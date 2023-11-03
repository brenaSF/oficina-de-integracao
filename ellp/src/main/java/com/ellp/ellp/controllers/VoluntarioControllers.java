package com.ellp.ellp.controllers;

import com.ellp.ellp.domain.voluntario.RequestVoluntario;
import com.ellp.ellp.domain.voluntario.Voluntario;
import com.ellp.ellp.domain.voluntario.VoluntarioRepository;
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

    @GetMapping
    public ResponseEntity getAllVoluntarios()
    {
        var AllVoluntarios = repository.findAllByActiveTrue();

        return ResponseEntity.ok(AllVoluntarios);
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

    @GetMapping("/{id}")
    public ResponseEntity getOneVoluntario(@PathVariable String id) {
        Optional<Voluntario> optionalVoluntario = repository.findById(id);

        if (optionalVoluntario.isPresent()) {
            Voluntario voluntario = optionalVoluntario.get();
            return ResponseEntity.ok(voluntario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }




    @PostMapping
    public ResponseEntity registrarVoluntario(@RequestBody @Valid RequestVoluntario data ){
        Voluntario newVoluntario = new Voluntario(data);
        System.out.println(data);
        repository.save(newVoluntario);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    @Transactional
    public ResponseEntity updateVoluntario(@RequestBody @Valid RequestVoluntario data){

        Optional <Voluntario> optionalVoluntario = repository.findById(data.id());
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
    public ResponseEntity deleteVoluntario(@PathVariable String id){
        Optional<Voluntario> optionalProduct = repository.findById(id);
        if (optionalProduct.isPresent()) {
            Voluntario product = optionalProduct.get();
            product.setActive(false);
            return ResponseEntity.noContent().build();
        } else {
            throw new EntityNotFoundException();
        }
    }





}

