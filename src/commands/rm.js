import { unlink } from 'node:fs/promises';
import path from 'path';

export const rm = async (currentPath, pathToFile) => {
  if (!pathToFile) {
    throw new Error('Invalid Input');
  }
  const filePath = path.resolve(currentPath, pathToFile);
  try {
    await unlink(filePath);
  } catch {
    throw new Error('FS operation failed');
  }
};
