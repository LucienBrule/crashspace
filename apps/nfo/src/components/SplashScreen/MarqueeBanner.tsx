import { motion } from 'framer-motion';

interface MarqueeBannerProps {
  text?: string;
}

export default function MarqueeBanner({ 
  text = "— Greetz: REPT • Razor 1911 • Illusion • All Scene Elders • /bin/bash disciples • The Oracle watches —" 
}: MarqueeBannerProps) {
  // Create a repeated text for seamless looping
  const repeatedText = `${text} ${text}`;
  
  return (
    <div className="w-full overflow-hidden mb-8">
      <div className="whitespace-nowrap">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: `-50%` }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          }}
          className="inline-block"
        >
          <span className="text-gray-400 font-mono">{repeatedText}</span>
        </motion.div>
      </div>
    </div>
  );
}