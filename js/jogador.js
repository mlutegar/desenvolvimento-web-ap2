import {informacaoJogador} from "./script.js";

const body = document.body;
const nav = document.createElement("nav");

nav.innerHTML = `
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
`;

body.appendChild(nav);

const conteudo = document.createElement("div");
body.appendChild(conteudo);

const montaCardDetalhe = (jogador) => {
    const card = document.createElement("div");
    card.classList.add("card");
    informacaoJogador(card, jogador, "jogador");
    card.innerHTML += `
    <div class="btn-voltar">
        <a href="../index.html" class="botao">Voltar</a>
    </div>
    `
    return card;
}

const getJogadores = async (url) => {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (erro) {
        return erro;
    }
}

const getDadosByLink = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const baseUrl = `https://botafogo-atletas.mange.li/2024-1/${id}`;

    getJogadores(baseUrl).then(
        (jogador) => {
            conteudo.appendChild(montaCardDetalhe(jogador));
        }).catch((error) => {
            console.log("Erro: " + error);
            const msg = document.createElement("div");
            msg.innerHTML = "<p>Não há jogador</p>";
            return msg;
        });
}

getDadosByLink();