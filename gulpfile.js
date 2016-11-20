/**
 * @file gulpfile
 * @author leon <ludafa@outlook.com>
 */

/* eslint-disable fecs-no-require */

const gulp = require('gulp');
const babel = require('gulp-babel');
const stylus = require('gulp-stylus');
const nib = require('nib');
const babelHelpers = require('gulp-babel-external-helpers');
const path = require('path');

const sourcemaps = require('gulp-sourcemaps');

gulp.task('babel', function () {
    return gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(babelHelpers('babelHelpers.js', 'umd'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('lib'));
});

gulp.task('stylus', function () {
    return gulp.src('src/**/*.styl').pipe(gulp.dest('lib'));
});

gulp.task('css', function () {
    return gulp.src('src/**/*.styl')
        .pipe(
            stylus({
                compress: false,
                paths: [path.resolve(__dirname, 'node_modules')],
                use: [nib()]
            })
        )
        .pipe(gulp.dest('lib'));
});

gulp.task('build', ['babel', 'stylus', 'css']);

gulp.task('default', ['build']);
