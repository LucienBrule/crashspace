import {imageToAscii, preprocessImage} from './core';
import { ConvertOptions } from '@/shared/types';

export async function asciiFromCanvas(
  canvas: HTMLCanvasElement,
  options: ConvertOptions
): Promise<string> {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Unable to get canvas context');
  const width = options.width;
  const height = options.height ?? Math.floor(canvas.height * (width / canvas.width));

  // Call preprocessImage before converting to ASCII
  preprocessImage(ctx, width, height, options);

  return imageToAscii(ctx, width, height, options);
}

export async function asciiFromText(text: string): Promise<string> {
  const figlet = await import('figlet');
  return new Promise((resolve, reject) => {
    figlet.text(text, (err, data) => {
      if (err || !data) return reject(err);
      resolve(data);
    });
  });
}