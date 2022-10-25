<script lang="ts">
	export let id: string;

	function redirectGamepage() {
		window.location.href = `/game?id=${id}`;
	}
</script>

<div class="card w-64 h-80 bg-base-100 shadow-xl image-full">
	<figure><img class="blur-sm" src="uwu.png" alt="Shoes" /></figure>
	<div class="card-body items-center text-center">
		<h2 class="card-title text-primary-content">UWU</h2>
		<p />
		<div class="card-actions justify-end">
			<button class="btn btn-primary" on:click={redirectGamepage}>Spielen</button>
		</div>
	</div>
</div>
