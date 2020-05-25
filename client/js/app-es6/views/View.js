export class View {
    constructor(elemento) {
        this._elemento = elemento;
    }

    template(model) {
        throw new Error('Você deve sobreescrever o método');
    }

    update(model) {
        return this._elemento.innerHTML = this.template(model);
    }
}