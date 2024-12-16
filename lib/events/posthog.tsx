"use client";
import { useUser } from "@/lib/hooks/useUser";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider, usePostHog } from "posthog-js/react";
import { useEffect, useCallback } from "react";
import { EventName, EventProperties } from "./events";

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: "/ingest",
      ui_host: "https://us.posthog.com", // Move to EU servers
      capture_pageview: false,
      capture_pageleave: true,
    });
  }, []);
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

export function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    // Track pageviews
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthog.capture("$pageview", {
        $current_url: url,
      });
    }
  }, [pathname, searchParams, posthog]);

  useEffect(() => {
    // 👉 Check the sign-in status and user info,
    //    and identify the user if they aren't already
    if (isSignedIn && user && !posthog._isIdentified()) {
      // 👉 Identify the user
      posthog.identify(user.id, {
        email: user.email,
        username: user.first_name + " " + user.last_name,
      });
    }

    if (!isSignedIn && posthog._isIdentified()) {
      posthog.reset();
    }
  }, [posthog, user]);

  return null;
}

// ... existing code ...

export const useTrackEvent = () => {
  const posthog = usePostHog();

  const trackEvent = useCallback(
    <T extends EventName>(eventName: T, properties: EventProperties[T]) => {
      posthog.capture(eventName, properties);
    },
    [posthog]
  );

  return trackEvent;
};
