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
    const ra = document.querySelector(".ra").value;
    const email = document.querySelector(".email").value;
    const telefone = document.querySelector(".telefone").value;
    const curso = document.querySelector(".curso").value;
    const periodo = document.querySelector(".periodo").value;
    const departamento = document.querySelector(".departamento").value;


    fetch("http://localhost:8080/voluntario", {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json" 
        },
        method: "POST",
        body: JSON.stringify({
            nome: nome,
            ra: ra,
            email: email,
            telefone: telefone,
            curso: curso,
            periodo: periodo,
            departamento : departamento
    
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


const formulario2 = document.querySelector("form");

function registrarHorasVoluntariadas() {
    const horasVoluntariadas = parseFloat(document.querySelector(".horas_voluntariadas").value);
    const nome = document.getElementById("searchInput").value;

    fetch(`http://localhost:8080/voluntario/horas/${nome}`, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify({
            nome: nome,
            horas_voluntariadas: horasVoluntariadas
        })
    })
    .then(function (res) {
        if (!res.ok) {
            throw new Error(`Erro na solicitação: ${res.status}`);
        }
        return res.json();
    })
    .then(function (data) {
        console.log(data);
        openModal(); 
        limpar(); 
    })
    .catch(function (error) {
        console.error("Erro ao registrar horas voluntariadas:", error);
    });
}



function limpar() {
    document.querySelector(".nome").value = "";
    document.querySelector(".ra").value = ""; 
    document.querySelector(".email").value = "";
    document.querySelector(".telefone").value = ""; 
    document.querySelector(".curso").value = "";
    document.querySelector(".periodo").value = ""; 
    document.querySelector(".horas_voluntariadas").value = ""; 
    document.querySelector(".departamento").value = ""; 

}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    registrar();
    limpar();
});


function consultarTodos() {
    fetch("http://localhost:8080/voluntario/allVoluntarios", {
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

function consultarVoluntarioPorNome() {
    const nome = document.getElementById("searchInput").value;

    if (nome.trim() !== "") {
        fetch(`http://localhost:8080/voluntario/nome/${nome}`, {
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
                // Se houver resultados, trate a lista de voluntários
                data.forEach(voluntario => {
                    updateDetailsInHTML(voluntario);
                    console.log("Detalhes do voluntário:", voluntario);
                });
                alert("Voluntários encontrados!");
            } else {
                alert("Nenhum voluntário encontrado.");
            }
        })
        .catch(error => {
            console.error("Erro ao consultar voluntários por nome:", error);
            alert("Erro ao buscar voluntários.");
        });
    } else {
        console.error("O nome não pode estar vazio.");
    }
}


function updateDetailsInHTML(data) {
    const detailsElement = document.getElementById("voluntarioDetails");

    detailsElement.innerHTML = `
        <p>ID: ${data.id_voluntario}</p>
        <p>Nome: ${data.nome}</p>
        <p>RA: ${data.ra}</p>
        <p>Email: ${data.email}</p>
        <p>Telefone: ${data.telefone}</p>
        <p>Curso: ${data.curso}</p>
        <p>Período: ${data.periodo}</p>
        <p>Departamento: ${data.departamento}</p>
        <p>Horas Voluntariadas: ${data.horas_voluntariadas}</p>

    `;

}

function desativarVoluntarioPorId() {
    const id_voluntario = document.getElementById("searchInput").value;

    if (id_voluntario.trim() !== "") {
        fetch(`http://localhost:8080/voluntario/${id_voluntario}`, {
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


function deletarVoluntarioPorNome() {
    const nome = document.getElementById("searchInput").value;

    if (nome.trim() !== "") {

        const confirmacao = window.confirm(`Tem certeza de que deseja excluir o voluntário "${nome}"?`);

        if (confirmacao) {
            fetch(`http://localhost:8080/voluntario/deletarVoluntarioNome/${nome}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json"
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na solicitação: ${response.status}`);
                }
                console.log("Voluntário deletado com sucesso!");
                location.reload(); 
            })
            .catch(error => {
                console.error("Erro ao deletar voluntário por nome:", error);
            });
        } else {
            console.log("Exclusão cancelada pelo usuário.");
        }
    } else {
        console.error("Nome do voluntário não pode estar vazio.");
    }
}



function imprimirCertificado() {

    window.print();
}
