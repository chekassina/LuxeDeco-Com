import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';

export const FloatingWhatsApp = () => {
  const { t } = useLanguage();
  return (
    <motion.a
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      href="https://wa.me/237674871651"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] rounded-full shadow-lg text-white hover:scale-105 transition-transform group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-8 h-8 fill-white" />
      <span className="absolute right-20 bg-white text-black text-xs font-bold px-4 py-2 rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {t('hero.whatsapp')}
      </span>
    </motion.a>
  );
};

