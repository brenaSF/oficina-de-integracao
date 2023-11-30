
const logoElement = document.getElementById("logo"); 

logoElement.addEventListener("click", function () {
 
    window.location.href = "principal.html"; 
});


const formulario = document.querySelector("form");

function registrar() {
    const nome = document.querySelector(".nome").value;
    const responsavel = document.querySelector(".responsavel").value;


    fetch("http://localhost:8080/departamento", {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json" 
        },
        method: "POST",
        body: JSON.stringify({
            nome: nome,
            responsavel: responsavel
    
        })
    })
    .then(function(res) {
        console.log(res);
        alert("Departamento registrado com sucesso")
    })
    .catch(function(error) {
        console.error(error);
    });
}


function limpar() {
    document.querySelector(".nome").value = "";
    document.querySelector(".responsavel").value = ""; 
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    registrar();
    limpar();

    alert("Departamento registrado com sucesso!");
});



function consultarTodos() {
    fetch("http://localhost:8080/departamento/AllDepartamamentos", {
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
            
            // Selecione a tabela
            const table = document.querySelector(".table-container table");
            
            const novaLinha = document.createElement("tr");
            
            for (const campo in result) {
                const novoCampo = document.createElement("td");
                novoCampo.textContent = result[campo];
                novaLinha.appendChild(novoCampo);
            }
            
            table.appendChild(novaLinha);            

        });
    })
    .catch(error => {
        console.error("Erro na solicitação:", error);
    });
}

consultarTodos();

function consultarDepartamentoPorId() {
    const id_departamento = document.getElementById("searchInput").value;

    if (id_departamento.trim() !== "") {
        fetch(`http://localhost:8080/departamento/${id_departamento}`, {
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

            alert("ID de departamento encontrado")
        })
        .catch(error => {
            console.error("Erro ao consultar oficina por id:", error);
            alert("ID de departamento inexistente")
        });
    } else {
        console.error("ID da oficina não pode estar vazio.");
    }
}

function updateDetailsInHTML(data) {
    const detailsElement = document.getElementById("departamentoDetails");

    detailsElement.innerHTML = `
        <p>ID: ${data.id_departamento}</p>
        <p>Nome: ${data.nome}</p>
        <p>Responsavel: ${data.responsavel}</p>

    `;


}



function deletarDepartamentoPorId() {
    const id_departamento = document.getElementById("searchInput").value;

    if (id_departamento.trim() !== "") {
        fetch(`http://localhost:8080/departamento/deletarDepartamento/${id_departamento}`, {
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
