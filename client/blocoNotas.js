let listaDeNegociacoes = dadosServidor.reduce((novoArray, array) =>
        novoArray.concat(array), [])
    .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor));