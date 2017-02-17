(function () {

    "use strict";

    var utilitarios = {
        
        getTemplate: function (elem, attrs) {
            return (attrs.template ? "./app/modulos/comum/views/" + this.name + "/" + attrs.template + ".html" : "./app/modulos/comum/views/" + this.name + "/default.html");
        }
    };

    angular.module("csgo-hue.comum").constant("utilitariosDriver", utilitarios);
})();