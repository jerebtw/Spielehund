<script>
	import { Button, P } from "flowbite-svelte";
	import Navbar from "src/components/util/navbar.svelte";

	function redirectBack() {
		history.back();
	}
</script>

<svelte:head>
	<title>UwU | Spielehund</title>
</svelte:head>

<Navbar />
<div class="flex flex-col items-center text-center gap-2 w-screen buttons">
	<P size="4xl">Hauptmenü</P>
	<Button color="light" href="/UwU/Game">Starten</Button>
	<Button color="light" href="/UwU/Settings">Einstellungen</Button>
	<Button on:click={redirectBack}>Beenden</Button>
</div>
