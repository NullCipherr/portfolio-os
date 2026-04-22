/**
 * features/portfolio/components/About.tsx
 * Portfolio OS module with a specific architectural responsibility.
 */
import React from 'react';
import { Mail, MapPin, Briefcase, Sparkles, Code2 } from 'lucide-react';
import { getPortfolioContent } from '@/features/portfolio/config/portfolioContent';
import { useSettings } from '@/features/system/contexts/SettingsContext';
import { cn } from '@/shared/lib/utils';

export function About() {
  const { locale } = useSettings();
  const { about, personalData } = getPortfolioContent(locale);
  const initials = about.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return (
    <section className="h-full overflow-auto bg-transparent">
      <div className="mx-auto w-full max-w-5xl p-5 sm:p-6 lg:p-8">
        <header className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/85 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm dark:border-slate-700/70 dark:bg-slate-900/80">
          <div className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-cyan-300/25 blur-3xl dark:bg-cyan-500/15" />
          <div className="pointer-events-none absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-amber-300/25 blur-3xl dark:bg-amber-500/10" />

          <div className="relative flex flex-col gap-6 lg:grid lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-sky-700 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  Perfil Profissional
                </div>
                <h1 className="text-2xl font-bold leading-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
                  {about.name}
                </h1>
                <p className="max-w-2xl text-sm font-medium text-slate-600 dark:text-slate-300 sm:text-base">
                  {about.role}
                </p>
            </div>

            <div className="mx-auto flex w-full justify-center lg:mx-0 lg:w-auto lg:justify-end">
              <div className="relative flex h-28 w-28 items-center justify-center rounded-[2rem] bg-gradient-to-br from-sky-500 via-cyan-500 to-emerald-500 text-4xl font-bold tracking-wide text-white shadow-[0_20px_45px_rgba(14,165,233,0.38)] ring-4 ring-white/70 dark:ring-slate-900/60 sm:h-36 sm:w-36 sm:text-5xl lg:h-44 lg:w-44 lg:rounded-[2.5rem] lg:text-6xl">
                {initials}
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-2 text-xs sm:grid-cols-2 sm:text-sm">
            <InfoChip icon={MapPin} label={about.location} />
            <InfoChip icon={Briefcase} label={about.availability} />
            <InfoChip icon={Mail} label={about.email} />
          </div>
        </header>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <article className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 sm:p-6">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 sm:text-lg">
              Resumo Profissional
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-[15px]">
              {about.bio}
            </p>
          </article>

          <aside className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 sm:p-6">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 sm:text-lg">
              Informações Rápidas
            </h2>
            <dl className="mt-4 space-y-3">
              <MetaRow label="Idade" value={personalData.age} />
              <MetaRow label="Local" value={personalData.location} />
              <MetaRow label="Contato" value={about.email} />
            </dl>
            <div className="mt-5 grid grid-cols-1 gap-2">
              <a
                href={`mailto:${about.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-4 py-2.5 text-sm font-semibold text-sky-800 transition-colors hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-500/60 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-200 dark:hover:bg-sky-500/20"
              >
                <Mail className="h-4 w-4" />
                Enviar e-mail
              </a>
            </div>
          </aside>
        </div>

        <section className="mt-5 rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 sm:p-6">
          <div className="mb-4 flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <Code2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
            <h2 className="text-base font-semibold sm:text-lg">{about.technicalSkillsTitle}</h2>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {about.technicalSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold tracking-wide text-slate-700 shadow-sm transition-colors hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

interface InfoChipProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

function InfoChip({ icon: Icon, label }: InfoChipProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-medium text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">
      <Icon className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
      <span className="truncate">{label}</span>
    </span>
  );
}

interface MetaRowProps {
  label: string;
  value: string;
}

function MetaRow({ label, value }: MetaRowProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800/70">
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</dt>
      <dd className={cn('ml-3 text-right text-sm font-medium text-slate-700 dark:text-slate-200')}>{value}</dd>
    </div>
  );
}
