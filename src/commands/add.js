import { writeFile } from 'node:fs/promises';
import path from 'path';


export const add = async (currentPath, newFileName) => {
  if (!newFileName) {
    throw new Error('Invalid Input');
  }

  const filePath = path.join(currentPath, newFileName);
  try {
    await writeFile(path.join(filePath), ''); 
  } catch (e) {
    throw Error('FS operation failed');
  } 
};
