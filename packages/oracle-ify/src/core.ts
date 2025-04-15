export interface ConvertOptions {
  width: number;
  height?: number;
  grayScale: string;
  spaceChars?: number;
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
