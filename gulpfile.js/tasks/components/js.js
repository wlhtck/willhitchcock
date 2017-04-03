var config  = require('../../config')
var changed = require('gulp-changed')
var gulp    = require('gulp')
var path    = require('path')
var rename  = require('gulp-rename')
var gulpif  = require('gulp-if')
var uglify  = require('gulp-uglify')

var paths = {
  src: path.join(config.root.src,
        config.tasks.components.src,
				config.tasks.components.js.src,
				'/**/*.{' + config.tasks.components.js.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.components.dest)
}

var jsTask = function() {
  return gulp.src(paths.src)
    .pipe(gulpif(global.production, uglify()))
    .pipe(rename(function(path){
     	path.dirname = path.dirname.replace('src', '')
     }))
    .pipe(gulp.dest(paths.dest))
}

gulp.task('comp-js', jsTask)
module.exports = jsTask
