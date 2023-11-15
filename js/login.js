document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const senha = document.getElementById("senha").value;
    const loginMessage = document.getElementById("loginMessage");

    if (validateCredentials(nome, senha)) {
        loginMessage.textContent = "Login bem-sucedido!";
        console.log("Login successful. User:", nome);

        fetch("http://localhost:8080/login", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                nome: nome,
                senha: senha,

            })
        })
        .then(response => {
            if (response.ok) {
                console.log("POST bem-sucedido");
                window.location.href = 'principal.html';
            } else {
                console.error("Erro ao fazer o POST:", response.status);
            }
        })
        .catch(error => {
            console.error("Erro ao fazer o POST:", error);
        });

    } else {
        loginMessage.textContent = "Credenciais inválidas. Tente novamente.";
        console.log("Login failed. User:", nome);
    }
});

