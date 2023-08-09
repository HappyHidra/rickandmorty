import { defineStore } from 'pinia';
interface Filters {
	name: string;
	status: string;
	gender: string;
}

export const useFiltersStore = defineStore({
	id: 'filter-store',
	state: () => ({
		currentPage: 1,
		filteredPage: 1,
		filtersList: {
			name: '',
			status: '',
			gender: '',
		},
	}),
	getters: {
		getFiltersList: (state) => state.filtersList,
		getPage: (state) => state.currentPage,
		getFilteredPage: (state) => state.filteredPage,
	},
	actions: {
		changeStoredFilters(filters: Filters) {
			this.filtersList.name = filters.name;
			this.filtersList.status = filters.status;
			this.filtersList.gender = filters.gender;
		},
		changeStoredPage(page: number) {
			this.currentPage = page;
		},
		changeStoredFilteredPage(page: number) {
			this.filteredPage = page;
		},
	},
});
