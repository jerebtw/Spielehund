<script>
	import Navbar from "src/components/util/navbar.svelte";

	function redirectBack() {
		history.back();
	}
	function redirectToStart() {
		window.location.href = "/Cheese/Game";
	}
	function redirectToSettings() {
		window.location.href = "/Cheese/Settings";
	}
</script>

<svelte:head>
	<title>Cheese | Spielehund</title>
</svelte:head>

<Navbar />
<div class="flex flex-col items-center text-center">
	<span class="text-3xl my-10">Hauptmenü</span>
	<button class="btn btn-primary mb-10 min-w-[400px]" on:click={redirectToStart}> Starten </button>
	<button class="btn btn-primary mb-10 min-w-[400px]" on:click={redirectToSettings}>
		Einstellungen
	</button>
	<button class="btn btn-primary mb-10 min-w-[400px]" on:click={redirectBack}> Beenden </button>
</div>
