<script lang="ts">
	import { Button } from "flowbite-svelte";
	import Chessboard from "src/components/games/cheese/chessboard.svelte";
	import Navbar from "src/components/util/navbar.svelte";
</script>

<Navbar />
<Chessboard />

<div class="flex flex-col items-center">
	<Button color="red" href="/Cheese">Zurück</Button>
</div>
