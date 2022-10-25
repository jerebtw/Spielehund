<script lang="ts">
	import "chessboard-element";
	import type { ChessBoardElement } from "chessboard-element";
	import { onMount } from "svelte";

  onMount(check)

	function check() {
		const board: ChessBoardElement = document.querySelector("#board3");
		console.log(board.setPosition("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"));
	}
</script>

<!-- <svelte:options tag="chess-board" /> -->

<chess-board
	id="board3"
	draggable-pieces
	drop-off-board="trash"
	style="width: 400px"
	on:load={check} />