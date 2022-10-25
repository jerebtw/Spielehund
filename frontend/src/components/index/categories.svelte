<script>
	import Badge from './badge.svelte';

	//TODO: get from backend
	let categories = [
		'Action',
		'Adventure',
		'Arcade',
		'Board',
		'Card',
		'Casino',
		'Educational',
		'Family',
		'Music',
		'Puzzle',
		'Racing',
		'Role Playing',
		'Simulation',
		'Sports',
		'Strategy',
		'Trivia',
		'Word'
	];
</script>


<div class="flex m-2 space-x-2  whitespace-nowrap overflow-auto ">
	{#each categories as category}
		<Badge name={category} />
	{/each}
</div>