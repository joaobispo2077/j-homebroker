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
        let self = this;
        this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {

            get(target, prop, receiver) {
                if (['adiciona', 'esvazia'].includes(prop) && typeof(target[prop] == typeof(Function))) {
                    return function() {
                        console.log(`interceptando ${prop}`);

                        Reflect.apply(target[prop], target, arguments);

                        self._negociacoesView.update(target);
                    }
                }
                return Reflect.get(target, prop, receiver);
            }
        });

        this._negociacoesView = new NegociacoesView($('#NegociacoesView'));

        this._negociacoesView.update(this._listaNegociacoes);




        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);

    }

    adiciona(event) {

        event.preventDefault();

        this._listaNegociacoes.adiciona(this._crianegociacao());


        this._mensagem = new Mensagem('Negociação criada com sucesso');
        this._mensagemView.update(this._mensagem);

        this._limpaFormulario();

    }

    apaga() {
        this._listaNegociacoes.esvazia();

        this._mensagem.texto = 'Negociação apagada com sucesso';
        this._mensagemView.update(this._mensagem);
    }

    _crianegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );

        // let diaMesAno = DateHelper.dataParaTexto(negociacao.data);
    }
    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
}