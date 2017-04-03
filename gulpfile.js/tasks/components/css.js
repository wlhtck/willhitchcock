var config       = require('../../config')
if(!config.tasks.css) return

var browserSync  = require('browser-sync')
var sourcemaps   = require('gulp-sourcemaps')
var gulp         = require('gulp')
var gulpif       = require('gulp-if')
var sass         = require('gulp-sass')
var handleErrors = require('../../lib/handleErrors')
var autoprefixer = require('gulp-autoprefixer')
var path         = require('path')
var cssnano      = require('gulp-cssnano')
var rename  = require('gulp-rename')

var paths = {
  src: path.join(config.root.src,
        config.tasks.components.src,
        '{' + config.tasks.components.css.src + '}',
        '/**/*.{' + config.tasks.components.css.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.components.dest)
}

var cssTask = function () {
  return gulp.src(paths.src)
    .pipe(gulpif(!global.production, sourcemaps.init()))
    .pipe(sass())
    .on('error', handleErrors)
    .pipe(autoprefixer(config.tasks.css.autoprefixer))
    .pipe(gulpif(global.production, cssnano({autoprefixer: false})))
    .pipe(gulpif(!global.production, sourcemaps.write()))
    .pipe(rename(function(path){
      path.dirname = path.dirname.replace('src', '')
      path.dirname = path.dirname.replace('sass', 'css')
     }))
    .pipe(gulp.dest(paths.dest))
    .pipe(gulpif(!global.production, browserSync.stream()))
}

gulp.task('comp-css', cssTask)
module.exports = cssTask
