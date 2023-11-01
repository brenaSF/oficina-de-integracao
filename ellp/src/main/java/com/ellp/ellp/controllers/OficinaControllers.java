package com.ellp.ellp.controllers;


import com.ellp.ellp.domain.voluntario.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("*")
@RequestMapping("/oficina")
public class OficinaControllers {

    @Autowired
    private OficinaRepository oficinarepository;

    @GetMapping
    public ResponseEntity getAllProducts() {

        var AllOficinas = oficinarepository.findAllByActiveTrue();

        return ResponseEntity.ok(AllOficinas);
    }

    @PostMapping
        public ResponseEntity registrarOficina(@RequestBody @Valid RequestOficina data ){
        Oficina newOficina= new Oficina(data);
        System.out.println(data);
        oficinarepository.save(newOficina);
        return ResponseEntity.ok().build();
    }


}
