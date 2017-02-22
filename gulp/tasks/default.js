var gulp = require('gulp');

var defaultTask = function() {
	//do default stuff here	
	return gulp;
}

gulp.task('default', defaultTask);
module.exports = defaultTask;