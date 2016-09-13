var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack');
var gutil = require('gulp-util');

gulp.task('sass', function() {
    return gulp.src('./resources/assets/sass/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/angular'))
})

gulp.task('sass:watch', function() {
    gulp.watch('./resources/assets/sass/**/*.scss', ['sass'])
})

gulp.task('copy', function() {
    return gulp.src('./node_modules/bootstrap-sass/assets/fonts/bootstrap/*')
        .pipe(gulp.dest('./public/fonts/bootstrap/'))
})

gulp.task('webpack', function(callback) {
    webpack(require('./webpack.config'), function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);

        gutil.log("[webpack]", stats.toString());

        callback();
    });
})

gulp.task('default', ['sass', 'copy', 'webpack'])