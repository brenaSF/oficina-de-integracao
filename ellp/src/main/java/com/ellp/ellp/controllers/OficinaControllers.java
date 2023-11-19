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
@RequestMapping("/oficina")
public class OficinaControllers {

    @Autowired
    private OficinaRepository oficinarepository;

    @GetMapping
    public ResponseEntity getAllOficinas() {

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

    @PutMapping
    @Transactional
    public ResponseEntity updateOficina(@RequestBody @Valid RequestOficina data){

        Optional<Oficina> optionalOficina = oficinarepository.findById(data.id_oficina());
        if(optionalOficina.isPresent()){
            Oficina oficina = optionalOficina.get();
            oficina.setNome_oficina(data.nome_oficina());
            oficina.setQtParticipantes(data.qt_participantes());
            oficina.setData(data.data());
            oficina.setHorarioinicio(data.horarioinicio());
            oficina.setHorariofim(data.horariofim());

            return ResponseEntity.ok(oficina);
        }else{
            return ResponseEntity.notFound().build();
        }

    }



}
