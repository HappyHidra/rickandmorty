// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	css: ['~/assets/css/style.min.css'],
	// plugins: [{ src: '~/plugins/vuejs-paginate-next', mode: 'client' }],
	modules: ['@pinia/nuxt'],
	pinia: {
		autoImports: [
			// automatically imports `defineStore`
			'defineStore', // import { defineStore } from 'pinia'
			['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
		],
	},
});
