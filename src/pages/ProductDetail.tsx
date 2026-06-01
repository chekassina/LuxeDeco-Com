import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { ArrowLeft, MessageCircle, ShoppingBag, Truck, Send, Mail, Phone, Maximize2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const isEn = language === 'en';
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const products: Product[] = await response.json();
          const found = products.find(p => p.id === id);
          if (found) {
            setProduct(found);
            setActiveImage(found.imageUrl);
          }
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex justify-center items-center">
        <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col justify-center items-center text-white">
        <h2 className="text-2xl font-light mb-4">Product not found.</h2>
        <Link to="/products" className="text-gold tracking-widest uppercase text-xs hover:underline">Return to Products</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const imgLink = product.imageUrl.startsWith('data:') ? 'Attached Image' : (product.imageUrl.startsWith('http') ? product.imageUrl : `${window.location.origin}${product.imageUrl}`);
  const whatsappMessage = encodeURIComponent(`Hello, I am interested in ${isEn ? product.nameEn : product.nameFr}\nPhoto: ${imgLink}`);
  const images = product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls : [product.imageUrl];

  return (
    <>
      <div className="min-h-screen bg-[#0A0A0A] pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/products" className="inline-flex items-center space-x-2 text-gray-500 hover:text-white transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs uppercase tracking-widest font-bold">Back to Products</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Gallery Section */}
            <div className="flex flex-col space-y-4">
              <div 
                className="relative aspect-square bg-[#111] border border-white/5 overflow-hidden group cursor-zoom-in"
                onClick={() => setIsFullscreen(true)}
              >
                <img 
                  src={activeImage} 
                  alt={isEn ? product.nameEn : product.nameFr} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-5 h-5 text-white" />
                </div>
                <div className="absolute top-6 left-6 flex flex-col gap-2 z-20">
                  {product.badges?.map((badge, i) => (
                    <span key={i} className="bg-black/80 backdrop-blur-md border border-white/10 text-[10px] text-gold font-bold uppercase tracking-widest px-3 py-1">
                      {badge}
                    </span>
                  ))}
                  {product.isTrending && (
                    <span className="bg-gold text-black border border-white/10 text-[10px] font-bold uppercase tracking-widest px-3 py-1 mt-1">
                      Trending
                    </span>
                  )}
                </div>
              </div>
              
              {/* Thumbnail Slider */}
              {images.length > 1 && (
                <div className="flex space-x-4 overflow-x-auto pb-2 custom-scrollbar">
                  {images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-24 h-24 shrink-0 border ${activeImage === img ? 'border-gold' : 'border-transparent'} overflow-hidden transition-colors`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover opacity-80 hover:opacity-100" />
                      {activeImage === img && <div className="absolute inset-0 bg-gold/10"></div>}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Details Section */}
            <div className="flex flex-col">
              <div className="mb-8">
                <span className="text-[10px] uppercase tracking-widest text-gold font-bold mb-4 block">
                  {/* Assuming category is resolved, for now hardcoding text based on id or just a general tag */}
                  Product Details
                </span>
                <h1 className="text-3xl md:text-5xl font-light text-white leading-tight mb-4">
                  {isEn ? product.nameEn : product.nameFr}
                </h1>
                <div className="text-3xl font-serif italic text-gold mb-8">
                  {product.priceFcfa.toLocaleString()} FCFA
                </div>
                <div className="h-px w-full bg-white/10 mb-8"></div>
                <p className="text-gray-400 font-light leading-relaxed text-lg mb-8">
                  {isEn ? product.descriptionEn : product.descriptionFr}
                </p>
                
                {product.specifications && product.specifications.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-4">Specifications</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {product.specifications.map((spec, idx) => (
                        <div key={idx} className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-gray-400 font-light text-sm">{spec.label}</span>
                          <span className="text-white text-sm">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-[#111] border border-white/5 p-6 mb-8 flex items-start space-x-4">
                <Truck className="w-6 h-6 text-gray-500 shrink-0" />
                <div>
                  <h4 className="text-white text-sm font-medium mb-1">Nationwide Delivery</h4>
                  <p className="text-gray-500 font-light text-xs leading-relaxed">Available for immediate delivery in Yaoundé. Nationwide shipping takes 2-3 business days.</p>
                </div>
              </div>

              <div className="mt-auto space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button 
                    onClick={handleAddToCart}
                    className="bg-gold text-black py-4 flex items-center justify-center space-x-2 transition-transform hover:opacity-90 rounded-sm text-xs font-bold uppercase tracking-widest w-full"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                  
                  <a 
                    href={`https://wa.me/237674871651?text=${whatsappMessage}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-[#25D366] text-white py-4 flex items-center justify-center space-x-2 transition-transform hover:opacity-90 rounded-sm text-xs font-bold uppercase tracking-widest w-full"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                {/* Additional Contact Options */}
                <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4">
                  <a href={`https://t.me/+237674871651`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center text-gray-400 hover:text-[#0088cc] transition-colors py-2 border border-white/5 hover:border-[#0088cc]/30 bg-[#111] rounded-sm">
                    <Send className="w-4 h-4 mb-2" />
                    <span className="text-[9px] uppercase tracking-widest font-bold">Telegram</span>
                  </a>
                  <a href={`mailto:mugherick@yahoo.com?subject=Inquiry: ${isEn ? product.nameEn : product.nameFr}`} className="flex flex-col items-center justify-center text-gray-400 hover:text-white transition-colors py-2 border border-white/5 hover:border-white/30 bg-[#111] rounded-sm">
                    <Mail className="w-4 h-4 mb-2" />
                    <span className="text-[9px] uppercase tracking-widest font-bold">Email</span>
                  </a>
                  <a href={`tel:+237674871651`} className="flex flex-col items-center justify-center text-gray-400 hover:text-gold transition-colors py-2 border border-white/5 hover:border-gold/30 bg-[#111] rounded-sm">
                    <Phone className="w-4 h-4 mb-2" />
                    <span className="text-[9px] uppercase tracking-widest font-bold">Call Now</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setIsFullscreen(false)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-gold transition-colors p-2"
              onClick={() => setIsFullscreen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={activeImage} 
              alt="Fullscreen Preview" 
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
