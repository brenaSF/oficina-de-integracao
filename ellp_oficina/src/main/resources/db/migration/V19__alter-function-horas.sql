CREATE OR REPLACE FUNCTION calculo_duracao()
RETURNS TRIGGER AS $$
BEGIN
    NEW.duracao := (NEW.horarioFim::TIME - NEW.horarioInicio::TIME)::TEXT;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER apos_inserir_oficina
AFTER INSERT ON oficina
FOR EACH ROW
EXECUTE PROCEDURE calculo_duracao();

