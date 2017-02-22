var gulp = require('gulp');

var copyHTMLTask = function() {
	return gulp
		.src(['src/*/**.html', 'src/*.html'])
	    .pipe(gulp.dest('build/'));
}

gulp.task('copyHTML', copyHTMLTask);
module.exports = copyHTMLTask;