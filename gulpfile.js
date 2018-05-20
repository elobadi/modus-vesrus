//load plugins
var gulp = require('gulp'),
  sass = require('gulp-sass'),
  compass = require('gulp-compass'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  browserSync = require('browser-sync').create();


//styles
gulp.task('styles', function() {
  return gulp.src(['_/components/scss/*.scss'])
    // .pipe(plumber(plumberErrorHandler))
    .pipe(compass({
      css: '_/src/css',
      sass: '_/components/scss'
      // image: '_/src/images'
    }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('_/src/css'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minifycss())
    .pipe(gulp.dest('_/src/css'))
    .pipe(browserSync.stream());
});

// bootstrap sass
gulp.task('sass', function() {
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss'])
  .pipe(sass())
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(minifycss())
  .pipe(gulp.dest("_/src/css"))
  .pipe(browserSync.stream());
});

//scripts
gulp.task('scripts', function() {
  return gulp.src(['_/components/js/**/*.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(gulp.dest('_/src/js'))
    .pipe(browserSync.stream());
});

// Watch Sass & Serve
gulp.task('serve', ['styles', 'sass'], function() {
  browserSync.init({
    server: "_/"
  });

  //watch .scss files
  gulp.watch(['_/components/scss/**/*.scss', 'node_modules/bootstrap/sass/bootstrap.scss'], ['styles', 'sass']);

  //watch .js files
  gulp.watch('_/components/js/**/*.js', ['scripts']);

  //reload when a template file, the minified css, or the minified js file changes
  gulp.watch(['_/*.html', '_/src/css/styles.min.css', '_/src/js/main.min.js']).on('change', browserSync.reload);
  });

// Move Fonts Folder to src
gulp.task('fonts', function(){
  return gulp.src('node_modules/font-awesome/fonts/*')
  .pipe(gulp.dest("_/src/fonts"));
});

// Move Fontawesome CSS to _/src/css
gulp.task('fa', function(){
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
  .pipe(gulp.dest("_/src/css"));
});

//default task
gulp.task('default', ['scripts', 'serve', 'fa', 'fonts']);
