<script lang="ts">
	import Navbar from "src/components/util/navbar.svelte";
	import Categories from "src/components/index/categories.svelte";
	import GamesList from "src/components/index/gamelist.svelte";
	import Loading from "src/components/util/loading.svelte";
	import ServerError from "src/components/util/serverError.svelte";
	import type { GameData } from "src/utils/types";
	import { currentUser, pb } from "src/utils/pocketbase";

	let games: GameData[] = [];
	pb?.collection()
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
