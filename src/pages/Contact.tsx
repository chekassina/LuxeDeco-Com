import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail } from 'lucide-react';

export const Contact = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-light text-white tracking-tight mb-4">{t('nav.contact')}</h1>
          <div className="h-px w-20 bg-gold"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12 block">
            <div>
              <h2 className="text-2xl font-light text-white mb-6">Our Showrooms</h2>
              <div className="grid grid-cols-1 gap-8">
                <div className="bg-[#111] border border-white/5 p-8">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Marché Central Yaoundé</h3>
                  <p className="text-gray-400 font-light text-sm">Yaoundé<br/>Cameroon</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-light text-white mb-6">Direct Contact</h2>
              <div className="bg-[#111] border border-white/5 p-8 flex flex-col gap-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                    <Phone className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Phone / WhatsApp</div>
                    <div className="text-white font-medium">+237 674 87 16 51</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                    <Mail className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Email</div>
                    <div className="text-white font-medium">mugherick@yahoo.com</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#111] border border-white/10 p-10">
            <h2 className="text-2xl font-light text-white mb-8">Send an Inquiry</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Full Name</label>
                <input type="text" className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors font-light" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Phone / Email</label>
                <input type="text" className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors font-light" placeholder="Your contact info" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Message</label>
                <textarea rows={4} className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors font-light" placeholder="Tell us about your project..."></textarea>
              </div>
              <button className="w-full bg-gold text-black px-6 py-4 rounded-sm text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
