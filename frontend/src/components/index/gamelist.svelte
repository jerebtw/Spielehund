<script lang="ts">
	import Item from "../util/games/item.svelte";

	export let games: { id: string; name: string }[] = [
		{ id: "1", name: "UwU" },
		{ id: "2", name: "Cheese" }
	];
</script>

<div class="mx-6 my-4 grid grid-cols-6 gap-6">
	{#each games as game (game.id)}
		<Item {game} />
	{/each}
</div>
