import { createWriteStream , createReadStream, unlink } from 'node:fs';

import path from 'path';

export const mv = (currentPath, pathToFile, pathToNewDirectory) => {
  if (!pathToFile || !pathToNewDirectory) {
    throw new Error('Invalid Input');
  }

  const filePath = path.resolve(currentPath, pathToFile);

  const copyFilePath = path.resolve(currentPath, pathToNewDirectory, path.basename(filePath));
  const readStream = createReadStream(filePath);
  const writeStream = createWriteStream(copyFilePath);

  readStream.on('data', (chunk) => {
    writeStream.write(chunk, (err) => {
      if (err) {
        throw new Error('FS operation failed');
      }
    });    
  });

  readStream.on('close', () => {
    unlink(filePath, (err) => {
      if (err) {
        throw new Error('FS operation failed');
      }
    });
  })
  
  readStream.on('error', () => {
    console.error('FS operation failed');
  });
};
