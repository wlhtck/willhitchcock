var config = require('../../config')
if(!config.tasks.components) return

var gulp         = require('gulp')
var gutil        = require('gulp-util')
var gulpSequence = require('gulp-sequence')

var compTask = function(cb) {
  gulpSequence(
    // Assets 
        //  task img (done)
    'comp-images',
        //  static video, fonts (done)
    'comp-static',
    // Code
        //  process-html
    'comp-html',
        //  sass
    'comp-css',
        //  css-nano
        //  uglify
    'comp-js',
    // Rev
        //  use existing tasks (hopefully)

  cb)
}

gulp.task('comp', compTask)
module.exports = compTask