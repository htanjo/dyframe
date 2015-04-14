'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('serve', function () {
  browserSync({
    notify: false,
    server: '.'
  });
  gulp.watch([
    'index.html',
    'dyframe.js'
  ]).on('change', browserSync.reload);
});
