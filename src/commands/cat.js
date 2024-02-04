import { createReadStream } from 'fs';
import path from 'path';
import { printPath } from '../utils/printUtils.js';

export const cat = (currentPath, pathToFile) => {
  if (!pathToFile) {
    throw new Error('Invalid Input');
  }

  const filePath = path.resolve(currentPath, pathToFile);
  const readStream = createReadStream(filePath);

  readStream.on('data', (chunk) => {
    process.stdout.write(`${chunk}\n`);
    if (!chunk) {
      readStream._destroy();
    }
  });

  readStream.on('error', () => {
    console.error('FS operation failed');
    process.stdout.write(printPath(currentPath));
    process.stdout.write('Enter your command\n');
  });

  readStream.on('end', () => {
    process.stdout.write(printPath(currentPath));
    process.stdout.write('Enter your command\n');
  })
};
