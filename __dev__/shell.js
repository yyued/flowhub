'use strict';

const path = require('path');

module.exports = ( { del, folder, gulp, messager, nodeBinExec } ) => {
    const root = path.resolve( folder, '../' );
    const src = path.resolve( folder, '../src' );
    const source = path.resolve( folder, './src/js/hub' );

    del( [ `${ src }/**/*` ], { force: true }, ( ) => {
        gulp.src( `${ source }/**/*` )
            .pipe( gulp.dest( src ) )
            .on( 'end', ( ) => {
                nodeBinExec( root, './build/index.js', ( code, msg, err ) => {
                    code == 0 ? messager.success( ) : messager.error( err );
                } )
            } )
    } );
}
