
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

function consultarDepartamentoPorNome() {
    const nome = document.getElementById("departamento").value;

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
    const nome = document.querySelector(".nome").value;
    const responsavel = document.querySelector(".responsavel").value;


    fetch(`http://localhost:8080/departamento/${nome}`, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json" 
        },
        method: "PUT",
        body: JSON.stringify({
           
            nome: nome,
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

function ListarDepartamentos() {
    var select = document.getElementById("departamento");

    fetch("http://localhost:8080/departamento/AllDepartamentos")
        .then(response => response.json())
        .then(data => {
            data.forEach(departamento => {
                var option = document.createElement("option");
                option.value = departamento.nome;
                option.text = departamento.nome;
                select.add(option);
            });
        })
        .catch(error => console.error('Erro ao obter departamentos:', error));

        var select = document.getElementById("departamento");
        console.log(select); 
        
}

ListarDepartamentos();
