const gulp = require('gulp');

const babel = require('gulp-babel');
const watch = require('gulp-watch');
const chmod = require('gulp-chmod');

const fn = _ => {
  gulp.src('src/**/*.js')
    .pipe(babel({ presets: ['env'] }))
    .pipe(gulp.dest('dist/src'))

  gulp.src('src/config/**/*')
    .pipe(gulp.dest('dist/src/config/'))

  gulp.src('index.js')
    .pipe(chmod(0o755))
    .pipe(babel({ presets: ['env'] }))
    .pipe(gulp.dest('dist'))
}

gulp.task('default', fn);

gulp.task('watch', () =>
  watch('src/**/*', { ignoreInitial: false }, vinyl => {
    vinyl.history.forEach(item => console.log(`${vinyl.event} - ${item}`));
    fn();

  })
);
