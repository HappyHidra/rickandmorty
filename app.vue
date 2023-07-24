import { NuxtLayout } from './.nuxt/components';
<template>
	<div class="container">
		<TheHeader />
		<NuxtPage />
	</div>
	<TheFooter />
</template>

<script setup lang="ts">
	const route = useRoute();

	console.log(route);
</script>
