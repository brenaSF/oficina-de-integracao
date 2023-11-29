CREATE OR REPLACE FUNCTION adicionar_horas_voluntariadas()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE voluntario
    SET horas_voluntariadas = (voluntario.horas_voluntariadas + NEW.duracao)::TEXT
    WHERE id_voluntario IN (SELECT UNNEST(string_to_array(oficina.voluntarios, ','))::INT FROM oficina WHERE id_oficina = NEW.id_oficina);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
