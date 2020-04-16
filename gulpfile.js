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

function watcher() {
  let cssWatcher = watch(['src/sass/*.scss'], css);
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
}

exports.css = series(clean, css);
exports.js = series(clean, js);
exports.watch = watcher;
exports.default = series(clean, parallel(css, js));
