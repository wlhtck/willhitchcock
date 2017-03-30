var config = require('../../config')

var browserSync     = require('browser-sync')
var changed         = require('gulp-changed')
var gulp            = require('gulp')
var gulpif          = require('gulp-if')
var imagemin        = require('gulp-imagemin')
var imageminGuetzli = require('imagemin-guetzli')
var rename          = require('gulp-rename')
var path            = require('path')

// src: path.join(config.root.src, config.tasks.images.src, '/**/*.{' + config.tasks.images.extensions + '}'),
var paths = {
  src: path.join(config.tasks.components.src,
  				config.tasks.components.images.src,
  				'/**/*.{' + config.tasks.components.images.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.components.dest)
}

var imagesTask = function() {
   return gulp.src(paths.src)
     .pipe(changed(paths.dest)) // Ignore unchanged files
     .pipe(gulpif(global.production, imagemin([imageminGuetzli()]))) // Optimize
     .pipe(rename(function(path){
     	path.dirname = path.dirname.replace('src', '')
     }))
     .pipe(gulp.dest(paths.dest))
     .pipe(gulpif(!global.production, browserSync.stream()))
}

gulp.task('comp-images', imagesTask)
module.exports = imagesTask
