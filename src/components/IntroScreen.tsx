import { useEffect } from 'react';
import { motion } from 'framer-motion';
import zoroIcon from '../assets/icon.png'

export default function IntroScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-neutral-900 flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="text-center space-y-12 z-10"
      >
        <motion.h1 
          className="text-primary text-8xl font-bold"
        >
          ZORO MUSIC
        </motion.h1>

        <motion.div
          className="w-48 h-48 mx-auto"
        >
          <img 
            src={zoroIcon}
            alt="Zoro Music Icon"
            className="w-full h-full object-contain"
          />
        </motion.div>
        
        <motion.p 
          className="text-neutral-700 text-3xl tracking-[0.5em] font-light drop-shadow-[0_0_10px_#1DB954]"
        >
          YOUR RHYTHM • YOUR SOUND • YOUR JOURNEY
        </motion.p>
      </motion.div>
    </div>
  );
}