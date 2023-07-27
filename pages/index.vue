<template>
	<main class="content container">
		<div class="content__top">
			<div class="content__row">
				<h1 class="content__title">Каталог</h1>
				<span class="content__info"> {{ info ? info.count : 0 }} персонажа </span>
			</div>
		</div>
		<div class="error-loader">
			{{ getFiltersList }}
			<input v-model="inputVal" />
			<button @click="addValueToFilterList(inputVal)">+</button>
		</div>
		<paginate
			v-model="page"
			:page-count="countPage"
			:click-handler="changePage"
			:prev-text="'<-'"
			:next-text="'->'"
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
			<NuxtLink to="/" class="breadcrumbs__link"> На главную </NuxtLink>
		</div>
		<div v-else class="content__catalog">
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

	// For Router
	const route = useRoute();
	const router = useRouter();

	// For store
	const filtersStore = useFiltersStore();
	const { addValueToFilterList } = filtersStore;
	const { getFiltersList } = storeToRefs(filtersStore);
	const inputVal = ref('');
	// For Pagination
	const page = ref(1);
	// const productsPerPage = ref(20);

	// For items
	const error: Ref<null | Object> = ref(null);
	let items = ref();
	const productsLoading = ref(false);

	// type Info = {
	// 	count: number;
	// 	pages: number;
	// };

	interface ItemsResponse {
		info: Object;
		results: Object;
		error: Object;
	}

	// Items loader
	const loadItems = async (page: number) => {
		productsLoading.value = true;

		await useItems(page).then((resp: ItemsResponse) => {
			if (resp.info) {
				error.value = null;
				items.value = resp;
				productsLoading.value = false;
			} else if (resp.error) {
				error.value = resp.error;
				productsLoading.value = false;
			}
		});
	};

	const characters = computed(() => {
		return items.value ? items.value.results : null;
	});

	const info = computed(() => {
		return items.value ? items.value.info : null;
	});

	const countProducts = computed(() => {
		return items.value ? items.value.info.count : 0;
	});

	const countPage = computed(() => {
		return items.value ? items.value.info.pages : 0;
	});

	const changePage = async (newPage: number) => {
		page.value = newPage;
		router.push({ query: { page: page.value } });
	};

	// Watcher on router path changed
	watch(
		() => route.params,
		async (newId) => {
			page.value = Number(route.query.page);
			loadItems(page.value);
		}
	);

	// created
	if (route.query.page) {
		page.value = Number(route.query.page);
		loadItems(Number(route.query.page));
	} else {
		page.value = 1;
		loadItems(1);
	}
</script>
