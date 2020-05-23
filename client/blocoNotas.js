let listaDeNegociacoes = dadosServidor.reduce((novoArray, array) =>
        novoArray.concat(array), [])
    .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor));





// meu encadeamento de promises (promise chainning)
ConnectionFactory
    .getConnection()
    .then(conexao => new NegociacaoDao(conexao))
    .then(dao => dao.adiciona(new Negociacao(new Date(), 1, 100)))
    .then(() => alert('Negociação adicionada com sucesso'))
    .catch(erro => console.log(erro));

ConnectionFactory
    .getConnection()
    .then(conexao => new NegociacaoDao(conexao))
    .then(dao => dao.adiciona(new Negociacao(new Date(2000, 1, 15), 1, 100)))
    .then(() => alert('Negociação adicionada com sucesso'))
    .catch(erro => console.log(erro))

// C
// ConnectionFactory
// .getConnection()
// .then(new NegociacaoDao())
// .then(dao => dao.adiciona(new Negociacao(new Date(), 1, 100)))
// .then(() => alert('Negociação adicionada com sucesso'))
// .catch(erro => console.log(erro));
// A 
// ConnectionFactory
// .getConnection()
// .then(conexao => new NegociacaoDao(conexao))
// .then(dao => dao(new Negociacao(new Date(), 1, 100)))
// .then(() => alert('Negociação adicionada com sucesso'))
// .catch(erro => console.log(erro));



function a(falhar) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (falhar) {

                reject('PROMISE A FALHOU');
            } else {

                console.log('PROMISE A RESOLVIDA');
                resolve('DADO A');
            }

        }, 2000);
    });
}

function b(falhar) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (falhar) {

                reject('PROMISE B FALHOU');
            } else {

                console.log('PROMISE B RESOLVIDA')
                resolve('DADO B');
            }

        }, 1000);
    });
}

function c(falhar) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (falhar) {

                reject('PROMISE C FALHOU');
            } else {

                console.log('PROMISE C RESOLVIDA')
                resolve('DADO C');
            }

        }, 500);
    });
}



a()
    .then(dado => {
        console.log(dado);
        // O RETORNO DA PROMISE B ESTARÁ DISPONÍVEL NO PRÓXIMO THEN
        return b();
    })
    .then(dado => {
        console.log(dado);

        /* FORÇANDO A REJEIÇÃO DA PROMISE. TEM QUE IR DIRETO PARA O CATCH. 
        SE NÃO TIVESSE REJEITADO, O RETORNO DE C ESTARIA DISPONÍVEL NO PRÓXIMO THEN */
        return c(true);
    })
    .then(dado => {
        console.log(dado);
    })
    .catch(erro => console.log(erro));