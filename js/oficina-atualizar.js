const logoElement = document.getElementById("logo"); 

logoElement.addEventListener("click", function () {
 
    window.location.href = "principal.html"; 
});


function consultarOficinaPorId() {
    const id_oficina = document.getElementById("searchInput").value;

    if (id_oficina.trim() !== "") {
        fetch(`http://localhost:8080/oficina/${id_oficina}`, {
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
            alert("Consulta encontrada!");
        })
        .catch(error => {
            console.error("Erro ao consultar oficina por id:", error);
            alert("ID oficina não existe!");

        });
    } else {
        console.error("ID da oficina não pode estar vazio.");
        alert("ID da oficina não pode estar vazio.");
    }
}


function updateDetailsInHTML(data) {

    const detailsElement = document.getElementById("oficinaDetails");

    detailsElement.innerHTML = `
        <p>ID: ${data.id_oficina}</p>
        <p>Nome: ${data.nome_oficina}</p>
        <p>Quantidade de Participantes: ${data.qt_participantes}</p>
        <p>Data: ${data.data_oficina}</p>
        <p>Horário Inicio: ${data.horarioinicio}</p>
        <p>Horário Fim: ${data.horariofim}</p>
        <p>Ativo: ${data.active}</p>
    `;
}


function atualizarOficinas() {
    const nome = document.querySelector(".nome").value;
    const qt_participantes = document.querySelector(".qt_participantes").value;
    const data_oficina = document.querySelector(".data_oficina").value;
    const horarioinicio = document.querySelector(".horarioinicio").value;
    const horariofim = document.querySelector(".horariofim").value;
    const id_oficina = document.getElementById("searchInput").value;

    fetch(`http://localhost:8080/oficina/${id_oficina}`, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json" 
        },
        method: "PUT",
        body: JSON.stringify({

            id_oficina : id_oficina,
            nome_oficina: nome,
            qt_participantes: qt_participantes,
            data_oficina: data_oficina,
            horarioinicio: horarioinicio,
            horariofim : horariofim
    
        })
    })
    .then(function(res) {
        console.log(res);
        openModal();

        document.querySelector(".nome").value = "";
        document.querySelector(".qt_participantes").value = ""; 
        document.querySelector(".data_oficina").value = ""; 
        document.querySelector(".horarioinicio").value = "";
        document.querySelector(".horariofim").value = "";
    })
    .catch(function(error) {
        console.error(error);
    });

}
