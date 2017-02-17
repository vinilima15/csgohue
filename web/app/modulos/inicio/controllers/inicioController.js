(function () {

    "use-strict";

    /**
     * @ngdoc overview
     * @name csgo-hue.inicio.inicioController
     *
     * @requires 
     *
     * @description
     * Controller responsável pela tratativa das ações a serem realizadas na view de início.
     **/

    angular.module("csgo-hue.inicio").controller("inicioController", inicioController);

    inicioController.$inject = ["sfNavegador", "sfContexto", "$scope", "$rootScope", "$uibModal"];

    /**
    * @ngdoc method
    * @name inicioController
    *
    * @methodOf  csgo-hue.mensagens.inicioController
    *
    * @description
    * Método responsável pela tratativa das informações trafegadas dentro do módulo.
    **/
    function inicioController(sfNavegador, sfContexto, $scope, $rootScope, $uibModal) {
        var vm = this;
        vm.teste = teste;
        var modalCarregamento = null;

        $rootScope.mostrarModalCarregamento = mostrarModalCarregamento;
        $scope.ocultarModalCarregamento = ocultarModalCarregamento;

        vm.listaTeste = [1, 2, 3, 4];
        vm.lista = [{
            codigo: 1,
            descricao: "TESTE 1"
        },
        {
            codigo: 2,
            descricao: "TESTE 2"
        }, {
            codigo: 3,
            descricao: "TESTE 3"
        },
        {
            codigo: 4,
            descricao: "TESTE 4"
        }];

        function teste() {
            $rootScope.showMenu = true;
        }

        /**
         * @ngdoc method
         * @name mostrarModalCarregamento
         * @description Exibe uma Modal de carregamento CGS
         **/
        function mostrarModalCarregamento() {
            modalCarregamento = $uibModal.open({
                templateUrl: "app\\modulos\\comum\\views\\modalCarregamento.html",
                backdrop: "static",
                size: "lg",
                scope: $scope
            });
        }

        /**
         * @ngdoc method
         * @name ocultarModalCarregamento
         * @description Oculta a Modal de carregamento CGS
         **/
        function ocultarModalCarregamento() {
            modalCarregamento.dismiss();
        }
    }
})();