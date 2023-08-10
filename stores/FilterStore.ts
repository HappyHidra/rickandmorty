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
			location: '',
		},
		filterLocation: {
			location: '',
		},
	}),
	getters: {
		getFiltersList: (state) => state.filtersList,
		getPage: (state) => state.currentPage,
		getFilteredPage: (state) => state.filteredPage,
		getLocationFilter: (state) => state.filterLocation.location,
	},
	actions: {
		changeStoredFilters(filters: Filters) {
			this.filtersList.name = filters.name;
			this.filtersList.status = filters.status;
			this.filtersList.gender = filters.gender;
		},
		changeLocationFilter(location: string) {
			this.filterLocation.location = location;
		},
		changeStoredPage(page: number) {
			this.currentPage = page;
		},
		changeStoredFilteredPage(page: number) {
			this.filteredPage = page;
		},
	},
});
