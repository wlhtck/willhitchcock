var config     = require('../../config')
var gulp       = require('gulp')
var path       = require('path')
var revReplace = require('gulp-rev-replace')

// 2) Update asset references with reved filenames in compiled css + js
var paths= {
    src: path.join(config.root.dest, config.tasks.json.dest, '**/*.{' + config.tasks.json.extensions + '}'),
    dest: path.join(config.root.dest, config.tasks.json.dest),
}

gulp.task('rev-update-json', function(){
  var manifest = gulp.src(path.join(config.root.dest, "rev-manifest.json"))
  return gulp.src(paths.src)
    .pipe(revReplace({
    	manifest: manifest,
    	replaceInExtensions: ['.json']
    }))
    .pipe(gulp.dest(paths.dest))
})
