/**
 * features/portfolio/components/Contact.tsx
 * Portfolio OS module with a specific architectural responsibility.
 */
import React from 'react';
import { ArrowUpRight, Github, MessageCircle, Rocket } from 'lucide-react';
import { getPortfolioContent } from '@/features/portfolio/config/portfolioContent';
import { useSettings } from '@/features/system/contexts/SettingsContext';
import { cn } from '@/shared/lib/utils';

interface ChannelIconProps {
  id: string;
  className?: string;
}

function ChannelIcon({ id, className }: ChannelIconProps) {
  if (id === 'github') return <Github className={className} />;
  if (id === 'whatsapp') return <MessageCircle className={className} />;
  return <Rocket className={className} />;
}

export function Contact() {
  const { locale } = useSettings();
  const { contact } = getPortfolioContent(locale);

  return (
    <section className="h-full overflow-auto bg-transparent">
      <div className="mx-auto w-full max-w-5xl p-5 sm:p-6 lg:p-8">
        <header className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_18px_42px_rgba(15,23,42,0.09)] backdrop-blur-sm dark:border-slate-700/70 dark:bg-slate-900/80 sm:p-7">
          <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-cyan-300/30 blur-3xl dark:bg-cyan-500/15" />
          <div className="pointer-events-none absolute -bottom-20 -right-14 h-56 w-56 rounded-full bg-emerald-300/30 blur-3xl dark:bg-emerald-500/10" />

          <div className="relative space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.09em] text-cyan-700 dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-300">
              {contact.badge}
            </span>
            <h2 className="text-2xl font-bold leading-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
              {contact.title}
            </h2>
            <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">
              {contact.subtitle}
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
              {contact.responseTime}
            </p>
          </div>
        </header>

        <section className="mt-5 rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 sm:p-6">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 sm:text-lg">
            {contact.channelsTitle}
          </h3>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {contact.channels.map((channel) => (
              <a
                key={channel.id}
                href={channel.url}
                target={channel.external ? '_blank' : undefined}
                rel={channel.external ? 'noreferrer noopener' : undefined}
                className={cn(
                  'group rounded-xl border border-slate-200 bg-slate-50/85 p-4 transition-all hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-white hover:shadow-md',
                  'dark:border-slate-700 dark:bg-slate-800/60 dark:hover:border-cyan-500/60 dark:hover:bg-slate-800'
                )}
                aria-label={`${channel.cta}: ${channel.label}`}
              >
                <div className="mb-3 inline-flex rounded-lg border border-slate-200 bg-white p-2.5 dark:border-slate-600 dark:bg-slate-900/80">
                  <ChannelIcon id={channel.id} className="h-4 w-4 text-cyan-700 dark:text-cyan-300" />
                </div>

                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{channel.label}</h4>
                <p className="mt-1 min-h-12 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {channel.description}
                </p>

                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-700 transition-colors group-hover:text-cyan-800 dark:text-cyan-300 dark:group-hover:text-cyan-200">
                  {channel.cta}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
