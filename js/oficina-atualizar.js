const logoElement = document.getElementById("logo"); 

logoElement.addEventListener("click", function () {
 
    window.location.href = "principal.html"; 
});


function consultarTodosOficina() {
    fetch("http://localhost:8080/oficina", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);

        const tabelaCorpo = document.getElementById("tabela-corpo");
        tabelaCorpo.innerHTML = "";

        data.forEach(result => {
            const novaLinha = document.createElement("tr");

            const atributosExibidos = ["id_oficina", "nome_oficina", "qt_participantes", "data", "horarioinicio", "active"];

            atributosExibidos.forEach(campo => {
                const novoCampo = document.createElement("td");
                const valorCampo = result[campo];
                novoCampo.textContent = valorCampo;

                if (campo !== "id_oficina" && campo !== "active") {
                    
                    novoCampo.classList.add("editavel");

                    novoCampo.addEventListener("click", function () {
                        editarCelula(novoCampo, valorCampo, result.id_oficina, campo);
                    });
                }

                novaLinha.appendChild(novoCampo);
            });

            tabelaCorpo.appendChild(novaLinha);
        });
    })
    .catch(error => {
        console.error("Erro na solicitação:", error);
    });
}

function editarCelula(celula, valorAtual, id_oficina, campo) {
    console.log("Início da edição - Celula:", celula);

    const input = document.createElement("input");
    input.value = valorAtual;

    celula.innerHTML = "";
    celula.appendChild(input);

    input.addEventListener("blur", function () {
        console.log("Blur - Celula:", celula);
        salvarEdicao(celula, input.value, id_oficina, campo);
    });

    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            console.log("Enter pressionado - Celula:", celula);
            salvarEdicao(celula, input.value, id_oficina, campo);
        }
    });

    input.focus();
}


function salvarEdicao(celula, novoValor, id_oficina, campo) {
    console.log("Celula:", celula);

    celula.innerHTML = novoValor;

    console.log("Antes da chamada fetch");

    fetch(`http://localhost:8080/oficina/${id_oficina}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ [campo]: novoValor })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro ao salvar edição: ${response.status}`);
        }
        return response.json(); 
    })
    .then(data => {
        console.log("Edição salva com sucesso:", data);
    })
    .catch(error => {
        console.error("Erro ao salvar edição:", error);
    });
}

function salvarEdicao() {

    const editedCells = document.querySelectorAll('.editavel');
    
    editedCells.forEach(editedCell => {
        campo == "id_oficina";
        const celula = editedCell;
        const novoValor = editedCell.querySelector('input').value;
        const id_oficina = campo;
        const campo = ;

        salvarEdicao(celula, novoValor, id_oficina, campo);
    });
}


function editarCelula(celula, valorAtual, id_oficina, campo) {
    console.log("Início da edição - Celula:", celula);

    const input = document.createElement("input");
    input.value = valorAtual;

    celula.innerHTML = "";
    celula.appendChild(input);

    input.addEventListener("blur", function () {
        console.log("Blur - Celula:", celula);
        salvarEdicao(celula, input.value, id_oficina, campo);
    });

    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            console.log("Enter pressionado - Celula:", celula);
            salvarEdicao(celula, input.value, id_oficina, campo);
        }
    });

    input.focus();
}


consultarTodosOficina();