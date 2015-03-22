# gulp-jss
## Gulp plugin for JSS

[![Build Status](https://travis-ci.org/gooy/gulp-jss.svg?branch=master&style=flat-square)](https://travis-ci.org/gooy/gulp-jss)
[![Dependency Status](https://david-dm.org/gooy/gulp-jss.svg?style=flat-square)](https://david-dm.org/gooy/gulp-jss)
[![devDependency Status](https://david-dm.org/gooy/gulp-jss/dev-status.svg?style=flat-square)](https://david-dm.org/gooy/gulp-jss#info=devDependencies)

Gulp plugin for [JSS](https://github.com/jsstyles/jss).

This plugin will render the output of each jss file and concatenate the results.

Make sure the jss files exports the style as a named module called `styles`: 

example.jss
  
    module.exports.styles = {
      'body': {
        width: '100px',
        height: '100px'
      }
    };

Plain json files will also be processed.

example.json

    {
      "body": {
        "width": "100px",
        "height": "100px"
      }
    }

## Usage

    var gulp = require('gulp');
    var jss = require('gulp-jss');
    var autoprefixer = require('gulp-autoprefixer');
    
    gulp.task('jss', function() {
      gulp.src("jss/*.jss")
      .pipe(jss({
        named: false
      }))
      .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
      .pipe(gulp.dest(output));
    });


## Registering plugins

    var gulp = require('gulp');
    var autoprefixer = require('gulp-autoprefixer');
    var jss = require('gulp-jss');
    var nested = require('jss-nested');
    
    gulp.task('jss', function() {
      gulp.src("./lib/jss/**/*.jss")
      .pipe(jss({
          named: false,
          use:[nested]
        }))
      .pipe(autoprefixer({ browsers: ['last 3 versions'] }))
      .pipe(gulp.dest("dev/css/"));
    });
