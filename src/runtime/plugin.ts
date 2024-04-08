import { defineNuxtPlugin, useRuntimeConfig } from "#imports";
import type { ModuleOptions } from "../module";

/**
 * Some environments may pass boolean values as strings. This function
 * will parse the value and return a boolean.
 *
 * @param value - The value to parse
 * @returns - The boolean interpretation of the value
 */
const parseStringOrBoolean = (value: string | boolean | undefined) => {
  if (typeof value === "string") {
    return value === "true";
  }

  return value;
};

/**
 * Add a script tag to the document head asynchronously.
 *
 * @param src - The source URL of the script to load
 * @param crossOrigin - The cross-origin attribute of the script
 * @returns - A promise that resolves when the script has been loaded
 */
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

/**
 * Check if the Matomo tracker has been loaded. This function will
 * poll the window object until the tracker is available or until
 * the timeout has been reached.
 *
 * @param interval - Time in milliseconds to wait between checks
 * @param timeout - Time in milliseconds to wait before throwing an error
 */
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

/**
 * Define the Matomo plugin. This plugin will load the Matomo tracker
 * script and configure the tracker with the provided options.
 */
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
