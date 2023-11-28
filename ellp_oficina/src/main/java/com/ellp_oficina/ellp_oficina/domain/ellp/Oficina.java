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

    private String nome_oficina;

    private Integer qt_participantes;

    private Date data_oficina;

    private Time horarioinicio;

    private Time horariofim;

    private String duracao;

    private Boolean active;


    public Oficina(RequestOficina requestOficina){
        this.nome_oficina = requestOficina.nome_oficina();
        this.qt_participantes = requestOficina.qt_participantes();
        this.data_oficina = requestOficina.data_oficina();
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

    public void setData(Date data_oficina) {
        this.data_oficina = data_oficina;
    }

    public void setHorarioinicio(Time horarioinicio){this.horarioinicio=horarioinicio;}

    public void setHorariofim(Time horariofim){this.horariofim=horariofim;}




}

