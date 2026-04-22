/**
 * features/system/components/TaskManager.tsx
 * Portfolio OS module with a specific architectural responsibility.
 */
import React, { useState, useEffect } from 'react';
import {
  Menu, Search, Play, StopCircle, Leaf, MoreHorizontal,
  LayoutGrid, Activity, History, Gauge, Users, List, Settings2, Settings,
  ChevronRight, ChevronDown
} from 'lucide-react';
import { WindowState, AppConfig } from '@/shared/types';
import { cn } from '@/shared/lib/utils';
import { useSettings } from '@/features/system/contexts/SettingsContext';
import { MESSAGES } from '@/shared/i18n/messages';

interface TaskManagerProps {
  windows: WindowState[];
  apps: AppConfig[];
  onCloseWindow: (id: string) => void;
}

const getFakeBackgroundProcesses = (locale: 'pt-BR' | 'en-US') => [
  { name: 'Antimalware Service Executable', cpu: '0%', mem: '178,1 MB', disk: '1,2 MB/s', net: '0 Mbps' },
  { name: locale === 'pt-BR' ? 'Aplicativo de subsistema de spooler...' : 'Spooler subsystem app...', cpu: '0%', mem: '7,5 MB', disk: '0 MB/s', net: '0 Mbps' },
  { name: 'Application Frame Host', cpu: '0%', mem: '14,2 MB', disk: '0 MB/s', net: '0 Mbps' },
  { name: locale === 'pt-BR' ? 'Backup do Windows' : 'Windows Backup', cpu: '0%', mem: '0 MB', disk: '0 MB/s', net: '0 Mbps', suspended: true },
  { name: locale === 'pt-BR' ? 'Carregador CTF' : 'CTF Loader', cpu: '0%', mem: '4,5 MB', disk: '0,1 MB/s', net: '0 Mbps' },
  { name: 'COM Surrogate', cpu: '0%', mem: '1,7 MB', disk: '0 MB/s', net: '0 Mbps' },
  { name: locale === 'pt-BR' ? 'Configurações' : 'Settings', cpu: '0%', mem: '0 MB', disk: '0 MB/s', net: '0 Mbps', suspended: true },
  { name: locale === 'pt-BR' ? 'Conteúdo da Microsoft (2)' : 'Microsoft Content (2)', cpu: '0%', mem: '3,2 MB', disk: '0 MB/s', net: '0 Mbps', suspended: true },
  { name: 'Credential Guard & VBS Key Is...', cpu: '0%', mem: '1,0 MB', disk: '0 MB/s', net: '0 Mbps' },
  { name: locale === 'pt-BR' ? 'Dispositivos móveis (2)' : 'Mobile devices (2)', cpu: '0%', mem: '20,1 MB', disk: '0 MB/s', net: '0 Mbps' },
  { name: locale === 'pt-BR' ? 'Experiência de Entrada do Win...' : 'Windows Input Experience...', cpu: '0%', mem: '21,0 MB', disk: '0 MB/s', net: '0 Mbps' },
  { name: locale === 'pt-BR' ? 'Iniciar' : 'Start', cpu: '0%', mem: '72,5 MB', disk: '0,1 MB/s', net: '0 Mbps' },
  { name: 'Microsoft Store (2)', cpu: '0%', mem: '17,8 MB', disk: '0,3 MB/s', net: '0 Mbps' },
];

