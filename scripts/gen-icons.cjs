// Generates HGS brand PWA icons (gold on charcoal) using sharp
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'icons');
fs.mkdirSync(outDir, { recursive: true });

const GOLD = '#c9a227';
const CHARCOAL = '#2b2b2b';

function svg(size, maskable) {
  const pad = maskable ? size * 0.2 : size * 0.12;
  const r = maskable ? 0 : size * 0.18;
  const font = size * 0.32;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="${r}" fill="${CHARCOAL}"/>
  <circle cx="${size / 2}" cy="${size / 2}" r="${(size - pad * 2) / 2}" fill="none" stroke="${GOLD}" stroke-width="${size * 0.02}"/>
  <text x="50%" y="50%" dy="0.36em" text-anchor="middle" font-family="Georgia, serif" font-weight="bold" font-size="${font}" fill="${GOLD}">HGS</text>
</svg>`;
}

async function run() {
  const jobs = [
    { name: 'icon-192.png', size: 192, maskable: false },
    { name: 'icon-512.png', size: 512, maskable: false },
    { name: 'icon-maskable-192.png', size: 192, maskable: true },
    { name: 'icon-maskable-512.png', size: 512, maskable: true },
  ];
  for (const j of jobs) {
    await sharp(Buffer.from(svg(j.size, j.maskable))).png().toFile(path.join(outDir, j.name));
    console.log('✔', j.name);
  }
  console.log('Icons generated in public/icons');
}

run().catch((e) => { console.error(e); process.exit(1); });
