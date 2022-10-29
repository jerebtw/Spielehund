<script>
	import { Button, P } from "flowbite-svelte";
	import Navbar from "src/components/util/navbar.svelte";

	function redirectBack() {
		history.back();
	}
</script>

<svelte:head>
	<title>Cheese | Spielehund</title>
</svelte:head>

<Navbar />
<div class="flex flex-col items-center text-center gap-2 w-screen buttons">
	<P size="4xl">Hauptmenü</P>
	<Button color="light" href="/Cheese/Singleplayer">Singleplayer</Button>
	<Button color="light" href="/Cheese/SingleplayerAI">Singleplayer gegen den Computer</Button>
	<Button color="light" href="/Cheese/Multiplayer">Multiplayer</Button>
	<Button color="light" href="/Cheese/Settings">Einstellungen</Button>
	<Button color="red" on:click={redirectBack}>Beenden</Button>
</div>
