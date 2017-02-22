// Gulp Mustache Task 
var gulp = require('gulp');
var mustache = require('gulp-mustache');

var mustacheTask = function() {
	return gulp
		.src(['src/templates/*.mustache', 'src/templates/*/**.mustache'], {base:'templates'})
		.pipe(mustache())
		.pipe(gulp.dest('build/'));
}

gulp.task('mustache', mustacheTask);
module.exports = mustacheTask;