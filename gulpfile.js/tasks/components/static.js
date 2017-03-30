var config  = require('../../config')
var changed = require('gulp-changed')
var gulp    = require('gulp')
var path    = require('path')
var rename  = require('gulp-rename')

var paths = {
  src: path.join(config.tasks.components.src,
				'{' + config.tasks.components.static.src + '}',
				'**/*'),
  dest: path.join(config.root.dest, config.tasks.components.dest)
}

var staticTask = function() {
  return gulp.src(paths.src)
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(rename(function(path){
     	path.dirname = path.dirname.replace('src', '')
     }))
    .pipe(gulp.dest(paths.dest))
}

gulp.task('comp-static', staticTask)
module.exports = staticTask
