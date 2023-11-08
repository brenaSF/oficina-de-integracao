
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    if (usuario === "usuario" && senha === "senha") {
        document.getElementById("loginMessage").textContent = "Login bem-sucedido!";
        // You can submit the form here
        document.getElementById("loginForm").submit();
    } else {
        document.getElementById("loginMessage").textContent = "Credenciais inválidas. Tente novamente.";
    }
});
