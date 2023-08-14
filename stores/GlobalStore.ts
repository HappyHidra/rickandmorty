import { inject, watch } from 'vue';
import { useRoute } from 'vue-router';
import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global-store', () => {
	const route = useRoute();

	let currentRoute = ref(route.query.page);
	// for data that is not yet loaded
	const charactersNames = null as CharInfo | null;

	// watch(
	// 	() => route.params,
	// 	async (newId) => {
	// 		currentRoute.value = newId;
	// 	}
	// );

	return {
		// ...
		charactersNames,
		currentRoute,
	};

	type CharInfo = Array<string>;
});
