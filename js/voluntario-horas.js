const logoElement = document.getElementById("logo"); 

logoElement.addEventListener("click", function () {
 
    window.location.href = "principal.html"; 
});


function ListarVoluntarios() {
    var select = document.getElementById("nome");

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


const formulario2 = document.querySelector("form");

function registrarHorasVoluntariadas() {
    const horasVoluntariadas = parseFloat(document.querySelector(".horas_voluntariadas").value);
    const nome = document.getElementById("nome").value;

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
