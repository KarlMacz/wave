const {
  dest,
  parallel,
  pipe,
  series,
  src,
  task,
  watch
} = require('gulp');

let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');
let del = require('del');

function clean() {
  return del(['dist']);
}

function css() {
  return src('src/sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['.'],
      outputStyle: 'expanded',
      precision: 10,
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe(sourcemaps.mapSources(function(sourcePath, file) {
      return '../../src/sass/' + sourcePath;
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/css'));
}

function js() {
  return src('src/js/*.js')
    .pipe(dest('dist/js'));
};

function font() {
  return src('src/fonts/*')
    .pipe(dest('dist/fonts'));
};

function watcher() {
  let cssWatcher = watch(['src/sass/*.scss'], css);
  let fontWatcher = watch(['src/sass/*'], font);
  let jsWatcher = watch(['src/js/*.js'], js);

  cssWatcher.on('add', function(path, stats) {
    console.log(`File ${path} was added.`);
  });

  cssWatcher.on('change', function(path, stats) {
    console.log(`File ${path} was changed.`);
  });

  cssWatcher.on('unlink', function(path, stats) {
    console.log(`File ${path} was removed.`);
  });

  jsWatcher.on('add', function(path, stats) {
    console.log(`File ${path} was added.`);
  });

  jsWatcher.on('change', function(path, stats) {
    console.log(`File ${path} was changed.`);
  });

  jsWatcher.on('unlink', function(path, stats) {
    console.log(`File ${path} was removed.`);
  });

  fontWatcher.on('add', function(path, stats) {
    console.log(`File ${path} was added.`);
  });

  fontWatcher.on('change', function(path, stats) {
    console.log(`File ${path} was changed.`);
  });

  fontWatcher.on('unlink', function(path, stats) {
    console.log(`File ${path} was removed.`);
  });
}

exports.css = series(clean, css);
exports.js = series(clean, js);
exports.font = series(clean, font);
exports.watch = watcher;
exports.default = series(clean, parallel(css, js, font));
