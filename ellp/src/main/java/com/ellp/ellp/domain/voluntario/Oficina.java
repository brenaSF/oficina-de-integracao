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
    private Long id_oficina;

    private String nome_oficina;

    private Integer qt_participantes;

    private  String data;

    private String horario;

    private Boolean active;

    public Oficina(RequestOficina requestOficina){
        this.nome_oficina = requestOficina.nome_oficina();
        this.qt_participantes = requestOficina.qt_participantes();
        this.data = requestOficina.data();
        this.horario = requestOficina.horario();
        this.active = true;

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

    public void setHorario(String horario) {
        this.horario = horario;
    }

}

