export type AnalyticsValue = string | number | boolean;

export type AnalyticsPayload = Record<string, AnalyticsValue | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(event: string, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;

  const cleanPayload = Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined),
  );

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...cleanPayload });
}

export function analyticsLocation(element: Element): string {
  const explicit = element.closest<HTMLElement>("[data-analytics-location]")
    ?.dataset.analyticsLocation;
  if (explicit) return explicit;

  const section = element.closest<HTMLElement>("section[id], header, footer, nav");
  if (section?.id) return section.id;
  if (section?.tagName === "HEADER") return "header";
  if (section?.tagName === "FOOTER") return "footer";
  if (section?.tagName === "NAV") return "navigation";
  return "content";
}

