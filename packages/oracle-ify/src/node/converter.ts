// Import necessary types from the library and local files
import { createCanvas, loadImage, Image, SKRSContext2D, ImageData } from '@napi-rs/canvas'; // Use SKRSContext2D
import ConvertOptions, { defaultOptions, PreprocessOptions } from './options'; // Adjust path
import { preprocessImage } from './preprocess'; // Adjust path

/**
 * Fully resolved options after merging defaults and user options.
 */
type ResolvedOptions = Required<Omit<ConvertOptions, 'width' | 'height'>> & {
    width: number;
    height: number;
};


/**
 * Converts the given image path or buffer
 * to an ASCII text string.
 *
 * @param src The image path (string) or image data (Buffer)
 * @param options Options for the image conversion (merges with defaults)
 * @returns A promise that, when fulfilled, returns the image as ASCII text.
 */
async function convertToASCII(
src: string | Buffer,
    options: ConvertOptions = {}
): Promise<string> {
    const image: Image = await loadImage(src);

    // 1. Combine user options with defaults & image dimensions
    const combinedOptions: ResolvedOptions = {
        ...defaultOptions,
        ...options,
        width: options.width ?? image.width,
        height: options.height ?? image.height,
    };

    // 2. Validate combined options
    combinedOptions.width = Math.max(combinedOptions.width, 1);
    combinedOptions.height = Math.max(combinedOptions.height, 1);
    combinedOptions.spaceChars = Math.max(combinedOptions.spaceChars, 0);
    if (!combinedOptions.grayScale || combinedOptions.grayScale.length === 0) {
        combinedOptions.grayScale = defaultOptions.grayScale;
        console.warn("Provided grayscale option was invalid, using default.");
    }

    // 3. Prepare preprocessing options
    const preprocessOptions: PreprocessOptions = {
        bloom: combinedOptions.bloom,
        dilate: combinedOptions.dilate, // Added dilate
        thickenLines: combinedOptions.thickenLines,
        invert: combinedOptions.invert,
    };

    // 4. --- Canvas and Preprocessing ---
    const preprocessCanvas = createCanvas(image.width, image.height);
    // Get the specific context type
    const preprocessCtx: SKRSContext2D = preprocessCanvas.getContext('2d');
    preprocessCtx.drawImage(image, 0, 0); // Draw original image

    // Apply preprocessing - Pass only context, width, height, options
    preprocessImage(preprocessCtx, image.width, image.height, preprocessOptions);

    // 5. --- Scaling and Pixel Extraction ---
    const outputWidth = combinedOptions.width;
    const outputHeight = combinedOptions.height;

    const finalCanvas = createCanvas(outputWidth, outputHeight);
    // Get the specific context type
    const finalCtx: SKRSContext2D = finalCanvas.getContext('2d');

    // Draw the *preprocessed* image onto the final canvas, scaling it
    finalCtx.drawImage(
        preprocessCanvas, // Source is the preprocessed canvas (which is valid ImageSource)
        0, 0, image.width, image.height,
        0, 0, outputWidth, outputHeight
    );

    // Get image data from the *final* context
    const { data }: ImageData = finalCtx.getImageData(0, 0, outputWidth, outputHeight);

    // 6. --- Pixel Processing ---
    const pixels: number[] = [];
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
        let brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        brightness *= (a / 255);
        pixels.push(brightness);
    }

    // 7. --- ASCII Generation ---
    const { grayScale, spaceChars } = combinedOptions;
    const space = ' '.repeat(spaceChars);
    const grayScaleLen = grayScale.length;
    const rows: string[] = [];

    for (let y = 0; y < outputHeight; y++) {
        let rowString = '';
        for (let x = 0; x < outputWidth; x++) {
            const pixelIndex = y * outputWidth + x;
            const brightness = pixels[pixelIndex];
            const charIndex = Math.min(
                Math.round(brightness * (grayScaleLen - 1)),
                grayScaleLen - 1
            );
            rowString += grayScale[charIndex];
            if (x < outputWidth - 1) {
                rowString += space;
            }
        }
        rows.push(rowString);
    }

    return rows.join('\n');
}

export default convertToASCII;