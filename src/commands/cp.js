import { createWriteStream , createReadStream } from 'node:fs';
import path from 'path';

export const cp = (currentPath, pathToFile, pathToNewDirectory) => {
  const filePath = path.join(currentPath, pathToFile);
  const copyFilePath = path.join(currentPath, pathToNewDirectory);
  const readStream = createReadStream(filePath);
  const writeStream = createWriteStream(copyFilePath);

  readStream.on('data', (chunk) => {
    writeStream.write(chunk);
  });

  readStream.on('error', () => {
    console.error('FS operation failed');
  });
};