import { Transform } from 'node:stream';
class FilterTransform extends Transform  {
    chunkLeft = '';
    

    constructor(pattern) {
        super();
        this.pattern = pattern;
    }

    _transform(chunk, encoding, callback) {
        const stringChunk = this.chunkLeft + chunk.toString();
        const strokes = stringChunk.split('\n');
        this.chunkLeft = strokes.pop();

        for (let stroke of strokes) {
            if (this.pattern.test(stroke)) {
                this.push(`${stroke}\n`);
            }
        }

        callback();
    }

    _flush(callback) {

        if (this.chunkLeft && this.pattern.test(chunkLeft)) {
            this.push(`${this.chunkLeft}\n`);
        }

        callback();
    }
}

const filter = () => {
    const args = process.argv.slice(2);
    const flagIndex = args.indexOf('--pattern');
    let pattern = ''

    if (flagIndex !== '-1' && args.length > flagIndex + 1) {
        pattern = args[flagIndex + 1];
    }

    const isReg = /^\/.*\//;
    // checking if pattern is already regex, and make it proper regex
    if (isReg.test(pattern)) {
        pattern = new RegExp(pattern.slice(1, -1));
    } else {
        pattern = new RegExp(pattern);
    }


    const transform = new FilterTransform(pattern);
    process.stdin.pipe(transform).pipe(process.stdout);
};

filter();
