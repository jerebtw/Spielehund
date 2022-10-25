<script lang="ts">
	import Navbar from "../../components/util/navbar.svelte";
	import Carousel from "../../components/game/carousel.svelte";

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
	<span class="text-center font-bold text-6xl my-10 text-primary-content">{game}</span>

	<div class="flex mx-32">
		<Carousel />

		<div class="flex flex-col items-center ml-20 max-w-[400px]">
			<button class="btn btn-primary mb-10 min-w-[200px]" on:click={redirectGamepage}>
				Spielen
			</button>
			Spielbeschreibung:
			<br />

			Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
			invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
			justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
			ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
			eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
			et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
			sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
			elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
			diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
			gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure
			dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat
			nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum
			zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,
		</div>
	</div>
</div>
