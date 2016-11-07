'use strict';




const Enc = require('./smime');

const crypto = require('crypto');
const fs     = require('fs');

const data = {
    password:crypto.randomBytes(512).toString('hex'),
    data: crypto.randomBytes(20 * 1024*1024)
};


const enc = new Enc();

enc.encrypt({buffer:data.data, cert:'cert.pem'});

const encBufs = [];

enc.on('data', (d) => encBufs.push(d));

enc.on('end', () => {
    console.log('enc end', 0 === data.data.compare(Buffer.concat(encBufs)));

    fs.writeFileSync('encrypted.smime.bin', Buffer.concat(encBufs));

    const dec = new Enc();

    dec.decrypt({buffer:Buffer.concat(encBufs), key:'key.pem'});
    const decBufs = [];

    dec.on('data', d=> decBufs.push(d));

    dec.on('end', () => {
        console.log('decryption end', 0 === data.data.compare(Buffer.concat(decBufs)));
    });
});
