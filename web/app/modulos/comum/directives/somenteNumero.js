(function () {

    "use strict";

    /**
    * @directive
    * @name  somenteNumero
    **/
    angular.module("csgo-hue.comum")
        .directive("somenteNumero", somenteNumero);

    /**
    * @method
    * @name  comboCgs
    *
    * @methodOf csgo-hue.comum:somenteNumero
    *
    * @description
    * diretiva para permitir somente números nos inputs
    **/
    function somenteNumero() {
        var directive = {
            require: "ngModel",
            restrict: "A",
            link: function (scope, element, attr, ctrl) {
                /**
                * @method
                * @name  comboCgs
                *
                * @methodOf csgo-hue.comum:somenteNumero
                *
                * @description
                * recebe o valor
                **/
                function inputValue(val) {
                    if (val) {
                        var digits = val.replace(/[^0-9]/g, "");

                        if (digits !== val) {
                            ctrl.$setViewValue(digits);
                            ctrl.$render();
                        }
                        return parseInt(digits, 10);
                    }
                    return undefined;
                }
                ctrl.$parsers.push(inputValue);
            }
        };
        return directive;
    }
})();