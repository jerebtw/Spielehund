<script lang="ts">
	import { P } from "flowbite-svelte";
	import Button from "flowbite-svelte/buttons/Button.svelte";
	import Navbar from "src/components/util/navbar.svelte";

    function redirectGame(){

    }

</script>


<Navbar />
<div class="flex flex-col items-center text-center gap-2 w-screen buttons">
	<P size="4xl">Schwierigkeit</P>
	<Button color="light" href="Singleplayer/Game?diff=leicht">Leicht</Button>
	<Button color="light" href="Singleplayer/Game?diff=mittel">Mittel</Button>
	<Button color="light" href="Singleplayer/Game?diff=schwer">Schwer</Button>
	<Button color="light" href="Singleplayer/Game?diff=extrem">Extrem</Button>
</div>