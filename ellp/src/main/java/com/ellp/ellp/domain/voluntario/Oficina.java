package com.ellp.ellp.domain.voluntario;

import jakarta.persistence.*;
import lombok.*;


@Table(name="oficina")
@Entity(name = "oficina")
@EqualsAndHashCode(of="id_oficina")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Oficina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id_oficina;

    private String nome_oficina;

    private Integer qt_participantes;

    private String data;

    private String horarioinicio;

    private Boolean active;

    private String horariofim;


    public Oficina(RequestOficina requestOficina){
        this.nome_oficina = requestOficina.nome_oficina();
        this.qt_participantes = requestOficina.qt_participantes();
        this.data = requestOficina.data();
        this.horarioinicio= requestOficina.horarioinicio();
        this.active = true;
        this.horariofim=requestOficina.horariofim();
    }

    public void setNome_oficina(String nome_oficina) {
        this.nome_oficina = nome_oficina;
    }

    public void setQtParticipantes(Integer qt_participantes) {
        this.qt_participantes = qt_participantes;
    }

    public void setData(String data) {
        this.data = data;
    }

    public void setHorarioinicio(String horarioinicio){this.horarioinicio=horarioinicio;}

    public void setHorariofim(String horariofim){this.horariofim=horariofim;}




}

