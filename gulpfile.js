const gulp = require('gulp');
const es = require('event-stream');
const babel = require('gulp-babel');
const del = require('del');
const rename = require('gulp-rename');
const changed = require('gulp-changed');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const eslint = require('gulp-eslint');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const electron = require('electron-packager');

gulp.task('default', ['js', 'css', 'resources']);

gulp.task('clean', () => {
  return del.sync(['build', 'package', 'binaries']);
});

gulp.task('js', () => {
  return gulp.src('src/**')
    .pipe(changed('build'))
    .pipe(babel({
      presets: ['es2015', 'react'],
      plugins: ['transform-object-rest-spread']
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('css', () => {
  return gulp.src('style/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename('james.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build'));
});

gulp.task('resources', () => {
  return es.merge([
    gulp.src('node_modules/font-awesome/fonts/**').pipe(gulp.dest('build/fonts')),
    gulp.src('resource/**')
      .pipe(changed('build'))
      .pipe(gulp.dest('build'))
  ]);
});

gulp.task('package-resources', ['default'], () => {
  return es.merge([
    gulp.src('node_modules/font-awesome/fonts/**').pipe(gulp.dest('package/fonts')),
    gulp.src('resource/**').pipe(gulp.dest('package')), // todo run gulp-useref to not do electron-connect in prod
    gulp.src('build/james.css').pipe(gulp.dest('package'))
  ]);
});

gulp.task('package-browserify', ['default'], () => {
  return browserify('./build/index.js', {
    builtins: false, // Attempt to reproduce
    browserField: false // the `--node` flag
  })
    .exclude('remote')
    .exclude('child-killer')
    .bundle()
    .pipe(source('index.js')).
    pipe(gulp.dest('./package/'))
});

gulp.task('package', ['package-resources', 'package-browserify'], (done) => {
  electron({
    all: true,
    dir: 'package',
    platform: 'all',
    name: 'James',
    overwrite: true,
    icon: 'resource/icon.icns',
    version: '0.36.5',
    out: 'binaries'
  }, () => done())
});

gulp.task('lint', () => {
  return gulp.src(['src/**', 'test/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
});

gulp.task('watch', () => {
  gulp.start(['default', 'lint']); // 'default' isn't a dependant task so that watchers will start immediately after `gulp watch`
  gulp.watch('src/**', ['js']);
  gulp.watch('style/**', ['css']);
  gulp.watch('resource/**', ['resources']);
});