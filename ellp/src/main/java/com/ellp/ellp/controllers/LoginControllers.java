package com.ellp.ellp.controllers;


import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ellp.ellp.domain.voluntario.RequestLogin;
import com.ellp.ellp.domain.voluntario.Login;
import com.ellp.ellp.domain.voluntario.LoginRepository;



@RestController
@RequestMapping("/login")
public class LoginControllers {

    @Autowired
    private LoginRepository repository2;

    @GetMapping
    public String login(@RequestParam(defaultValue = "12021") String id) {
        System.out.println("ID == " + id);
        return "login";
    }

    @PostMapping
    public ResponseEntity registrarLogin(@RequestBody @Valid RequestLogin data ){
        Login newLogin = new Login(data);
        System.out.println(data);
        repository2.save(newLogin);
        return ResponseEntity.ok().build();
    }


}
