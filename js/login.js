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
            // Assuming data is an object with "nome" and "senha" properties
            if (data.nome && data.senha) {
                window.location.href = "principal.html";
            } else {
                console.warn("Nenhum login encontrado com esse nome e senha.");
            }
        })
        .catch(error => {
            console.error("Erro ao consultar oficina por nome e senha:", error);
            // Consider handling the error appropriately, e.g., displaying an error message.
        });
    } else {
        console.error("Nome da oficina não pode estar vazio.");
    }
});
