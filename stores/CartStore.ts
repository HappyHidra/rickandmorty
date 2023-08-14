import { defineStore } from 'pinia';

// ref()s become state properties
// computed()s become getters
// function()s become actions

export const useCartStore = defineStore('cart-store', () => {
	const teamList: string[] = reactive([]);

	const count = computed(() => teamList.length);

	function addToTeam(member: string) {
		teamList.push(member);
	}

	function removeFromTeam(member: string) {
		const removeIndex = teamList.findIndex((pers) => member == pers);
		teamList.splice(removeIndex, 1);
	}

	return { count, teamList, addToTeam, removeFromTeam };
});
