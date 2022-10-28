<script lang="ts">
	import "chessboard-element";
	import { Chess, type Move, type Square } from "chess.js";
	import type { ChessBoardElement } from "chessboard-element";
	import { onMount } from "svelte";
	import { Button, P } from "flowbite-svelte";

	let board: ChessBoardElement;
	const game = new Chess();

	let gameOver = false;
	let gameDraw = false;
	let gameCheck = "";
	let gameCurrentColor = "White";

	const highlightStyles = document.createElement("style");
	document.head.append(highlightStyles);
	const whiteSquareGrey = "#a9a9a9";
	const blackSquareGrey = "#696969";

	function removeGreySquares() {
		highlightStyles.textContent = "";
	}

	function greySquare(square: string) {
		const highlightColor =
			square.charCodeAt(0) % 2 ^ square.charCodeAt(1) % 2 ? whiteSquareGrey : blackSquareGrey;

		highlightStyles.textContent += `
			chess-board::part(${square}) {
				background-color: ${highlightColor};
				color: white;
			}
		`;
	}

	function onDragStart(e: DragEvent) {
		const { piece } = e.detail as unknown as { piece: string };

		if (game.isGameOver()) {
			e.preventDefault();
			return;
		}

		const turn = game.turn();
		if (
			(turn === "w" && piece.search(/^b/) !== -1) ||
			(turn === "b" && piece.search(/^w/) !== -1)
		) {
			e.preventDefault();
			return;
		}
	}

	function onDrop(e: DragEvent) {
		const { source, target, setAction } = e.detail as unknown as {
			source: string;
			target: string;
			setAction: (action: string) => void;
		};

		console.log(source, target);
		// see if the move is legal
		const move = game.move(`${source}${target}`, { sloppy: true });
		console.log(move);

		// illegal move
		// if (move === null) {
		// 	setAction("snapback");
		// }

		updateStatus();
	}

	function onSnapEnd() {
		board.setPosition(game.fen());
	}

	function updateStatus() {
		let moveColor = "White";
		if (game.turn() === "b") {
			moveColor = "Black";
		}

		console.log(game.isGameOver(), game.isCheck(), game.fen());

		if (game.isGameOver()) {
			gameOver = true;
			console.log(game.history(), game.board(), game.pgn());
		} else if (game.isDraw()) {
			gameOver = true;
			gameDraw = true;
		} else {
			gameCurrentColor = moveColor;

			if (game.isCheck()) {
				gameCheck = moveColor;
			}
		}
	}

	function onMouseoverSquare(e: MouseEvent) {
		const { square } = e.detail as unknown as { square: Square };

		const moves = game.moves({
			square: square,
			verbose: true
		});

		if (moves.length === 0) {
			return;
		}

		greySquare(square);

		for (const move of moves) {
			greySquare((move as Move).to);
		}
	}

	function reset() {
		game.reset();
		game.load("r5nr/pp3p1p/2p5/2P3p1/PPK5/N7/1k2N1PP/R6R w - - 0 30");
		board.setPosition(game.fen());
		removeGreySquares();
		updateStatus();
		gameCurrentColor = "White";
		gameOver = false;
		gameDraw = false;
		gameCheck = "";
	}

	onMount(() => {
		reset();
	});
</script>

<div class="flex flex-col items-center gap-4">
	{#if gameOver}
		{#if gameDraw}
			<P size="3xl">Unentschieden</P>
		{:else}
			<P size="3xl">{gameCheck === "White" ? "Schwarz" : "Weiß"} hat gewonnen!</P>
		{/if}

		<Button on:click={reset}>Zurücksetzen</Button>
	{:else}
		<P size="3xl">
			Der aktuelle Spieler ist: {gameCurrentColor === "White" ? "Weiß" : "Schwarz"}
		</P>
	{/if}

	<chess-board
		bind:this={board}
		on:drag-start={onDragStart}
		on:drop={onDrop}
		on:snap-end={onSnapEnd}
		on:mouseover-square={onMouseoverSquare}
		on:mouseout-square={removeGreySquares}
		draggable-pieces
		style="width: 600px" />
</div>
