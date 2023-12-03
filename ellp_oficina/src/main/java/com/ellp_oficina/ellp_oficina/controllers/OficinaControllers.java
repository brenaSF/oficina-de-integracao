package com.ellp_oficina.ellp_oficina.controllers;



import com.ellp_oficina.ellp_oficina.domain.ellp.*;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin("*")
@RequestMapping("/oficina")
public class OficinaControllers {

    @Autowired
    private OficinaRepository oficinarepository;

   //Retornar todas oficinas
    @GetMapping("/AllOficinas") 
    public ResponseEntity getAllVoluntarios() {
        var allOficinas = oficinarepository.findAll();
        return ResponseEntity.ok(allOficinas);
    }

    //Retornar oficinas ativadas
    @GetMapping("/AllOficinasActive") 
    public ResponseEntity getAllActiveVoluntarios() {
        var allOficinas = oficinarepository.findAllByActiveTrue();
        return ResponseEntity.ok(allOficinas);
    }

    //Retornar oficina por Nome
    @GetMapping("/nome/{nome}")
    public ResponseEntity getVoluntarioPorNome(@PathVariable String nome) {
        List<Oficina> oficinasEncontradas = oficinarepository.findByNomeIgnoreCaseStartingWith(nome);
    
        if (!oficinasEncontradas.isEmpty()) {
            return ResponseEntity.ok(oficinasEncontradas);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //Registrar nova oficina
    @PostMapping
        public ResponseEntity registerOficina(@RequestBody @Valid RequestOficina data ){
        Oficina newOficina= new Oficina(data);
        System.out.println(data);
        oficinarepository.save(newOficina);
        return ResponseEntity.ok().build();
    }

    //Atualizar oficina por Nome
    @PutMapping("/{nome}")
    @Transactional
    public ResponseEntity atualizarOficina(@RequestBody @Valid RequestOficina data, @PathVariable String nome) {
        Optional<Oficina> optionalOficina = oficinarepository.findByNomeIgnoreCase(nome);
    
        if (optionalOficina.isPresent()) {
            Oficina oficina = optionalOficina.get();
    
            if (data.nome() != null) {
                oficina.setNome(data.nome());
            }
            if (data.qt_participantes() != null) {
                oficina.setQtParticipantes(data.qt_participantes());
            }
            if (data.data_oficina() != null) {
                oficina.setDataOficina(data.data_oficina());
            }
            if (data.horarioinicio() != null) {
                oficina.setHorarioinicio(data.horarioinicio());
            }
            if (data.horariofim() != null) {
                oficina.setHorariofim(data.horariofim());
            }

            oficinarepository.save(oficina);
    
            return ResponseEntity.ok(oficina);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    //DeSATIVAR oficina por ID
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

   
     //Deletar voluntário por nome
     @DeleteMapping("/deletarOficinaNome/{nome}")
     @Transactional
     public ResponseEntity deletarVoluntarioNome(@PathVariable String nome) {
         Optional<Oficina> optionalOficina = oficinarepository.findByNomeIgnoreCase(nome);
         if (optionalOficina.isPresent()) {
             Oficina oficina = optionalOficina.get();
             oficinarepository.delete(oficina);
             return ResponseEntity.noContent().build();
         } else {
            throw new EntityNotFoundException("Oficina com o nome '" + nome + "' não encontrado.");  
         }
     }
 




}
