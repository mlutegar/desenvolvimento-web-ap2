import { conteudo, pegaDados, informacaoJogador, header, footer } from "./script.js";

let body = document.body;
let dadosJogadores = [];

const handleLogin = () => {
    let btnLogin = document.getElementById("btn_login");
    btnLogin.onclick = () => {
        window.location.href = "login.html";
    }
}

const handleInputSearch = () => {
    let inputSearch = document.getElementById("search");
    inputSearch.oninput = () => {
        const searchValue = inputSearch.value.toLowerCase();
        let jogadoresDiv = document.getElementById("jogadores");

        if (searchValue.length < 3 || searchValue === "") {
            addCards(dadosJogadores);
        } else {
            const filteredData = dadosJogadores.filter(jogador =>
                jogador.nome.toLowerCase().includes(searchValue)
            );
            addCards(filteredData);
        }
    }
}

const handleGetAll = () => {
    let btnGetAll = document.getElementById("btn_get_all");
    btnGetAll.onclick = () => {
        loadJogadores("https://botafogo-atletas.mange.li/2024-1/all");
    }
}

const handleGetMasc = () => {
    let btnGetMasc = document.getElementById("btn_get_masc");
    btnGetMasc.onclick = () => {
        loadJogadores("https://botafogo-atletas.mange.li/2024-1/masculino");
    }
}

const handleGetFem = () => {
    let btnGetFem = document.getElementById("btn_get_fem");
    btnGetFem.onclick = () => {
        loadJogadores("https://botafogo-atletas.mange.li/2024-1/feminino");
    }
}

const handleCardClick = (evento) => {
    const card = evento.target.closest('article');
    console.log(card.dataset.nome);
    window.location.href = `jogador.html?id=${card.dataset.id}`;
}

const montaCard = (jogador) => {
    const card = document.createElement('article');
    card.classList.add('card');
    card.dataset.id = jogador.id; // Certifique-se de que o jogador tenha uma propriedade id
    card.onclick = handleCardClick;

    informacaoJogador(card, jogador, "index");

    return card.outerHTML;
}

const addCards = (data) => {
    let jogadoresDiv = document.getElementById("jogadores");
    jogadoresDiv.innerHTML = "";
    data.forEach(jogador => {
        const cardHTML = montaCard(jogador);
        jogadoresDiv.insertAdjacentHTML('beforeend', cardHTML);
    });

    // Adicionar event listeners aos novos cards
    document.querySelectorAll('#jogadores article').forEach(card => {
        card.onclick = handleCardClick;
    });
};

const loadJogadores = (url) => {
    let jogadoresDiv = document.getElementById("jogadores");
    jogadoresDiv.innerHTML = "Carregando...";

    pegaDados(url)
        .then(data => {
            dadosJogadores = data;
            addCards(dadosJogadores);
        });
};

if (!sessionStorage.getItem("login")) {
    conteudo(body, `
        <header></header>
        <main>        
        <div class="container">
            <h1>Aviso!</h1>
            <p>Você não está logado. Por favor, faça login para acessar esta página.</p>
            <button id="btn_login">Login</button>
        </div>       
        </main>
    `);
    footer(body);
    handleLogin();
} else {
    header(body);
    conteudo(body, `
      <main> 
        <h2>Jogadores</h2>

        <div class="search-bar">
            <input id="search" type="search" placeholder="Buscar jogador" aria-label="Buscar jogador">
            <button id="search-btn"><img class="img-search" src="../img/search.png"></button>
        </div>

        <section aria-labelledby="filter-heading" class="filters">
            <h3 id="filter-heading">Categorias</h3>
            <button id="btn_get_all" class="filter-btn">Todos</button>
            <button id="btn_get_masc" class="filter-btn">Masculino</button>
            <button id="btn_get_fem" class="filter-btn">Feminino</button>
        </section>

        <div id="jogadores" role="region" aria-live="polite">
            <p>Nada selecionado</p>
        </div> 
      </main>
    `);
    footer(body);

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    handleInputSearch();
    handleGetAll();
    handleGetMasc();
    handleGetFem();
}