const conteudo = (elemento, html) => {
    elemento.innerHTML = html;
}

const pegaDados = async (url) => {
    const response = await fetch(url);
    return await response.json();
}

const informacaoJogador = (card, jogador, tipo) => {
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

    if (tipo === "index"){
        card.innerHTML = `
            <div class="foto">
                <img src="${jogador.imagem}" alt="${jogador.nome}">
            </div>
            <div class="conteudo">
                <div class="importante">
                    <h2>${jogador.nome}</h2>
                    <p>${jogador.posicao}</p>
                </div>
                <div class="info">
                    <p><strong>Informações do jogador</strong></p>
                    <ul>
                        <li><strong>Nº Jogos:</strong> ${jogador.n_jogos}</li>
                        <li><strong>Naturalidade:</strong> ${jogador.naturalidade}</li>
                        <li><strong>Altura:</strong> ${jogador.altura}</li>
                    </ul>
                </div>
                <div class="detalhes">
                    <a href="${jogador.url_detalhes}" class="botao">Ver mais</a>
                </div>
            </div> 
            `;
            } else {
                card.innerHTML = `
                    <main class="perfil-jogador">
        <div class="container">
            <div class="foto">
                <img src="${jogador.imagem}" alt="${jogador.nome}">
            </div>
            <div class="conteudo">
                <section class="informacoes-principais">
                    <h1>${jogador.nome}</h1>
                    <p class="posicao">${jogador.posicao}</p>
                </section>
                <section class="informacoes-jogador">
                    <h2>Informações do Jogador</h2>
                    <ul>
                        <li><strong>Nº Jogos:</strong> ${jogador.n_jogos}</li>
                        <li><strong>Nascimento:</strong> ${jogador.nascimento}</li>
                        <li><strong>Naturalidade:</strong> ${jogador.naturalidade}</li>
                        <li><img src="img/naturalidade.png" alt="Naturalidade"></li>
                        <li><strong>Altura:</strong> ${jogador.altura}</li>
                        <li><strong>No Botafogo desde:</strong> ${jogador.no_botafogo_desde}</li>
                    </ul>
                </section>
                <section class="detalhes">
                    <h2>Detalhes</h2>
                    <p>${jogador.detalhes}</p>
                </section>
            </div>
        </div>
    </main>
    `;
    }



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