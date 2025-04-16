import { ConvertOptions } from '@/shared/types';

export function preprocessImage(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  options: ConvertOptions
) {
  const { invert, lineThickness = 1.0 } = options; // Added fallback for lineThickness
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];

    // Invert RGB
    if (invert) {
      r = 255 - r;
      g = 255 - g;
      b = 255 - b;
    }

    // Apply line thickness as a brightness scalar
    if (lineThickness !== 1.0) {
      r = Math.min(255, r * lineThickness);
      g = Math.min(255, g * lineThickness);
      b = Math.min(255, b * lineThickness);
    }

    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
  }

  ctx.putImageData(imageData, 0, 0);
}

export function imageToAscii(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    options: ConvertOptions
): string {
  const imageData = ctx.getImageData(0, 0, width, height);
  const { data } = imageData;
  const chars = options.grayScale || ' .:-=+*#%@';
  const output = [];

  for (let y = 0; y < height; y++) {
    let line = '';
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const avg = (r + g + b) / 3;
      const charIdx = Math.floor((avg / 255) * (chars.length - 1));
      line += chars[charIdx] + ' '.repeat(options.spaceChars ?? 0);
    }
    output.push(line);
  }

  return output.join('\n');
}