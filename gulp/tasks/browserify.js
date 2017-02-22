var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');

var browserifyTask = function() {
	return browserify('src/js/main.js')
	    .bundle()
	    //Pass desired output filename to vinyl-source-stream
	    .pipe(source('app.js'))
	    // Start piping stream to tasks!
	    .pipe(gulp.dest('./build/js/'));
}

gulp.task('browserify', browserifyTask);
module.exports = browserifyTask;