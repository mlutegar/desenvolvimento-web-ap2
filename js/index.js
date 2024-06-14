import {conteudo, pegaDados, informacaoJogador} from "./script.js";

let body = document.body;
let dadosJogadores = [];

const handleLogout = () => {
    let btnLogout = document.getElementById("btn_logout");
    btnLogout.onclick = () => {
        sessionStorage.removeItem("login");
        window.location.href = "login.html";
    }
}

const handleLogin = () => {
    let btnLogin = document.getElementById("btn_login");
    btnLogin.onclick = () => {
        window.location.href = "login.html";
    }
}

const handleInputSearch = () => {
    let inputSearch = document.getElementById("search");
    inputSearch.oninput = () => {
        console.log();
        let jogadores = document.getElementById("jogadores");
        jogadores.innerHTML = "Carregando...";

        let search = inputSearch.value;
        let filteredData = dadosJogadores.filter(jogador => jogador.nome.toLowerCase().includes(search.toLowerCase()));
        addCards(filteredData);
    }
}

const handleGetAll = () => {
    let btnGetAll = document.getElementById("btn_get_all");
    btnGetAll.onclick = () => {
        let jogadores = document.getElementById("jogadores");
        jogadores.innerHTML = "Carregando...";

        pegaDados("https://botafogo-atletas.mange.li/2024-1/all")
            .then(data => {
                dadosJogadores = data;
                addCards()
            })
    }
}

const handleGetMasc = () => {
    let btnGetMasc = document.getElementById("btn_get_masc");
    btnGetMasc.onclick = () => {
        let jogadores = document.getElementById("jogadores");
        jogadores.innerHTML = "Carregando...";

        pegaDados("https://botafogo-atletas.mange.li/2024-1/masculino")
            .then(data => {
                dadosJogadores = data;
                addCards()
            })
    }
}

const handleGetFem = () => {
    let btnGetFem = document.getElementById("btn_get_fem");
    btnGetFem.onclick = () => {
        let jogadores = document.getElementById("jogadores");
        jogadores.innerHTML = "Carregando...";

        pegaDados("https://botafogo-atletas.mange.li/2024-1/feminino")
            .then(data => {
                dadosJogadores = data;
                addCards()
            })
    }
}

const handleCardClick = (evento) => {
    const card = evento.target.closest('article');
    console.log(card.dataset.nome);
    window.location.href = `jogador.html?id=${card.dataset.id}`;
}

const montaCard = (jogador) => {
    const card = document.createElement('article');
    card.onclick = handleCardClick;

    informacaoJogador(card, jogador);

    return card.outerHTML;
}

const addCards = () => {
    let jogadoresDiv = document.getElementById("jogadores");
    jogadoresDiv.innerHTML = "";
    dadosJogadores.forEach(jogador => {
        const cardHTML = montaCard(jogador);
        jogadoresDiv.insertAdjacentHTML('beforeend', cardHTML);
    });

    // Adicionar event listeners aos novos cards
    document.querySelectorAll('#jogadores article').forEach(card => {
        card.onclick = handleCardClick;
    });
};

if (!sessionStorage.getItem("login")) {
    conteudo(body, `
        <h1>Você não está logado!</h1>
        <button id="btn_login">Login</button>
    `)
    handleLogin();
} else {
    conteudo(body, `
Absolutely! Here's the improved HTML structure, incorporating semantic tags and accessibility considerations:

HTML
<!DOCTYPE html>
<html lang="pt-br"> 
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jogadores</title>
  <link rel="stylesheet" href="style.css"> </head>
<body>

  <header> 
    <p id="login-status">Logado com sucesso!</p>
    <button id="btn_logout">Logout</button>
  </header>

  <main> 
    <h2>Jogadores</h2>

    <input id="search" type="search" placeholder="Buscar jogador" aria-label="Buscar jogador">

    <section aria-labelledby="filter-heading">
      <h3 id="filter-heading">Filtros</h3>
      <button id="btn_get_all">Mostrar todos os jogadores</button>
      <button id="btn_get_masc">Mostrar jogadores masculinos</button>
      <button id="btn_get_fem">Mostrar jogadores femininos</button>
    </section>

    <div id="jogadores" role="region" aria-live="polite">
      </div> 
  </main>

  <footer>
    <p>Desenvolvido por: Michel Lutegar D'Orsi Pereira</p>
  </footer>
    `
    )

    handleLogout();
    handleInputSearch();
    handleGetAll();
    handleGetMasc();
    handleGetFem();
}
