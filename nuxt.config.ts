// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		baseURL: '/rickandmorty/', // baseURL: '/<repository>/'
		buildAssetsDir: 'assets', // don't use "_" at the begining of the folder name to avoids nojkill conflict
	},
	target: 'static',
	router: {
		base: '/rickandmorty/',
	},
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
