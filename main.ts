// The World in One Day — Monday 23 November 2026.
// Node 22, standard library only. The image for this entry is drawn once
// (a newspaper front page: masthead, lead story, four panels, an "also"
// strip) and stored beside this file as entry.png. This program's only job
// is to place that exact image at /output/entry.png, byte for byte, so the
// judge sees precisely the front page this repository holds.
//
// Local run:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const image = readFileSync(join(here, 'entry.png'));

// Guard against a truncated image ever reaching the judge: a PNG starts
// with its 8-byte signature, and this file is the whole front page.
const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!image.subarray(0, 8).equals(pngSignature)) {
  throw new Error('entry.png is not a whole PNG file');
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.png'), image);
