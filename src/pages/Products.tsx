import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { Product, Category } from '../types';
import { MessageCircle, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Products = () => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories')
        ]);
        if (prodRes.ok) {
          const prodData = await prodRes.json();
          setProducts(prodData);
        }
        if (catRes.ok) {
          const catData = await catRes.json();
          setCategories(catData);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        p.nameEn.toLowerCase().includes(searchLower) || 
        p.nameFr.toLowerCase().includes(searchLower) ||
        p.descriptionEn.toLowerCase().includes(searchLower) ||
        p.descriptionFr.toLowerCase().includes(searchLower);
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-32 pb-24">
      <Helmet>
        <title>{isEn ? 'Products - LuxeDeco' : 'Produits - LuxeDeco'}</title>
        <meta name="description" content={isEn ? 'Browse our collection of premium wallpaper, wall panels, and interior decoration products in Cameroon.' : 'Parcourez notre collection de papiers peints de qualité supérieure, de panneaux muraux et de produits de décoration d\'intérieur au Cameroun.'} />
        <meta name="keywords" content="LuxeDeco, wall panels, wallpaper, interior decor, Cameroon decoration, papier peint, panneaux muraux, décoration intérieur Cameroun" />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-light text-white tracking-tight mb-4">{t('nav.products')}</h1>
          <div className="h-px w-20 bg-gold"></div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-10 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-sm uppercase tracking-widest font-bold transition-all border ${activeCategory === 'all' ? 'bg-gold text-black border-gold' : 'bg-transparent text-white border-white/20 hover:border-white/50'}`}
            >
              {isEn ? 'All' : 'Tout'}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-sm uppercase tracking-widest font-bold transition-all border ${activeCategory === cat.id ? 'bg-gold text-black border-gold' : 'bg-transparent text-white border-white/20 hover:border-white/50'}`}
              >
                {isEn ? cat.nameEn : cat.nameFr}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder={isEn ? "Search products..." : "Rechercher des produits..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111] border border-white/20 text-white pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-gold transition-colors"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin"></div>
          </div>
        ) : (
          <div>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-xl mb-2">{isEn ? 'No products found.' : 'Aucun produit trouvé.'}</p>
                <button 
                  onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                  className="text-gold hover:underline"
                >
                  {isEn ? 'Clear filters' : 'Effacer les filtres'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id}
                    className="bg-zinc-900 border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col group"
                  >
                    <div className="relative h-64 overflow-hidden bg-black">
                      <img src={product.imageUrl} alt={isEn ? product.nameEn : product.nameFr} className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" />
                      <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                        {product.badges?.map((badge, i) => (
                          <span key={i} className="bg-black/80 backdrop-blur-md border border-white/10 text-[10px] text-gold font-bold uppercase tracking-widest px-3 py-1">
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col bg-[#111]">
                      <h3 className="text-lg font-medium text-white leading-tight mb-2 flex-1 line-clamp-2">
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
                          {isEn ? 'Details' : 'Détails'}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
