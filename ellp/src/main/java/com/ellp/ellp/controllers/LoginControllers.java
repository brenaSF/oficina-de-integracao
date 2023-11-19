package com.ellp.ellp.controllers;

import com.ellp.ellp.domain.voluntario.*;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/login")
public class LoginControllers {

    @Autowired
    private LoginRepository repository;

    @GetMapping
    public ResponseEntity getAllVoluntarios()
    {
        var AllUsuarios= repository.findAllByActiveTrue();

        return ResponseEntity.ok(AllUsuarios);
    }


    @GetMapping("/byName")
    public ResponseEntity getVoluntarioByName(@RequestParam String nome) {
        Optional<Login> optionalUsuario = repository.findByNome(nome);

        if (optionalUsuario.isPresent()) {
            Login usuario = optionalUsuario.get();
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity registrarUsuario(@RequestBody @Valid RequestLogin data ){
        Login newUsuario = new Login(data);
        System.out.println(data);
        repository.save(newUsuario);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity deleteLogin(@PathVariable("id") Long id_login){
        if(repository.existsById(String.valueOf(id_login))){
            repository.deleteById(String.valueOf(id_login));
        }
        return ResponseEntity.noContent().build();

    }



}