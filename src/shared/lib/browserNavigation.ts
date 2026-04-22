/**
 * shared/lib/browserNavigation.ts
 * Portfolio OS module with a specific architectural responsibility.
 */

export const PORTFOLIO_BROWSER_URL_KEY = 'os_browser_pending_url';
export const PORTFOLIO_BROWSER_EVENT = 'portfolio:browser:navigate';

export function navigatePortfolioBrowser(url: string) {
  if (!url) return;
  localStorage.setItem(PORTFOLIO_BROWSER_URL_KEY, JSON.stringify(url));
  window.dispatchEvent(
    new CustomEvent(PORTFOLIO_BROWSER_EVENT, {
      detail: { url },
    }),
  );
}

export function consumePendingPortfolioBrowserUrl(): string | null {
  try {
    const raw = localStorage.getItem(PORTFOLIO_BROWSER_URL_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    localStorage.removeItem(PORTFOLIO_BROWSER_URL_KEY);
    return typeof parsed === 'string' ? parsed : null;
  } catch {
    return null;
  }
}
