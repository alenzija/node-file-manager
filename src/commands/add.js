import { writeFile } from 'node:fs/promises';
import path from 'path';


export const add = async (currentPath, newFileName) => {
  const filePath = path.join(currentPath, newFileName);
  try {
    await writeFile(path.join(filePath), ''); 
  } catch (e) {
    throw Error('FS operation failed');
  } 
};
