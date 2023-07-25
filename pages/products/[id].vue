<template>
	<main class="content container">
		<div class="content__top">
			<ul class="breadcrumbs">
				<li class="breadcrumbs__item">
					<NuxtLink to="/" class="breadcrumbs__link"> Каталог </NuxtLink>
				</li>
				<li class="breadcrumbs__item">
					<NuxtLink to="/" class="breadcrumbs__link"> {{ data.species }} </NuxtLink>
				</li>
				<li class="breadcrumbs__item">
					<NuxtLink to="" class="breadcrumbs__link"> {{ data.name }} </NuxtLink>
				</li>
			</ul>
		</div>
		<section class="item">
			<div class="item__pics pics">
				<div class="pics__wrapper">
					<img width="570" height="570" :src="data.image" :srcset="data.image" alt="Название товара" />
				</div>
			</div>

			<div class="item__info">
				<span class="item__code">Артикул: 150030</span>
				<h2 class="item__title">{{ data.name }} - {{ data.status }}</h2>
				<h2 class="item__title">Раса: {{ data.species }} Пол: {{ data.gender }}</h2>
			</div>

			<div class="item__desc">
				<ul class="tabs">
					<li class="tabs__item">
						<a class="tabs__link tabs__link--current"> Информация о товаре </a>
					</li>
					<li class="tabs__item">
						<a class="tabs__link" href="#"> Доставка и возврат </a>
					</li>
				</ul>

				<div class="item__content">
					<h3>Состав:</h3>

					<p>
						60% хлопок<br />
						30% полиэстер<br />
					</p>

					<h3>Уход:</h3>

					<p></p>
				</div>
			</div>
		</section>
	</main>
</template>

<script setup lang="ts">
	import { useItem } from '../../.nuxt/composables/useItems';
	const route = useRoute();

	const data = await useItem(route.params.id);
</script>
