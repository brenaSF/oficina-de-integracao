
const logoElement = document.getElementById("logo"); 

logoElement.addEventListener("click", function () {
 
    window.location.href = "principal.html"; 
});


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

                data.forEach(voluntario => {
                    updateDetailsVoluntario(voluntario);
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


function updateDetailsVoluntario(voluntario) {
    document.getElementById("nome").value = voluntario.nome;
    document.getElementById("email").value = voluntario.email;
    document.getElementById("telefone").value = voluntario.telefone;
    document.getElementById("curso").value = voluntario.curso;
    document.getElementById("periodo").value = voluntario.periodo;
    document.getElementById("departamento").value = voluntario.departamento;

}




function atualizarVoluntarios() {
    const nomeVoluntario = document.querySelector(".nome").value;
    const email = document.querySelector(".email").value;
    const telefone = document.querySelector(".telefone").value;
    const curso = document.querySelector(".curso").value;
    const periodo = document.querySelector(".periodo").value;
    const departamento = document.querySelector(".departamento").value;
    const nome = document.getElementById("searchInput").value;

    const confirmacao = window.confirm(`Tem certeza de que deseja atualizar os dados do voluntário "${nome}"?`);

    if (confirmacao) {
        fetch(`http://localhost:8080/voluntario/${nome}`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify({
                nome: nomeVoluntario,
                email: email,
                telefone: telefone,
                curso: curso,
                periodo: periodo,
                departamento: departamento
            })
        })
        .then(function(res) {
            console.log(res);
            openModal();

            document.querySelector(".nome").value = "";
            document.querySelector(".email").value = "";
            document.querySelector(".telefone").value = "";
            document.querySelector(".curso").value = "";
            document.querySelector(".periodo").value = "";
            document.querySelector(".departamento").value = "";
            document.getElementById("searchInput").value = "";
        })
        .catch(function(error) {
            console.error(error);
        });
    } else {
        console.log("Atualização cancelada pelo usuário.");
    }
}
