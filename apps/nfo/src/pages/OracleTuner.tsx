import { useEffect, useState } from 'react';
import AsciiPreview from '@/components/Oracle/AsciiPreview';
import { asciiFromText } from '@scene-release/oracle-ify';
import OracleControls from '@/components/Oracle/OracleControls';

export default function OracleTuner() {
  const [ascii, setAscii] = useState<string>('Loading...');
  const [params, setParams] = useState({
    width: 100,
    grayScale: ' .:-=+*#%@',
    spaceChars: 0,
    thickenLines: false,
    bloom: false,
    invert: false,
  });

  useEffect(() => {
    const runConversion = async () => {
      // const input = '/oracle-demo.png'; // Static public asset for now
      // const output = await convertToASCII(input, params);
      const result = await asciiFromText("OPCODE ORACLE");
      setAscii(result);
    };
    runConversion();
  }, [params]);

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Oracle Tuner</h1>
      <OracleControls params={params} onChange={setParams} />
      <AsciiPreview text={ascii} />
    </div>
  );
}
