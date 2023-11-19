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
    const horas_voluntariadas = document.querySelector(".horas_voluntariadas").value;

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
            horas_voluntariadas : horas_voluntariadas
    
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

        let usuariosData = [];
        usuariosData = data.voluntario;

        var pesquisarTerm = document.getElementById("barraPesquisa").value;

        var resultadosUl = document.getElementById("resultados");
        resultadosUl.innerHTML = "";

        if (data.length === 0) {
            resultadosUl.textContent = "Nenhum resultado encontrado.";
        } else {
            for (var i = 0; i < usuariosData.length; i++) {

                if (usuariosData[i].nickname.includes(pesquisarTerm)) { 
    
                    var lista = document.createElement("button");
    
                    lista.classList.add("nicknameBotao");
    
                    lista.textContent = usuariosData[i].nickname;
    
                    lista.setAttribute("data-nickname", usuariosData[i].nickname);
    
                    lista.style.cursor = "pointer";
    
                    lista.addEventListener("click", function () {
                        var nickname = this.getAttribute("data-nickname");
                        window.location.href = '/perfil-visitado?nickname=' + nickname;
                    });
    
                    resultadosUl.appendChild(lista);
                }
            }
        }
    })
    .catch(error => {
        console.error("Erro na solicitação:", error);
    });
}




var barraPesquisa = document.getElementById("barraPesquisa");

barraPesquisa.addEventListener("input", function () {

    consultarNome();

});
