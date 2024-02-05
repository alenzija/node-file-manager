import path from 'path';

import { printPath, printCommands } from './utils/printUtils.js';
import { up } from './commands/up.js';
import { cd } from './commands/cd.js';
import { ls } from './commands/ls.js';
import { cat } from './commands/cat.js';
import { add } from './commands/add.js';
import { rn } from  './commands/rn.js';
import { cp } from './commands/cp.js';
import { mv } from './commands/mv.js';
import { rm } from './commands/rm.js';
import { hash } from './commands/hash.js';
import { compress } from './commands/compress.js';
import { decompress } from './commands/decompress.js';
import { osData } from './commands/os.js';

let user = 'Anonymous';
let currentPath = path.resolve();

const argv = process.argv;

user = argv.find((item) => /^--username/.test(item)).replace(/--username=/, '');

process.on('exit', () => {
  process.stdout.write(`\nThank you for using File Manager, ${user}, goodbye!
  `);
});

process.on('SIGINT', () => {
  process.exit();
});

process.stdout.write(`Welcome to the File Manager, ${user}!`);

printCommands();
process.stdout.write(printPath(currentPath));
process.stdout.write('Enter your command\n');

process.stdin.on('data', async (data) => {
  const stringData = data.toString().trim();
  const [command, ...args] = stringData.split(' ');
  if (stringData.split(' ').includes('exit')) {
    process.exit()
  }
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
        await ls(currentPath);
        break;
      }
      case 'cat': { 
        cat(currentPath, args[0]);
        break;
      }
      case 'add': { 
        await add(currentPath, args[0]);
        break;
      }
      case 'rn': { 
        await rn(currentPath, args[0], args[1]);
        break;
      }
      case 'cp': { 
        cp(currentPath, args[0], args[1]);
        break;
      }
      case 'mv': { 
        mv(currentPath, args[0], args[1]);
        break;
      }
      case 'rm': { 
        await rm(currentPath, args[0]);
        break;
      }
      case 'hash': { 
        hash(currentPath, args[0]);
        break;
      }
      case 'compress': { 
        compress(currentPath, args[0], args[1]);
        break;
      }
      case 'decompress': { 
        decompress(currentPath, args[0], args[1]);
        break;
      }
      case 'os': {
        osData(args[0]);
        break;
      }
      default: { 
        console.log('Incorrect command', stringData)
        break;
      }
    }
  } catch (e) {
    process.stdout.write(`\n${e.message}\n\n`);
  }
  process.stdout.write(printPath(currentPath));
  process.stdout.write('Enter your command\n');
});
