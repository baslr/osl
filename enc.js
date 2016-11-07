'use strict';

const OpenSsl = require('./openssl');


class Enc extends OpenSsl {
    constructor(opts) {
        super(opts);
    }

    encrypt({password:pass, cipher = '-aes-256-cbc', md = 'sha512'}) {

        const args = ['enc', cipher, '-md', md, '-k', pass, '-salt'];

        return this.spawn(...arguments, args);
    }

    decrypt({password:pass, cipher = '-aes-256-cbc', md = 'sha512'}) {

        const args = ['enc', cipher, '-md', md, '-k', pass, '-d'];

        return this.spawn(...arguments, args);
    }
}

module.exports = Enc;
