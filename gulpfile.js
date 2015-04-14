'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var pkg = require('./package.json');
var banner = [
  '/*!',
  ' * Dyframe',
  ' * @version <%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @author <%= pkg.author %>',
  ' * @license <%= pkg.license.type %>',
  ' */',
  ''].join('\n');

gulp.task('jshint', function () {
  return gulp.src(['gulpfile.js', 'src/*.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('scripts', ['jshint'], function () {
  return gulp.src('src/*.js')
    .pipe($.header(banner, {pkg: pkg}))
    .pipe(gulp.dest('.'))
    .pipe($.uglify({preserveComments: 'some'}))
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest('.'));
});

gulp.task('serve', function () {
  browserSync({
    notify: false,
    server: '.'
  });
  gulp.watch([
    'index.html',
    'src/*.js'
  ]).on('change', browserSync.reload);
  gulp.watch('src/*.js', ['jshint']);
});

gulp.task('default', ['scripts']);
