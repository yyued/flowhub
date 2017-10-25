'use strict';

const path = require('path');

module.exports = ( param ) => {
    const { fs, del, folder, messager, args, gulp, shell } = param;

    const root = path.resolve( folder, '../' );
    const src = path.resolve( folder, '../src' );
    const source = path.resolve( folder, './src/js/hub' );

    del([ `${ src }/**/*` ], { force: true }, () => {
        gulp.src(`${ source }/**/*`)
            .pipe(gulp.dest( src ))
            .on('end', () => {
                shell.cd( root );
                shell.exec('npm run build');
                messager.success();
            })
    });
}
