import axios from 'axios';
// create a function to fetch the routes from the API
// const getPostRoutes = () => {
// 	// return the array of routes
// 	let result = [];
// 	for (let i = 1; i < 827; i++) {
// 		result.push(`/products/${i}`);
// 	}
// 	return result;
// };

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		baseURL: '/rickandmorty/', // baseURL: '/<repository>/'
		buildAssetsDir: 'assets', // don't use "_" at the begining of the folder name to avoids nojkill conflict
	},
	// generate: {
	// 	nojekyll: true, //not working on this version
	// },
	ssr: true, //server side rendered enabled //When true
	// hooks: {
	// 	async 'nitro:config'(nitroConfig) {
	// 		// fetch the routes from our function above
	// 		const slugs = getPostRoutes();
	// 		// add the routes to the nitro config
	// 		nitroConfig.prerender.routes.push(...slugs);
	// 	},
	// },
	// target: 'static',
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
