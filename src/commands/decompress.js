import { createUnzip } from 'zlib';
import { promisify } from 'util';
import { pipeline } from 'stream';
import {
    createReadStream,
    createWriteStream,
  } from 'fs';
import path from 'path';

const pipe = promisify(pipeline);

export const decompress = (currentPath, pathToFile, pathToDestination) => {
  const filePath = path.join(currentPath, pathToFile);
  const fileOutputPath = path.join(currentPath, pathToDestination);
  const input = createReadStream(filePath);    
  const output = createWriteStream(fileOutputPath);

  const unzip = createUnzip();

  pipe(input, unzip, output).catch(() => {
    console.error('FS operation failed');
    process.exitCode = 1;
  });
};