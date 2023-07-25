<template>
	<main class="content container">
		<div class="content__top">
			<div class="content__row">
				<h1 class="content__title">Каталог</h1>
				<span class="content__info"> {{ info ? info.count : 0 }} персонажа </span>
			</div>
		</div>

		<paginate
			v-model="page"
			:page-count="countPage"
			:click-handler="changePage"
			:prev-text="`Назад`"
			:next-text="'Вперед'"
			:container-class="'catalog__pagination pagination'"
			:page-link-class="'pagination__link'"
			:page-class="'pagination__item'"
			:active-class="'pagination__link--current'"
			:disabled-class="'pagination__link--disabled'">
		</paginate>

		<div v-if="productsLoading" class="loader">
			<img src="@/assets/loader.gif" alt="" />
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
	import { useItems } from '../.nuxt/composables/useItems';
	import paginate from 'vuejs-paginate-next';

	// For NUXT Router
	const route = useRoute();
	const router = useRouter();
	// For pagination
	const page = ref(1);
	const productsPerPage = ref(20);

	let items = ref();

	const productsLoading = ref(false);

	const loadItems = async (page: number) => {
		productsLoading.value = true;
		await useItems(page).then((resp) => {
			items.value = resp;
			productsLoading.value = false;
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
		const currentPage = route.params.id ? route.params.id : 1;
		// console.log('route.params', route.params);
		// route.params.id = newPage;
		router.push({ query: { page: page.value } });
		page.value = newPage;
		loadItems(newPage);
		// items.value = await useItems(newPage);
		// console.log('CurrentPage:', currentPage);
	};

	// Watcher on router path changed
	watch(
		() => route.params,
		async (newId) => {
			console.log('Page Changed', newId);
			page.value = route.query.page;
			loadItems(route.query.page);
		}
	);

	// Onload
	if (route.query.page) {
		loadItems(route.query.page);
	} else {
		loadItems(1);
	}
</script>
