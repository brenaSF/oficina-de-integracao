const logoElement = document.getElementById("logo"); 

logoElement.addEventListener("click", function () {
 
    window.location.href = "principal.html"; 
});


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
    })
    .catch(function(error) {
        console.error(error);
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

}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    registrar();
    limpar();
});


function consultarTodos() {
    fetch("http://localhost:8080/voluntario", {
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

function consultarOficinaPorId() {
    const id_voluntario = document.getElementById("searchInput").value;

    if (id_voluntario.trim() !== "") {
        fetch(`http://localhost:8080/voluntario/${id_voluntario}`, {
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
    const detailsElement = document.getElementById("voluntarioDetails");

    detailsElement.innerHTML = `
        <p>ID: ${data.id_voluntario}</p>
        <p>Nome: ${data.nome}</p>
        <p>RA: ${data.ra}</p>
        <p>Email: ${data.email}</p>
        <p>Telefone: ${data.telefone}</p>
        <p>Curso: ${data.curso}</p>
        <p>Período: ${data.periodo}</p>
        <p>Ativo: ${data.active}</p>
    `;


}

function imprimirCertificado() {

    window.print();
}
