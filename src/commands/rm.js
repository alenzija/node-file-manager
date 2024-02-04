import { unlink } from 'node:fs/promises';
import path from 'path';

export const rm = async (currentPath, pathToFile) => {
  const filePath = path.join(currentPath, pathToFile);
  try {
    await unlink(filePath);
  } catch {
    throw new Error('FS operation failed');
  }
};
