import { Command } from 'commander';
import { z } from 'zod';
import convertToASCII from './converter.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const program = new Command();

const presetSchema = z.enum(['default', 'nfo', 'co-star']);

const cliSchema = z.object({
  input: z.string().min(1, 'Input file is required'),
  output: z.string().optional(),
  width: z.coerce.number().min(1).optional(),
  height: z.coerce.number().min(1).optional(),
  spaceChars: z.coerce.number().min(0).default(0),
  grayScale: z.string().optional(),
  preset: presetSchema.optional(),
});

const presets = {
  default: {
    grayScale: ' .:-=+*#%@',
    width: 120,
  },
  'nfo': {
    grayScale: ' .:-=+*#%@',
    width: 80,
  },
  'co-star': {
    grayScale: ' .,:;i1tfLCG08@',
    width: 100,
  },
};

program
  .name('oracle-ify')
  .description('Convert images to ASCII art with scene-themed presets')
  .option('-i, --input <file>', 'Input image file')
  .option('-o, --output <file>', 'Output text file')
  .option('-w, --width <number>', 'Width of the output')
  .option('-h, --height <number>', 'Height of the output')
  .option('--space-chars <number>', 'Number of spaces between characters')
  .option('--gray-scale <string>', 'Custom ASCII grayscale')
  .option('--preset <name>', 'Conversion preset (default, nfo, co-star)');

if (process.argv.length <= 2) {
  program.outputHelp();
  process.exit(0);
}

program.action(async (options) => {
  const parsed = cliSchema.safeParse(options);
  if (!parsed.success) {
    console.error('❌ Invalid input:');
    console.error(parsed.error.format());
    process.exit(1);
  }

  let { input, output, width, height, spaceChars, grayScale, preset } = parsed.data;

  const resolvedPath = path.resolve(input);
  const absoluteInputPath = pathToFileURL(resolvedPath);
  if (!fs.existsSync(resolvedPath)) {
    console.error(`❌ Input file does not exist: ${input}`);
    process.exit(1);
  }

  if (preset) {
    const presetOptions = presets[preset];
    width ??= presetOptions.width;
    grayScale ??= presetOptions.grayScale;
  }

  try {
    const ascii = await convertToASCII(absoluteInputPath.toString(), { width, height, spaceChars, grayScale });
    if (output) {
      fs.writeFileSync(output, ascii);
      console.log(`✅ ASCII art written to ${output}`);
    } else {
      console.log(ascii);
    }
  } catch (err) {
    console.error('❌ Conversion failed:', err);
    process.exit(1);
  }
});

program.parse();