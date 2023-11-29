document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const senha = document.getElementById("senha").value;

    if (nome.trim() !== "") {
        console.log(nome);

        fetch(`http://localhost:8080/login/byNomeAndSenha?nome=${nome}&senha=${senha}`, {
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
            if (data.nome && data.senha) {
                window.location.href = "principal.html";
            } else {
                console.warn("Nenhum login encontrado com esse nome e senha.");
                alert("Nenhum login encontrado com esse nome e senha");
            }
        })
        .catch(error => {
            console.error("Erro ao consultar oficina por nome e senha:", error);
            alert("Nenhum login encontrado com esse nome e senha");


        });
    } else {
        console.error("Nome da oficina não pode estar vazio.");
    }
});
