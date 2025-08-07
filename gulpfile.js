const { src, dest, watch, series, parallel } = require("gulp");
const concat = require("gulp-concat");
const sass = require("gulp-sass")(require("sass"));
const pug = require("gulp-pug");

// Компиляция SCSS в CSS
const sass2css = () => {
  return src(["./app/scss/main.scss"])
    .pipe(sass())
    .pipe(concat("main.css"))
    .pipe(dest("./build/styles/"));
};

// Компиляция Pug в HTML
const pug2html = () => {
  return src(["./app/**/*.pug"]).pipe(pug()).pipe(dest("./build/"));
};

// Наблюдение за изменениями
const watchFiles = () => {
  watch("app/scss/**/*.scss", sass2css);
  watch("app/pug/**/*.pug", pug2html);
};

exports.default = parallel(sass2css, pug2html);
exports.watch = series(exports.default, watchFiles);
