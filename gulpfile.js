var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    livereload = require('gulp-livereload'),
    sass = require('gulp-ruby-sass');

var paths = {
    src: {
        scss: './public/css/sass/**/*.scss'
    },
    dest: {
        css: './public/css'
    },
    node: {
        script: './server/app.js'
    }
}

gulp.task('sass', function () {
    return sass(paths.src.scss)
        .pipe(plugins.cssmin())
        .pipe(plugins.concat("app.min.css"))
        .pipe(gulp.dest(paths.dest.css));
    // .pipe(livereload());
});

gulp.task('watch', function () {
    // livereload.createServer();
    // livereload.watch(__dirname + paths.src.scss);
    // livereload.listen();
    gulp.watch(paths.src.scss, ['sass']);
});

gulp.task('develop', function () {
    nodemon({
        script: 'server/app.js',
        stdout: false
    }).on('readable', function () {
        this.stdout.on('data', function (chunk) {
            if (/^Express server listening on port/.test(chunk)) {
                livereload.changed(__dirname);
            }
        });
        this.stdout.pipe(process.stdout);
        this.stderr.pipe(process.stderr);
    });
});

gulp.task('default', [
    'sass',
    'develop',
    'watch'
]);