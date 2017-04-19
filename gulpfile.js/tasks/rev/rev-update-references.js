var config     = require('../../config')
var gulp       = require('gulp')
var path       = require('path')
var revReplace = require('gulp-rev-replace')

// 2) Update asset references with reved filenames in compiled css + js
gulp.task('rev-update-references', function(){
  var manifest = gulp.src(path.join(config.root.dest, "rev-manifest.json"))
  var paths= {
  	src: path.join(config.root.dest,'**/**.{css,js}')
  }
  
  console.log(paths.src)
  return gulp.src(paths.src)
    .pipe(revReplace({
    	manifest: manifest,
    	replaceInExtensions: ['.js', '.css']
    }))
    .pipe(gulp.dest(config.root.dest))
})
