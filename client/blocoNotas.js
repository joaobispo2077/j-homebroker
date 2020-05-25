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



// usou o module pattern, pois ela não esta usando ES2015 modules!

(function() {


    let lista = document.querySelector('.lista');

    /* 
        O resultado de lista.querySelectorAll retorna um `NodeList` que por padrão 
        não suporta forEach. Nesse caso, pegamos emprestado o `Array.prototype.forEach`
        indicando que seu this será os itens da lista. O último parâmetro, um array, 
        possui todos os parâmetros que a função forEach recebe, no caso, passamos 
        uma arrow function, aquela que itera nos itens da lista.
    */

    Reflect.apply(Array.prototype.forEach, lista.querySelectorAll('.item'), [item => {

        item.addEventListener('click', function() {
            alert(this.textContent);
        });

    }]);

    /*
        Pega o elemento do DOM que contém a entrada do usuário
    */

    let entrada = document.querySelector('.entrada');

    /*
        Adiciona o evento click no botão que ao ser pressionado adiciona novas li na lista.
    */

    document.querySelector('.botao').addEventListener('click', function() {

        let nome = entrada.value.trim();

        if (nome) {

            let novaLi = document.createElement('li');
            novaLi.textContent = nome;
            novaLi.classList.add('item');
            lista.appendChild(novaLi);
            entrada.value = '';
            entrada.focus();
        }

    });

})();