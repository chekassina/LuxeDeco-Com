import React from 'react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

export const CartDrawer = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();
  const { language } = useLanguage();
  const isEn = language === 'en';

  const handleCheckout = () => {
    // Generate WhatsApp checkout message
    let message = `Hello LuxeDeco, I would like to place an order:%0A%0A`;
    cart.forEach((item, index) => {
      const imgLink = item.imageUrl.startsWith('data:') ? 'Attached Image' : (item.imageUrl.startsWith('http') ? item.imageUrl : `${window.location.origin}${item.imageUrl}`);
      message += `${index + 1}. ${isEn ? item.nameEn : item.nameFr} (x${item.quantity}) - ${(item.priceFcfa * item.quantity).toLocaleString()} FCFA%0A`;
      message += `Photo: ${imgLink}%0A%0A`;
    });
    message += `*Total: ${cartTotal.toLocaleString()} FCFA*`;
    
    window.open(`https://wa.me/237674871651?text=${message}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0A0A0A] border-l border-white/10 z-[70] flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#141414]">
              <h2 className="text-lg font-medium text-white flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-gold" />
                <span>Your Cart</span>
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <ShoppingBag className="w-12 h-12 mb-4 opacity-50" />
                  <p className="font-light">Your cart is empty.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 border border-white/20 hover:bg-white hover:text-black px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors rounded-sm text-white"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-[#111] border border-white/5 p-4 rounded-sm">
                    <div className="w-20 h-20 bg-black overflow-hidden flex-shrink-0">
                      <img src={item.imageUrl} alt={isEn ? item.nameEn : item.nameFr} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <Link 
                          to={`/product/${item.id}`} 
                          onClick={() => setIsCartOpen(false)}
                          className="text-sm font-medium text-white hover:text-gold transition-colors leading-tight"
                        >
                          {isEn ? item.nameEn : item.nameFr}
                        </Link>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 hover:text-red-500 transition-colors ml-2"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex justify-between items-end mt-2">
                        <div className="text-gold font-serif italic text-sm">
                          {item.priceFcfa.toLocaleString()} FCFA
                        </div>
                        <div className="flex items-center border border-white/10 rounded-sm">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-gray-400 hover:text-white transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-medium text-white min-w-[24px] text-center">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-400 hover:text-white transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-[#141414] space-y-4">
                <div className="flex justify-between items-center text-white">
                  <span className="text-sm font-light text-gray-400">Subtotal</span>
                  <span className="text-xl font-serif italic text-gold">{cartTotal.toLocaleString()} FCFA</span>
                </div>
                <p className="text-xs text-gray-500 font-light text-center">Shipping & taxes calculated at checkout.</p>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-[#25D366] text-white py-4 rounded-sm text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity flex justify-center items-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4 fill-white" />
                  <span>Checkout via WhatsApp</span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
