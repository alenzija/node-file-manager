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
  const filePath = path.join(currentPath, pathToFile);
  const fileOutputPath = path.join(currentPath, pathToDestination);

  const gzip = createGzip();
  const source = createReadStream(filePath);
  const destination = createWriteStream(fileOutputPath);

  pipe(source, gzip, destination).catch(() => {
    console.error('FS operation failed');
    process.exitCode = 1;
  });
};
