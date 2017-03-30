var config = require('../../config')
if(!config.tasks.components) return

var gulp         = require('gulp')
var gutil        = require('gulp-util')
var gulpSequence = require('gulp-sequence')
var path         = require('path')
var fs           = require('fs')

var paths = {
  src: config.tasks.components.src,
  dest: path.join(config.root.dest, config.tasks.components.dest),
  comps: []
}

var dirs = fs.readdirSync(paths.src)
    .filter(file => fs.statSync(path.join(paths.src, file)).isDirectory())

for (var i = dirs.length - 1; i >= 0; i--) {
	var compSrc = path.join(paths.src, dirs[i])
	var compDest = path.join(paths.dest, dirs[i])

	var compData = require(path.resolve(compSrc + '/package'))
	paths.comps.push({
		src: path.join(compSrc, compData.directory_source),
		dest: compDest
	})
}

console.log(paths)

var compSequence = function(src, dest) {
	return gulp.src(src)
		// Assets 
		// 	task img
		// 	static video, fonts
		// Code
		// 	process-html
		//  sass
		// 	css-nano
		// 	uglify
		// Rev
		// 	use existing tasks (hopefully)
    	.pipe(gulp.dest(dest))
}

var compTask = function() {
	for (var i = paths.comps.length - 1; i >= 0; i--) {
		compSequence(path.join(paths.comps[i].src, '**/*'), paths.comps[i].dest)
	}
}

gulp.task('components', compTask)
module.exports = compTask
