(function(){

    /**
     * @ngdoc overview
     * @name csgo-hue.inicio
     * 
     * @require 
     * 
     * @description
     * Módulo que compõe os links de acesso para as páginas do configurador.
     **/
    angular.module("csgo-hue.inicio", ["csgo-hue.comum"]).config(inicioModule)
        .run(["sfTradutor", function(tradutor){
            tradutor.adicionarDicionarios([
                "app/modulos/inicio/internacionalizacao"
            ]);
        }]);

        inicioModule.$inject = ["sfNavegadorProvider"];

        /**
        * @ngdoc overview
        * @name inicioModule
        * 
        * @description
        * Navegação do módulo incio.
        **/
        function inicioModule(sfNavegadorProvider){
            sfNavegadorProvider.adicionarFluxoNavegacao(
                sfNavegadorProvider.criarFluxoNavegacao("csgo-hue-inicio")
                    .adicionarEstado("inicio", {
                        templateUrl: "./app/modulos/inicio/views/inicio.html",
                        controller: "inicioController as iniCtrl"
                    })
                    .definirEstadoInicial("inicio")
            );
        }
})();