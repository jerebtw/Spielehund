<script>
	import Icon from "./icon/icon.svelte";
	import { Navbar, NavBrand, Avatar, DarkMode, Spinner } from "flowbite-svelte";

	export let loading = false;
</script>

<Navbar>
	<NavBrand href="/">
		<Icon />
		<div class="px-1" />
		<span class="self-center whitespace-nowrap text-xl font-bold dark:text-white">
			Spielehund
		</span>
	</NavBrand>
	<div class="flex gap-2">
		<Avatar>
			{#if loading}
				<Spinner color="gray" />
			{:else}
				TK
			{/if}
		</Avatar>
		<DarkMode
			btnClass="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5" />
	</div>
</Navbar>
