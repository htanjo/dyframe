'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

gulp.task('jshint', function () {
  return gulp.src(['*.js', '!*.min.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('scripts', ['jshint'], function () {
  return gulp.src('dyframe.js')
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
    'dyframe.js'
  ]).on('change', browserSync.reload);
  gulp.watch('*.js', ['jshint']);
});

gulp.task('default', ['scripts']);
