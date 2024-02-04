import { createWriteStream , createReadStream } from 'node:fs';
import path from 'path';

export const cp = (currentPath, pathToFile, pathToNewDirectory) => {
  if (!pathToFile || !pathToNewDirectory) {
    throw new Error('Invalid Input');
  }

  const filePath = path.resolve(currentPath, pathToFile);
  const copyFilePath = path.resolve(currentPath, pathToNewDirectory);
  const readStream = createReadStream(filePath);
  const writeStream = createWriteStream(copyFilePath);

  readStream.on('data', (chunk) => {
    writeStream.write(chunk, () => {
      console.error('FS operation failed');
    });
  });

  readStream.on('error', () => {
    console.error('FS operation failed');
  });
};
