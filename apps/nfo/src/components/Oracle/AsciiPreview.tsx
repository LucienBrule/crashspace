interface AsciiPreviewProps {
  text: string;
  width: number;
}

export default function AsciiPreview({ text, width }: AsciiPreviewProps) {
  const  fontsize = Math.max(5,400/width)
  return (
    <pre
        className="whitespace-pre-wrap font-mono text-xs leading-tight bg-black text-white p-4 border border-gray-700 overflow-auto"
        style={{ fontSize: `${fontsize}px`,  lineHeight: 1}}
    >
      {text}
    </pre>
  );
}
