import { useEffect, useRef, useState } from 'react';
import AsciiPreview from '@/components/Oracle/AsciiPreview';
import { asciiFromCanvas } from '@scene-release/oracle-ify';
import OracleControls from '@/components/Oracle/OracleControls';
import { motion, useAnimation } from 'framer-motion';
import { useOracleSettings } from '@/context/OracleSettingsContext';
import DropTarget from '@/components/Oracle/DropTarget';
import { loadSettings, saveSettings } from '@/utils/localStorageUtils';

export default function OracleTuner() {
  const { params, setParams } = useOracleSettings();
  const [ascii, setAscii] = useState<string>('Loading...');
  const [imageUrl, setImageUrl] = useState<string>('/oracle.png');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const controls = useAnimation();

  useEffect(() => {
    const saved = loadSettings();
    if (saved) setParams(saved);
  }, []);

  useEffect(() => {
    saveSettings(params);
  }, [params]);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const scale = (params.width * params.inputScale) / img.width;
      const scaledWidth = params.width;
      const scaledHeight = Math.floor(img.height * scale);

      canvas.width = scaledWidth;
      canvas.height = scaledHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

      asciiFromCanvas(canvas, {
        ...params,
        width: scaledWidth,
        height: scaledHeight,
      }).then(setAscii);
    };
  }, [params, imageUrl]);

  useEffect(() => {
    console.log("Updated params:", params);
  }, [params]);

  return (
    <DropTarget onDrop={(objectUrl) => setImageUrl(objectUrl)} controls={controls}>
      <motion.div animate={controls} className="min-h-screen p-8 space-y-8">
        <h1 className="text-2xl font-bold text-center">Oracle Tuner</h1>
        <p className="text-center text-gray-400 italic">
          Drag & drop or click here to upload an image
        </p>
        <div className="flex flex-col items-center space-y-4">
          <OracleControls params={params} onChange={setParams} />
          <button
            onClick={() => {
              const blob = new Blob([ascii], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `oracle-${params.width}w.txt`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="px-4 py-2 border border-gray-600 rounded text-white hover:bg-gray-800 transition"
          >
            ⬇ Download ASCII
          </button>
        </div>
        <AsciiPreview text={ascii} width={params.width * params.outputZoom} />
        <canvas ref={canvasRef} className="hidden" />
      </motion.div>
    </DropTarget>
  );
}
