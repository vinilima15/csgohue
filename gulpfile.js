var gulp = require("gulp");
var concat = require("gulp-concat");
var cleanCSS = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var del = require("del");
var fs = require("fs");
var path = require("path");
var eslint = require("gulp-eslint");
var fsExtra = require("fs-extra");
var ServidorKarma = require("karma").Server;

var dirRoot = "./web"; // Diretório da index
var dirAplicacao = "./web/app"; // Diretório raíz da aplicação
var dirOutputJS = "./web/app/assets/js"; // Diretório de destino dos arquivos JS
var dirOutputCSS = "./web/app/assets/css"; // Diretório de destino dos arquivos CSS
var dirModulos = "./web/app/modulos"; // Diretório onde os módulos estão localizados

var dirModulosWeb = "./web";
var dirOutputDeploy = "./dist"; // Diretório de deploy
var dirOutputDeployApp = "./dist/app"; // Diretório de deploy dos assets
var dirOutputDeployAssets = "./dist/app/assets"; // Diretório de deploy dos assets

var nomeAplicacao = JSON.parse(lerArquivo("./package.json")).name;

/**
 * Função responsável por ler o arquivo
 */
function lerArquivo(caminhoArquivo_) {
    return fs.readFileSync(caminhoArquivo_);
}

/**
 * Função responsável por listar os modulos
 */
function listarModulos(caminhoDiretorio_) {
    return fs.readdirSync(caminhoDiretorio_).filter(function (arquivo) {
        return fs.statSync(path.join(caminhoDiretorio_, arquivo)).isDirectory();
    });
}

// Preparação para compilação
gulp.task("limpar-diretorio-output", [], function () {
    return del([dirOutputDeployApp, path.join(dirOutputJS, "**/csgo-hue*.*")]);
    //del();
});

// Consolidação dos módulos em arquivos únicos para cada um
gulp.task("consolidar-modulos", ["limpar-diretorio-output"], function () {
    var modulos = listarModulos(dirModulos);

    modulos.forEach(function (diretorio) {
        console.log("Consolidar módulo: " + diretorio);

        var nomeArquivo = nomeAplicacao + "." + diretorio + ".js";

        var caminhoModulo = path.join(dirModulos, diretorio);

        gulp.src([path.join(caminhoModulo, "/*.module.js"), path.join(caminhoModulo, "/**/*.js")])
            .pipe(concat(nomeArquivo))
            .pipe(gulp.dest(dirOutputJS));
    });

    return gulp;
});

gulp.task("copiar-modulos-deploy", [], function () {
    return gulp.src([path.join(dirModulosWeb, "**/*.*")])
        .pipe(gulp.dest(path.join(dirOutputDeploy, "/")));
});

// Preparação para compilação
gulp.task("limpar-diretorio-output-deploy", [], function () {
    return del([path.join(dirOutputDeploy, "**/*.*")]);
});

//Task build
gulp.task("build", [
    "limpar-diretorio-output",
    "consolidar-modulos"
]);

//Task watch para uso em ambiente de desenvolvimento
gulp.task("watch", ["build"], function () {
    gulp.watch(
        [
            dirModulos + "/**/*.js",
            dirOutputCSS + "/*.css"
        ],
        [
            "build"
        ]
    );
});

gulp.task("publish", [
    "limpar-diretorio-output-deploy",
    "copiar-modulos-deploy"]
);

//Task ddefault
gulp.task("default", ["build"]);