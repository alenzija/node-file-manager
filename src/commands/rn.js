import { rename, readFile } from 'node:fs/promises';
import path from 'path';

export const rn = async (currentPath, pathToFile, newFileName) => {
    const filePath = path.join(currentPath, pathToFile);
  
    try {
        await readFile(filePath);
        await rename(filePath, newFileName);
    } catch {
        throw Error('FS operation failed');
    }
};
