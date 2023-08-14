<template>
	<span class="content__info"> Найти персонажа: </span>
	<form class="__form form" action="#" method="get" @submit.prevent="submit">
		<!-- Name -->
		<fieldset class="form__block">
			<legend class="form__legend">Имя</legend>
			<label class="form__label">
				<input @input="inputName" class="form__select" name="category" v-model="currentFilters.name" />
				<ul v-if="status" class="name__helpers">
					<li @click="helperClick(helper)" v-for="helper of helpers" :key="helper">
						{{ helper }}
					</li>
				</ul>
				<div class="animation"></div>
			</label>
		</fieldset>
		<!-- Status -->
		<fieldset class="form__block">
			<legend class="form__legend">Статус</legend>
			<label class="form__label form__label--select">
				<select class="form__select" name="category" v-model="currentFilters.status">
					<option value="alive">Жив</option>
					<option value="dead">Мёртв</option>
					<option value="unknown">Неизвестно</option>
				</select>
			</label>
		</fieldset>
		<!-- Species -->
		<!-- <fieldset class="form__block">
				<legend class="form__legend">Раса</legend>
				<label class="form__label form__label--select">
					<select class="form__select" type="text" name="category" v-model.number="currentCategoryId">
						<option value="0">Все категории</option>
						<option :value="category.id" v-for="category of categories" :key="category.id">
							{{ category.title }}
						</option>
					</select>
				</label>
			</fieldset> -->
		<!-- Gender -->
		<fieldset class="form__block">
			<legend class="form__legend">Пол</legend>
			<label class="form__label form__label--select">
				<select class="form__select" name="category" v-model="currentFilters.gender">
					<option value="male">Мужской</option>
					<option value="female">Женский</option>
					<option value="genderless">Не имеет пола</option>
					<option value="unknown">Неизвестно</option>
				</select>
			</label>
		</fieldset>
		<div class="btn__wrapper">
			<button class="__submit button button--primary" type="submit">Применить</button>
			<button class="__reset button button--primary" type="button" @click.prevent="reset">Сбросить</button>
		</div>
	</form>
</template>

<script setup lang="ts">
	import { ref, reactive } from 'vue';

	const props = defineProps({
		helpers: {
			type: Array<string>,
			required: true,
		},
	});

	const currentFilters = reactive({
		name: '',
		status: '',
		gender: '',
	});

	const status = ref(false);

	watch(
		() => props.helpers,
		() => {
			if (props.helpers.length > 0) {
				status.value = true;
			}
		}
	);

	const inputName = () => {
		emit('filterByName', currentFilters.name);
	};

	const helperClick = (helper: string) => {
		currentFilters.name = helper;
		status.value = false;
	};

	const emit = defineEmits(['loadFilteredCharacters', 'clearFilters', 'filterByName']);

	const submit = () => {
		status.value = false;
		emit('loadFilteredCharacters', currentFilters);
	};

	const reset = () => {
		currentFilters.name = '';
		currentFilters.status = '';
		currentFilters.gender = '';
		emit('clearFilters');
	};
</script>
