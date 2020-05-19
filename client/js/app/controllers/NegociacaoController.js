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
            'adiciona', 'esvazia');


        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');
        // ProxyFactory.create(new Mensagem(), ['texto'], model => this._mensagemView.update(model));


    }

    adiciona(event) {

        event.preventDefault();
        this._listaNegociacoes.adiciona(this._crianegociacao());
        this._mensagem.texto = 'Negociação criada com sucesso';
        this._limpaFormulario();

    }

    apaga() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociação apagada com sucesso';

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