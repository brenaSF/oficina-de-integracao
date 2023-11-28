-- Step 1: Add a new column for the text representation of the duration
ALTER TABLE oficina
ADD COLUMN duracao_text TEXT;

-- Step 2: Update the values in the new column with the calculated duration
UPDATE oficina
SET duracao_text = (horarioFim - horarioInicio)::TEXT;
