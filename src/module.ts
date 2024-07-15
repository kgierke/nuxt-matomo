import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addImports,
} from "@nuxt/kit";
import { defu } from "defu";

// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * Enable or disable the Matomo module
   *
   * @default true
   */
  enabled?: boolean | string;

  /**
   * Enable or disable the debug mode
   *
   * @default false
   */
  debug?: boolean | string;

  /**
   * The URL of the Matomo instance (e.g. https://matomo.example.com)
   *
   * Note: This option is required including the protocol (http/https)!
   */
  host?: string;

  /**
   * The ID of the Matomo site
   *
   * Note: This option is required!
   */
  siteId?: number;

  /**
   * Enable or disable link tracking
   *
   * @default true
   */
  enableLinkTracking?: boolean;

  /**
   * Run Matomo without cookies
   *
   * @default true
   */
  disableCookies?: boolean;

  /**
   * Enable or disable the heart beat timer
   *
   * @default false
   */
  enableHeartBeatTimer?: boolean;

  /**
   * The interval in seconds to send a ping to the Matomo server
   *
   * @default 15
   */
  heartBeatTimerInterval?: number;

  /**
   * The filename of the Matomo tracker script
   *
   * @default "matomo.js"
   */
  trackerFileName?: string;

  /**
   * The cross-origin attribute of the Matomo tracker script
   */
  crossOrigin?: string;

  /**
   * The interval in milliseconds to check if the Matomo tracker script has been loaded
   *
   * @default 50
   */
  scriptInterval?: number;

  /**
   * The timeout in milliseconds to check if the Matomo tracker script has been loaded
   *
   * @default 5000
   */
  scriptTimeout?: number;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "@kgierke/nuxt-matomo",
    configKey: "matomo",
  },
  // Default configuration options of the Nuxt module
  defaults: {
    enabled: true,
    debug: false,
    host: undefined,
    siteId: undefined,
    enableLinkTracking: true,
    disableCookies: true,
    enableHeartBeatTimer: false,
    heartBeatTimerInterval: 15,
    trackerFileName: "matomo.js",
    crossOrigin: undefined,
    scriptInterval: 50,
    scriptTimeout: 5000,
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    /**
     * Add runtime config to the Nuxt instance
     */
    nuxt.options.runtimeConfig.public.matomo = defu(
      nuxt.options.runtimeConfig.public.matomo || {},
      options,
    );

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin({ src: resolver.resolve("./runtime/plugin"), mode: "client" });

    // Add the Matomo Composable
    addImports({
      name: "useMatomo",
      as: "useMatomo",
      from: resolver.resolve("./runtime/composables/useMatomo"),
    });
  },
});
