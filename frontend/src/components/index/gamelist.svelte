<script lang="ts">
	import type { GameData } from "src/utils/types";
	import Item from "./item.svelte";

	export let games: GameData[];
</script>

<div class="mx-6 my-4 flex flex-wrap gap-3">
	{#each games as game (game.id)}
		<Item {game} />
	{/each}
</div>
