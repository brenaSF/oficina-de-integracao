
const logoElement = document.getElementById("logo"); 

logoElement.addEventListener("click", function () {
 
    window.location.href = "principal.html"; 
});

const formulario = document.querySelector("form");

function registrar() {
    const nome = document.querySelector(".nome").value;
    const qt_participantes = document.querySelector(".qt_participantes").value;
    const data_oficina = document.querySelector(".data_oficina").value;
    const horarioinicio = document.querySelector(".horarioinicio").value;
    const horariofim = document.querySelector(".horariofim").value;


    fetch("http://localhost:8080/oficina", {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json" 
        },
        method: "POST",
        body: JSON.stringify({
            nome_oficina: nome,
            qt_participantes: qt_participantes,
            data_oficina: data_oficina,
            horarioinicio: horarioinicio,
            horariofim : horariofim
    
        })
    })
    .then(function(res) {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    })
    .then(function(data) {
        console.log(data);
    })
    .catch(function(error) {
        console.error('Error:', error);
    });
}

function limpar() {
    document.querySelector(".nome").value = "";
    document.querySelector(".qt_participantes").value = ""; 
    document.querySelector(".data_oficina").value = ""; 
    document.querySelector(".horarioinicio").value = "";
    document.querySelector(".horariofim").value = "";

   
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    registrar();
    limpar();
});



function consultarTodosOficina() {
    fetch("http://localhost:8080/oficina/AllOficinas", {
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

        const resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = "";

        data.forEach(result => {
            const resultElement = document.createElement("p");
            resultsDiv.appendChild(resultElement);
            
            const table = document.querySelector(".table-container table");
            
            const novaLinha = document.createElement("tr");
            
            const atributosExibidos = ["id_oficina", "nome_oficina", "qt_participantes","data_oficina", "horarioinicio","horariofim","active"]; 

            atributosExibidos.forEach(campo => {
                const novoCampo = document.createElement("td");
                novoCampo.textContent = result[campo];
                novaLinha.appendChild(novoCampo);
            });
            
            table.appendChild(novaLinha);
        });
    })
    .catch(error => {
        console.error("Erro na solicitação:", error);
    });
}


consultarTodosOficina();

function adicionarCampo() {
    var novoCampo = document.createElement("input");
    novoCampo.type = "text";
    novoCampo.name = "Voluntário";
    novoCampo.className = "usuario voluntario";

    var novoLabel = document.createElement("label");
    novoLabel.innerHTML = "<b>Voluntário : </b>";

    var divResult = document.querySelector('.result');
    divResult.appendChild(novoLabel.cloneNode(true)); 
    divResult.appendChild(novoCampo);
}


function consultarOficinaPorId() {
    const id_oficina = document.getElementById("searchInput").value;

    if (id_oficina.trim() !== "") {
        fetch(`http://localhost:8080/oficina/${id_oficina}`, {
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

            updateDetailsInHTML(data);

            console.log("Detalhes da oficina:", data);
        })
        .catch(error => {
            console.error("Erro ao consultar oficina por id:", error);
        });
    } else {
        console.error("ID da oficina não pode estar vazio.");
    }
}


function updateDetailsInHTML(data) {

    const detailsElement = document.getElementById("oficinaDetails");

    detailsElement.innerHTML = `
        <p>ID: ${data.id_oficina}</p>
        <p>Nome: ${data.nome_oficina}</p>
        <p>Quantidade de Participantes: ${data.quantidade_participantes}</p>
        <p>Data: ${data.data_oficina}</p>
        <p>Horário: ${data.horarioinicio}</p>
        <p>Ativo: ${data.active}</p>
    `;
}


function desativarOficinaPorId() {
    const id_oficina = document.getElementById("searchInput").value;

    if (id_oficina.trim() !== "") {
        fetch(`http://localhost:8080/oficina/${id_oficina}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na solicitação: ${response.status}`);
            }
            console.log("Oficina deletada com sucesso!");
            location.reload(); 
            
        })
        .catch(error => {
            console.error("Erro ao deletar oficina por id:", error);
        });
    } else {
        console.error("ID da oficina não pode estar vazio.");
    }
}

function deletarOficinaPorId() {
    const id_oficina = document.getElementById("searchInput").value;

    if (id_oficina.trim() !== "") {
        fetch(`http://localhost:8080/oficina/deletarOficina/${id_oficina}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na solicitação: ${response.status}`);
            }
            console.log("Oficina deletada com sucesso!");
            location.reload(); 
            
        })
        .catch(error => {
            console.error("Erro ao deletar oficina por id:", error);
        });
    } else {
        console.error("ID da oficina não pode estar vazio.");
    }
}

