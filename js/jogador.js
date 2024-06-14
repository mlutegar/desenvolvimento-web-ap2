import {informacaoJogador} from "./script.js";

const body = document.body;
const conteudo = document.createElement("div");
body.appendChild(conteudo);

const montaCardDetalhe = (jogador) => {
    const card = document.createElement("div");
    card.classList.add("card");
    informacaoJogador(card, jogador);
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