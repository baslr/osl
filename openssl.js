'use strict';

const spawn   = require('child_process').spawn;
const rStream = require('stream').Readable;


class OpenSsl extends rStream {
    constructor(opts) {
        super(opts);
    } // constructor()

    _read() {}

    spawn(opts, args) {
        const proc = spawn('openssl', args, {stdio:['pipe', 'pipe', 'pipe']});

        proc.stdout.on('data', d => this.push(d));
        proc.stdout.on('end',  ()=> this.push(null));

        proc.on('error', e => this.emit('error', e));

        proc.stderr.on('data', d => console.log('openssl:e:', d.toString() ));

        if (opts.buffer) {
            proc.stdin.write(opts.buffer);
            proc.stdin.end();
        } else if (opts.stream) {
            opts.stream.pipe( proc.stdin );
        } else if (opts.write) {
            return proc.stdin;
        } // else if

        return this;
    }
}

module.exports = OpenSsl;
