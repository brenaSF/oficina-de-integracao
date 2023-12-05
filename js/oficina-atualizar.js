const logoElement = document.getElementById("logo"); 

logoElement.addEventListener("click", function () {
 
    window.location.href = "principal.html"; 
});

function consultarOficinaPorNome() {
    const nome = document.getElementById("searchInput").value;

    if (nome.trim() !== "") {
        fetch(`http://localhost:8080/oficina/nome/${nome}`, {
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

                data.forEach(oficina => {
                    updateDetailsOficina(oficina);
                    updateDetailsInHTML(oficina);
                    console.log("Detalhes do voluntário:", oficina);
                });
                alert("Oficina encontrados!");
            } else {
                alert("Nenhum oficina encontrado.");
            }
        })
        .catch(error => {
            console.error("Erro ao consultar oficina por nome:", error);
            alert("Erro ao buscar oficinas.");
        });
    } else {
        console.error("O nome não pode estar vazio.");
    }
}



function updateDetailsInHTML(data) {

    const detailsElement = document.getElementById("oficinaDetails");

    detailsElement.innerHTML = `
        <p>ID: ${data.id_oficina}</p>
        <p>Nome: ${data.nome}</p>
        <p>Quantidade de Participantes: ${data.qt_participantes}</p>
        <p>Data: ${data.data_oficina}</p>
        <p>Horário Inicio: ${data.horarioinicio}</p>
        <p>Horário Fim: ${data.horariofim}</p>
        <p>Ativo: ${data.active}</p>
    `;
}



function updateDetailsOficina(oficina) {
    document.getElementById("nome").value = oficina.nome;
    document.getElementById("qt_participantes").value = oficina.qt_participantes;
    document.getElementById("data_oficina").value = oficina.data_oficina;
    document.getElementById("horarioinicio").value = oficina.horarioinicio;
    document.getElementById("horariofim").value = oficina.horariofim;
}




function atualizarOficinas() {
    const nome = document.querySelector(".nome").value;
    const qt_participantes = document.querySelector(".qt_participantes").value;
    const data_oficina = document.querySelector(".data_oficina").value;
    const horarioinicio = document.querySelector(".horarioinicio").value;
    const horariofim = document.querySelector(".horariofim").value;

    const confirmacao = window.confirm(`Tem certeza de que deseja atualizar os dados do voluntário "${nome}"?`);

    if(confirmacao){
        fetch(`http://localhost:8080/oficina/${nome}`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json" 
            },
            method: "PUT",
            body: JSON.stringify({

                nome: nome,
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

    } else {
        console.log("Atualização cancelada pelo usuário.");
    }
}



function ListarOficinas() {
    var select = document.getElementById("searchInput");

    fetch("http://localhost:8080/oficina/AllOficinas")
        .then(response => response.json())
        .then(data => {
            data.forEach(oficina => {
                var option = document.createElement("option");
                option.value = oficina.nome;
                option.text = oficina.nome;
                select.add(option);
            });
        })
        .catch(error => console.error('Erro ao obter oficinas:', error));
}

ListarOficinas();