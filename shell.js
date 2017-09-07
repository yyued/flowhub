'use strict';

const path = require('path');

module.exports = ( param ) => {
    const { fs, del, folder, messager, args, gulp } = param;

    const dist = path.resolve(folder, './dist');

    gulp.src(`${ dist }/js/**/*.min.js`)
        .pipe(gulp.dest( dist ))
        .on('end', () => {
            del([ `${ dist }/**/*`, `!${ dist }/*.min.js` ], { force: true }, () => {
                messager.success();
            });
        })
}
