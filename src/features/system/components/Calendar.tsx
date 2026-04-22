/**
 * features/system/components/Calendar.tsx
 * Portfolio OS module with a specific architectural responsibility.
 */
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Adjust so Monday is 0, Sunday is 6
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthName = currentDate.toLocaleString('pt-BR', { month: 'long' });
  const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);

  const days = [];
  // Previous month padding
  const prevMonthDays = getDaysInMonth(year, month - 1);
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: prevMonthDays - i, isCurrentMonth: false });
  }
  // Current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, isCurrentMonth: true });
  }
  // Next month padding
  const remainingDays = 42 - days.length; // 6 rows of 7 days
  for (let i = 1; i <= remainingDays; i++) {
    days.push({ day: i, isCurrentMonth: false });
  }

  const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  return (
    <div className="w-80 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-2xl rounded-xl p-4 text-gray-900 dark:text-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{capitalizedMonth} {year}</h2>
        <div className="flex gap-1">
          <button onClick={prevMonth} className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={nextMonth} className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => {
          const isToday = d.isCurrentMonth && 
                          d.day === today.getDate() && 
                          month === today.getMonth() && 
                          year === today.getFullYear();
          
          return (
            <button
              key={i}
              className={cn(
                "h-10 w-full rounded-md flex items-center justify-center text-sm transition-colors",
                d.isCurrentMonth ? "hover:bg-black/5 dark:hover:bg-white/10" : "text-gray-400 dark:text-gray-500 hover:bg-black/5 dark:hover:bg-white/10",
                isToday && "bg-blue-500 text-white hover:bg-blue-600 dark:hover:bg-blue-600 font-bold shadow-sm"
              )}
            >
              {d.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
