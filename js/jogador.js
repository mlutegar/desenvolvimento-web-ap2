const body = document.body;
const conteudo = document.createElement("div");
body.appendChild(conteudo);

let dados;

const montaCardDetalhe = (jogador) => {
    const card = document.createElement("div");
    card.classList.add("card");
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

    return card;
}

const getDadosByLink = () => {
    // Pega o id pela URL (`jogador.html?id=${card.dataset.id}`)
    const id = window.location.search.split('=')[1];
    const jogador = dados.find(jogador => jogador.id == id);
    if (jogador) {
        return montaCardDetalhe(jogador);
    } else {
        const msg = document.createElement("div");
        msg.innerHTML = "<p>Não há jogador</p>";
        return msg;
    }
}

const getJogadores = async (url) => {
    const response = await fetch(url);
    return await response.json();
}

const init = async () => {
    dados = await getJogadores("https://botafogo-atletas.mange.li/2024-1/all");
    conteudo.appendChild(getDadosByLink());
};

init();
