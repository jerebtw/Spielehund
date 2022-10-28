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
<div class="flex flex-col items-center text-center gap-4 w-screen">
	<P size="4xl">Hauptmenü</P>
	<Button href="/Cheese/Game">Starten</Button>
	<Button href="/Cheese/Settings">Einstellungen</Button>
	<Button on:click={redirectBack}>Beenden</Button>
</div>
