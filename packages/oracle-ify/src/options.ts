/**
 * Options for image preprocessing steps.
 */
export interface PreprocessOptions {
    /**
     * Apply a pseudo-bloom effect (blur + brightness).
     * Requires filter support in the canvas context.
     * Default value: `false`
     */
    bloom?: boolean;

    /**
     * Apply a dilation effect (expand bright areas).
     * Currently a placeholder.
     * Default value: `false`
     */
    dilate?: boolean; // Added dilate

    /**
     * Apply a pseudo-line thickening effect (simple brightness boost).
     * Default value: `false`
     */
    thickenLines?: boolean;

    /**
     * Invert the image colors before processing.
     * Default value: `false`
     */
    invert?: boolean;
}

/**
 * Options provided for the conversion of
 * an image to ASCII text in this package.
 * Includes both conversion and preprocessing options.
 */
interface ConvertOptions extends PreprocessOptions {
    /**
     * The number of spaces to insert
     * between characters in the output string.
     * Must be 0 or greater.
     *
     * Default value: `0`
     */
    spaceChars?: number;

    /**
     * The target width to resize the image to before conversion.
     * If not provided, the original image width is used.
     * Must be 1 or greater.
     */
    width?: number;

    /**
     * The target height to resize the image to before conversion.
     * If not provided, the original image height is used.
     * Must be 1 or greater.
     */
    height?: number;

    /**
     * A custom ASCII character gray scale ramp used for mapping brightness.
     * Can be a string or an array of characters, ordered from darkest to brightest.
     *
     * Default value: `' .:-=+*#%@'`
     */
    grayScale?: string | string[];
}

// Interface describing the shape of the default options object
// All properties that have defaults are required here.
interface IDefaultOptions extends Required<PreprocessOptions> {
    spaceChars: number;
    grayScale: string | string[];
}

/**
 * Default values applied during image conversion
 * when specific options are not provided by the user.
 */
export const defaultOptions: IDefaultOptions = {
    spaceChars: 0,
    grayScale: ' .:-=+*#%@',
    bloom: false,
    dilate: false, // Added default for dilate
    thickenLines: false,
    invert: false,
};

export default ConvertOptions;