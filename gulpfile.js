var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

var PathTo = {
  SassFiles: './sass/**/*.scss',
  PublicFolder: './public',
  PublicCss: './public/css',
  PublicCssFiles: './public/css/*.css'
};

gulp.task('watch-files', function (){
  gulp.watch(PathTo.SassFiles, ['compile-sass']);
  gulp.watch(PathTo.PublicCssFiles, ['html']);
});

gulp.task('compile-sass', function (){
  return gulp
          .src(PathTo.SassFiles)
          .pipe(sass().on('error', sass.logError))
          .pipe(gulp.dest(PathTo.PublicCss));
});

gulp.task('html', function () {
  return gulp.src('./views/index.pug')
    .pipe(connect.reload());
});

// gulp.task('public-server', function () {
//   connect.server({
//     root:'./public',
//     port: 8080,
//     livereload: true
//   });
// });

gulp.task('default', ['compile-sass', 'watch-files']);
