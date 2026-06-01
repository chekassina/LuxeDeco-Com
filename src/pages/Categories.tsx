import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Category } from '../types';

export const Categories = () => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-light text-white tracking-tight mb-4">{t('nav.categories')}</h1>
          <div className="h-px w-20 bg-gold"></div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, idx) => (
              <div 
                key={category.id} 
                className="group cursor-pointer border border-white/5 p-6 bg-[#111] hover:bg-zinc-800 transition-colors flex flex-col justify-between"
              >
                <div className="relative h-48 rounded-sm overflow-hidden mb-6 flex-shrink-0">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors z-10" />
                  <img src={category.imageUrl} alt={isEn ? category.nameEn : category.nameFr} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <span className="text-[10px] text-gray-500 font-bold uppercase mb-2 block tracking-widest">0{idx + 1}</span>
                <div>
                  <h3 className="text-xl font-medium text-white group-hover:text-gold transition-colors">
                    {isEn ? category.nameEn : category.nameFr}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
