'use strict'

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoPrefix = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imageMin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

// COPY HTML
gulp.task('copyHTML', function(){
    gulp.src('src/*.html')
    .pipe(gulp.dest('build'))
});

gulp.task('imageMin', function(){
    const imgSrc = 'src/images/*',
          imgDest = 'build/images';
    gulp.src(imgSrc)
    .pipe(imageMin())
    .pipe(gulp.dest(imgDest));
});

/* CSS 
gulp.task('styles', function() {
    gulp.src(['src/styles/*.css'])
        .pipe(concat('styles.css'))
        .pipe(autoPrefix('last 2 versions'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('build/styles/'));
}); */

//gulp.task('', function(){});

gulp.task('browserSync', function(){
    const files = ['src/*.html', 'src/styles/*.css'];
    browserSync.init(files, {
        server: {
            baseDir: 'build'
        },
    });
});

gulp.task('default', ['copyHTML', 'imageMin', 'browserSync'], function(){
    gulp.watch('src/*.html', function(){
        gulp.run('copyHTML');
    });
});
