import { createGzip } from 'zlib';
import { pipeline } from 'stream';
import {
  createReadStream,
  createWriteStream,
} from 'fs';
import path from 'path';
import { promisify } from 'util';

const pipe = promisify(pipeline);

export const compress = (currentPath, pathToFile, pathToDestination) => {
  if (!pathToFile || !pathToDestination) {
    throw new Error('Invalid Input');
  }
  const filePath = path.resolve(currentPath, pathToFile);
  const fileOutputPath = path.resolve(currentPath, pathToDestination);

  const gzip = createGzip();
  const source = createReadStream(filePath);
  const destination = createWriteStream(fileOutputPath);

  pipe(source, gzip, destination).catch(() => {
    console.error('FS operation failed');
    process.exitCode = 1;
  });
};
