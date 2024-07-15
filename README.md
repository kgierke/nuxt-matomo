<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: Nuxt Matomo
- Package name: @kgierke/nuxt-matomo
- Description: My new Nuxt module
-->

# Nuxt Matomo

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt Module for easy Matomo integration.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
  <!-- - [🏀 Online playground](https://stackblitz.com/github/@kgierke/nuxt-matomo?file=playground%2Fapp.vue) -->
  <!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->

- ✅ Simple to use
- ✅ Convenient useMatomo composable
- ✅ Fully typed Matomo Client

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add @kgierke/nuxt-matomo
```

Configure the module to your `nuxt.config.js`:

```js
export default {
  modules: ["@kgierke/nuxt-matomo"],
  matomo: {
    host: "https://your-matomo-instance.com",
    siteId: 1,
  },
};
```

That's it! You can now use Nuxt Matomo in your Nuxt app ✨

## Options

| Option                   | Type                  | Default       | Description                                                                                 |
| ------------------------ | --------------------- | ------------- | ------------------------------------------------------------------------------------------- |
| `host`                   | `string`              | `''`          | The URL of your Matomo instance                                                             |
| `siteId`                 | `number`              | `0`           | The ID of the site you want to track                                                        |
| `enabled`                | `boolean` or `string` | `true`        | Whether the module should be enabled or not                                                 |
| `debug`                  | `boolean` or `string` | `false`       | Whether to enable debug mode                                                                |
| `enableLinkTracking`     | `boolean`             | `true`        | Whether to enable link tracking                                                             |
| `disableCookies`         | `boolean`             | `true`        | Whether to disable cookies. Disabled by default for better GDPR Compliance.                 |
| `enableHeartBeatTimer`   | `boolean`             | `true`        | Whether to enable the heart beat timer                                                      |
| `heartBeatTimerInterval` | `number`              | `15`          | The interval of the heart beat timer in seconds                                             |
| `trackerFileName`        | `string`              | `'matomo.js'` | The name of the tracker file                                                                |
| `crossOrigin`            | `string`              | `''`          | The cross origin configuration for the tracker file                                         |
| `scriptInterval`         | `number`              | `50`          | The interval in milliseconds to wait between loading the Matomo script and the tracker file |
| `scriptTimeout`          | `number`              | `5000`        | The timeout in milliseconds to wait for the Matomo script to load                           |

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@kgierke/nuxt-matomo/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@kgierke/nuxt-matomo
[npm-downloads-src]: https://img.shields.io/npm/dm/@kgierke/nuxt-matomo.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/@kgierke/nuxt-matomo
[license-src]: https://img.shields.io/npm/l/@kgierke/nuxt-matomo.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/@kgierke/nuxt-matomo
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
