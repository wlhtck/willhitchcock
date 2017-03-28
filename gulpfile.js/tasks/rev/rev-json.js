var config    = require('../../config')
var gulp      = require('gulp')
var path      = require('path')
var rev       = require('gulp-rev')
var revNapkin = require('gulp-rev-napkin')

// 4) Rev and compress CSS and JS files (this is done after assets, so that if a
//    referenced asset hash changes, the parent hash will change as well
var paths= {
  	src: path.join(config.root.dest, config.tasks.json.dest, '**/*.{' + config.tasks.json.extensions + '}'),
    dest: path.join(config.root.dest, config.tasks.json.dest),
}

gulp.task('rev-json', function(){
  return gulp.src(paths.src)
    .pipe(rev())
    .pipe(gulp.dest(paths.dest))
    .pipe(revNapkin({verbose: false}))
    .pipe(rev.manifest(path.join(config.root.dest, 'rev-manifest.json'), {merge: true}))
    .pipe(gulp.dest(''))
})
