// Cross-platform post-build: copy static assets into the standalone output.
// Replaces the Unix-only `cp -r ...` so `npm run build` works on Windows.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn('skip (missing):', src);
    return;
  }
  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
  console.log('copied:', path.relative(root, src), '->', path.relative(root, dest));
}

copyDir(path.join(root, '.next', 'static'), path.join(root, '.next', 'standalone', '.next', 'static'));
copyDir(path.join(root, 'public'), path.join(root, '.next', 'standalone', 'public'));

console.log('postbuild done');
