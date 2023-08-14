<template>
	<div class="title">Your own super team!</div>
	<!-- Catalog -->
	<section class="catalog">
		<ul class="catalog__list">
			<li v-for="character of teamList" class="catalog__item">
				<!-- <NuxtLink :to="'/products/' + character.id" class="catalog__pic">
					<img :src="character.image" :srcset="character.image" alt="Изображение персонажа" />
				</NuxtLink> -->
				<h3 class="catalog__title">
					{{ character }}
				</h3>
				<!-- <span class="catalog__price"> {{ character.status }} </span> -->
			</li>
		</ul>
	</section>
</template>

<script setup lang="ts">
	import { useCartStore } from '@/stores/CartStore';
	const { teamList } = useCartStore();
</script>
