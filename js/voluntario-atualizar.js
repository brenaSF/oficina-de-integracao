const logoElement = document.getElementById("logo"); 

logoElement.addEventListener("click", function () {
 
    window.location.href = "principal.html"; 
});




function consultarTodosOficina() {
   
    fetch("http://localhost:8080/voluntario/allVoluntarios", {
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
        console.log(data);

        const tabelaCorpo = document.getElementById("tabela-corpo");
        tabelaCorpo.innerHTML = "";

        data.forEach(result => {
            const novaLinha = document.createElement("tr");

            const atributosExibidos = ["id_voluntario", "nome", "ra", "email", "telefone","curso", "periodo","active"];

            atributosExibidos.forEach(campo => {
                const novoCampo = document.createElement("td");
                const valorCampo = result[campo];
                novoCampo.textContent = valorCampo;

                if (campo !== "id_voluntario" && campo !== "active") {
                    
                    novoCampo.classList.add("editavel");

                    novoCampo.addEventListener("click", function () {
                        editarCelula(novoCampo, valorCampo, result.id_voluntario, campo);
                    });
                }

                novaLinha.appendChild(novoCampo);
            });

            tabelaCorpo.appendChild(novaLinha);
        });
    })
    .catch(error => {
        console.error("Erro na solicitação:", error);
    });
}

consultarTodosOficina();

function editarCelula(celula, valorAtual, id_voluntario, campo) {

    const input = document.createElement("input");
    input.value = valorAtual;

    celula.innerHTML = "";
    celula.appendChild(input);

    input.addEventListener("blur", function () {
        console.log("Blur - Celula:", celula);
        salvarEdicao(id_voluntario, campo, input.value);

    });

    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            console.log("Enter pressionado - Celula:", celula);
            salvarEdicao(id_voluntario, campo, input.value);

        }
    });

    console.log(event.currentTarget.dataset.id_voluntario);


    console.log(id_voluntario)
    console.log(campo)
    console.log(input.value)

    input.focus();
}



function salvarEdicao(id_voluntario, campo, novoValor) {
    // ...
  
    // Tratar a resposta da requisição
    xhr.onload = function () {
      // Se o status for 200 (OK)
      if (xhr.status == 200) {
        // Mostrar uma mensagem de sucesso
        alert("Dados atualizados com sucesso!");
  
        // Obter o input que está sendo editado
        let input = document.querySelector(`input[data-id-voluntario="${id_voluntario}"][data-campo="${campo}"]`);
  
        // Criar uma nova célula com o novo valor
        let novaCelula = document.createElement("td");
        novaCelula.textContent = novoValor;
  
        // Adicionar os atributos data-id-voluntario e data-campo à nova célula
        novaCelula.setAttribute("data-id-voluntario", id_voluntario);
        novaCelula.setAttribute("data-campo", campo);
  
        // Substituir o input pela nova célula
        input.parentNode.replaceChild(novaCelula, input);
      } else {
        // Mostrar uma mensagem de erro
        alert("Erro ao atualizar os dados: " + xhr.statusText);
      }
    };
  }

function atualizarDadosVoluntario(id, novosDados) {
    // Monta a URL da rota
    const url = `http://localhost:8080/voluntario/${id}`;

    // Configuração da requisição
    const options = {
        method: 'PUT', // Método HTTP para atualização
        headers: {
            'Content-Type': 'application/json', // Indica que estamos enviando JSON
        },
        body: JSON.stringify(novosDados), // Converte os novos dados para formato JSON
    };

    // Realiza a requisição usando o método fetch
    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }
            return response.json(); // Pode não ser necessário, dependendo da resposta do servidor
        })
        .then(data => {
            console.log('Dados atualizados com sucesso:', data);
            mostrarDadosNaTela(data); // Chama a função para mostrar os dados na tela
        })
        .catch(error => {
            console.error('Erro ao atualizar dados:', error);
        });
}

function mostrarDadosNaTela(dados) {
    const divDadosAtualizados = document.getElementById('dadosAtualizados');
    divDadosAtualizados.innerHTML = ''; // Limpa o conteúdo anterior

    const ul = document.createElement('ul');

    for (const atributo in dados) {
        const li = document.createElement('li');
        li.textContent = `${atributo}: ${dados[atributo]}`;
        ul.appendChild(li);
    }

    divDadosAtualizados.appendChild(ul);
}


let id_voluntario = document.querySelector("th.id_voluntario").textContent;
let nome = document.querySelector("th.nome").textContent;
let ra = document.querySelector("th.ra").textContent;
let email = document.querySelector("th.email").textContent;
let telefone = document.querySelector("th.telefone").textContent;
let curso = document.querySelector("th.curso").textContent;
let periodo = document.querySelector("th.periodo").textContent;


const idVoluntario = id_voluntario;
const novosDados = {
    id_voluntario: id_voluntario,
    nome: nome,
    ra: ra,
    email: email,
    telefone: telefone,
    curso: curso,
    periodo: periodo
};

atualizarDadosVoluntario(idVoluntario, novosDados);
