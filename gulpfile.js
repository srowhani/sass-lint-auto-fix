const gulp = require('gulp');

const babel = require('gulp-babel');
const watch = require('gulp-watch');
const chmod = require('gulp-chmod');

gulp.task('default', () => {
  gulp.src('src/**/*.js')
    .pipe(babel({ presets: ['env'] }))
    .pipe(gulp.dest('dist'))

  gulp.src('src/config/**/*')
    .pipe(gulp.dest('dist/config/'))

  // gulp.src('dist/index.js')
  //   .pipe(chmod(0o755))
  //   .pipe(gulp.dest('dist'))
  }
);

gulp.task('watch', () =>
  watch('src/**/*', { ignoreInitial: false }, vinyl => {
    vinyl.history.forEach(item => console.log(`${vinyl.event} - ${item}`));
    gulp.src('src/**/*.js')
      .pipe(babel({ presets: ['env'] }))
      .pipe(gulp.dest('dist'))

    gulp.src('src/config/**/*')
      .pipe(gulp.dest('dist/config/'))

    // gulp.src('dist/index.js')
    //   .pipe(chmod(0o755))
    //   .pipe(gulp.dest('dist'))

  })
);
