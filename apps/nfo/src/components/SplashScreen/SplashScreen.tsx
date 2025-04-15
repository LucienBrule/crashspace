import { motion } from 'framer-motion';
import MarqueeBanner from '@/components/SplashScreen/MarqueeBanner';

interface SplashScreenProps {
  onEnter?: () => void;
}

export default function SplashScreen({ onEnter = () => {} }: SplashScreenProps) {
  return (
    <div className="max-w-screen-lg mx-auto p-8 text-white bg-black font-mono min-h-screen flex flex-col justify-between">
      {/* ASCII Banner Placeholder */}
      <div className="flex justify-center items-center mb-8">
        <div className="border border-gray-700 p-8 w-full max-w-2xl text-center">
          <pre className="text-xs sm:text-sm md:text-base whitespace-pre-wrap">
{` _____ ___ ___ _  _ ___   ___ ___ _    ___  _   ___ ___ 
/ __| / __| __| \\| | __| | _ \\ __| |  | __| /_\\ / __| __|
\\__ \\ | (__| _|| .\` | _|  |   / _|| |__| _| / _ \\\\__ \\ _| 
|___/_\\___|___|_|\\_|___| |_|_\\___|____|___/_/ \\_\\___/___|
                                                         `}
          </pre>
          <p className="text-gray-400 mt-2">A digital .nfo drop — a hacker poetic welcome screen</p>
        </div>
      </div>

      {/* Marquee Banner */}
      <MarqueeBanner />

      {/* CTA Button */}
      <div className="flex justify-center mt-8">
        <motion.button
          onClick={onEnter}
          className="px-8 py-3 border border-gray-700 text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          [ ENTER ]
        </motion.button>
      </div>
    </div>
  );
}
