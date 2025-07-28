import { src, dest, watch, series, parallel } from "gulp";
import sass from "gulp-sass";
import * as sassCompiler from "sass";
import pug from "gulp-pug";
import svgSprite from "gulp-svg-sprite";
import concat from "gulp-concat";

// Настройка компилятора SASS
const sassCompilerInstance = sass(sassCompiler);

// Компиляция SCSS в CSS
function compileSass() {
  return src("app/scss/**/*.scss")
    .pipe(
      sassCompilerInstance({ outputStyle: "compressed" }).on(
        "error",
        sass.logError
      )
    )
    .pipe(dest("build/css"));
}

// Компиляция Pug в HTML
function compilePug() {
  return src("app/pug/**/*.pug")
    .pipe(pug({ pretty: true }))
    .pipe(dest("build"));
}

// Копирование шрифтов
function copyFonts() {
  return src("app/fonts/**/*").pipe(dest("build/fonts"));
}

// Копирование изображений
function copyImages() {
  return src("app/img/**/*").pipe(dest("build/img"));
}

// Наблюдение за изменениями
function watchFiles() {
  watch("app/scss/**/*.scss", compileSass);
  watch("app/pug/**/*.pug", compilePug);
  watch("app/img/icons/**/*.svg", createSvgSprite);
  watch("app/js/**/*.js", concatJs);
  watch("app/fonts/**/*", copyFonts);
  watch("app/img/**/*", copyImages);
}

// Основная задача
export default series(
  parallel(
    compileSass,
    compilePug,
    createSvgSprite,
    concatJs,
    copyFonts,
    copyImages
  ),
  watchFiles
);

// Задача для сборки без наблюдения
export const build = series(
  parallel(
    compileSass,
    compilePug,
    createSvgSprite,
    concatJs,
    copyFonts,
    copyImages
  )
);
