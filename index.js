var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var jss = require('jss');

module.exports = function (options) {
  var contents = [];
  var basepath = process.cwd();
  var firstFile;

  if(options.use){
    for (var i = 0, l = options.use.length; i < l; i++) {
      var plugin = options.use[i];
      jss.use(plugin);
    }
  }

  function bufferContents(file, enc, cb) {

    // we dont do streams
    if (file.isStream()) {
      this.emit('error', new PluginError('gulp-jss', 'Streaming not supported'));
      cb();
      return;
    }

    // set first file if not already set
    if (!firstFile) {
      firstFile = file;
    }

    if(file.path.indexOf(basepath)===0){
      var code,sheet;

      if(file.relative.lastIndexOf(".json") !== -1){ //handle .json files
        code = JSON.parse(file.contents.toString('utf-8'));
      }else{ //handle .js or .jss files

        code = eval(file.contents.toString('utf-8'));
        if(code.styles) code = code.styles;
      }

      sheet = jss.createStyleSheet(code,options);
      contents.push(sheet.toString());
    }

    cb();
  }

  function endStream(cb) {

    var joinedFile = firstFile;

    if (!joinedFile) {
      throw new PluginError('gulp-jss', 'no files found');
    }

    joinedFile.contents = new Buffer(contents.join("\n"));
    joinedFile.path = gutil.replaceExtension(joinedFile.path, '.css');

    this.push(joinedFile);
    cb();
  }

  return through.obj(bufferContents, endStream);
};
