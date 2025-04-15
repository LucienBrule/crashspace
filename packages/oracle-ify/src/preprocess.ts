// Import the specific SKRSContext2D type and other needed types
import { SKRSContext2D, ImageData } from '@napi-rs/canvas';

// Interface defining the available preprocessing options
// (Matches the one in options.ts)
export interface PreprocessOptions {
    bloom?: boolean;
    dilate?: boolean;
    thickenLines?: boolean;
    invert?: boolean;
}

// --- Individual Transformation Functions ---

// Use SKRSContext2D here
function applyBloom(ctx: SKRSContext2D, width: number, height: number): void {
    console.warn("Using placeholder bloom effect (simple blur + brightness).");
    try {
        // ctx.canvas is now valid because SKRSContext2D has it
        ctx.filter = 'blur(1px) brightness(1.1)';
        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(ctx.canvas, 0, 0); // drawImage is valid on SKRSContext2D
    } catch (e) {
        console.error("Failed to apply filter (might not be fully supported):", e);
    } finally {
        ctx.filter = 'none';
    }
}

// Operates directly on pixel data
function thickenLines(data: Uint8ClampedArray, width: number, height: number): void {
    for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, data[i] * 1.1); // R
        data[i + 1] = Math.min(255, data[i + 1] * 1.1); // G
        data[i + 2] = Math.min(255, data[i + 2] * 1.1); // B
    }
}

// Operates directly on pixel data
function invertImage(data: Uint8ClampedArray, width: number, height: number): void {
    for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i]; // R
        data[i + 1] = 255 - data[i + 1]; // G
        data[i + 2] = 255 - data[i + 2]; // B
    }
}

// Operates directly on pixel data
function dilateImage(data: Uint8ClampedArray, width: number, height: number): void {
    console.warn("Using placeholder dilate effect (no operation).");
    // Placeholder for actual dilation logic
}


/**
 * Applies selected preprocessing steps to the canvas context.
 * Optimizes pixel operations by performing them in a single pass if possible.
 *
 * @param ctx The SKRSContext2D rendering context of the canvas to modify.
 * @param width The width of the canvas.
 * @param height The height of the canvas.
 * @param options The preprocessing options to apply.
 */
export function preprocessImage(
    ctx: SKRSContext2D, // Use the specific SKRSContext2D type
    width: number,
    height: number,
    options: PreprocessOptions = {}
): void {

    // Apply context-based operations first
    if (options.bloom) {
        applyBloom(ctx, width, height);
    }

    // Determine if any pixel-based operations are needed
    const needsPixelOps = options.thickenLines || options.invert || options.dilate;

    if (needsPixelOps) {
        // Get image data once
        const imageData: ImageData = ctx.getImageData(0, 0, width, height);
        const data: Uint8ClampedArray = imageData.data;

        // Apply pixel-based operations conditionally
        if (options.thickenLines) {
            thickenLines(data, width, height);
        }
        if (options.dilate) {
            dilateImage(data, width, height);
        }
        if (options.invert) {
            invertImage(data, width, height);
        }

        // Put the modified data back once
        ctx.putImageData(imageData, 0, 0);
    }
}