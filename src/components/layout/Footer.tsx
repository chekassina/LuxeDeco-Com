import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Instagram, Facebook } from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#111] text-gray-300 py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tighter leading-none text-white block">
                LUXEDECO<span className="text-gold">.CM</span>
              </span>
              <span className="text-[9px] font-medium tracking-[0.2em] text-gold uppercase block mt-1">
                Cameroon
              </span>
            </Link>
            <p className="text-gray-400 text-xs leading-relaxed max-w-xs font-light">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 tracking-widest uppercase text-xs">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3 text-sm font-light">
              <li><Link to="/products" className="hover:text-gold transition-colors block text-gray-400 hover:translate-x-1 duration-300">{t('nav.products')}</Link></li>
              <li><Link to="/categories" className="hover:text-gold transition-colors block text-gray-400 hover:translate-x-1 duration-300">{t('nav.categories')}</Link></li>
              <li><Link to="/about" className="hover:text-gold transition-colors block text-gray-400 hover:translate-x-1 duration-300">About</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors block text-gray-400 hover:translate-x-1 duration-300">{t('nav.contact')}</Link></li>
              <li><Link to="/cm-admin-access" className="hover:text-gold transition-colors block text-gray-400 hover:translate-x-1 duration-300 opacity-30 hover:opacity-100">Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 tracking-widest uppercase text-xs">{t('footer.contact')}</h4>
            <ul className="space-y-4 text-sm font-light text-gray-400">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>Marché Central<br/>Yaoundé<br/>Cameroon</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>+237 674 87 16 51</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>mugherick@yahoo.com</span>
              </li>
            </ul>
          </div>

          <div>
             <h4 className="text-white font-medium mb-6 tracking-widest uppercase text-xs">Social</h4>
             <div className="flex space-x-4">
               <a href="#" className="w-10 h-10 border border-white/10 rounded-sm bg-white/5 flex items-center justify-center hover:bg-gold hover:text-black hover:border-gold transition-all text-gray-400">
                 <Instagram className="w-4 h-4" />
               </a>
               <a href="#" className="w-10 h-10 border border-white/10 rounded-sm bg-white/5 flex items-center justify-center hover:bg-gold hover:text-black hover:border-gold transition-all text-gray-400">
                 <Facebook className="w-4 h-4" />
               </a>
             </div>
          </div>

        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          <p>&copy; {new Date().getFullYear()} LuxeDeco Cameroon. All rights reserved. <span className="ml-4 text-gold">Powered by El kexas technology</span></p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
