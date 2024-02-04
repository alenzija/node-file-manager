import path from 'path';
import fs from 'fs';

export const cd = (currentPath, pathToDirectory) => {

  const newPath = path.resolve(currentPath, pathToDirectory);
  if(fs.existsSync(newPath)) {
    return newPath;
  }

  throw new Error('Invalid Input')
} 