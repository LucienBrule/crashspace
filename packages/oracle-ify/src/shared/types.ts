export interface ConvertOptions {
    width: number;
    height?: number;
    grayScale: string;
    spaceChars?: number;

    // Preprocessing
    invert?: boolean;
    lineThickness?: number;
    bloom?: boolean;

    // Control / UI settings (non-rendering optional)
    inputScale?: number;
    outputZoom?: number;
}