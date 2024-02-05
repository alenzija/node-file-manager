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
  if (!pathToFile || !pathToDestination) {
    throw new Error('Invalid Input');
  }
  const filePath = path.resolve(currentPath, pathToFile);
  const fileOutputPath = path.resolve(currentPath, pathToDestination);
  const input = createReadStream(filePath);    
  const output = createWriteStream(fileOutputPath);

  const unzip = createUnzip();

  pipe(input, unzip, output).catch(() => {
    console.error('FS operation failed');
    process.exitCode = 1;
  });
};
