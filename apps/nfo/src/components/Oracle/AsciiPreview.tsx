interface AsciiPreviewProps {
  text: string;
}

export default function AsciiPreview({ text }: AsciiPreviewProps) {
  return (
    <pre className="whitespace-pre-wrap font-mono text-xs leading-tight bg-black text-white p-4 border border-gray-700 overflow-auto">
      {text}
    </pre>
  );
}
