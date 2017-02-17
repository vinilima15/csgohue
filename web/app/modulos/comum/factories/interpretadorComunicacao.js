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