<template>
	<article class="character-card">
		<div class="character-card__ImageWrapper">
			<img width="570" height="570" :src="data?.image" :srcset="data?.image" alt="Персонаж" />
		</div>
		<div class="character-card__ContentWrapper">
			<h1 class="card__title">{{ props.data?.name }}</h1>
			<span class="card__status">
				<label class="colors__label">
					<span class="colors__value" :style="{ background: status }"></span>
				</label>
				{{ props.data?.status }} - {{ props.data?.species }}
			</span>
			<ul class="character-cards list-reset">
				<li class="cards-item">
					<p class="cards-item__title">В последний раз видели:</p>
					<p class="cards-item__descr">{{ props.data?.location.name }}</p>
				</li>
				<li class="cards-item">
					<p class="cards-item__title">В первый раз замечен:</p>
					<p class="cards-item__descr">{{ props.data?.location.name }}</p>
				</li>
				<input @input="emits('update:text', ($event.target as HTMLInputElement).value)" :value="text" />
			</ul>
		</div>
	</article>
	<div class="error-loader">
		<NuxtLink to="/" class="button button--primary mainpage__link"> На главную </NuxtLink>
	</div>
</template>

<script setup lang="ts">
	import { Data } from '@/types/data';

	interface Props {
		data: Data | null;
		text: string;
	}

	const props = defineProps<Props>();

	const status = computed(() => {
		return props.data?.status === 'Alive' ? 'green' : 'red';
	});

	const emits = defineEmits<{
		(event: 'update:text', payload: string): void;
	}>();
</script>
