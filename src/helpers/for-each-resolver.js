const fs = require('fs');
const path = require('path');

export const forEach = cb => {
  fs.readdir(path.join(__dirname, '..', 'resolvers'), (err, resolvers) => {
    if (err) {
      throw err;
    }

    resolvers
      .filter(fn => !fn.includes('base.js'))
      .forEach(filename => cb(`resolvers/${filename}`));
  })
}
