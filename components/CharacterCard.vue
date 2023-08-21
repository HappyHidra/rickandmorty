<template>
	<article class="character-card">
		<div class="character-card__ImageWrapper">
			<img width="570" height="570" :src="data?.image" :srcset="data?.image" alt="Персонаж" />
		</div>
		<div class="character-card__ContentWrapper">
			<h1 class="card__title">{{ props.data?.name }}</h1>
			<ul class="character-cards list-reset">
				<li class="cards-item">
					<p class="cards-item__title">Статус:</p>

					<p class="cards-item__descr">
						<span class="card__status">
							<svg height="40" width="40">
								<circle cx="20" cy="20" r="20" :fill="status" />
							</svg>
						</span>
						<p class="card__status">{{ props.data?.status }}</p>
					</p>
				</li>
				<li class="cards-item">
					<p class="cards-item__title">Раса:</p>
					<p class="cards-item__descr">{{ props.data?.species }}</p>
				</li>
				<li class="cards-item">
					<p class="cards-item__title">Пол:</p>
					<p class="cards-item__descr">{{ props.data?.gender }}</p>
				</li>
				<li class="cards-item">
					<p class="cards-item__title">В первый раз замечен:</p>
					<p class="cards-item__descr">{{ props.data?.location.name }}</p>
				</li>
				<!-- <input @input="emits('update:text', ($event.target as HTMLInputElement).value)" :value="text" /> -->
			</ul>
			<button v-if="!existInTeam" @click="addMember" class="button button--primary">Добавить в команду</button>
			<button v-else @click="removeMember" class="button button--primary">Убрать из команды</button>
		</div>
		<div class="error-loader">
		<NuxtLink to="/" class="button button--primary mainpage__link"> На главную </NuxtLink>
	</div>
	</article>

</template>

<script setup lang="ts">
	import { Data } from '@/types/data';
	import { useCartStore } from '@/stores/CartStore';

	interface Props {
		data: Data
	}

	const props = defineProps<Props>();

	const { addToTeam, removeFromTeam, teamList } = useCartStore();

	const status = computed(() => {
		return props.data?.status === 'Alive' ? 'green' : 'red';
	});

	// const emits = defineEmits<{
	// 	(event: 'update:text', payload: string): void;
	// }>();

	const removeMember = () => {
		removeFromTeam(props.data?.name);
	};


	const addMember = () => {
		addToTeam(props.data?.name);
	};

	const existInTeam = computed(() => {
		return teamList.findIndex((pers) => props.data?.name == pers) !== -1;
	});
</script>
