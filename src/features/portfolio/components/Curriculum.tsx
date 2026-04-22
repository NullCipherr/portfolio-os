/**
 * features/portfolio/components/Curriculum.tsx
 * Portfolio OS module with a specific architectural responsibility.
 */
import React from 'react';
import { Download, Briefcase, GraduationCap, Code2, Award } from 'lucide-react';
import { getPortfolioContent } from '@/features/portfolio/config/portfolioContent';
import { useSettings } from '@/features/system/contexts/SettingsContext';

export function Curriculum() {
  const { locale } = useSettings();
  const { curriculum } = getPortfolioContent(locale);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-y-auto">
      {/* Header */}
      <div className="bg-blue-600 dark:bg-blue-800 text-white p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{curriculum.name}</h1>
          <p className="text-blue-100 text-lg">{curriculum.role}</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-sm">
          <Download className="w-5 h-5" />
          {curriculum.downloadLabel}
        </button>
      </div>

      <div className="p-8 max-w-4xl mx-auto w-full space-y-10">
        {/* Resumo */}
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
            <UserIcon className="w-6 h-6 text-blue-500" />
            {curriculum.professionalSummaryTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{curriculum.professionalSummary}</p>
        </section>

        {/* Experiência */}
        <section>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
            <Briefcase className="w-6 h-6 text-blue-500" />
            {curriculum.experienceTitle}
          </h2>
          <div className="space-y-6">
            {curriculum.experience.map((item, index) => (
              <div
                key={`${item.title}-${item.companyPeriod}`}
                className={`relative pl-6 ${index === 0 ? 'border-l-2 border-blue-500/30' : 'border-l-2 border-gray-200 dark:border-gray-700'}`}
              >
                <div className={`absolute w-3 h-3 rounded-full -left-[7px] top-1.5 ${index === 0 ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.companyPeriod}</p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Habilidades */}
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
            <Code2 className="w-6 h-6 text-blue-500" />
            {curriculum.technicalSkillsTitle}
          </h2>
          <div className="flex flex-wrap gap-2">
            {curriculum.technicalSkills.map((skill) => (
              <span key={skill} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Formação */}
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
            <GraduationCap className="w-6 h-6 text-blue-500" />
            {curriculum.educationTitle}
          </h2>
          <div>
            <h3 className="font-bold text-lg">{curriculum.educationDegree}</h3>
            <p className="text-gray-600 dark:text-gray-300">{curriculum.educationInstitutionPeriod}</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
            <Award className="w-6 h-6 text-blue-500" />
            {curriculum.certificationsTitle}
          </h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
            {curriculum.certifications.map((certification) => (
              <li key={certification}>{certification}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
            <UserIcon className="w-6 h-6 text-blue-500" />
            {curriculum.languagesTitle}
          </h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
            {curriculum.languages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
