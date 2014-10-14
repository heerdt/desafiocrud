var app = angular.module('services', ['ngRoute']);

app.factory('DataService', ['$filter','ListagemService', function ($filter, ListagemService) {

    return {

        find: function (page,text) {

            var listagem = ListagemService.get();

            if (typeof text != 'undefined') {

                var newlist = [];
                console.log(text)

                var i=0, len=listagem.length;
                for (; i<len; i++) {
                    if (listagem[i].cor.toLowerCase().indexOf(text.toLowerCase()) >= 0 || listagem[i].marca.toLowerCase().indexOf(text.toLowerCase()) >= 0) newlist.push(listagem[i]);
                }

                listagem = newlist;
            }

            if (typeof page == 'undefined' || page == null) var page = 1;

            var init = (page - 1) * 5;
            var end = (page * 5) ;
            var showPrev = page != 1;
            var showNext = (listagem.length / 5) > 1 && (Math.ceil(listagem.length / 5)) != page;

            return {
                total: listagem.length,
                list: listagem.slice(init,end),
                page: page,
                showPrev: showPrev,
                showNext: showNext,
                prev: +page-1,
                next: +page+1,
            };
        },
        get: function (placa) {

            var listagem = ListagemService.get();

            var i=0, len=listagem.length;
            for (; i<len; i++) 
                if (listagem[i].placa == placa) return listagem[i];

            return null;
        },
        create: function (data) {
            var listagem = ListagemService.get();

            listagem.push(data);

            return ListagemService.save(listagem)
        },
        update: function (data) {
            
            var listagem = ListagemService.get();

            var i=0, len=listagem.length;
            for (; i<len; i++) 
                if (listagem[i].placa == data.placa) listagem[i] = data;

            return ListagemService.save(listagem);
        },
        delete: function (placa, cb) {
            
            var listagem = ListagemService.get();

            var i=0, len=listagem.length;

            var nl = [];
            for (; i<len; i++) 
                if (listagem[i].placa != placa) nl.push(listagem[i]);
            
            listagem = nl;

            ListagemService.save(listagem);

            return cb();
        },
    }
}]);



app.factory('ListagemService', ['$filter', function ($filter) {

    if (localStorage.getItem('loaded') != 1) {
        var initList = [
            {
                "combustivel":"Flex",
                "imagem":null,
                "marca":"Volkswagen",
                "modelo":"Gol",
                "placa":"FFF5498",
                "cor":"prata"
            },
            {
                "combustivel":"Gasolina",
                "imagem": null,
                "marca": "Volkswagen",
                "modelo": "Fox",
                "placa": "FOX4125",
                "cor": "branco"
            },
            {
                "combustivel":"Alcool",
                "imagem":"http://formula70.syscall.ws/static_img/260002/crop­50x50_fusca1968.jpg",
                "marca":"Volkswagen",
                "modelo":"Fusca",
                "placa":"PAI4121",
                "cor":"preto"
            }
        ];

        localStorage.setItem('listagem', JSON.stringify(initList));
        localStorage.setItem('loaded',1);
    }

    return {
        get: function() {
            return JSON.parse(localStorage.getItem('listagem'));
        },
        save: function(listagem) {
            localStorage.setItem('listagem', JSON.stringify(listagem));
        }
    }
}]);