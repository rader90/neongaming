'use strict'

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoPrefix = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

gulp.task('copyHTML', function(){
    gulp.src('src/*.html')
    .pipe(gulp.dest('build'))
});

gulp.task('sass', function() {
    gulp.src(['src/styles/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoPrefix('last 2 versions'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('build/styles/'));
});

gulp.task('browserSync', function(){
    const files = ['src/*.html', 'src/styles/*.scss'];
    browserSync.init(files, {
        server: {
            baseDir: 'build'
        },
    });
});

gulp.task('default', [ 'browserSync', 'copyHTML', 'sass'], function(){
    const files = ['src/*.html', 'src/styles/*.scss'];
    const proc = ['copyHTML', 'sass'];
    gulp.watch(files, function(){
        gulp.run(proc);
    });
});
