
const logoElement = document.getElementById("logo"); 

logoElement.addEventListener("click", function () {
 
    window.location.href = "login.html"; 
});

const formulario = document.querySelector("form");

function registrar() {
    const nome = document.querySelector(".nome").value;
    const senha = document.querySelector(".senha").value;

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
    .then(function(res) {
        console.log(res);
        alert("Usuário registrado com sucesso!");
    })
    .catch(function(error) {
        console.error(error);
    });
}


function limpar() {
    document.querySelector(".nome").value = "";
    document.querySelector(".senha").value = "";

}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    registrar();
    limpar();
});
