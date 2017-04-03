var config       = require('../../config')

var browserSync  = require('browser-sync')

var gulp         = require('gulp')
var gulpif       = require('gulp-if')
var processhtml  = require('gulp-processhtml')
var htmlmin      = require('gulp-htmlmin')
var rename       = require('gulp-rename')
var path         = require('path')

var paths = {
  src: path.join(config.root.src,
        config.tasks.components.src,
				config.tasks.components.html.src,
				'/**/*.{' + config.tasks.components.html.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.components.dest)
}

var htmlTask = function() {

  return gulp.src(paths.src)
  	.pipe(processhtml())
    .pipe(gulpif(global.production, htmlmin(config.tasks.html.htmlmin)))
    .pipe(rename(function(path){
     	path.dirname = path.dirname.replace('src', '')
     }))
    .pipe(gulp.dest(paths.dest))
    .on('end', function() {
    	if(!global.production) return
    	browserSync.reload()
    })
}

gulp.task('comp-html', htmlTask)
module.exports = htmlTask
