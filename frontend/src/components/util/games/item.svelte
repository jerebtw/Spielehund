<script lang="ts">
	export let game: { id: string; name: string };

	function redirectGamepage() {
		window.location.href = `/game?id=${game.id}`;
	}
</script>

<div class="card w-64 h-80 bg-base-100 shadow-xl image-full">
	<figure><img class="blur-sm" src="uwu.png" alt="Shoes" /></figure>
	<div class="card-body items-center text-center">
		<h2 class="card-title text-primary-content">{game.name}</h2>
		<p />
		<div class="card-actions justify-end">
			<button class="btn btn-primary" on:click={redirectGamepage}>Spielen</button>
		</div>
	</div>
</div>
