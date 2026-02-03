import { defineConfig } from 'wxt';
import path from "node:path"

export default defineConfig({
  modules: ['@wxt-dev/module-react'],

  // Source directory
  srcDir: 'src',

  // import alias for src directory
  alias: {
    "@": path.resolve(__dirname, "src")
  },

  // manifest configuration
  manifest: ({ browser, manifestVersion, mode, command }) => ({
    name: "SmartForm Auto Filler",
    short_name: "SmartForm Auto Filler",
    version: '1.0.0',
    manifest_version: manifestVersion,
    description: 'An AI-powered smart form auto filler Chrome extension that enables one-click filling of any form with relevant or random data, powered by AI.',
    permissions: ['storage', 'tabs', 'notifications', 'contextMenus', 'scripting', 'activeTab'],
    author: 'Dhiraj Arya',
    homepage_url: 'https://github.com/dhirajaryaa/smartform',
  }),
});
