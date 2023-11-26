package com.ellp_oficina.ellp_oficina.controllers;


import com.ellp_oficina.ellp_oficina.domain.ellp.*;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.persistence.EntityNotFoundException;
import java.util.Map;


import java.util.HashMap;
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
    public ResponseEntity getLoginByName(@RequestParam String nome) {
        Optional<Login> optionalUsuario = repository.findByNome(nome);

        if (optionalUsuario.isPresent()) {
            Login usuario = optionalUsuario.get();
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/byNomeAndSenha")
    public ResponseEntity<Map<String, String>> getVoluntarioByNomeAndSenha(
            @RequestParam String nome,
            @RequestParam String senha) {
        Optional<Login> optionalUsuario = repository.findByNomeAndSenha(nome, senha);

        if (optionalUsuario.isPresent()) {
            Login usuario = optionalUsuario.get();

            Map<String, String> response = new HashMap<>();
            response.put("nome", usuario.getNome());
            response.put("senha", usuario.getSenha());

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    @PostMapping
    public ResponseEntity registerLogin(@RequestBody @Valid RequestLogin data ){
        Login newUsuario = new Login(data);
        System.out.println(data);
        repository.save(newUsuario);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity deleteLogin(@PathVariable String id){
        Optional<Login> optionalLogin = repository.findById(id);
        if (optionalLogin.isPresent()) {
            Login login = optionalLogin.get();
            login.setActive(false);
            return ResponseEntity.noContent().build();
        } else {
            throw new EntityNotFoundException();
        }
    }


    @PutMapping
    @Transactional
    public ResponseEntity updateLogin(@RequestBody @Valid RequestLogin data){

        Optional <Login> optionalLogin = repository.findById(data.id_login());
        if(optionalLogin.isPresent()){
            Login login = optionalLogin.get();
            login.setNome(data.nome());
            login.setSenha(data.senha());
            return ResponseEntity.ok(login);
        }else{
            return ResponseEntity.notFound().build();
        }

    }

    @GetMapping("/{id_login}")
    public ResponseEntity getLoginId(@PathVariable String id_login) {
        Optional<Login> optionalLogin = repository.findById(id_login);

        if (optionalLogin.isPresent()) {
            Login login = optionalLogin.get();
            return ResponseEntity.ok(login);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



}