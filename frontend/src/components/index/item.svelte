<script lang="ts">
	import { Button, Card } from "flowbite-svelte";
	import type { GameData } from "src/utils/types";
	import { pb } from "src/utils/pocketbase";
	export let game: GameData;
</script>

<div class="max-w-[16rem]">
	<Card href="/game?id={game.id}" img={pb.getFileUrl(game, game.titleImage, {'thumb': ' 0x300'})}>
		<div class="flex flex-col items-center">
			<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				{game.name}
			</h5>
			<Button color="purple" href="/{game.name}">Spielen</Button>
		</div>
	</Card>
</div>
