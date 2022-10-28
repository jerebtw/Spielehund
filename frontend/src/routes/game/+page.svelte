<script lang="ts">
	import Navbar from "src/components/util/navbar.svelte";
	import Icon404 from "src/components/util/icon/Icon404.svelte";
	import Loading from "src/components/util/loading.svelte";
	import { page } from "$app/stores";
	import { socket } from "src/utils/stores";
	import type { GameData } from "src/utils/types";
	import { Alert, Button, Carousel, CarouselTransition } from "flowbite-svelte";

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
</script>

<svelte:head>
	<title>{error ? "404" : game?.name || "..."} | Spielehund</title>
</svelte:head>

<Navbar />

{#if loading}
	<Loading />
{:else if error}
	<div class="grid place-items-center m-32">
		<div class="flex flex-col items-center gap-4">
			<Icon404 width={200} height={200} />
			<Alert color="red">
				<span slot="icon"><Icon404 currentColor /></span>
				<span class="text-lg font-medium">Dieses Spiel existiert nicht!</span>
			</Alert>
			<Button color="red" href="/">Zurück</Button>
		</div>
	</div>
{:else}
	<div class="flex flex-col">
		<span class="text-center font-bold text-6xl my-10 text-primary-content dark:text-white">
			{game?.name}
		</span>

		<div class="mx-2 lg:mx-16 lg:flex lg:justify-center">
			<div class="min-w-[480px] max-w-[720px] hidden lg:block">
				<Carousel
					images={[
						{ id: 0, imgurl: game?.imageSrc },
						{ id: 1, imgurl: game?.imageSrc }
					]}
					showThumbs={false}
					showCaptions={false}
					loop
					duration={3000} />
			</div>
			<div class="flex flex-col items-center dark:text-white mx-20 lg:mx-10 lg:max-w-[400px]">
				<Button href="/{game?.name}" size="xl">Spielen</Button>

				<br />

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
