const conteudo = (elemento, html) => {
    elemento.innerHTML = html;
}

const pegaDados = async (url) => {
    const response = await fetch(url);
    return await response.json();
}

const informacaoJogador = (card, jogador) => {
    jogador = {
        id: jogador.id,
        url_detalhes: jogador.url_detalhes,
        elenco: jogador.elenco,
        imagem: jogador.imagem,
        n_jogos: jogador.n_jogos,
        nome: jogador.nome,
        posicao: jogador.posicao,
        naturalidade: jogador.naturalidade,
        nascimento: jogador.nascimento,
        altura: jogador.altura,
        no_botafogo_desde: jogador.no_botafogo_desde,
        detalhes: jogador.detalhes,
    }

    card.innerHTML = `
        <h2>${jogador.nome}</h2>
        <p>${jogador.posicao}</p>
        <p>${jogador.detalhes}</p>
        <img src="${jogador.imagem}" alt="${jogador.nome}">
        <p>Elenco: ${jogador.elenco}</p>
        <p>Nº Jogos: ${jogador.n_jogos}</p>
        <p>Nascimento: ${jogador.nascimento}</p>
        <p>Naturalidade: ${jogador.naturalidade}</p>
        <p>Altura: ${jogador.altura}</p>
        <p>No Botafogo desde: ${jogador.no_botafogo_desde}</p>
    `;

    card.dataset.id = jogador.id;
    card.url_detalhes = jogador.url_detalhes;
    card.dataset.elenco = jogador.elenco;
    card.dataset.imagem = jogador.imagem;
    card.dataset.n_jogos = jogador.n_jogos;
    card.dataset.nome = jogador.nome;
    card.dataset.posicao = jogador.posicao;
    card.dataset.naturalidade = jogador.naturalidade;
    card.dataset.nascimento = jogador.nascimento;
    card.dataset.altura = jogador.altura;
    card.dataset.no_botafogo_desde = jogador.no_botafogo_desde;
    card.dataset.detalhes = jogador.detalhes;
}


export { conteudo, pegaDados, informacaoJogador };