/**
 * features/portfolio/components/About.tsx
 * Portfolio OS module with a specific architectural responsibility.
 */
import React from 'react';
import { Mail, MapPin, Briefcase, Phone } from 'lucide-react';
import { getPortfolioContent } from '@/features/portfolio/config/portfolioContent';
import { useSettings } from '@/features/system/contexts/SettingsContext';

export function About() {
  const { locale } = useSettings();
  const { about, personalData } = getPortfolioContent(locale);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0 shadow-xl border-4 border-white" />
        
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{about.name}</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">{about.role}</p>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{about.bio}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <MapPin className="w-5 h-5 text-blue-500" />
              <span>{about.location}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <Briefcase className="w-5 h-5 text-blue-500" />
              <span>{about.availability}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <Mail className="w-5 h-5 text-blue-500" />
              <span>{about.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <Phone className="w-5 h-5 text-blue-500" />
              <span>{personalData.phone}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">{about.technicalSkillsTitle}</h2>
        <div className="flex flex-wrap gap-2">
          {about.technicalSkills.map((skill) => (
            <span key={skill} className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
