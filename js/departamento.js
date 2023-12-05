
const logoElement = document.getElementById("logo"); 

logoElement.addEventListener("click", function () {
 
    window.location.href = "principal.html"; 
});


function openModal() {
    document.getElementById("customModal").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function closeModal() {
    document.getElementById("customModal").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}


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
        openModal();
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

});



function consultarTodos() {
    fetch("http://localhost:8080/departamento/AllDepartamentos", {
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

function consultarDepartamentoPorNome() {
    const nome = document.getElementById("searchInput").value;

    if (nome.trim() !== "") {
        fetch(`http://localhost:8080/departamento/nome/${nome}`, {
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

            if (Array.isArray(data) && data.length > 0) {

                data.forEach(voluntario => {
                    updateDetailsInHTML(voluntario);
                    console.log("Detalhes do departamento:", voluntario);
                });
                alert("Departamentos encontrados!");
            } else {
                alert("Nenhum departamento encontrado.");
            }
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



function deletarDepartamentoPorNome() {
    const nome = document.getElementById("searchInput").value;

    if (nome.trim() !== "") {

        const confirmacao = window.confirm(`Tem certeza de que deseja excluir a oficina "${nome}"?`);
        if (confirmacao) {

            fetch(`http://localhost:8080/departamento/deletarDepartamentoNome/${nome}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json"
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na solicitação: ${response.status}`);
                }
                console.log("Departamento deletada com sucesso!");
                location.reload(); 
                
            })
            .catch(error => {
                console.error("Erro ao deletar departamento por nome:", error);
            });
        } else {
            console.log("Operação de exclusão cancelada pelo usuário.");
        }
        } else {
            console.error("ID da oficina não pode estar vazio.");
        }
}



function ListarVoluntarios() {
    var select = document.getElementById("responsavel");

    fetch("http://localhost:8080/voluntario/allVoluntarios")
        .then(response => response.json())
        .then(data => {
            data.forEach(voluntario => {
                var option = document.createElement("option");
                option.value = voluntario.nome;
                option.text = voluntario.nome;
                select.add(option);
            });
        })
        .catch(error => console.error('Erro ao obter voluntarios:', error));
}

ListarVoluntarios();



function ListaDepartamentos() {
    var listaDepartamentos = document.getElementById("listaDepartamentos");

    fetch("http://localhost:8080/departamento/AllDepartamentos")
        .then(response => response.json())
        .then(data => {
            mostrarDepartamentos(data);
            listaDepartamentos.style.display = "block"; 
            listaDepartamentos.style.display = "block"; 
            listaDepartamentos.style.listStyle = "none";
            listaDepartamentos.style.padding = "10px";
            listaDepartamentos.style.margin = "0";
            listaDepartamentos.style.textAlign = "center";
            listaDepartamentos.style.border = "1px solid #ccc";
            listaDepartamentos.style.borderRadius = "8px";
            listaDepartamentos.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
        })
        .catch(error => console.error('Erro ao obter voluntarios:', error));
}

function mostrarDepartamentos(departamento) {
    var listaDepartamentosElement = document.getElementById("listaDepartamentos");
    listaDepartamentosElement.innerHTML = ''; 
    departamento.forEach(departamento => {
        var listItem = document.createElement("li");
        listItem.textContent = departamento.nome;
        listaDepartamentosElement.appendChild(listItem);
    });
}

function filtrarDepartamentos() {
    var input = document.getElementById("searchInput");
    var filter = input.value.toUpperCase();

    fetch("http://localhost:8080/departamento/AllDepartamentos")
        .then(response => response.json())
        .then(data => {
            var departamentoFiltrados = data.filter(departamento =>
                departamento.nome.toUpperCase().includes(filter)
            );
            mostrarDepartamentos(departamentoFiltrados);
        })
        .catch(error => console.error('Erro ao filtrar voluntarios:', error));
}

var searchInput = document.getElementById("searchInput");
searchInput.addEventListener("click", function() {
    ListaDepartamentos();
});

var form = document.querySelector('.consultar');
form.addEventListener('input', filtrarDepartamentos);