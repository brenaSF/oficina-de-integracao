
const logoElement = document.getElementById("logo"); 

logoElement.addEventListener("click", function () {
 
    window.location.href = "principal.html"; 
});


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

                data.forEach(departamento => {
                    updateDetailsDepartamento(departamento);
                    updateDetailsInHTML(departamento);
                    console.log("Detalhes do voluntário:", departamento);
                });
                alert("Departamento encontrado!");
            } else {
                alert("Nenhum departamento encontrado.");
            }
        })
        .catch(error => {
            console.error("Erro ao consultar departamento por nome:", error);
            alert("Nome de departamento inexistente")
        });
    } else {
        console.error("Nome do departamento não pode estar vazio.");
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

function updateDetailsDepartamento(departamento) {
    document.getElementById("nome").value = departamento.nome;
    document.getElementById("responsavel").value = departamento.responsavel;

}


function atualizarDepartamentos() {
    const nome_departamento = document.querySelector(".nome").value;
    const responsavel = document.querySelector(".responsavel").value;
    const nome = document.getElementById("searchInput").value;


    fetch(`http://localhost:8080/departamento/${nome}`, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json" 
        },
        method: "PUT",
        body: JSON.stringify({
           
            nome: nome_departamento,
            responsavel: responsavel
    
        })
    })
    .then(function(res) {
        console.log(res);
        openModal();

        document.querySelector(".nome").value = "";
        document.querySelector(".responsavel").value = ""; 
    })
    .catch(function(error) {
        console.error(error);
    });

}

