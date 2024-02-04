import { createReadStream } from 'fs';
import path from 'path';

export const cat = (currentPath, pathToFile) => {
  const filePath = path.join(currentPath, pathToFile);
  const readStream = createReadStream(filePath);

  readStream.on('data', (chunk) => {
      process.stdout.write(`${chunk}\n`);
  });

  readStream.on('error', (e) => {
      throw new Error('FS operation failed');
  });
};
