import path from 'path';
import { Transform } from 'stream';

import { printPath, printCommands } from './printUtils.js';
import { up } from './commands/up.js';
import { cd } from './commands/cd.js';
import { ls } from './commands/ls.js';

let user = 'Anonymous';
let currentPath = path.resolve();

const argv = process.argv;


user = argv.find((item) => /^--username/.test(item)).replace(/--username=/, '');
console.log(`Welcome to the File Manager, ${user}!`);



printCommands();

const reverseTransformStream = new Transform({
  transform (data, encoding, callback) {
      const reversedData = data.toString();
      this.push(reversedData);
      callback();
  }
});

process.stdout.write('Enter your text\n');

process.stdin.pipe(reverseTransformStream).on('data', data => {
  const stringData = data.toString().trim();
  const [command, ...args] = stringData.split(' ');
  try {
    switch (command) {
      case 'up': {
        currentPath = up(currentPath);
        break;
      }
      case 'cd': { 
        currentPath = cd(currentPath, args[0]);
        break;
      }
      case 'ls': { 
        ls(currentPath);
        break;
      }
      default: { 
        console.log('INCORRECT COMMAND', stringData)
        break;
      }
    }
  } catch (e) {
    process.stdout.write(`\n${e.message}\n\n`);
  }
    
  process.stdout.write(printPath(currentPath));
});
