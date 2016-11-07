'use strict';

const OpenSsl = require('./openssl');


class Smime extends OpenSsl {
    constructor(opts) {
        super(opts);
    }

    encrypt({cert, md = 'sha512', outform = 'DER', cipher = '-aes-256-cbc'}) {
        const args = ['smime', '-encrypt', '-binary', '-stream', '-md', md, '-outform', outform, cipher, cert];

        return this.spawn(...arguments, args);
    }

    decrypt({key, md = 'sha512', inform = 'DER'}) {
        const args = ['smime', '-decrypt', '-binary', '-stream', '-md', md, '-inform', inform, '-inkey', key];

        return this.spawn(...arguments, args);
    }
}

module.exports = Smime;
