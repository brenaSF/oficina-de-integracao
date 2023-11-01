
const logoElement = document.getElementById("logo"); 

logoElement.addEventListener("click", function () {
 
    window.location.href = "principal.html"; 
});



function registrar() {
    const nome = document.querySelector(".nome").value;
    const data_oficina = document.querySelector(".data").value;
    const horario = document.querySelector(".horario").value;
    const qtParticipantes = document.querySelector(".qtParticipantes").value;

    fetch("http://localhost:8080/oficina", {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json" // Correção de digitação
        },
        method: "POST",
        body: JSON.stringify({
            nome_oficina: nome,
            data: data_oficina,
            horario: horario,
            qtParticipantes: qtParticipantes,
    
        })
    })
    .then(function(res) {
        console.log(res);
    })
    .catch(function(error) {
        console.error(error);
    });
}

registrar();



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


consultarTodosOficina();