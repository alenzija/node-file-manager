import { createWriteStream , createReadStream, unlink } from 'node:fs';

import path from 'path';

export const mv = async (currentPath, pathToFile, pathToNewDirectory) => {
  const filePath = path.join(currentPath, pathToFile);
  const copyFilePath = path.join(currentPath, pathToNewDirectory);
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
    throw new Error('FS operation failed');
  });
};
