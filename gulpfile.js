var gulp = require('gulp');
var sass = require('gulp-sass');
// var connect = require('gulp-connect');

// var PathTo = {
//   SassFiles: './sass/**/*.scss',
//   PublicFolder: './public',
//   PublicCss: './public/styles',
//   PublicCssFiles: './public/styles/*.css'
// };

gulp.task('styles', function () {
  gulp.src('sass/styles.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function () {
  gulp.watch('sass/**/*', ['styles']);
});

gulp.task('default', ['watch']);
