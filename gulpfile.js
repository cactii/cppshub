// --- Gulp & Constants
const gulp = require('gulp');
const buildDir = 'dist';

// --- Plugins & Dependencies
const connect = require('gulp-connect');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const merge = require('merge-stream');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

// --- Tasks
// - Default task. Will start dev server, watch for changes, and build them on the fly
gulp.task('default', ['build', 'httpd', 'watch-files']);

// - Dev server
gulp.task('httpd', () => {
    connect.server({
        root: buildDir,
        port: 8000
    });
});

// - File watchers
gulp.task('watch-files', () => {
    gulp.watch('app/**/*.js', ['build-js']);
    gulp.watch('templates/**/*.html', ['copy-templates']);
    gulp.watch('css/**/*.css', ['build-css']);
});

// - Browserify and bundle the js, uglify it, then save it
gulp.task('build-js', () => {
    let b = browserify('app/main.js');
    return b.bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(buildDir+'/js'));
});

// - Bundle CSS
gulp.task('build-css', () => {
    return merge([
        gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css'),
        gulp.src('node_modules/pace-progress/themes/red/pace-theme-minimal.css'),
        gulp.src('css/**/*.css')
    ])
        .pipe(concat('app.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(buildDir+'/css'));
});

// - Copy templates to desired locations
gulp.task('copy-templates', () => {
    return gulp.src('templates/**/*.html')
        .pipe(gulp.dest(buildDir));
});

// - Copy assets to desired locations (images, files, etc)
gulp.task('copy-assets', () => {
    return gulp.src('assets/**/*.*')
        .pipe(gulp.dest(buildDir));
});

// - Clean build directory
gulp.task('clean', () => {
    return gulp.src(buildDir+'/*')
        .pipe(clean());
});

// - Build entire project
gulp.task('build', ['build-js', 'build-css', 'copy-templates', 'copy-assets']);