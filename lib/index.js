'use strict';

const utils = require( './utils' );

const Parser = require( './parser' );

class SchemaBuilder {

    constructor( parser ) {

        this.parser = parser;
    }

    build( config ) {

        if( utils.isString( config ) || config[ '@schema' ] ) {

            return this.parser.parse( config );
        }
        else {

            let schema = {};

            for( let key in config ) {

                let value = config[ key ];

                schema[ key ] = this.parser.parse( value );
            }

            return schema;
        }
    }
}

function resolveEngines() {

    for( let name of arguments ) {

        try {
            if (typeof __non_webpack_require__ !== 'undefined') {
                return __non_webpack_require__( name );
            }
            else {
                return require( name );
            }
        }
        catch( err ) {

            // engine not found
        }
    }
}

function parser( engine ) {

    return new Parser( engine );
}


function builder( engine ) {

    if( !engine ) {

        engine = resolveEngines( 'joi', 'joi-browser', 'lov' );

        if( !engine ) {

            throw new Error( 'cannot find validation engine' );
        }
    }

    return new SchemaBuilder( parser( engine ) );
}

module.exports = {

    builder,

    parser
};
