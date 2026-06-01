import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.products': 'Products',
    'nav.categories': 'Categories',
    'nav.contact': 'Contact',
    'nav.requestQuote': 'Request Quote',
    'hero.title': 'Premium Interior Decoration Materials in Cameroon',
    'hero.subtitle': 'FASHION DECORATION TO TRANSFORM YOUR HOME, STORES, OFFICES INTO MODERN DESIGN',
    'hero.cta': 'Explore Collection',
    'hero.whatsapp': 'Chat on WhatsApp',
    'home.categories': 'Popular Categories',
    'home.featured': 'Featured Products',
    'home.suppliers': 'Trusted Suppliers in Cameroon',
    'home.reviews': 'Customer Reviews',
    'home.delivery': 'Delivery Information',
    'product.chatWhatsapp': 'Chat on WhatsApp',
    'product.requestQuote': 'Request Quote',
    'product.callSupplier': 'Call Supplier',
    'supplier.verified': 'Verified Supplier',
    'delivery.douala': 'Delivery in Douala',
    'delivery.yaounde': 'Delivery in Yaoundé',
    'delivery.nationwide': 'Nationwide Shipping',
    'delivery.pickup': 'Pickup Options',
    'footer.description': 'Cameroon\'s premium digital marketplace for luxury interior decoration and finishing materials.',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact Us',
    'admin.title': 'Secure Dashboard Access',
    'admin.login': 'Login to Panel',
    'admin.accessDenied': 'Access Denied. Authorized personnel only.',
  },
  fr: {
    'nav.products': 'Produits',
    'nav.categories': 'Catégories',
    'nav.contact': 'Contact',
    'nav.requestQuote': 'Demander un devis',
    'hero.title': 'Matériaux de Décoration d\'Intérieur Premium au Cameroun',
    'hero.subtitle': 'DÉCORATION TENDANCE POUR TRANSFORMER VOTRE MAISON, MAGASINS, BUREAUX EN DESIGN MODERNE',
    'hero.cta': 'Explorer la collection',
    'hero.whatsapp': 'Discuter sur WhatsApp',
    'home.categories': 'Catégories Populaires',
    'home.featured': 'Produits Vedettes',
    'home.suppliers': 'Fournisseurs de Confiance au Cameroun',
    'home.reviews': 'Avis Clients',
    'home.delivery': 'Informations de Livraison',
    'product.chatWhatsapp': 'Discuter sur WhatsApp',
    'product.requestQuote': 'Demander un devis',
    'product.callSupplier': 'Appeler le Fournisseur',
    'supplier.verified': 'Fournisseur Vérifié',
    'delivery.douala': 'Livraison à Douala',
    'delivery.yaounde': 'Livraison à Yaoundé',
    'delivery.nationwide': 'Expédition Nationale',
    'delivery.pickup': 'Options de Retrait',
    'footer.description': 'Le marché numérique premium du Cameroun pour la décoration intérieure de luxe et les matériaux de finition.',
    'footer.quickLinks': 'Liens Rapides',
    'footer.contact': 'Nous Contacter',
    'admin.title': 'Accès Sécurisé au Tableau de Bord',
    'admin.login': 'Connexion au Panneau',
    'admin.accessDenied': 'Accès Refusé. Personnel autorisé uniquement.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr'); // Default to French given it is widely spoken in Douala/Yaoundé as primary biz lang, but they are fully bilingual

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
