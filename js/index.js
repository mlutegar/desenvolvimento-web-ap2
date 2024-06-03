import {conteudo, pegaDados} from "./script.js";

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

    card.innerHTML = `
        <h2>${jogador.nome}</h2>
        <p>${jogador.posicao}</p>
        <p>${jogador.descricao}</p>
        <img src="${jogador.imagem}" alt="${jogador.nome}">
        <p>Elenco: ${jogador.elenco}</p>
        <p>Nome completo: ${jogador.nome_completo}</p>
        <p>Nascimento: ${jogador.nascimento}</p>
        <p>Altura: ${jogador.altura}</p>
    `;

    card.dataset.id = jogador.id;
    card.dataset.nome = jogador.nome;
    card.dataset.posicao = jogador.posicao;
    card.dataset.descricao = jogador.descricao;
    card.dataset.imagem = jogador.imagem;
    card.dataset.elenco = jogador.elenco;
    card.dataset.nomeCompleto = jogador.nome_completo;
    card.dataset.nascimento = jogador.nascimento;
    card.dataset.altura = jogador.altura;
    card.onclick = handleCardClick;

    return card.outerHTML;
}

const addCards = () => {
    let jogadoresDiv = document.getElementById("jogadores");
    jogadoresDiv.innerHTML = "";
    dadosJogadores.forEach(jogador => {
        jogadoresDiv.innerHTML += montaCard(jogador);
    })

}

if (!sessionStorage.getItem("login")) {
    conteudo(body, `
        <h1>Você não está logado!</h1>
        <button id="btn_login">Login</button>
    `)
    handleLogin();
} else {
    conteudo(body, `
        <h1>Logado com sucesso!</h1>
        <button id="btn_logout">Logout</button>
        
        <h2>Jogadores</h2>
        <input id="search" type="text" placeholder="Buscar jogador">
        
        <h3>Filtros</h3>
        <button id="btn_get_all">Mostrar todos os jogadores</button>
        <button id="btn_get_masc">Mostrar jogadores masculinos</button>
        <button id="btn_get_fem">Mostrar jogadores femininos</button>
        
        <div id="jogadores"></div>
    `
    )

    handleLogout();
    handleInputSearch();
    handleGetAll();
    handleGetMasc();
    handleGetFem();
}