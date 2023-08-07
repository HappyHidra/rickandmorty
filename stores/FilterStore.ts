import { defineStore } from 'pinia';

interface Filters {
	name: string;
	status: string;
}

export const useFiltersStore = defineStore({
	id: 'filter-store',
	state: () => {
		return {
			currentPage: 1,
			filteredPage: 1,
			filtersList: {
				name: '',
				status: '',
			},
		};
	},
	actions: {
		changeStoredFilters(filters: object) {
			this.filtersList.name = filters.name;
			this.filtersList.status = filters.status;
		},
		changeStoredPage(page: number) {
			this.currentPage = page;
		},
		changeStoredFilteredPage(page: number) {
			this.filteredPage = page;
		},
	},
	getters: {
		getFiltersList: (state) => state.filtersList,
		getPage: (state) => state.currentPage,
		getFilteredPage: (state) => state.filteredPage,
	},
});
