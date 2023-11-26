package com.ellp_oficina.ellp_oficina.controllers;



import com.ellp_oficina.ellp_oficina.domain.ellp.*;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.persistence.EntityNotFoundException;



import java.util.Optional;


@RestController
@CrossOrigin("*")
@RequestMapping("/oficina")
public class OficinaControllers {

    @Autowired
    private OficinaRepository oficinarepository;

   
    @GetMapping("/AllOficinas") 
    public ResponseEntity getAllVoluntarios() {
        var allOficinas = oficinarepository.findAll();
        return ResponseEntity.ok(allOficinas);
    }

    @GetMapping("/AllOficinasActive") 
    public ResponseEntity getAllActiveVoluntarios() {
        var allOficinas = oficinarepository.findAllByActiveTrue();
        return ResponseEntity.ok(allOficinas);
    }

    @GetMapping("/{id_oficina}")
    public ResponseEntity getOficinaId(@PathVariable String id_oficina) {
        Optional<Oficina> optionalOficina = oficinarepository.findById(id_oficina);

        if (optionalOficina.isPresent()) {
            Oficina oficina = optionalOficina.get();
            return ResponseEntity.ok(oficina);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
        public ResponseEntity registerOficina(@RequestBody @Valid RequestOficina data ){
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
            oficina.setData(data.data_oficina());
            oficina.setHorarioinicio(data.horarioinicio());
            oficina.setHorariofim(data.horariofim());

            return ResponseEntity.ok(oficina);
        }else{
            return ResponseEntity.notFound().build();
        }

    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity desativarOficina(@PathVariable String id){
        Optional<Oficina> optionalOficina = oficinarepository.findById(id);
        if (optionalOficina.isPresent()) {
            Oficina oficina = optionalOficina.get();
            oficina.setActive(false);
            return ResponseEntity.noContent().build();
        } else {
            throw new EntityNotFoundException();
        }
    }

    @DeleteMapping("/deletarOficina/{id}")
    @Transactional
    public ResponseEntity deleteOficina(@PathVariable String id) {
        Optional<Oficina> optionalOficina = oficinarepository.findById(id);
        if (optionalOficina.isPresent()) {
            Oficina oficina = optionalOficina.get();
            oficinarepository.delete(oficina);
            return ResponseEntity.noContent().build();
        } else {
            throw new EntityNotFoundException();
        }
    }





}
