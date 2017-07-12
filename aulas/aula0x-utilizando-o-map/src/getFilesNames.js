var getFilesNames = function (dir) {
    var path = require("path");
    var fs = require('fs');
    var list = fs.readdirSync(dir);
    var listOfFiles = [];
    for (var i = 0; i < list.length; i++) {
        var filename = path.join(dir, list[i]);
        var stat = fs.statSync(filename);
        if (!stat.isDirectory() && !(filename == "." || filename == "..") ) {
          listOfFiles.push(filename);
        } 
    }
    return listOfFiles;
}

console.log('getFilesNames', getFilesNames('.'))
