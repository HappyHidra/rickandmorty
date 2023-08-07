import { defineStore } from 'pinia';

// ref()s become state properties
// computed()s become getters
// function()s become actions

export const useCartStore = defineStore('cart-store', () => {
	const count = ref(0);
	const name = ref('Eduardo');
	const doubleCount = computed(() => count.value * 2);
	function increment() {
		count.value++;
	}

	return { count, name, doubleCount, increment };
});
