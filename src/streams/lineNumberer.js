import os from 'node:os'
import { Transform } from 'node:stream';

class TransformLines extends Transform  {
    lineCount = 1;
    chunkLeft = '';
    

    constructor(options) {
        super(options);
    }

    _transform(chunk, encoding, callback) {
        const stringChunk = this.chunkLeft + chunk.toString();
        const strokes = stringChunk.split('\n');
        this.chunkLeft = strokes.pop();

        for (let stroke of strokes) {
            this.push(`${this.lineCount++} | ${stroke}\n`);
        }

        callback();
    }

    _flush(callback) {
        if (this.chunkLeft) {
            this.push(`${this.lineCount++} | ${this.chunkLeft}\n`);
        }

        callback();
    }
}

const lineNumberer = () => {
    const transform = new TransformLines();

    process.stdin.pipe(transform).pipe(process.stdout);
};

lineNumberer();