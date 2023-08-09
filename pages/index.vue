<template>
	<main class="content container">
		<div class="content__top">
			<div class="content__row">
				<h1 class="content__title">Каталог</h1>
				<span class="content__info"> {{ info ? info.count : 0 }} персонажа </span>
			</div>
		</div>
		<paginate
			v-if="filtersActive"
			:page-count="countPage"
			:click-handler="changeFilteredPage"
			:prev-text="'<-'"
			:next-text="'->'"
			:page-range="7"
			:container-class="'catalog__pagination pagination'"
			:page-link-class="'pagination__link'"
			:page-class="'pagination__item'"
			:active-class="'pagination__link--current'"
			:disabled-class="'pagination__link--disabled'"
			:first-last-button="true">
		</paginate>
		<paginate
			v-if="!filtersActive"
			:page-count="countPage"
			:click-handler="changePage"
			:prev-text="'<-'"
			:next-text="'->'"
			:page-range="7"
			:container-class="'catalog__pagination pagination'"
			:page-link-class="'pagination__link'"
			:page-class="'pagination__item'"
			:active-class="'pagination__link--current'"
			:disabled-class="'pagination__link--disabled'"
			:first-last-button="true">
		</paginate>

		<div v-if="productsLoading" class="loader">
			<img src="@/assets/loader.gif" alt="" />
		</div>
		<div v-if="error" class="error-loader">
			{{ error }}
			<NuxtLink to="/" class="button button--primary mainpage__link"> На главную </NuxtLink>
		</div>
		<div v-else class="content__catalog">
			<!-- Filter -->

			<BaseFilter @load-filtered-characters="addFilters" @clear-filters="removeFilters" />
			<!-- Catalog -->
			<section class="catalog">
				<ul class="catalog__list">
					<li v-for="character of characters" class="catalog__item">
						<NuxtLink :to="'/products/' + character.id" class="catalog__pic">
							<img :src="character.image" :srcset="character.image" alt="Название товара" />
						</NuxtLink>
						<h3 class="catalog__title">
							{{ character.name }}
						</h3>
						<span class="catalog__price"> {{ character.status }} </span>
					</li>
				</ul>
			</section>
		</div>
	</main>
</template>

<script setup lang="ts">
	import paginate from 'vuejs-paginate-next';
	import { useFiltersStore } from '@/stores/FilterStore';
	import { storeToRefs } from 'pinia';
	import type { Ref } from 'vue';
	// import { useGlobalStore } from '../stores/GlobalStore';
	import { Filters } from '@/types/filters';

	//========= For Router
	const route = useRoute();
	const router = useRouter();

	//========= For stores
	// filter store
	const filtersStore = useFiltersStore();
	const { changeStoredFilters, changeStoredPage, changeStoredFilteredPage } = filtersStore;
	const { getFiltersList, getPage, getFilteredPage } = storeToRefs(filtersStore);

	// global store
	// const globalStore = useGlobalStore();
	// let { currentRoute } = globalStore;

	//========= For Pagination
	// const page = ref(1);

	//========= For items
	const error: Ref<null | Object> = ref(null);
	let items = ref();
	const productsLoading = ref(false);

	interface ItemsResponse {
		info: Object;
		results: Object;
		error: Object;
	}

	interface filtersType {
		[key: string]: any;
	}

	// Filters
	const addFilters = (filters: filtersType) => {
		// Добавить в хранилище
		changeStoredFilters({ name: filters.name, status: filters.status, gender: filters.gender });
		changeStoredFilteredPage(1);
		router.push({ query: { name: getFiltersList.value.name, status: getFiltersList.value.status, gender: getFiltersList.value.gender, page: 1 } });
	};

	const removeFilters = () => {
		changeStoredFilters({ name: '', status: '', gender: '' });
		changeStoredFilteredPage(1);
		router.push({ query: { page: getPage.value } });
	};

	// Items loader
	const loadItems = async (query: string) => {
		productsLoading.value = true;
		await useItems(query).then((resp: ItemsResponse) => {
			if (resp.info) {
				error.value = null;
				items.value = resp;
			} else if (resp.error) {
				error.value = resp.error;
			}
			productsLoading.value = false;
		});
	};

	// Computed
	const makeQuery = computed(() => {
		// 	// Развернуть из поисковой строки в строку для запроса
		let query = '?';
		for (const [key, value] of Object.entries(route.query)) {
			query += `&${key}=${value}`;
		}
		return query;
	});

	const filtersActive = computed(() => {
		if (route.query.name || route.query.status) {
			return true;
		}
		return false;
	});

	const characters = computed(() => {
		return items.value ? items.value.results : null;
	});

	const info = computed(() => {
		return items.value ? items.value.info : null;
	});

	const countPage = computed(() => {
		return items.value ? items.value.info.pages : 0;
	});

	// On page changed
	const changePage = (newPage: number) => {
		changeStoredPage(newPage);
		// filtersStore.$patch((state) => {
		// 	state.currentPage = newPage;
		// });
		router.push({ query: { page: getPage.value } });
	};

	const changeFilteredPage = (newPage: number) => {
		changeStoredFilteredPage(newPage);
		router.push({ query: { page: getFilteredPage.value, name: getFiltersList.value.name, status: getFiltersList.value.status } });
	};

	// Watcher on router params changed
	watch(
		() => route.query,
		async (val) => {
			if (filtersActive.value) {
				changeStoredFilteredPage(Number(route.query.page));
			} else changeStoredPage(Number(route.query.page));
			loadItems(makeQuery.value);
		}
	);

	// On component create
	if (route.query.page) {
		changeStoredPage(Number(route.query.page));
		loadItems(makeQuery.value);
	} else {
		changeStoredPage(1);
		loadItems(`?page=${getPage.value}`);
	}
</script>
