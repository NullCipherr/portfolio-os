/**
 * features/portfolio/components/Contact.tsx
 * Portfolio OS module with a specific architectural responsibility.
 */
import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { getPortfolioContent } from '@/features/portfolio/config/portfolioContent';
import { useSettings } from '@/features/system/contexts/SettingsContext';

export function Contact() {
  const { locale } = useSettings();
  const { contact } = getPortfolioContent(locale);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="p-8 max-w-md mx-auto h-full flex flex-col justify-center">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">{contact.title}</h2>
        <p className="text-gray-500 mt-2">{contact.subtitle}</p>
      </div>

      {isSubmitted ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-50 text-green-800 p-6 rounded-xl flex flex-col items-center text-center border border-green-200"
        >
          <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
          <h3 className="text-lg font-bold">{contact.successTitle}</h3>
          <p className="text-sm mt-2 opacity-80">{contact.successMessage}</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">{contact.fields.name.label}</label>
            <input 
              type="text" 
              id="name" 
              required
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder={contact.fields.name.placeholder}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{contact.fields.email.label}</label>
            <input 
              type="email" 
              id="email" 
              required
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder={contact.fields.email.placeholder}
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">{contact.fields.message.label}</label>
            <textarea 
              id="message" 
              rows={4}
              required
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
              placeholder={contact.fields.message.placeholder}
            />
          </div>

          <button 
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
            {contact.submitLabel}
          </button>
        </form>
      )}
    </div>
  );
}
