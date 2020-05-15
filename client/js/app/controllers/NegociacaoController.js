class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        // this.volume = inputQuantidade.value * inputValor.value;

        this._listaNegociacoes = new ListaNegociacoes();

        this._negociacoesView = new NegociacoesView($('#NegociacoesView'));

        this._negociacoesView.update(this._listaNegociacoes);



        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);

    }

    adiciona(event) {

        event.preventDefault();

        this._listaNegociacoes.adiciona(this._crianegociacao());
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem = new Mensagem('Negociação criada com sucesso');
        this._mensagemView.update(this._mensagem);

        this._limpaFormulario();

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