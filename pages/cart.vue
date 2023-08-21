<template>
	<main class="content container">
		<div class="cart__title">Your own super team:</div>
		<!-- Catalog -->
		<section class="catalog">
			<ul class="cart__list">
				<li v-for="character of teamList" class="cart__item">
					<!-- <NuxtLink :to="'/products/' + character.id" class="catalog__pic">
					<img :src="character.image" :srcset="character.image" alt="Изображение персонажа" />
				</NuxtLink> -->
					<h3 class="catalog__title">
						{{ character }}
					</h3>
				</li>
			</ul>
		</section>
	</main>
</template>

<script setup lang="ts">
	import { useCartStore } from '@/stores/CartStore';
	const { teamList } = useCartStore();
</script>
