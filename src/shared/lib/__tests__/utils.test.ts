/**
 * shared/lib/__tests__/utils.test.ts
 * Portfolio OS module with a specific architectural responsibility.
 */
import { cn } from '@/shared/lib/utils';

describe('cn', () => {
  it('combina classes utilitárias com segurança', () => {
    expect(cn('px-2 py-1', 'bg-blue-500')).toContain('px-2');
    expect(cn('px-2 py-1', 'bg-blue-500')).toContain('bg-blue-500');
  });

  it('resolve conflitos de classes do Tailwind mantendo a última ocorrência', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
    expect(cn('text-sm', false && 'text-lg', 'text-xl')).toBe('text-xl');
  });
});
