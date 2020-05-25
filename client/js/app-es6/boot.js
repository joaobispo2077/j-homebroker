import { currentInstance } from "./controllers/NegociacaoController.js";
import {} from "./polyfill/fetch.js";


let negociacaoController = currentInstance();

document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);

document.querySelector('#btn_apaga').onclick = negociacaoController.apaga.bind(negociacaoController);
/*comentario watch*/