import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/src/lib/utils';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文' },
  { code: 'ru', label: 'Русский' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'es', label: 'Español' },
  { code: 'pt', label: 'Português' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'vi', label: 'Tiếng Việt' },
];

export default function LanguageSwitcher({ className, direction = 'down' }: { className?: string, direction?: 'up' | 'down' }) {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button 
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/20 border border-white/5 hover:bg-white/10 transition-colors text-text-secondary hover:text-white group"
        title={t('ui.systemLang', 'System Language')}
      >
        <Globe className="w-3.5 h-3.5 text-text-secondary group-hover:text-accent-blue transition-colors" />
        <span className="text-[10px] font-mono uppercase">{i18n.language ? i18n.language.substring(0, 2) : 'EN'}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: direction === 'up' ? 5 : -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction === 'up' ? 5 : -5 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute w-32 bg-bg-base/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden z-50 flex flex-col py-1",
              direction === 'up' ? "bottom-full left-0 mb-2" : "top-full right-0 mt-2"
            )}
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  i18n.changeLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={cn(
                  "px-4 py-2 text-xs font-mono text-left transition-colors",
                  i18n.language?.startsWith(lang.code)
                    ? "bg-accent-blue/10 text-accent-blue" 
                    : "text-text-secondary hover:bg-white/5 hover:text-white"
                )}
              >
                {lang.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
