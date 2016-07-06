'use strict';

var gulp = require('gulp');
var config = require('./config.json');

//TODO create haxe gulp plugin
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

// Plugins
var gutil = require('gulp-util');
var clean = require('gulp-clean')


/*
  Build haxe sources
*/
gulp.task('haxe', function(cb) {

    // Get haxelib dependencies
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

    var haxelibSrcList = getHaxelibSrcList();

    // Add every library to the command line
    var libSrc = '';

    haxelibSrcList.forEach(function(folder) {
        libSrc += ' -cp ' + folder;
    });

    var cmd = 'haxe ' + libSrc + ' build-src.hxml -js ' + path.join(config.js.path.dist, 'js', 'main.js');

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

gulp.task('clean', function() {
    return gulp.src(config.path.dist, {
            read: false
        })
        .pipe(clean());
});

gulp.task('default', ['haxe', 'resources'], function() {

});
