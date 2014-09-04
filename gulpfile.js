var gulp = require('gulp');

var files = {
  scripts: [
    'app/scripts/application.js',
    'app/scripts/**/*.js'
  ],
  scss: [
    'app/scss/**/*.scss'
  ],
  css: [
    'app/css/**/*.css'
  ]
};
files.injectable = files.scripts.concat(files.css);

gulp.task('scripts', function() {
  var jshint = require('gulp-jshint');

  return gulp.src(files.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('styles', function() {
  var sass = require('gulp-sass');
  var autoprefixer = require('gulp-autoprefixer');

  return gulp.src(files.scss)
    .pipe(sass())
    .pipe(autoprefixer('last 1 version'))
    .pipe(gulp.dest('app/css'));
})

gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('app/*.html')
    .pipe(wiredep({
      directory: 'app/bower_components'
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('inject', function() {
  var inject = require('gulp-inject');

  var target = gulp.src('app/index.html');
  var sources = gulp.src(files.injectable, {read: false});

  return target.pipe(inject(sources, {
    ignorePath: 'app'
  }))
    .pipe(gulp.dest('app'));
});

gulp.task('webserver', function() {
  var webserver = require('gulp-webserver');
  gulp.src('app')
    .pipe(webserver({
      livereload: true
    }));
});

gulp.task('watch', ['wiredep', 'styles', 'scripts', 'inject'], function () {
  gulp.watch('bower.json', ['wiredep']);
  gulp.watch(files.scss, ['styles']);
  gulp.watch(files.scripts, ['scripts']);
  gulp.watch(files.injectable, ['inject']);
});

gulp.task('default', ['webserver', 'watch']);
