// Simple ungzip for Unity WebGL build outputs so dev server serves valid JS/wasm
// Usage: node scripts/unity-ungzip.cjs
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const buildDir = path.join(__dirname, '..', 'public', 'Game', 'Build');

const files = [
  { gz: 'Build.framework.js.gz', out: 'Build.framework.js' },
  { gz: 'Build.data.gz', out: 'Build.data' },
  { gz: 'Build.wasm.gz', out: 'Build.wasm' },
];

if (!fs.existsSync(buildDir)) {
  console.error('Build directory not found:', buildDir);
  process.exit(1);
}

for (const f of files) {
  const gzPath = path.join(buildDir, f.gz);
  const outPath = path.join(buildDir, f.out);
  if (!fs.existsSync(gzPath)) {
    console.warn('Skip, not found:', f.gz);
    continue;
  }
  const buf = fs.readFileSync(gzPath);
  const ungz = zlib.gunzipSync(buf);
  fs.writeFileSync(outPath, ungz);
  console.log('Wrote', f.out, `(${ungz.length} bytes)`);
}

console.log('Done.');


