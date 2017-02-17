(function () {
    "use strict";

    /**
     * @ngdoc overview
     * @name arq-spa-base.recursos.constants:app.config
     * @module arq-spa-base.recursos
     * 
     * @description
     * Constantes que armazenam as configurações da aplicação.
     */
    angular.module("arq-spa-base.recursos").constant("appSettings", {
        configuracao: {
            caminhoArquivoConfigContexto: "./app/assets/config/contexto.json",
            caminhoCatalogoDependencias: "./app/assets/config/dependencias.json",
            caminhoDefinicoesFiltros: "./app/assets/config/filtros.json",
            caminhoArquivosModulos: "./app/assets/js/",
            aplicacao: "CSGOHUE",
            memorizador: {
                expiracao: 0
            },
            tratamentoExcecao: {
                servico: "",
                funcao: ""
            },
            expressaoRegularCaracteresEspeciais: "^(?:[\\.>(+|&!$*);,%<?`:#@'=~{}\\-\/\\\sa-zA-Z0-9])*$",
            criptografia: {
                habilitada: false,
                numeroMaximoTentativas: 5
            },
            seguranca: {
                urlWhiteList: ["http://www.globo.com/**",
                    "http://intraweb/**",
                    "http://www.youtube.com/"]
            },
            padraoLogarInformativo: false,
            limparContextoTrabalhoLogoff: false,
            localizacao: {
                timezone: "America/Sao_Paulo",
                local: "pt-br",
                customizacaoLocal: null
            }
        },
        comunicacao: {
            urlBackend: "",
            urlContainer: "",
            urlLog: "",
            timeoutPadrao: 600000
        },
        navegacao: {
            fluxoInicial: "csgo-hue-inicio",
            timeoutPadrao: 600000
        },
        tipoSpinner: {
            spinner: {
                elementHeight: "24px",
                elementWidth: "24px",
                top: "12px",
                left: "12px",
                position: "relative",
                zIndex: null,
                length: 4,
                width: 3,
                radius: 6,
                color: "#555"
            },
            loader: {
                color: "white"
            }
        }
    });
})();