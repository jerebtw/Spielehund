<script lang="ts">
	import Navbar from "src/components/util/navbar.svelte";
	import Carousel from "src/components/game/carousel.svelte";
	import Icon404 from "src/components/util/icon/Icon404.svelte";
	import Loading from "src/components/util/loading.svelte";
	import { page } from "$app/stores";
	import { socket } from "src/utils/stores";
	import type { GameData } from "src/utils/types";

	let id = $page.url.searchParams.get("id");
	let game: GameData | undefined;
	let error = false;
	let loading = true;

	//TODO imageSrc should be a array of strings

	$socket?.emit("game", id, (result: boolean, data?: GameData) => {
		loading = false;
		if (!result || !data) {
			error = true;
			return;
		}

		game = data;
	});

	function redirectToGame() {
		window.location.href = `/${game?.name}`;
	}

	function redirectToHome() {
		window.location.href = "/";
	}
</script>

<svelte:head>
	<title>{name} | Spielehund</title>
</svelte:head>

<Navbar />

{#if loading}
	<Loading />
{:else if error}
	<div class="grid place-items-center m-32">
		<div class="flex flex-col items-center">
			<Icon404 width={200} height={200} />
			<div class="alert alert-error shadow-lg">
				<div>
					<span>Dieses Spiel existiert nicht!</span>
				</div>
				<div class="flex-none">
					<button class="btn btn-sm" on:click={redirectToHome}>Zurück</button>
				</div>
			</div>
		</div>
	</div>
{:else}
	<div class="flex flex-col">
		<span class="text-center font-bold text-6xl my-10 text-primary-content">{game?.name}</span>

		<div class="flex mx-32">
			<Carousel slides={[{ id: 1, src: game?.imageSrc || "" }]} />

			<div class="flex flex-col items-center ml-20 max-w-[400px]">
				<button class="btn btn-primary mb-10 min-w-[200px]" on:click={redirectToGame}>
					Spielen
				</button>
				Spielbeschreibung:
				<br />

				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
				invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
				et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
				Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
				diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
				gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
				amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
				dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
				et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
				amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
				consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto
				odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait
				nulla facilisi. Lorem ipsum dolor sit amet,
			</div>
		</div>
	</div>
{/if}
