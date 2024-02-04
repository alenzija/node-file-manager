import os from 'node:os';

export const osData = (parameter) => {
  switch (parameter) {
    case '--EOL': {
      console.log({ EOL: os.EOL});
      break;
    }
    case '--cpus': {
      console.log(os.cpus());
      break;
    }
    case '--homedir': {
      console.log(os.homedir());
      break;
    }
    case '--username': {
      console.log(os.userInfo().username);
      break;
    }
    case '--architecture': {
      console.log(os.arch());
      break;
    }
    default: {
      console.log('Incorrect parameter ')
    }
  }
}
