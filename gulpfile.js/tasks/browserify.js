var config       = require('../config')
if(!config.tasks.browserify) return

var gulp         = require('gulp')
var gulpif       = require('gulp-if')
var browserSync  = require('browser-sync')
var sourcemaps   = require('gulp-sourcemaps')
var handleErrors = require('../lib/handleErrors')
var path         = require('path')
var browserify   = require('gulp-browserify')
var uglify       = require('gulp-uglify')


var paths = {
  src: path.join(config.root.src, config.tasks.browserify.src, config.tasks.browserify.app),
  // src: path.join(config.root.src, config.tasks.browserify.src, '/**/*.{' + config.tasks.browserify.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.browserify.dest)
}

var browserifyTask = function () {
  return gulp.src(paths.src)
    .pipe(browserify({
      debug: !global.production
    }))
    .on('error', handleErrors)
    .pipe(gulpif(global.production, uglify()))
    .on('error', handleErrors)
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('browserify', browserifyTask)
module.exports = browserifyTask