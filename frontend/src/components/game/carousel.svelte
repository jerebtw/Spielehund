<script lang="ts">
	import Slide from "./slide.svelte";

	export let slides: { id: number; src: string }[] = [
		{ id: 1, src: "https://placeimg.com/800/400/arch" }
	];
</script>

<div class="carousel w-full">
	{#each slides as slide (slide.id)}
		<Slide id={`slide-${slide.id}`} src={slide.src} />
	{/each}
</div>
