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
(function () {

    "use strict";

    var utilitarios = {
        
        getTemplate: function (elem, attrs) {
            return (attrs.template ? "./app/modulos/comum/views/" + this.name + "/" + attrs.template + ".html" : "./app/modulos/comum/views/" + this.name + "/default.html");
        }
    };

    angular.module("csgo-hue.comum").constant("utilitariosDriver", utilitarios);
})();
(function () {

    "use strict";

    angular.module("csgo-hue.comum").value("THROTTLE_MILLISECONDS", null);

    /**
    * @directive
    * @name  infiniteScroll
    **/
    angular.module("csgo-hue.comum")
        .directive("infiniteScroll", infiniteScroll);

    infiniteScroll.$inject = ["$rootScope", "$window", "$interval", "THROTTLE_MILLISECONDS"];

    /**
    * @method
    * @name  comboCgs
    *
    * @methodOf csgo-hue.comum:infiniteScroll
    *
    * @description
    * diretiva infinite scroll
    **/
    function infiniteScroll($rootScope, $window, $interval, THROTTLE_MILLISECONDS) {
        var directive = {
            scope: {
                infiniteScroll: "&",
                infiniteScrollContainer: "=",
                infiniteScrollDistance: "=",
                infiniteScrollDisabled: "=",
                infiniteScrollUseDocumentBottom: "=",
                infiniteScrollListenForEvent: "@"
            },
            link: function (scope, elem, attrs) {
                var changeContainer, checkWhenEnabled, container, handleInfiniteScrollContainer, handleInfiniteScrollDisabled, handleInfiniteScrollDistance, handleInfiniteScrollUseDocumentBottom, handler, height, immediateCheck, offsetTop, pageYOffset, scrollDistance, scrollEnabled, throttle, unregisterEventListener, useDocumentBottom, windowElement;
                windowElement = angular.element($window);
                scrollDistance = null;
                scrollEnabled = null;
                checkWhenEnabled = null;
                container = null;
                immediateCheck = true;
                useDocumentBottom = false;
                unregisterEventListener = null;
                height = function (elem) {
                    elem = elem[0] || elem;
                    if (isNaN(elem.offsetHeight)) {
                        return elem.document.documentElement.clientHeight;
                    } else {
                        return elem.offsetHeight;
                    }
                };
                offsetTop = function (elem) {
                    if (!elem[0].getBoundingClientRect || elem.css("none")) {
                        return;
                    }
                    var retorno = elem[0].getBoundingClientRect().top + pageYOffset(elem);
                    return retorno;
                };
                pageYOffset = function (elem) {
                    elem = elem[0] || elem;
                    if (isNaN(window.pageYOffset)) {
                        return elem.document.documentElement.scrollTop;
                    } else {
                        return elem.ownerDocument.defaultView.pageYOffset;
                    }
                };
                handler = function () {
                    var containerBottom, containerTopOffset, elementBottom, remaining, shouldScroll;
                    if (container === windowElement) {
                        containerBottom = height(container) + pageYOffset(container[0].document.documentElement);
                        elementBottom = offsetTop(elem) + height(elem);
                    } else {
                        containerBottom = height(container);
                        containerTopOffset = 0;
                        if (offsetTop(container) !== void 0) {
                            containerTopOffset = offsetTop(container);
                        }
                        elementBottom = offsetTop(elem) - containerTopOffset + height(elem);
                    }
                    if (useDocumentBottom) {
                        elementBottom = height((elem[0].ownerDocument || elem[0].document).documentElement);
                    }
                    remaining = elementBottom - containerBottom;
                    shouldScroll = remaining <= height(container) * scrollDistance + 1;
                    if (shouldScroll) {
                        checkWhenEnabled = true;
                        if (scrollEnabled) {
                            if (scope.$$phase || $rootScope.$$phase) {
                                return scope.infiniteScroll();
                            } else {
                                return scope.$apply(scope.infiniteScroll);
                            }
                        }
                    } else {
                        return checkWhenEnabled = false;
                    }
                };
                throttle = function (func, wait) {
                    var later, previous, timeout;
                    timeout = null;
                    previous = 0;
                    later = function () {
                        previous = new Date().getTime();
                        $interval.cancel(timeout);
                        timeout = null;
                        func.call();
                        return null;
                    };
                    return function () {
                        var now, remaining;
                        now = new Date().getTime();
                        remaining = wait - (now - previous);
                        if (remaining <= 0) {
                            clearTimeout(timeout);
                            $interval.cancel(timeout);
                            timeout = null;
                            previous = now;
                            return func.call();
                        } else if (!timeout) {
                            return timeout = $interval(later, remaining, 1);
                        } else {
                            return timeout;
                        }

                    };
                };
                if (THROTTLE_MILLISECONDS != null) {
                    handler = throttle(handler, THROTTLE_MILLISECONDS);
                }
                scope.$on("$destroy", function () {
                    container.unbind("scroll", handler);
                    if (unregisterEventListener != null) {
                        unregisterEventListener();
                        return unregisterEventListener = null;
                    }
                });
                handleInfiniteScrollDistance = function (v) {
                    return scrollDistance = parseFloat(v) || 0;
                };
                scope.$watch("infiniteScrollDistance", handleInfiniteScrollDistance);
                handleInfiniteScrollDistance(scope.infiniteScrollDistance);
                handleInfiniteScrollDisabled = function (v) {
                    scrollEnabled = !v;
                    if (scrollEnabled && checkWhenEnabled) {
                        checkWhenEnabled = false;
                        return handler();
                    }
                };
                scope.$watch("infiniteScrollDisabled", handleInfiniteScrollDisabled);
                handleInfiniteScrollDisabled(scope.infiniteScrollDisabled);
                handleInfiniteScrollUseDocumentBottom = function (v) {
                    return useDocumentBottom = v;
                };
                scope.$watch("infiniteScrollUseDocumentBottom", handleInfiniteScrollUseDocumentBottom);
                handleInfiniteScrollUseDocumentBottom(scope.infiniteScrollUseDocumentBottom);
                changeContainer = function (newContainer) {
                    if (container != null) {
                        container.unbind("scroll", handler);
                    }
                    container = newContainer;
                    if (newContainer != null) {
                        return container.bind("scroll", handler);
                    }
                };
                changeContainer(windowElement);
                if (scope.infiniteScrollListenForEvent) {
                    unregisterEventListener = $rootScope.$on(scope.infiniteScrollListenForEvent, handler);
                }
                handleInfiniteScrollContainer = function (newContainer) {
                    if ((newContainer == null) || newContainer.length === 0) {
                        return;
                    }
                    if (newContainer instanceof HTMLElement) {
                        newContainer = angular.element(newContainer);
                    } else if (typeof newContainer.append === "function") {
                        newContainer = angular.element(newContainer[newContainer.length - 1]);
                    } else if (typeof newContainer === "string") {
                        newContainer = angular.element(document.querySelector(newContainer));
                    }
                    if (newContainer != null) {
                        return changeContainer(newContainer);
                    } else {
                        throw new Exception("invalid infinite-scroll-container attribute.");
                    }
                };
                scope.$watch("infiniteScrollContainer", handleInfiniteScrollContainer);
                handleInfiniteScrollContainer(scope.infiniteScrollContainer || []);
                if (attrs.infiniteScrollParent != null) {
                    changeContainer(angular.element(elem.parent()));
                }
                if (attrs.infiniteScrollImmediateCheck != null) {
                    immediateCheck = scope.$eval(attrs.infiniteScrollImmediateCheck);
                }
                return $interval((function () {
                    if (immediateCheck) {
                        return handler();
                    }
                }), 0, 1);
            }
        };
        return directive;
    }
})();
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
(function () {
    "use strict";

    angular.module("csgo-hue.comum")
        .factory("interpretadorComunicacao", interpretadorComunicacao);

    interpretadorComunicacao.$inject = ["sfNavegador", "$log", "sfContexto"];

    /**
    * @ngdoc method
    * @name interpretadorComunicacao
    *
    * @methodOf csgo-hue.comum:interpretadorComunicacao
    *  
    * @description
    * Método responsavel por interpretar e processar as transacoes recebidas pelo controlador
    **/
    function interpretadorComunicacao() {

        return {
            interpretar: interpretar
        };

        /**
        * @ngdoc method
        * @name interpretar
        *
        * @methodOf csgo-hue.comum:interpretadorComunicacao
        *  
        * @description
        * Método responsavel por inicializar a promisse que será retornada
        **/
        function interpretar(promise, deslogar) {
            return new InterpretadorPromise(promise, deslogar);

            /**
             * @ngdoc method
             * @name InterpretadorPromise
             *
             * @methodOf csgo-hue.comum:interpretadorComunicacao
             *  
             * @description
             * Método que recebe a promisse como parâmetro e executa os callbacks de acordo com o resultado
             **/
            function InterpretadorPromise(_promise) {
                this.promise = _promise;

                this.sucesso = callbackSucesso;
                this.aviso = callbackAviso;
                this.erro = callbackErro;

                /**
                * @ngdoc method
                * @name callbackSucesso
                *
                * @methodOf csgo-hue.comum:interpretadorComunicacao
                *  
                * @description
                * Método que executa o call back de sucesso caso a comunicação tenha sido realizada com sucesso
                **/
                function callbackSucesso(callback) {
                    this.promise.then(callbackPromise);

                    /**
                    * @ngdoc method
                    * @name callbackPromise
                    *
                    * @methodOf csgo-hue.comum:interpretadorComunicacao
                    *  
                    * @description
                    * Método que re-chama a promisse de acordo com o resultado passando os dados retornados como parametro
                    **/
                    function callbackPromise(resultado) {
                        if (resultado.status === 200 || resultado.status === 201) {
                            resultado.data.httpStatusCode = resultado.status;

                            callback(resultado.data);
                        }
                    }

                    return this;
                }

                /**
                * @ngdoc method
                * @name callbackAviso
                *
                * @methodOf csgo-hue.comum:interpretadorComunicacao
                *
                * @description
                * Método que executa o call back de aviso caso a comunicação tenha retornado um aviso
                **/
                function callbackAviso(callback) {
                    this.promise.then(callbackPromise);

                    /**
                    * @ngdoc method
                    * @name callbackPromise
                    *
                    * @methodOf csgo-hue.comum:interpretadorComunicacao
                    *  
                    * @description
                    * Método que re-chama a promisse de acordo com o resultado passando os dados retornados como parametro
                    **/
                    function callbackPromise(resultado) {
                        if (resultado.status === 250) {
                            resultado.data.httpStatusCode = resultado.status;

                            callback(resultado.data);
                        }
                    }

                    return this;
                }

                /**
                * @ngdoc method
                * @name callbackErro
                *
                * @methodOf csgo-hue.comum:interpretadorComunicacao
                *
                * @description
                * Método que executa o call back de erro caso a comunicação tenha retornado um erro
                **/
                function callbackErro(callback) {
                    this.promise.then(callbackPromiseSucesso).catch(callbackPromiseErro);

                    /**
                    * @ngdoc method
                    * @name callbackPromiseSucesso
                    *
                    * @methodOf csgo-hue.comum:interpretadorComunicacao
                    *  
                    * @description
                    * Método que re-chama a promisse de acordo com o resultado passando os dados retornados como parametro
                    **/
                    function callbackPromiseSucesso(erro) {
                        if (validarRangeErros(erro.status)) {
                            erro.data.httpStatusCode = erro.status;

                            callback(erro.data);
                        }
                    }

                    /**
                    * @ngdoc method
                    * @name callbackPromiseErro
                    *
                    * @methodOf csgo-hue.comum:interpretadorComunicacao
                    *  
                    * @description
                    * Método que re-chama a promisse de acordo com o resultado passando os dados retornados como parametro
                    **/
                    function callbackPromiseErro(erro) {
                        if (validarRangeErros(erro.status)) {
                            erro.data.httpStatusCode = erro.status;

                            callback(erro.data);
                        } else {
                            callback(erro.data);
                        }
                    }

                    /**
                     * @description Método responsavel por validar se o httpStatusCode está num range aceitavel pela aplicação.
                     */
                    function validarRangeErros(httpStatusCode) {
                        return (httpStatusCode >= 400 && httpStatusCode <= 599);
                    }

                    return this;
                }
            }
        }


    }
})();
(function () {

    "use-strict";

    angular.module("csgo-hue.comum").controller("templateController", templateController);

    /**
    * @ngdoc overview
    * @name templateController
    * 
    * @description
    * Navegação do módulo templateController.
    **/
    function templateController() {

        var vm = this;
        console.log(vm);
    }

})();