import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],

  srcDir: 'src', // Source directory
  imports : false, // Disable the #imports module
  
  manifest : ({browser, manifestVersion, mode, command}) => ({
    name: "Smart Form Auto Filler",
    version: '1.0.0',
    manifest_version: manifestVersion,
    description: 'An AI-powered smart form auto filler Chrome extension that enables one-click filling of any form with relevant or random data, powered by AI.',
    permissions: ['storage', 'tabs','notifications','contextMenus','scripting'],
    author: 'Dhiraj Arya',
  
  }),
});
