'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var fs = require('fs');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var minimist = require('minimist');

var getJson = function (filepath) {
  return JSON.parse(fs.readFileSync(filepath, 'utf8'));
};
var knownOptions = {
  string: 'bump',
  default: {
    bump: 'patch'
  }
};
var options = minimist(process.argv.slice(2), knownOptions);
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

gulp.task('scripts', function () {
  var pkg = getJson('package.json');
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

gulp.task('bump', function () {
  return gulp.src(['package.json', 'bower.json'])
    .pipe($.bump({type: options.bump}))
    .pipe(gulp.dest('.'));
});

gulp.task('commit', function () {
  var version = getJson('package.json').version;
  return gulp.src(['package.json', 'bower.json', '*.js'])
    .pipe($.git.commit('Release v' + version));
});

gulp.task('tag', function (callback) {
  var version = getJson('package.json').version;
  $.git.tag('v' + version, 'Release v' + version, callback);
});

gulp.task('test', ['jshint']);

gulp.task('build', ['scripts']);

gulp.task('release', function (callback) {
  runSequence('test', 'bump', 'build', 'commit', 'tag', callback);
});

gulp.task('default', ['test']);
