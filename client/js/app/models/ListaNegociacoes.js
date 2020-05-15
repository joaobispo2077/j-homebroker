class ListaNegociacoes {
    constructor(atualiza) {
        this._negociacoes = [];
        this._atualiza = atualiza;

    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
        this._atualiza(this);
    }

    get negociacoes() {
        return [].concat(this._negociacoes);
    }

    esvazia() {
        this._negociacoes = [];
        this._atualiza(this);
    }
}