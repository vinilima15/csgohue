(function () {

    "use strict";

    /**
    * @directive
    * @name  uppercase
    **/
    angular.module("csgo-hue.comum")
        .directive("uppercase", uppercase);

    /**
    * @method
    * @name  comboCgs
    *
    * @methodOf csgo-hue.comum:uppercase
    *
    * @description
    * diretiva para permitir somente números nos inputs
    **/
    function uppercase() {
        var directive = {
            require: "ngModel",
            restrict: "A",
            link: function (scope, element, attrs, modelCtrl) {
                var capitalize = function (inputValue) {
                    if (inputValue == undefined) { inputValue = ""; }
                    var capitalized = inputValue.toUpperCase();
                    if (capitalized !== inputValue) {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                    }
                    return capitalized;
                };
                modelCtrl.$parsers.push(capitalize);
                capitalize(scope[attrs.ngModel]); // capitalize initial value
            }
        };
        return directive;
    }
})();