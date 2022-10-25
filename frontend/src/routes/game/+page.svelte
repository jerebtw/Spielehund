<script lang="ts">
	import Navbar from "../../components/util/navbar.svelte";
	import Carousel from "../../components/game/carousel.svelte";
	import Collapse from "../../components/game/collapse.svelte";

	export let id: string;
	export let game: string = "UWU";

	function redirectGamepage() {
		window.location.href = `/game?id=${id}`;
	}
</script>

<svelte:head>
	<title>Spielehund</title>
</svelte:head>

<Navbar />

<div class="flex flex-col">
	<span class="text-center font-bold text-6xl my-10">{game}</span>

	<div class="flex mx-32">
		<Carousel />

		<div class="flex flex-col items-center ml-20">
			<button class="btn btn-primary mb-10 min-w-[200px]" on:click={redirectGamepage}>
				Spielen
			</button>
			<Collapse title="Spielbeschreibung:" description="" />
		</div>
	</div>
</div>
