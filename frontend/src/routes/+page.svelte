<script lang="ts">
	import Navbar from "src/components/util/navbar.svelte";
	import Categories from "src/components/index/categories.svelte";
	import GamesList from "src/components/index/gamelist.svelte";
	import Loading from "src/components/util/loading.svelte";
	import ServerError from "src/components/util/serverError.svelte";
	import { socket } from "src/utils/stores";
	import type { GameData } from "src/utils/types";

	let games: GameData[] = [];
	let error = false;
	let loading = true;

	$socket?.emit("games", (result: boolean, data?: GameData[]) => {
		loading = false;

		if (!result || !data) {
			error = true;
			return;
		}

		games = data;
	});
</script>

<svelte:head>
	<title>Spielehund</title>
</svelte:head>

<Navbar />

{#if loading}
	<Loading />
{:else if error}
	<ServerError />
{:else}
	<Categories />
	<GamesList {games} />
{/if}
