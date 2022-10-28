<script>
	import { Badge } from "flowbite-svelte";

	//TODO: get from backend
	let categories = [
		"Action",
		"Adventure",
		"Arcade",
		"Board",
		"Card",
		"Casino",
		"Educational",
		"Family",
		"Music",
		"Puzzle",
		"Racing",
		"Role Playing",
		"Simulation",
		"Sports",
		"Strategy",
		"Trivia",
		"Word"
	];
</script>

<div class="mx-6 my-2 space-x-2 whitespace-nowrap overflow-auto">
	{#each categories as category}
		<Badge color="purple">{category}</Badge>
	{/each}
</div>
