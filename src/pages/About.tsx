import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-light text-white tracking-tight mb-4">About Us</h1>
          <div className="h-px w-20 bg-gold"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-light text-white mb-6 leading-tight">
              LuxeDeco.CM — The gold standard for modern home décor in Central Africa.
            </h2>
            <div className="space-y-6 text-gray-400 font-light leading-relaxed">
              <p>
                The Home Decoration Ecommerce Website is a professional online shopping platform created for modern home décor and interior design products. We offer customers a beautiful and seamless shopping experience where they can explore different decoration items, place orders, and communicate directly with our business through WhatsApp and email.
              </p>
              <p>
                We specialize in curating the finest Wall Art, Modern Furniture, Curtains, Carpets, Flower Vases, and Lighting products. Our vision is to elevate the interior finishing standards in Yaoundé, and across Cameroon by bridging the gap between world-class manufacturers and local homes.
              </p>
              <p>
                Our platform provides direct communication to dedicated specialists who assist you in finding exactly what your living space or construction project needs.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
              <div>
                <div className="text-3xl font-serif text-gold italic mb-2">10+</div>
                <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-serif text-gold italic mb-2">500+</div>
                <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">Premium Products</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gold/10 -m-4 lg:-m-8 border border-gold/20 transform rotate-3"></div>
            <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80" alt="About LuxeDeco" className="relative w-full aspect-square object-cover shadow-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
