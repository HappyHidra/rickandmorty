// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		baseURL: '/rickandmorty/', // baseURL: '/<repository>/'
	},
	target: 'static',
	ssr: false,
	css: ['@/assets/css/style.css'],
	devtools: { enabled: true },
	modules: ['@pinia/nuxt'],
	pinia: {
		autoImports: [
			// automatically imports `defineStore`
			'defineStore', // import { defineStore } from 'pinia'
			['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
		],
	},
});
