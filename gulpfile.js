var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    del = require('del'),
    stylish = require('jshint-stylish'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    watch = require('gulp-watch');


gulp.task('js', function() {
    return gulp.src('./src/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('scss', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(concat('index.css'))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('static', function() {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist/'));
});

gulp.task('clean', function() {
    del.sync(['./dist/**']);
});

gulp.task('bundle', ['js', 'scss', 'static']);
gulp.task('build', ['clean', 'bundle']);

gulp.task('default', ['bundle'], function() {
    gulp.watch('./src/js/*.js', ['js']);
    gulp.watch('./src/scss/*.scss', ['scss']);
    gulp.watch('./src/*.html', ['static']);
});

gulp.task('hint', function() {
    return gulp.src('./src/js/*.js')
        .pipe(watch('./src/js/*.js'))
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});
