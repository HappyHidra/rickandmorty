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
		{{ smth }}
		<section v-if="!itemLoading && !error">
			<CharacterCard :data="data" v-model:text="smth" />
		</section>
	</main>
</template>

<script setup lang="ts">
	import type { Ref } from 'vue';
	import { Data } from '@/types/data';

	const route = useRoute();

	interface Item {
		error: Object;
		data: Data;
	}

	const itemLoading = ref(false);
	const data: Ref<null | Data> = ref(null);

	const error: Ref<null | Object> = ref(null);

	// v-model test
	const smth = ref('Something here');

	const loadItem = async () => {
		itemLoading.value = true;
		await useItem(Number(route.params.id)).then((resp: Item) => {
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
