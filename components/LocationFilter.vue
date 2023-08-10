<template>
	<!-- <aside class=""> -->
	<span class="content__info"> Или найти по локации: </span>
	<form class="__form form" action="#" method="get" @submit.prevent="submit">
		<!-- Location -->
		<fieldset class="form__block">
			<legend class="form__legend">Локация</legend>
			<label class="form__label form__label--select">
				<select class="form__select" name="category" v-model="currentFilters.location">
					<option v-for="location of locations" :value="location.id">{{ location.name }}</option>
				</select>
			</label>
		</fieldset>
		<div class="btn__wrapper">
			<button class="__submit button button--primary" type="submit">Применить</button>
			<button class="__reset button button--primary" type="button" @click.prevent="reset">Сбросить</button>
		</div>
	</form>
	<!-- </aside> -->
</template>

<script setup lang="ts">
	import { reactive } from 'vue';
	import { useAllLocations } from '../composables/useItems';

	const currentFilters = reactive({
		location: '',
	});

	const locations = await useAllLocations();

	const emit = defineEmits(['addLocationFilter', 'removeLocationFilter', 'filterByName']);

	const submit = () => {
		emit('addLocationFilter', currentFilters);
	};

	const reset = () => {
		currentFilters.location = '';
		emit('removeLocationFilter');
	};
</script>
