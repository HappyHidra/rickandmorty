import { defineStore } from 'pinia';

// ref()s become state properties
// computed()s become getters
// function()s become actions

export const useCartStore = defineStore('cart-store', () => {
	const teamList = reactive([]);

	const count = computed(() => teamList.length);

	function addToTeam(member: string) {
		teamList.push(member);
	}

	return { count, teamList, addToTeam };
});
