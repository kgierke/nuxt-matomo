import { defineNuxtPlugin, useRuntimeConfig } from "#imports";
import type { ModuleOptions } from "../module";

const parseStringOrBoolean = (value: string | boolean | undefined) => {
  if (typeof value === "string") {
    return value === "true";
  }

  return value;
};

const loadScript = (src: string, crossOrigin?: string) => {
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  script.defer = true;

  if (crossOrigin && ["anonymous", "use-credentials"].includes(crossOrigin)) {
    script.crossOrigin = crossOrigin;
  }

  const head = document.head || document.getElementsByTagName("head")[0];
  head.appendChild(script);

  return new Promise((resolve, reject) => {
    script.onload = resolve;
    script.onerror = reject;
  });
};

const waitForMatomo = async (
  interval: number = 50,
  timeout: number = 5000
): Promise<void> => {
  const startTime = Date.now();

  while (!window.Matomo) {
    if (Date.now() >= startTime + timeout) {
      throw new Error("[Matomo] Tracker script has not been loaded");
    }

    await new Promise((resolve) => setTimeout(resolve, interval));
  }
};

export default defineNuxtPlugin(async () => {
  const options = (useRuntimeConfig().public.matomo as ModuleOptions) || {};

  const isDebug = parseStringOrBoolean(options.debug);
  const isEnabled = parseStringOrBoolean(options.enabled);

  if (isDebug) {
    console.log("[Matomo] Plugin has been enabled");
  }

  if ((!options.host || !options.siteId) && isEnabled) {
    console.error(
      "[Matomo] Host or SiteId is not defined. Please provide a host and/or siteId in the module options."
    );
  }

  const trackerScript = `${options.host}/${options.trackerFileName}`;
  const trackerEndpoint = `${options.host}/matomo.php`;
  let crossorigin: "" | "anonymous" | "use-credentials" = "";

  if (
    options.crossOrigin &&
    ["anonymous", "use-credentials"].includes(options.crossOrigin)
  ) {
    crossorigin = options.crossOrigin as "" | "anonymous" | "use-credentials";
  }

  window._paq = window._paq || [];
  window._paq.push(["setTrackerUrl", trackerEndpoint]);
  window._paq.push(["setSiteId", options.siteId]);

  try {
    await loadScript(trackerScript, crossorigin);
    await waitForMatomo(options.scriptInterval, options.scriptTimeout);

    if (isDebug) {
      console.log("[Matomo] Tracker script has been loaded");
    }
  } catch (error) {
    console.error("[Matomo] Error loading tracker script:", error);
  }
});
