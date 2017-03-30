var config = require('../../config')
if(!config.tasks.components) return

var gulp         = require('gulp')
var gutil        = require('gulp-util')
var gulpSequence = require('gulp-sequence')

// If you are familiar with Rails, this task the equivalent of `rake assets:precompile`
var compTask = function(cb) {
  gulpSequence(
    // 1) Add md5 hashes to assets referenced by CSS and JS files

    // Assets 
        //  task img (done)
    'comp-images',
        //  static video, fonts (done)
    'comp-static',
    // Code
        //  process-html
        //  sass
        //  css-nano
        //  uglify
    // Rev
        //  use existing tasks (hopefully)

  cb)
}

gulp.task('comp', compTask)
module.exports = compTask