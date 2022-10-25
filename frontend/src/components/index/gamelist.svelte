<script lang="ts">
	import Item from "../util/games/item.svelte";

	export let games: { id: string; name: string }[] = [
		{ id: "1", name: "UWU" },
		{ id: "2", name: "Cheese" },
		{ id: "3", name: "Test" },
		{ id: "4", name: "Test" },
		{ id: "5", name: "Test" },
		{ id: "6", name: "Test" },
		{ id: "7", name: "Test" },
		{ id: "8", name: "Test" },
		{ id: "9", name: "Test" },
		{ id: "10", name: "Test" },
		{ id: "11", name: "Test" },
		{ id: "12", name: "Test" },
		{ id: "13", name: "Test" },
		{ id: "14", name: "Test" },
		{ id: "15", name: "Test" },
	];
</script>

<div class="mx-2 my-4 grid grid-cols-6 gap-6">
	{#each games as game (game.id)}
		<Item {game} />
	{/each}
</div>
