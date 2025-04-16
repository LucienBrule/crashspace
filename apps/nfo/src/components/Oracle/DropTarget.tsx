import { motion, AnimationControls } from 'framer-motion';
import React, { ReactNode } from 'react';

interface DropTargetProps {
  onDrop: (objectUrl: string) => void;
  controls: AnimationControls;
  children: ReactNode;
}

export default function DropTarget({ onDrop, controls, children }: DropTargetProps) {
  return (
    <div
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
          const objectUrl = URL.createObjectURL(file);
          onDrop(objectUrl);
        }
        controls.start({ scale: 1 });
      }}
      onDragOver={(e) => {
        e.preventDefault();
        controls.start({ scale: 1.02 });
      }}
      onDragLeave={() => controls.start({ scale: 1 })}
      className="min-h-screen"
    >
      <motion.div animate={controls}>
        {children}
      </motion.div>
    </div>
  );
}
