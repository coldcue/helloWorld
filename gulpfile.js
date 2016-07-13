'use strict';

var gulp = require('gulp');
var config = require('./config.json');
var minimist = require('minimist');

//TODO create haxe gulp plugin
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

// Plugins
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var webserver = require('gulp-webserver');

// Get command line arguments
var opts = minimist(process.argv.slice(3));

if (opts.production) {
    gutil.log(gutil.colors.red('=== THIS IS RUNNING IN PRODUCTION ==='));
}

/* ------------ TASKS ---------- /*

/*
  Build haxe JS sources
*/
gulp.task('haxe-js', function(cb) {
    // Build the cmd
    var cmd = [];
    cmd.push('haxe');
    cmd.push(getHaxelibSrcBuildString());
    cmd.push(config.js.hxml)
    cmd.push('-js ' + path.join(config.js.path.dist, 'js', config.js.artifact));

    // If this is not the production, then add the -debug flag
    if (!opts.production) {
        cmd.push('-debug')
    }

    execute(cmd.join(' '), cb);
});

/*
  Build haxe Flash sources
*/
gulp.task('haxe-flash', function(cb) {
    // Build the cmd
    var cmd = [];
    cmd.push('haxe');
    cmd.push(getHaxelibSrcBuildString());
    cmd.push(config.flash.hxml)
    cmd.push('-swf ' + path.join(config.flash.path.dist, config.flash.artifact));

    // If this is not the production, then add the -debug flag
    if (!opts.production) {
        cmd.push('-debug')
    }

    execute(cmd.join(' '), cb);
});

/*
  Build haxe JS sources
*/
gulp.task('haxe-js-test', function(cb) {
    // Build the cmd
    var cmd = [];
    cmd.push('haxe');
    cmd.push(getHaxelibSrcBuildString());
    cmd.push(config.js.testHxml)
    cmd.push('-js ' + path.join('tmp', 'js', 'test.js'));

    // If this is not the production, then add the -debug flag
    if (!opts.production) {
        cmd.push('-debug')
    }

    execute(cmd.join(' '), cb);
});

/*
  Copy resources
*/
gulp.task('resource-js', function() {
    return gulp.src('**/*.*', {
            cwd: config.js.path.resource
        })
        .pipe(gulp.dest(config.js.path.dist));
});

/*
  Copy resources
*/
gulp.task('resource-flash', function() {
    return gulp.src('**/*.*', {
            cwd: config.flash.path.resource
        })
        .pipe(gulp.dest(config.flash.path.dist));
});


/*
  Clean the dist folder
*/
gulp.task('clean', ['clean-test', 'clean-dist']);

gulp.task('clean-dist', function() {
    return gulp.src(config.path.dist, {
            read: false
        })
        .pipe(clean());
});

gulp.task('clean-test', function() {
    return gulp.src(config.path.testTemp, {
            read: false
        })
        .pipe(clean());
});


gulp.task('serve-js', ['haxe-js', 'resource-js', 'watch-js'], function() {
    return gulp.src(config.js.path.dist)
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task('serve-flash', ['haxe-flash', 'resource-flash', 'watch-flash'], function() {
    return gulp.src(config.flash.path.dist)
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
    var resourceWatcher = gulp.watch(config.js.path.resource + '/**/*.*', ['resource-js']);
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

    //Watch resources
    var resourceWatcher = gulp.watch(config.flash.path.resource + '/**/*.*', ['resource-flash']);
    resourceWatcher.on('change', function(event) {
        gutil.log('Resource ' + event.type, gutil.colors.cyan(event.path));
    });
});

gulp.task('default', ['haxe-js', 'resource-js', 'haxe-flash', 'resource-flash'], function() {

});


/* ------------ HELPER FUNCTIONS ---------- /*

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

function getHaxelibSrcBuildString() {
    // Add every library to the command line
    var libs = [];
    getHaxelibSrcList().forEach(function(folder) {
        libs.push('-cp ' + folder);
    });
    return libs.join(' ');
}

function execute(cmd, cb) {
    gutil.log('Executing', gutil.colors.grey(cmd));
    exec(cmd, function(err, stdout, stderr) {
        if (err)
            return cb(err);
        cb();
    });
}
