import { inject, watch } from 'vue';
import { useRoute } from 'vue-router';

export const useGlobalStore = defineStore('global-store', () => {
	const route = useRoute();

	let currentRoute = ref(route.query.page);

	// watch(
	// 	() => route.params,
	// 	async (newId) => {
	// 		currentRoute.value = newId;
	// 	}
	// );

	return {
		// ...
		currentRoute,
	};
});
