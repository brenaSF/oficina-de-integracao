package com.ellp.ellp.controllers;

import com.ellp.ellp.domain.voluntario.Usuario;
import com.ellp.ellp.domain.voluntario.UsuarioRepository;
import com.ellp.ellp.domain.voluntario.Voluntario;
import com.ellp.ellp.domain.voluntario.VoluntarioRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/login")
public class UsuarioControllers {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public ResponseEntity getAllUsuarios() {

        var AllUsuarios = usuarioRepository.findAllByActiveTrue();

        return ResponseEntity.ok(AllUsuarios);
    }

    @GetMapping("/{nome}")
    public ResponseEntity<String> verificaLoginExistente(@PathVariable String nome) {
        Usuario usuario = usuarioRepository.findByUsername(nome);

        if (usuario != null) {
            return ResponseEntity.ok("Login existente.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
