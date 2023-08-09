<template>
	<div class="container">
		<TheHeader />
		<NuxtPage />
	</div>
	<TheFooter />
	<button :class="{ show: isShown }" @click="scrollToTop()" class="toTop_btn" role="button"><span class="text">Наверх</span></button>
</template>

<script setup lang="ts">
	const isShown = ref(false);

	function scrollToTop() {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}

	// To get window object (because of SSR)
	if (process.client) {
		window.addEventListener('scroll', (e) => {
			if (window.scrollY > 300) {
				isShown.value = true;
			} else {
				isShown.value = false;
			}
		});
	}
</script>
