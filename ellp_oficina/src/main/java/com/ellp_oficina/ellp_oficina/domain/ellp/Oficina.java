package com.ellp_oficina.ellp_oficina.domain.ellp;
import org.hibernate.annotations.Type;


import jakarta.persistence.*;
import lombok.*;
import java.sql.Date;
import java.sql.Time;

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

    private String nome;

    private Integer qt_participantes;

    private String data_oficina;

    private String horarioinicio;

    private String horariofim;

    private Boolean active;


    public Oficina(RequestOficina requestOficina){
        this.nome = requestOficina.nome();
        this.qt_participantes = requestOficina.qt_participantes();
        this.data_oficina = requestOficina.data_oficina();
        this.horarioinicio= requestOficina.horarioinicio();
        this.active = true;
        this.horariofim=requestOficina.horariofim();
    }

    public void setNome_oficina(String nome_oficina) {
        this.nome = nome_oficina;
    }

    public void setQtParticipantes(Integer qt_participantes) {
        this.qt_participantes = qt_participantes;
    }

    public void setDataOficina(String data_oficina) {
        this.data_oficina = data_oficina;
    }

    public void setHorarioinicio(String horarioinicio){this.horarioinicio=horarioinicio;}

    public void setHorariofim(String horariofim){this.horariofim=horariofim;}



}

