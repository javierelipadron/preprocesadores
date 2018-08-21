var gulp = require('gulp');
var notify = require('gulp-notify');
var stylus = require('gulp-stylus');
var less = require('gulp-less');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
    browserSync.init({
      server: {
        baseDir: 'app'
      },
    })
  })

gulp.task('stylus', function () {
    return gulp.src('./stylus/*.styl')
      .pipe(stylus())
      .pipe(gulp.dest('./css'))
      .pipe(notify("Stylus se compilo correctamente!"))
      .pipe(browserSync.reload({
        stream: true
      }));
});

gulp.task('less', function() {
    return gulp.src('./less/*.less')  // only compile the entry file
        .pipe(less())
        .pipe(gulp.dest('./css'))
        .pipe(notify("Less se compilo correctamente!"))
        .pipe(browserSync.reload({
            stream: true
          }));
});

gulp.task('sass', function () {
    return gulp.src('./sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./css'))
      .pipe(notify("Sass se compilo correctamente!"))
      .pipe(browserSync.reload({
        stream: true
      }));
  });

  gulp.task('watch', ['browserSync', 'stylus', 'less', 'sass'], function (){
    gulp.watch('./stylus/*.styl', ['stylus']);
    gulp.watch('.less/*.less', ['less']);
    gulp.watch('.sass/sass/**/*.scss', ['sass']);
});



gulp.task('default', ['watch']);