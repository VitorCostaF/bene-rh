"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { analyticsLocation, trackEvent } from "../lib/analytics";

function textOf(element: HTMLElement) {
  return (element.getAttribute("aria-label") || element.textContent || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
}

function articleSlug(pathname: string) {
  return pathname.match(/^\/(?:en\/)?blog\/([^/]+)/)?.[1];
}

export function AnalyticsTracker() {
  const pathname = usePathname() || "/";

  useEffect(() => {
    const plan = pathname.match(/^\/(?:en\/plans|planos)\/([^/]+)/)?.[1];
    if (plan) {
      trackEvent("plan_view", {
        plan_name: plan,
        page_path: pathname,
        language: pathname.startsWith("/en") ? "en" : "pt",
      });
    }

    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const href = link.href;
      const url = new URL(href, window.location.href);
      const common = {
        page_path: window.location.pathname,
        cta_text: textOf(link),
        cta_location: analyticsLocation(link),
        link_url: href,
        language: window.location.pathname.startsWith("/en") ? "en" : "pt",
      };
      const explicitInterest = link.dataset.analyticsInterest;

      if (explicitInterest) {
        trackEvent("service_interest", {
          ...common,
          interest_type: explicitInterest,
        });
      }
      if (/^(wa\.me|api\.whatsapp\.com)$/i.test(url.hostname)) {
        trackEvent("whatsapp_click", common);
        return;
      }
      if (
        url.hostname.includes("calendly.com") ||
        /^\/(?:en\/schedule|agendar)\/?$/.test(url.pathname)
      ) {
        trackEvent("schedule_click", common);
        return;
      }
      const planMatch = url.pathname.match(/^\/(?:en\/plans|planos)\/([^/]+)/);
      if (planMatch) {
        trackEvent("plan_select", { ...common, plan_name: planMatch[1] });
        return;
      }
      const articleMatch = url.pathname.match(/^\/(?:en\/)?blog\/([^/]+)/);
      if (articleMatch) {
        trackEvent("article_select", {
          ...common,
          article_slug: articleMatch[1],
        });
        return;
      }
      if (link.hreflang || link.classList.contains("languageButton")) {
        trackEvent("language_change", {
          ...common,
          from_language: window.location.pathname.startsWith("/en") ? "en" : "pt",
          to_language: window.location.pathname.startsWith("/en") ? "pt" : "en",
        });
        return;
      }
      if (url.hostname !== window.location.hostname) {
        trackEvent("outbound_click", common);
      }
    };

    const onToggle = (event: Event) => {
      const details = event.target as HTMLDetailsElement;
      if (!details?.open || !details.matches("details")) return;
      const summary = details.querySelector("summary");
      if (!summary) return;
      trackEvent("faq_open", {
        question: textOf(summary),
        page_path: window.location.pathname,
        faq_location: analyticsLocation(details),
      });
    };

    let articleReadSent = false;
    const slug = articleSlug(pathname);
    const onScroll = () => {
      if (!slug || articleReadSent) return;
      const available = document.documentElement.scrollHeight - window.innerHeight;
      if (available <= 0 || window.scrollY / available < 0.75) return;
      articleReadSent = true;
      trackEvent("article_read", {
        article_slug: slug,
        read_percent: 75,
        page_path: pathname,
      });
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("toggle", onToggle, true);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("toggle", onToggle, true);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return null;
}

