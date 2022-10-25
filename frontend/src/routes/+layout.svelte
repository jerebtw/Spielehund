<script lang="ts">
	import "src/app.css";
	import io, { type Socket } from "socket.io-client";
	import { socket } from "src/utils/stores";
	import { onMount } from "svelte";
	import Loading from "src/components/util/loading.svelte";
	import Navbar from "src/components/util/navbar.svelte";

	let io_socket: Socket | undefined;

	function getIoClient() {
		if (typeof io !== "undefined") {
			return io(`${window.location.hostname}:3000`, {
				withCredentials: true
			});
		}
	}

	async function initSocket() {
		//TODO
		// const auth = await getAuth()
		io_socket = getIoClient();

		socket.set(io_socket);
	}

	onMount(() => {
		initSocket();
	});
</script>

{#if $socket}
	<slot />
{:else}
	<Navbar loading />
	<Loading />
{/if}
