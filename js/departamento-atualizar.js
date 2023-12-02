
const logoElement = document.getElementById("logo"); 

logoElement.addEventListener("click", function () {
 
    window.location.href = "principal.html"; 
});


function consultarDepartamentoPorId() {
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

            updateDetailsInHTML(data);

            console.log("Detalhes da departamento:", data);

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

