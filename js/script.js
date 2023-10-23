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

    fetch("http://localhost:8080/voluntario", {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json" // Correção de digitação
        },
        method: "POST",
        body: JSON.stringify({
            nome: nome,
            ra: ra,
            email: email,
            telefone: telefone,
            curso: curso,
            periodo: periodo
    
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


function consultarNome(nome) {
    fetch(`http://localhost:8080/voluntario?nome=${nome}`, {
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
            if (result.nome && result.nome === nome) {
                table.innerHTML = ""; 
                const novaLinha = document.createElement("tr");
                novaLinha.classList.add("destaque");
            
                const resultElement = document.createElement("p");
                resultsDiv.appendChild(resultElement);
            
                const table = document.querySelector(".table-container table");
                
            
                for (const campo in result) {
                    const novoCampo = document.createElement("td");
                    novoCampo.textContent = result[campo];
                    novaLinha.appendChild(novoCampo);
                }
                
            
                table.appendChild(novaLinha);
            }
        });
    })
    .catch(error => {
        console.error("Erro na solicitação:", error);
    });
}




document.getElementById("inserirbusca").addEventListener("click", function () {
    const nome = document.getElementById("searchInput").value; 
    consultarNome(nome);
    

});



