class NegociacaoService {

    obterNegociacoesDaSemana(cb) {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'negociacoes/semana');

        xhr.onreadystatechange = () => {

            /* ESTADOS DE UMA REQUISIÇÃO AJAX
            0: requisição ainda não iniciada
            
            1: conexão com o servidor estabelecida
            
            2: requisição recebida
            
            3; processando requisição
            
            4: requisição concluída e a resposta esta pronta
            
            */


            if (xhr.readyState == 4 && xhr.status == 200) {

                console.log('obtendo as negociacoes do servidor');
                //xhr.responseText trás um JSON, que, é um arquvio TEXTO escrito em sintaxe de um objeto Javascript
                //A função JSON.parse() transforma um arquivo JSON em um objeto Javascript
                cb(null, JSON.parse(xhr.responseText)
                    .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

            } else {
                console.log(xhr.responseText);
                cb('Não Foi possível obter as negociações', null);
            }
        };

        xhr.send();
    }
}