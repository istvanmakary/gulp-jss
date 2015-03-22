var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('jshint', function () {
  return gulp.src(['index.js', './gulpfile.js'])
  .pipe(jshint())
  .pipe(jshint.reporter(stylish))
  .pipe(jshint.reporter('fail'))
    ;
});
