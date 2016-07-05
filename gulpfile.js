'use strict';

var gulp = require('gulp');
var config = require('./config.json');

//TODO create haxe gulp plugin
var exec = require('child_process').exec;

// Plugins
var gutil = require('gulp-util');


/*
  Build haxe sources
*/
gulp.task('haxe', function(cb) {
    var cmd = 'haxe build-src.hxml -js ' + config.path.dist.js + '/main.js';

    gutil.log('Executing', gutil.colors.red(cmd));

    exec(cmd, function(err, stdout, stderr) {
        if (err)
            return cb(err);
        cb();
    });
});

gulp.task('default', ['haxe'], function() {

});
