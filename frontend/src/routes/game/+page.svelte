<script lang="ts">
    import Navbar from "../../comps/navbar.svelte";
    import Categories from '../../comps/index/categories.svelte';
    import GamesList from '../../comps/index/games/list.svelte';
	import Carousel from "../../components/game/carousel.svelte";
    import Collaps from "../../components/game/collaps.svelte";

    export let id: string;

    function redirectGamepage() {
		window.location.href = `/game?id=${id}`;
	}

</script>

<svelte:head>
	<title>Spielehund</title>
</svelte:head>

<Navbar />

<Carousel />

<button class="btn btn-primary" on:click={redirectGamepage}>Spielen</button>
<Collaps />

<Categories />
<GamesList />