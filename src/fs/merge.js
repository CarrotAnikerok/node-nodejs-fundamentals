import fs from 'node:fs/promises';
import path from 'node:path';

// Write your files in format: --files file1.txt file2.txt
const merge = async () => {
    const workspacePath = path.resolve('workspace', 'parts');
    const filePathsToMerge = [];
    
    const args = process.argv.slice(2);
    const flagIndex = args.indexOf('--files');
    let filePaths;

    if (flagIndex !== -1 && args.length > flagIndex + 1) {
        filePaths = args.slice(1);
    } else {
        try {
            filePaths = await fs.readdir(workspacePath, {recursive: true});
        } catch {
            throw new Error('FS operation failed');
        }
    }

    for (const file of filePaths) {
        const filePath = path.resolve(workspacePath, file);

        try {
            var stats = await fs.stat(filePath);
        } catch {
            throw new Error('FS operation failed');
        }

        if (stats.isDirectory() || path.extname(filePath) !== '.txt') {
            continue;
        }

        filePathsToMerge.push(filePath);
    }

    if (!filePathsToMerge.length) {
        throw new Error('FS operation failed');
    }

    if (flagIndex === -1) {
        filePathsToMerge.sort();
    }

    filePathsToMerge.forEach(async (filePath) => {
        const data = (await fs.readFile(filePath)).toString();
        const mergedPath = path.resolve('workspace', 'merged.txt');
        await fs.writeFile(mergedPath, '')
        await fs.appendFile(mergedPath, data);
    })
};

await merge();
