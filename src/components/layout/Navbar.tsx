import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { Globe, Menu, X, MessageCircle, ShoppingBag } from 'lucide-react';

export const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const { cartCount, setIsCartOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-8 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tighter leading-none text-white">
              LuxeDeco
            </span>
            <span className="text-[9px] font-medium tracking-[0.2em] text-gold uppercase hidden sm:block mt-1">
              Cameroon
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-sm font-medium tracking-wide text-white hover:text-gold transition-colors">
              {t('nav.products')}
            </Link>
            <Link to="/categories" className="text-sm font-medium tracking-wide text-white hover:text-gold transition-colors">
              {t('nav.categories')}
            </Link>
            <Link to="/about" className="text-sm font-medium tracking-wide text-white hover:text-gold transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium tracking-wide text-white hover:text-gold transition-colors">
              {t('nav.contact')}
            </Link>
            
            <div className="flex items-center space-x-2 border-l border-white/10 pl-6 cursor-pointer group" onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}>
              <Globe className="w-4 h-4 text-gray-400 group-hover:text-gold transition-colors" />
              <span className="text-xs font-bold text-gray-500 group-hover:text-gold uppercase tracking-widest">{language}</span>
            </div>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative text-white hover:text-gold transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <a href="https://wa.me/237674871651" target="_blank" rel="noopener noreferrer" 
               className="inline-flex items-center space-x-2 bg-gold text-black px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform">
              <MessageCircle className="w-4 h-4" />
              <span>{t('nav.requestQuote')}</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative text-white hover:text-gold transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gold text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')} className="text-xs font-bold text-gray-500 uppercase flex items-center space-x-1 tracking-widest">
              <Globe className="w-4 h-4" />
              <span>{language}</span>
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-gold focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#141414] border-b border-white/5 px-4 pt-4 pb-6 space-y-2 shadow-lg">
          <Link to="/products" className="block px-3 py-2 text-sm font-medium tracking-wide text-white hover:text-gold hover:bg-white/5 rounded-md">
            {t('nav.products')}
          </Link>
          <Link to="/categories" className="block px-3 py-2 text-sm font-medium tracking-wide text-white hover:text-gold hover:bg-white/5 rounded-md">
            {t('nav.categories')}
          </Link>
          <Link to="/about" className="block px-3 py-2 text-sm font-medium tracking-wide text-white hover:text-gold hover:bg-white/5 rounded-md">
            About
          </Link>
          <Link to="/contact" className="block px-3 py-2 text-sm font-medium tracking-wide text-white hover:text-gold hover:bg-white/5 rounded-md">
            {t('nav.contact')}
          </Link>
          <a href="https://wa.me/237674871651" className="block mt-4 px-3 py-3 bg-gold text-black rounded-full text-center text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2">
            <MessageCircle className="w-5 h-5" />
            <span>{t('nav.requestQuote')}</span>
          </a>
        </div>
      )}
    </nav>
  );
};
