import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { CheckCircle, Truck, MapPin, Package, Star, MessageCircle, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product, Category, Supplier, Review } from '../types';

export const Home = () => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes, supRes, revRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories'),
          fetch('/api/suppliers'),
          fetch('/api/reviews')
        ]);
        
        if (prodRes.ok) setProducts(await prodRes.json());
        if (catRes.ok) setCategories(await catRes.json());
        if (supRes.ok) setSuppliers(await supRes.json());
        if (revRes.ok) setReviews(await revRes.json());
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-slate-950">
      <Helmet>
        <title>{isEn ? 'LuxeDeco - Premium Interior Decoration in Cameroon' : 'LuxeDeco - Décoration d\'Intérieur Premium au Cameroun'}</title>
        <meta name="description" content={isEn ? 'LuxeDeco offers high-quality wall panels, wallpapers, and interior decoration materials in Yaoundé, Cameroon. Transforming interiors with elegance.' : 'LuxeDeco propose des panneaux muraux, papiers peints et matériaux de décoration d\'intérieur de haute qualité à Yaoundé, Cameroun. Transformez vos intérieurs avec élégance.'} />
        <meta name="keywords" content="LuxeDeco, wall panels, wallpaper, interior decor, Cameroon decoration, papier peint, panneaux muraux, décoration intérieur Cameroun, Yaoundé" />
      </Helmet>
      
      {/* Hero Section */}
      <section className="relative w-full h-[600px] lg:h-[700px] flex items-center bg-slate-950 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80" 
            alt="Modern Interior"
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full w-fit mb-2">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-widest text-gold text-center">LuxeDeco Cameroon</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-white leading-[1.1] tracking-tight">
              {t('hero.title')}
            </h1>
            <p className="text-lg text-gray-400 font-light md:text-xl max-w-xl leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <a href="#featured" className="border border-white/20 hover:bg-white hover:text-black px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center space-x-2">
                <span>{t('hero.cta')}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="https://wa.me/237674871651" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:scale-105 text-white shadow-lg px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-transform flex items-center justify-center space-x-2">
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{t('hero.whatsapp')}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 border-t border-white/10 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-light text-white tracking-tight">{t('home.categories')}</h2>
              <div className="h-px w-20 bg-gold mt-6"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0 border-t border-l border-white/5">
            {categories.map((category, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                key={category.id} 
                className="group cursor-pointer border-r border-b border-white/5 p-6 hover:bg-zinc-800 transition-colors flex flex-col justify-between"
              >
                <div className="relative h-40 rounded-sm overflow-hidden mb-6 hidden md:block">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors z-10" />
                  <img src={category.imageUrl} alt={isEn ? category.nameEn : category.nameFr} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <span className="text-[10px] text-gray-500 font-bold uppercase mb-2 block tracking-widest">0{idx + 1}</span>
                <div>
                  <h3 className="text-lg font-medium text-white group-hover:text-gold transition-colors">
                    {isEn ? category.nameEn : category.nameFr}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-24 bg-slate-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-light tracking-tight text-white">{t('home.featured')}</h2>
            <div className="h-px w-20 bg-gold mt-6 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.filter(p => p.isFeatured).map((product, idx) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                key={product.id}
                className="bg-zinc-900 border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden group flex flex-col"
              >
                <div className="relative h-64 overflow-hidden bg-black">
                  <img src={product.imageUrl} alt={isEn ? product.nameEn : product.nameFr} className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" />
                  <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                    {product.badges.map((badge, i) => (
                      <span key={i} className="bg-black/80 backdrop-blur-md border border-white/10 text-[10px] text-gold font-bold uppercase tracking-widest px-3 py-1">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col bg-slate-900">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                    {suppliers.find(s => s.id === product.supplierId)?.name || ''}
                  </div>
                  <h3 className="text-lg font-medium text-white leading-tight mb-2 flex-1">
                    {isEn ? product.nameEn : product.nameFr}
                  </h3>
                  
                  <div className="text-xl font-serif italic text-gold mb-6">
                    {product.priceFcfa.toLocaleString()} FCFA
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    <a href={`https://wa.me/237674871651?text=Hello,%20I%20am%20interested%20in%20${isEn ? product.nameEn : product.nameFr}`} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:scale-105 text-white py-3 flex items-center justify-center transition-transform rounded-sm">
                      <MessageCircle className="w-5 h-5 fill-white" />
                    </a>
                    <Link to={`/product/${product.id}`} className="border border-white/20 hover:bg-white hover:text-black flex justify-center items-center py-3 text-[10px] font-bold uppercase tracking-widest transition-colors text-center rounded-sm text-white">
                      Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Logistics & Delivery */}
      <section className="py-20 bg-slate-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center border border-white/10 bg-white/5">
                <MapPin className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-lg font-medium text-white">Central Showroom</h3>
              <p className="text-gray-400 text-sm font-light">Visit our main showroom at Marché Central Yaoundé.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center border border-white/10 bg-white/5">
                <MapPin className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-lg font-medium text-white">Yaoundé Delivery</h3>
              <p className="text-gray-400 text-sm font-light">Immediate delivery available for in-stock materials within Yaoundé.</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center border border-white/10 bg-white/5">
                <Truck className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-lg font-medium text-white">{t('delivery.nationwide')}</h3>
              <p className="text-gray-400 text-sm font-light">We ship to all regions in Cameroon via reliable transport agencies.</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center border border-white/10 bg-white/5">
                <Package className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-lg font-medium text-white">{t('delivery.pickup')}</h3>
              <p className="text-gray-400 text-sm font-light">Direct warehouse pickup available at Marché Central, Yaoundé for contractors.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Suppliers */}
      <section className="py-24 bg-slate-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-light tracking-tight text-white">{t('home.suppliers')}</h2>
            <div className="h-px w-20 bg-gold mt-6 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {suppliers.map((supplier, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                key={supplier.id}
                className="border border-white/10 bg-slate-900 p-6 hover:border-gold/50 transition-colors flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full mb-4 flex items-center justify-center overflow-hidden">
                   <span className="text-xl font-serif text-gold italic">{supplier.name.charAt(0)}</span>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{supplier.name}</h3>
                <div className="flex items-center space-x-1 text-gray-400 text-sm mb-4 tracking-wide">
                  <MapPin className="w-3.5 h-3.5 text-gold" /> <span>{supplier.location}</span>
                </div>
                <div className="flex items-center space-x-1 mb-6">
                  <Star className="w-4 h-4 text-gold fill-gold" />
                  <span className="font-medium text-white">{supplier.rating}</span>
                </div>
                {supplier.verified && (
                  <span className="inline-flex items-center space-x-1 border border-gold/30 bg-gold/10 text-gold px-3 py-1.5 text-[10px] uppercase font-bold tracking-widest rounded-sm">
                    <CheckCircle className="w-3 h-3" />
                    <span>{t('supplier.verified')}</span>
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 bg-slate-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="mb-16">
            <h2 className="text-3xl font-light tracking-tight text-white border-l border-gold pl-6">{t('home.reviews')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <div key={review.id} className="bg-slate-950 p-8 border border-white/5 hover:border-white/20 transition-colors flex flex-col">
                <div className="flex space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(review.rating) ? 'text-gold fill-gold' : 'text-gray-700'}`} />
                  ))}
                </div>
                <p className="text-gray-400 mb-8 italic font-serif text-lg leading-relaxed flex-1">
                  "{isEn ? review.contentEn : review.contentFr}"
                </p>
                <div className="mt-auto border-t border-white/10 pt-6">
                  <div className="font-medium text-white tracking-wide">{review.author}</div>
                  <div className="text-[10px] uppercase tracking-widest text-gold mt-1">{isEn ? review.roleEn : review.roleFr}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
