import crypto from 'crypto';
import { createReadStream } from 'fs';
import path from 'path';
import { printPath } from '../utils/printUtils.js';

export const hash = (currentPath, pathToFile) => {
  if (!pathToFile) {
    throw new Error('Invalid Input');
  }

  const filePath = path.resolve(currentPath, pathToFile);

  const hash = crypto.createHash('sha256')
  const readStream = createReadStream(filePath);

  readStream.on('data', (chunk) => {
    hash.update(chunk);
  });
  
  readStream.on('end', () => {
    const hex = hash.digest('hex');
    console.log(hex);
    process.stdout.write(printPath(currentPath));
    process.stdout.write('Enter your command\n');
  });

  readStream.on('error', () => {
    console.error('FS operation failed');
    process.stdout.write(printPath(currentPath));
    process.stdout.write('Enter your command\n');
  });
};
