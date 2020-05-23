class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        // this.volume = inputQuantidade.value * inputValor.value;

        /*
        this._listaNegociacoes = new ListaNegociacoes((model) => this._negociacoesView.update(model));
*/

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#NegociacoesView')),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem');


        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');
        // ProxyFactory.create(new Mensagem(), ['texto'], model => this._mensagemView.update(model));

        this._ordemAtual = '';

        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .then(negociacoes => negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => {
                console.log(erro);
                this._mensagem.texto = erro;

            });

        // .then(connection => {

        //     new NegociacaoDao(connection)
        //         .listaTodos()
        //         .then(negociacoes => {
        //             negociacoes.forEach(negociacao => {
        //                 this._listaNegociacoes.adiciona(negociacao);
        //             });
        //         });
        // });


    }

    adiciona(event) {
        event.preventDefault();

        ConnectionFactory
            .getConnection()
            .then(connection => {
                let negociacao = this._criaNegociacao();

                new NegociacaoDao(connection)
                    .adiciona(negociacao)
                    .then(() => {
                        this._listaNegociacoes.adiciona(negociacao);
                        this._mensagem.texto = 'Negociação adicionada com sucesso';
                        this._limpaFormulario();

                    })
                    .catch(erro => {

                        this._mensagem.texto = erro;
                    });
            });

    }

    importaNegociacoes() {
        let service = new NegociacaoService();

        service
            .obterNegociacoes()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações do período importadas com sucesso';
            })
            .catch(error => this._mensagem.texto = error);

        // Promise.all([
        //         service.obterNegociacoesDaSemana(),
        //         service.obterNegociacoesDaSemanaAnterior(),
        //         service.obterNegociacoesDaSemanaRetrasada()
        //     ])
        //     .then((negociacoes) => {
        //         negociacoes
        //             .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
        //             .forEach((negociacao) => this._listaNegociacoes.adiciona(negociacao));
        //         this._mensagem.texto = 'Negociações importadas com sucesso';
        //     }).catch((error) => this._mensagem.texto = error);

    }

    apaga() {
        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(msg => {
                this._mensagem.texto = msg
                this._listaNegociacoes.esvazia();
            })
            .catch(erro => this._mensagem.texto = erro);


    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)

        );

        // let diaMesAno = DateHelper.dataParaTexto(negociacao.data);
    }
    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }

    ordena(coluna) {
        if (this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }
}