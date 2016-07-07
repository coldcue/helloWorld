'use strict';

var gulp = require('gulp');
var config = require('./config.json');

//TODO create haxe gulp plugin
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

// Plugins
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var webserver = require('gulp-webserver');


/*
  Build haxe JS sources
*/
gulp.task('haxe-js', function(cb) {
    // Add every library to the command line
    var libSrc = '';
    getHaxelibSrcList().forEach(function(folder) {
        libSrc += ' -cp ' + folder;
    });

    var cmd = 'haxe ' + libSrc + ' build-each.hxml -js ' + path.join(config.js.path.dist, 'js', config.js.artifact);
    gutil.log('Executing', gutil.colors.red(cmd));
    exec(cmd, function(err, stdout, stderr) {
        if (err)
            return cb(err);
        cb();
    });
});

/*
  Build haxe Flash sources
*/
gulp.task('haxe-flash', function(cb) {
    // Add every library to the command line
    var libSrc = '';
    getHaxelibSrcList().forEach(function(folder) {
        libSrc += ' -cp ' + folder;
    });

    var cmd = 'haxe ' + libSrc + ' build-flash.hxml -swf ' + path.join(config.flash.path.dist, config.flash.artifact);
    gutil.log('Executing', gutil.colors.red(cmd));
    exec(cmd, function(err, stdout, stderr) {
        if (err)
            return cb(err);
        cb();
    });
});

/*
  Copy resources
*/
gulp.task('resources', function() {
    return gulp.src('**/*.*', {
            cwd: config.js.path.resource
        })
        .pipe(gulp.dest(config.js.path.dist));
});

/*
  Clean the dist folder
*/
gulp.task('clean', function() {
    return gulp.src(config.path.dist, {
            read: false
        })
        .pipe(clean());
});

gulp.task('serve-js', ['haxe-js', 'resources', 'watch-js'], function() {
    return gulp.src(config.js.path.dist)
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task('watch-js', function() {
    // Watch hex source changes
    var haxeWatcher = gulp.watch(config.path.src + '/**/*.*', ['haxe-js']);
    haxeWatcher.on('change', function(event) {
        gutil.log('Haxe source ' + event.type, gutil.colors.cyan(event.path));
    });

    //Watch resources
    var resourceWatcher = gulp.watch(config.js.path.resource + '/**/*.*', ['resources']);
    resourceWatcher.on('change', function(event) {
        gutil.log('Resource ' + event.type, gutil.colors.cyan(event.path));
    });
});

gulp.task('watch-flash', function() {
    // Watch hex source changes
    var haxeWatcher = gulp.watch(config.path.src + '/**/*.*', ['haxe-flash']);
    haxeWatcher.on('change', function(event) {
        gutil.log('Haxe source ' + event.type, gutil.colors.cyan(event.path));
    });
});

gulp.task('default', ['haxe-js', /*'haxe-flash',*/ 'resources'], function() {

});

/*
  Get haxelib dependencies
*/
function getHaxelibSrcList() {
    var haxelibSrcList = [];

    // Get the path of the haxelib repository
    var dir = config.path.haxelib;
    fs.readdirSync(dir)
        .forEach(function(file) {
            // This is the directory of the library
            var libDir = path.join(dir, file);

            // Check if its a directory
            if (fs.statSync(libDir).isDirectory()) {
                // This is the path of the .current file in the library
                var currentFile = path.join(libDir, '.current')
                if (fs.existsSync(currentFile)) {
                    // Get the version string
                    var version = fs.readFileSync(currentFile, 'utf8');
                    var srcPath = path.join(libDir, version.split('.').join(','), 'src');

                    // If the srcPath exists, then add it to the array
                    if (fs.existsSync(srcPath)) {
                        haxelibSrcList.push(srcPath);
                    }
                }
            }
        });

    return haxelibSrcList;
}
