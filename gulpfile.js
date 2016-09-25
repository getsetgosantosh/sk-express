var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    livereload = require('gulp-livereload'),
    sass = require('gulp-ruby-sass');

var paths = {
    src: {
        scss: './public/css/sass/**/*.scss',
        bootstrap: './public/vendor/bootstrap/stylesheets/*.scss',
        fontawesome: './public/vendor/font-awesome/stylesheets/*.scss'
    },
    dest: {
        css: './public/css',
        bootstrap: './public/css',
        fontawesome: './public/css'
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
});

gulp.task('bootstrap', function () {
    console.log('paths.src.bootstrap=', paths.src.bootstrap);
    return sass(paths.src.bootstrap)
        .pipe(plugins.cssmin())
        .pipe(gulp.dest(paths.dest.bootstrap));
});

gulp.task('fontawesome', function () {
    console.log('paths.src.fontawesome=', paths.src.fontawesome);
    return sass(paths.src.fontawesome)
        .pipe(plugins.cssmin())
        .pipe(gulp.dest(paths.dest.fontawesome));
});

gulp.task('watch', function () {
    gulp.watch(paths.src.scss, ['sass']);
    gulp.watch(paths.src.bootstrap, ['bootstrap']);
    gulp.watch(paths.src.fontawesome, ['fontawesome']);
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
    'sass', 'bootstrap', 'fontawesome',
    'develop',
    'watch'
]);