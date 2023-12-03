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
@RequestMapping("/departamento")
public class DepartamentoControllers {

    @Autowired
    private DepartamentoRepository departamentoRepository;

    //Retornar todos os departamentos 
    @GetMapping("/AllDepartamamentos") 
    public ResponseEntity getAllDepartamamentos() {
        var AllDepartamamentos = departamentoRepository.findAll();
        return ResponseEntity.ok(AllDepartamamentos);
    }

    //Retornar departamento por Nome
    @GetMapping("/nome/{nome}")
    public ResponseEntity getDepartamentoPorNome(@PathVariable String nome) {
        List<Departamento> departamentosEncontrados = departamentoRepository.findByNomeIgnoreCaseStartingWith(nome);
    
        if (!departamentosEncontrados.isEmpty()) {
            return ResponseEntity.ok(departamentosEncontrados);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    

    //Registrar novo departamento
    @PostMapping
    public ResponseEntity registrarDepartamento(@RequestBody @Valid RequestDepartamento data ){
        Departamento newDepartamento = new Departamento(data);
        System.out.println(data);
        departamentoRepository.save(newDepartamento);
        return ResponseEntity.ok().build();
    }

    //Atualizar departamento por Nome
    @PutMapping("/{nome}")
    @Transactional
    public ResponseEntity atualizarDepartamento(@RequestBody @Valid RequestDepartamento data, @PathVariable String nome) {
        Optional<Departamento> optionalDepartamento = departamentoRepository.findByNomeIgnoreCase(nome);
    
        if (optionalDepartamento.isPresent()) {
            Departamento departamento = optionalDepartamento.get();
    
            if (data.nome() != null) {
                departamento.setNome(data.nome());
            }
            if (data.responsavel() != null) {
                departamento.setResponsavel(data.responsavel());
            }
    
            departamentoRepository.save(departamento);
    
            return ResponseEntity.ok(departamento);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //Deletar departamento por Nome
    @DeleteMapping("/deletarDepartamentoNome/{nome}")
    @Transactional
    public ResponseEntity deletarVoluntarioNome(@PathVariable String nome) {
        Optional<Departamento> optionalDepartamento = departamentoRepository.findByNomeIgnoreCase(nome);
        if (optionalDepartamento.isPresent()) {
            Departamento departamento = optionalDepartamento.get();
            departamentoRepository.delete(departamento);
            return ResponseEntity.noContent().build();
        } else {
            throw new EntityNotFoundException("Departamento com o nome '" + nome + "' não encontrado.");     
        }
    }


    
}
