(function () {

    angular.module("csgo-hue.comum", ["ui.bootstrap"]).config(comumModule).run(["sfTradutor", function (sfTradutor) {
        sfTradutor.adicionarDicionarios(
            [
                "app/modulos/comum/internacionalizacao/"
            ]
        );
    }]);

    comumModule.$inject = ["sfNavegadorProvider"];

    /**
    * @ngdoc overview
    * @name comumModule
    * 
    * @description
    * Navegação do módulo comumModule.
    **/
    function comumModule(sfNavegadorProvider) {

        sfNavegadorProvider.adicionarFluxoNavegacao(
            sfNavegadorProvider.criarFluxoNavegacao("csgo-hue-comum")
                .adicionarEstado("comum", {
                    templateUrl: "./app/modulos/comum/views/template/default.html",
                    controller: "templateController as tempCtrl"
                })
                .definirEstadoInicial("comum")
        );
    }
})();