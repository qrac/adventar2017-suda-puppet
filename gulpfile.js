//----------------------------------------------------
// Gulp > npx gulp
//----------------------------------------------------

const gulp = require('gulp');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const rename = require("gulp-rename");
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const sassGlob = require("gulp-sass-glob");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const pug = require('gulp-pug');
const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const mozjpeg  = require('imagemin-mozjpeg')

// Setting : Paths
const paths = {
  'pug': './src/pug/',
  'html': './docs/',
  'scss': './src/scss/',
  'css': './docs/asset/css/',
  'src_js': './src/js/',
  'js': './docs/asset/js/',
  'src_img': './src/img/',
  'img': './docs/asset/img/'
}

// Setting : Sass Options
const sassOptions = {
  outputStyle: 'expanded'
}

// Setting : Pug Options
const pugOptions = {
  pretty: true
}

// Pug
gulp.task('pug', () => {
  return gulp.src([paths.pug + '**/*.pug', '!' + paths.pug + '**/_*.pug'])
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(pug(pugOptions))
    .pipe(gulp.dest(paths.html));
});

// Sass
gulp.task('scss', function () {
  return gulp.src(paths.scss + '**/*.scss')
    .pipe(sassGlob())
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(sass(sassOptions))
    .pipe(autoprefixer(['> 3% in JP', 'ie 11', 'android 4.4', 'last 1 versions']))
    .pipe(gulp.dest(paths.css))
});

// CSS
gulp.task('css', function () {
  return gulp.src([paths.css + '**/*.css', '!' + paths.css + '**/*.min.css'])
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.css))
});

// Image
gulp.task('imagemin', () => {
  return gulp.src(paths.src_img + '*')
    .pipe(imagemin([
      pngquant({ quality: 100, speed: 3 }),
      mozjpeg({ quality: 80 }),
      imagemin.svgo(),
      imagemin.gifsicle()
    ]))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.img))
})

// Browser Sync
gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: paths.html
    }
  });
  gulp.watch(paths.js + "**/*.js", ['reload']);
  gulp.watch(paths.html + "**/*.html", ['reload']);
  gulp.watch(paths.css + "**/*.css", ['reload']);
  gulp.watch(paths.img + "*", ['reload']);
});

gulp.task('reload', () => {
  browserSync.reload();
});

// Watch
gulp.task('watch', function () {
  gulp.watch([paths.pug + '**/*.pug', '!' + paths.pug + '**/_*.pug'], ['pug']);
  gulp.watch(paths.scss + '**/*.scss', ['scss']);
  gulp.watch([paths.css + '**/*.css', '!' + paths.css + '**/*.min.css'], ['css']);
  gulp.watch(paths.src_img + '*', ['imagemin']);
});

gulp.task('default', ['browser-sync', 'watch']);