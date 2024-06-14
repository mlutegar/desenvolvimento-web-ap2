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
    card.classList.add('card');
    card.onclick = handleCardClick;

    informacaoJogador(card, jogador, "index");

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
    <header class="navbar">
        <nav>
            <ul class="nav-menu">
                <li><a href="../index.html">Home</a></li>
            </ul>
        </nav>
        <div class="login-info">
            <p id="login-status">Logado com sucesso!</p>
            <button id="btn_logout">Logout</button>
        </div>
    </header>

  <main class="main-content"> 
        <h2>Jogadores</h2>

        <div class="search-bar">
            <input id="search" type="search" placeholder="Buscar jogador" aria-label="Buscar jogador">
            <button id="search-btn"><i class="fa fa-search"></i></button>
        </div>

        <section aria-labelledby="filter-heading" class="filters">
            <h3 id="filter-heading">Categorias</h3>
            <button id="btn_get_all" class="filter-btn">Todos</button>
            <button id="btn_get_masc" class="filter-btn">Masculino</button>
            <button id="btn_get_fem" class="filter-btn">Feminino</button>
        </section>

        <div id="jogadores" role="region" aria-live="polite">
        </div> 
    </main>

  <footer>
    <p>Desenvolvido por: Michel Lutegar D'Orsi Pereira</p>
  </footer>
    `
    )

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    handleLogout();
    handleInputSearch();
    handleGetAll();
    handleGetMasc();
    handleGetFem();
}
