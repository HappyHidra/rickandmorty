<template>
	<main class="content container">
		<div v-if="itemLoading" class="loader">
			<img src="@/assets/loader.gif" alt="" />
		</div>
		<div v-if="error" class="error-loader">
			<div class="catalog__title">{{ error }}</div>
			<NuxtLink to="/" class="breadcrumbs__link"> На главную </NuxtLink>
		</div>
		<div v-if="!itemLoading && !error" class="content__top">
			<ul class="breadcrumbs">
				<li class="breadcrumbs__item">
					<NuxtLink to="/" class="breadcrumbs__link"> Каталог </NuxtLink>
				</li>
				<li class="breadcrumbs__item">
					<NuxtLink to="/" class="breadcrumbs__link"> {{ data?.species }} </NuxtLink>
				</li>
				<li class="breadcrumbs__item">
					<NuxtLink to="" class="breadcrumbs__link"> {{ data?.name }} </NuxtLink>
				</li>
			</ul>
		</div>
		<section v-if="!itemLoading && !error" class="item">
			<div class="item__pics pics">
				<div class="pics__wrapper">
					<img width="570" height="570" :src="data?.image" :srcset="data?.image" alt="Персонаж" />
				</div>
			</div>

			<div class="item__info">
				<span class="item__code">Артикул: 150030</span>
				<h2 class="item__title">{{ data?.name }} - {{ data?.status }}</h2>
				<h2 class="item__title">Раса: {{ data?.species }} Пол: {{ data?.gender }}</h2>
			</div>

			<!-- <div class="item__desc">
				<ul class="tabs">
					<li class="tabs__item">
						<a class="tabs__link tabs__link--current"> Информация о товаре </a>
					</li>
					<li class="tabs__item">
						<a class="tabs__link" href="#"> Доставка и возврат </a>
					</li>
				</ul>
			</div> -->
		</section>
	</main>
</template>

<script setup lang="ts">
	import type { Ref } from 'vue';

	const route = useRoute();

	type Data = { species: string; name: string; gender: string; image: string; status: string };

	interface Item {
		error: Object;
		data: Data;
	}

	const itemLoading = ref(false);
	const data: Ref<null | Data> = ref(null);

	const error: Ref<null | Object> = ref(null);

	const loadItem = async () => {
		itemLoading.value = true;
		await useItem(route.params.id).then((resp: Item) => {
			if (resp.error) {
				error.value = resp.error;
				itemLoading.value = false;
			} else {
				data.value = resp;
				itemLoading.value = false;
				error.value = null;
			}
		});
	};

	// created
	loadItem();
</script>
