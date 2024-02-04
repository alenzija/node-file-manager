import crypto from 'crypto';
import { createReadStream } from 'fs';
import path from 'path';

export const hash = (currentPath, pathToFile) => {
  const filePath = path.join(currentPath, pathToFile);
  const hash = crypto.createHash('sha256')
  const readStream = createReadStream(filePath);

  readStream.on('data', (chunk) => {
    hash.update(chunk);
  });
  
  readStream.on('end', () => {
    const hex = hash.digest('hex');
    console.log(hex);
  });

  readStream.on('error', () => {
    console.error('FS operation failed');
  });
};
