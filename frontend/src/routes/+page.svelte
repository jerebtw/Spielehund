<script lang="ts">
	import Navbar from "src/components/util/navbar.svelte";
	import Categories from "src/components/index/categories.svelte";
	import GamesList from "src/components/index/gamelist.svelte";
	import Loading from "src/components/util/loading.svelte";
	import ServerError from "src/components/util/serverError.svelte";
	import type { GameData } from "src/utils/types";
	import { pb } from "src/utils/pocketbase";
	import { onMount } from "svelte";

	async function getGames() {
		const games = await pb.collection("games").getFullList<GameData>(undefined, {
      sort: 'created',
    });
		console.log(games);
		return games;
	}

	let loading = true;
	let error = false;
	let games: GameData[] = [];
	onMount(async () => {
		try {
			games = await getGames();
			loading = false;
		} catch (e) {
			console.error(e);
			error = true;
		}
	})
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
