import { readdir } from 'node:fs/promises';

export const ls = async (currentPath) => {
  try {
    const result = [];
    const files = await readdir(currentPath, { withFileTypes: true });
    files.forEach((file) => {
      result.push({
        name: file.name,
        type: file.isFile() ? 'file' : 'directory'
      })
    });
    console.table(result);
  } catch {
    throw new Error('FS operation failed');
  }
};
