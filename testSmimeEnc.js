'use strict';

const Smime = require('./smime');
const Enc   = require('./enc');

const crypto = require('crypto');
const fs     = require('fs');

const data = {
    password:crypto.randomBytes(512).toString('hex'),
    data: crypto.randomBytes(20 * 1024*1024),
    cert :'cert.pem',
    key:  'key.pem'
};

const encSmime = new Smime();
encSmime.encrypt({buffer:data.data, cert:data.cert});

const encSym      = new Enc();
const encSymStdin = encSym.encrypt({write:true, password:data.password});

encSmime.pipe(encSymStdin);


const decSym      = new Enc();
const decSymStdin = decSym.decrypt({write:true, password:data.password});

encSym.pipe(decSymStdin);


const decSmime      = new Smime();
const decSmimeStdin = decSmime.decrypt({write:true, key:data.key});

decSym.pipe(decSmimeStdin);


const decBufs = [];

decSmime.on('data', (d) => decBufs.push(d));

decSmime.on('end', () => {
    console.log('dec smime end', 0 === data.data.compare(Buffer.concat(decBufs)));
});
