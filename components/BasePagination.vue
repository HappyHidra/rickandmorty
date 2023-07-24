<template>
	<ul class="catalog__pagination pagination">
		<li class="pagination__item">
			<a
				class="pagination__link pagination__link--arrow"
				href="#"
				aria-label="Предыдущая страница"
				:class="{ 'pagination__link--disabled': page <= 1 }"
				@click.prevent="paginate(page - 1)">
				<svg width="8" height="14" fill="#333">
					<use xlink:href="#icon-arrow-left"></use>
				</svg>
			</a>
		</li>
		<li class="pagination__item" v-for="(pageNumber, index) in pageCount" :key="pageNumber">
			<a v-if="index < 10" href="#" class="pagination__link" :class="{ 'pagination__link--current': page + index === page }" @click.prevent="paginate(page + index)">
				{{ page + index < pageCount ? page + index : page }}
			</a>
		</li>
		<li class="pagination__item">
			<a
				class="pagination__link pagination__link--arrow"
				href="#"
				aria-label="Следующая страница"
				:class="{ 'pagination__link--disabled': page >= pageCount }"
				@click.prevent="paginate(page + 1)">
				<svg width="8" height="14" fill="#333">
					<use xlink:href="#icon-arrow-right"></use>
				</svg>
			</a>
		</li>
	</ul>
</template>

<script setup lang="ts">
	import { computed } from 'vue';

	interface Props {
		page: number;
		pageCount: number;
		elemCount: number;
		perPage: number;
	}

	const props = defineProps<Props>();

	const emit = defineEmits(['pageChanged']);

	const page = computed(() => {
		return props.page;
	});

	const pages = computed(() => {
		if (props.page + 10 <= props.pageCount) {
			return props.page + 10;
		} else return props.page;
	});

	const paginate = (page: number) => {
		if (page >= 1 && page <= props.pageCount) {
			emit('pageChanged', page);
		} else return;
	};
</script>