export function TaskManager({ windows, apps, onCloseWindow }: TaskManagerProps) {
  const { locale } = useSettings();
  const text = MESSAGES[locale].taskManager;
  const FAKE_BACKGROUND_PROCESSES = getFakeBackgroundProcesses(locale);
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null);
  const [appsExpanded, setAppsExpanded] = useState(true);
  const [bgExpanded, setBgExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('processos');

  // To simulate slight fluctuations
  const [, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 2000);
    return () => clearInterval(interval);
  }, []);

  const handleCloseSelected = () => {
    if (selectedProcess) {
      onCloseWindow(selectedProcess);
      setSelectedProcess(null);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-gray-200 font-sans text-xs select-none">
      {/* Title Bar Area */}
      <div className="h-12 flex items-center justify-between px-3 shrink-0 bg-[#1e1e1e]">
        <div className="font-semibold text-sm w-64 pl-1">{text.title}</div>
        <div className="flex-1 max-w-[500px]">
          <div className="relative flex items-center h-8 bg-[#2d2d2d] border border-white/10 rounded overflow-hidden">
            <Search className="w-4 h-4 ml-3 text-gray-400" />
            <input 
              type="text" 
              placeholder={text.searchPlaceholder}
              className="w-full bg-transparent border-none text-gray-300 text-xs px-3 focus:outline-none focus:ring-0 placeholder-gray-400"
            />
          </div>
        </div>
        <div className="w-64 flex justify-end"></div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar */}
        <div 
          className="hover:w-60 w-12 transition-all duration-200 flex flex-col bg-[#1e1e1e] group overflow-hidden shrink-0 z-20 absolute top-0 bottom-0 left-0 hover:shadow-[2px_0_10px_rgba(0,0,0,0.5)]"
          onMouseEnter={() => setAppsExpanded(appsExpanded)}
        >
          <div className="p-3 mb-2 flex items-center h-10">
            <Menu className="w-5 h-5 text-gray-200 cursor-pointer ml-1" />
          </div>
          
          <div className="flex-1 py-2 flex flex-col gap-1 px-1">
            <SidebarItem icon={<LayoutGrid className="w-[18px] h-[18px]" />} label={text.tabs.processes} active={activeTab === 'processos'} onClick={() => setActiveTab('processos')} />
            <SidebarItem icon={<Activity className="w-[18px] h-[18px]" />} label={text.tabs.performance} active={activeTab === 'desempenho'} onClick={() => setActiveTab('desempenho')} />
            <SidebarItem icon={<History className="w-[18px] h-[18px]" />} label={text.tabs.appHistory} />
            <SidebarItem icon={<Gauge className="w-[18px] h-[18px]" />} label={text.tabs.startupApps} />
            <SidebarItem icon={<Users className="w-[18px] h-[18px]" />} label={text.tabs.users} />
            <SidebarItem icon={<List className="w-[18px] h-[18px]" />} label={text.tabs.details} />
            <SidebarItem icon={<Settings2 className="w-[18px] h-[18px]" />} label={text.tabs.services} />
          </div>

          <div className="pb-3 flex flex-col gap-1 px-1">
            <SidebarItem icon={<Settings className="w-[18px] h-[18px]" />} label={text.tabs.settings} />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e] ml-12">
          {/* Toolbar & Header */}
          <div className="h-[60px] flex items-center justify-between px-6 shrink-0 border-b border-black/20">
            <div className="text-xl font-medium tracking-tight">{text.tabs.processes}</div>
            <div className="flex items-center gap-2 text-[13px] font-normal text-gray-200">
              <button className="flex items-center gap-2 hover:bg-white/10 px-3 py-1.5 rounded transition-colors border border-transparent hover:border-white/10">
                <Play className="w-[14px] h-[14px]" />
                {text.runNewTask}
              </button>
              <button 
                onClick={handleCloseSelected}
                disabled={!selectedProcess}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded transition-colors border border-transparent",
                  selectedProcess ? "hover:bg-white/10 hover:border-white/10 text-gray-200" : "text-gray-500 cursor-not-allowed"
                )}
              >
                <div className="relative flex items-center justify-center">
                  <div className="w-[14px] h-[14px] border border-current rounded-full" />
                  <div className="absolute w-[18px] h-[1px] bg-current transform -rotate-45" />
                </div>
                {text.endTask}
              </button>
              <button className="flex items-center gap-2 text-gray-500 px-3 py-1.5 cursor-not-allowed">
                <Leaf className="w-[14px] h-[14px]" />
                {text.efficiencyMode}
              </button>
              <button className="hover:bg-white/10 p-1.5 rounded transition-colors ml-1">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Table Area */}
          <div className="flex-1 overflow-auto custom-scrollbar">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead className="sticky top-0 bg-[#1e1e1e] z-10 text-[11px] outline outline-1 outline-black/20 font-semibold shadow-sm">
                <tr>
                  <th className="font-normal px-6 py-2 w-1/3 min-w-[280px] hover:bg-white/5 cursor-pointer">
                    {text.name ?? text.tabs.processes}
                  </th>
                  <th className="font-normal px-2 py-2 w-24 hover:bg-white/5 cursor-pointer border-l border-white/5">
                    {text.status}
                  </th>
                  <th className="font-normal px-2 text-right hover:bg-[#322841] cursor-pointer cursor-s-resize border-l border-white/5 group">
                    <div className="text-gray-400 group-hover:text-gray-300">15%</div>
                    <div>{text.cpu}</div>
                  </th>
                  <th className="font-normal px-2 text-right hover:bg-[#322841] cursor-pointer cursor-s-resize bg-[#282136] border-l border-white/5 group">
                    <div className="text-gray-400 group-hover:text-gray-300">24%</div>
                    <div>{text.memory}</div>
                  </th>
                  <th className="font-normal px-2 text-right hover:bg-white/5 cursor-pointer cursor-s-resize border-l border-white/5 group">
                    <div className="text-gray-400 group-hover:text-gray-300">4%</div>
                    <div>{text.disk}</div>
                  </th>
                  <th className="font-normal px-2 text-right hover:bg-white/5 cursor-pointer cursor-s-resize border-l border-white/5 group">
                    <div className="text-gray-400 group-hover:text-gray-300">0%</div>
                    <div>{text.network}</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-gray-100">
                {/* Aplicativos Section */}
                <tr className="border-b-0">
                  <td colSpan={6} className="px-2 py-0">
                    <button 
                      onClick={() => setAppsExpanded(!appsExpanded)}
                      className="flex items-center gap-2 hover:bg-white/5 pl-2 pr-4 py-3 rounded-none w-full text-left mt-2 focus:bg-white/5 transition-colors"
                    >
                      {appsExpanded ? <ChevronDown className="w-[14px] h-[14px] text-gray-300" /> : <ChevronRight className="w-[14px] h-[14px] text-gray-300" />}
                      <span className="font-medium text-gray-200 text-xs tracking-wide">{text.appsSection} ({windows.length})</span>
                    </button>
                  </td>
                </tr>
                {appsExpanded && windows.map((w) => {
                  const app = apps.find((a) => a.id === w.id);
                  if (!app) return null;
                  
                  const isSelected = selectedProcess === w.id;
                  // Generate deterministic fake values based on ID size + some minor random tick fluctuation
                  const baseMem = 20 + app.title.length * 4;
                  const memRandom = Math.sin(Date.now() / 2000 + app.title.length) * 5;
                  const finalMem = Math.max(10, baseMem + memRandom).toFixed(1);
                  
                  const baseCpu = w.isMinimized ? 0 : (app.title.length % 3) + 0.1;
                  const cpuRandom = Math.abs(Math.sin(Date.now() / 1500)) * 2;
                  const finalCpu = (baseCpu + cpuRandom).toFixed(1);

                  return (
                     <tr 
                      key={w.id} 
                      onClick={() => setSelectedProcess(w.id)}
                      className={cn(
                        "group cursor-default",
                        isSelected ? "bg-white/10" : "hover:bg-white/5"
                      )}
                    >
                      <td className="px-6 py-1.5 focus:outline-none flex items-center">
                        <div className="flex items-center gap-3">
                          <ChevronRight className="w-[14px] h-[14px] text-transparent" />
                          <app.icon className="w-4 h-4 text-white" />
                          <span className="truncate">{app.title}</span>
                          <span className="text-xs text-green-500 font-bold ml-1">{app.title === 'Microsoft Edge' ? '(15)' : ''}</span>
                        </div>
                      </td>
                      <td className="px-2 py-1.5 text-gray-400">
                        {w.isMinimized ? <Leaf className="w-3 h-3 text-green-500/80" title={text.efficiencyMode} /> : null}
                      </td>
                      <td className={cn("px-2 py-1.5 text-right font-medium", isSelected ? "bg-[#322841]" : "bg-[#251e30] border-l border-[#1e1e1e]")}>
                        {finalCpu}%
                      </td>
                      <td className={cn("px-2 py-1.5 text-right font-medium", isSelected ? "bg-[#43315a]" : "bg-[#362a4b] border-l border-[#1e1e1e]")}>
                        {finalMem} MB
                      </td>
                      <td className={cn("px-2 py-1.5 text-right border-l border-transparent")}>
                        0,1 MB/s
                      </td>
                      <td className={cn("px-2 py-1.5 text-right border-l border-transparent")}>
                        0 Mbps
                      </td>
                    </tr>
                  );
                })}

                {/* Processos em segundo plano Section */}
                <tr className="border-t border-transparent">
                  <td colSpan={6} className="px-2 py-0">
                     <button 
                      onClick={() => setBgExpanded(!bgExpanded)}
                      className="flex items-center gap-2 hover:bg-white/5 pl-2 pr-4 py-3 rounded-none w-full text-left mt-2 focus:bg-white/5 transition-colors"
                    >
                      {bgExpanded ? <ChevronDown className="w-[14px] h-[14px] text-gray-300" /> : <ChevronRight className="w-[14px] h-[14px] text-gray-300" />}
                      <span className="font-medium text-gray-200 text-xs tracking-wide">{text.bgSection} ({FAKE_BACKGROUND_PROCESSES.length})</span>
                    </button>
                  </td>
                </tr>
                {bgExpanded && FAKE_BACKGROUND_PROCESSES.map((proc, i) => (
                   <tr 
                    key={i} 
                    className="hover:bg-white/5 group cursor-default"
                   >
                     <td className="px-6 py-1.5">
                       <div className="flex items-center gap-3">
                         <ChevronRight className="w-[14px] h-[14px] text-gray-500 opacity-0 group-hover:opacity-100" />
                         <div className="w-4 h-4 rounded-sm flex items-center justify-center p-0.5">
                           <LayoutGrid className="w-3.5 h-3.5 text-blue-300" />
                         </div>
                         <span className="truncate max-w-[280px] text-gray-300">{proc.name}</span>
                       </div>
                     </td>
                     <td className="px-2 py-1.5 text-gray-400">
                        {proc.suspended && <span className="text-[#c19c00] text-[10px] mx-auto border border-[#c19c00] rounded-sm px-0.5">II</span>}
                     </td>
                     <td className="px-2 py-1.5 text-right text-gray-300 border-l border-transparent">{proc.cpu}</td>
                     <td className="px-2 py-1.5 text-right text-gray-300 border-l border-transparent">{proc.mem}</td>
                     <td className="px-2 py-1.5 text-right text-gray-300 border-l border-transparent">{proc.disk}</td>
                     <td className="px-2 py-1.5 text-right text-gray-300 border-l border-transparent">{proc.net}</td>
                   </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center px-3 py-2.5 mx-2 rounded-[4px] transition-colors relative overflow-hidden group border border-transparent",
        active ? "bg-white/[0.06] border-white/[0.06]" : "hover:bg-white/[0.04]"
      )}
      title={label}
    >
      {active && <div className="absolute left-0 top-[20%] bottom-[20%] w-[3px] bg-[#60cdff] rounded-r-lg" />}
      <div className={cn("shrink-0", active ? "text-white" : "text-gray-300 group-hover:text-white")}>
        {icon}
      </div>
      <span className={cn("ml-3 truncate text-[13px] tracking-wide", active ? "font-medium" : "")}>
        {label}
      </span>
    </button>
  );
}
