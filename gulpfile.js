var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var clean = require('gulp-clean');
var rename = require("gulp-rename");
var qunit = require('gulp-qunit');
var jshint = require('gulp-jshint');

gulp.task('clean', function () {
	gulp.src('dist', { read: false }).pipe(clean());
	gulp.src('build', { read: false }).pipe(clean());
});

gulp.task('build', [ 'clean' ], function () {
	return gulp.src('src/logger.js')
	 .pipe(replace(/@VERSION@/g, "0.9.4"))
	 .pipe(gulp.dest('build'))
});

gulp.task('dist', [ 'build', 'lint' ], function ()
{
	return gulp.src('build/logger.js')
	 .pipe(uglify())
     .pipe(rename("logger.min.js"))
     .pipe(gulp.dest('dist'))
})

gulp.task('lint', [ 'build' ], function () {
	return gulp.src("build/*.js")
	 .pipe(jshint())
	 .pipe(jshint.reporter('default'))
	 .pipe(jshint.reporter('fail'));
});

gulp.task('test', function () {
	return gulp.src('test-src/index.html')
	 .pipe(qunit())
});

gulp.task('default', [ 'dist' ]);