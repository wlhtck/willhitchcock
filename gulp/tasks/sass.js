// Gulp sass Task 
var gulp = require('gulp');
var sass = require('gulp-sass');

var sassTask = function(sassRoot, sassDest) {
	return gulp
		.src('src/sass/main.scss', {base:'sass'})
		.pipe(sass())
		.pipe(gulp.dest('build/css/main.css'));
}

gulp.task('sass', sassTask);
module.exports = sassTask;