const conteudo = (elemento, html) => {
    elemento.innerHTML = html;
}

const pegaDados = async (url) => {
    const response = await fetch(url);
    return await response.json();
}


export { conteudo, pegaDados };