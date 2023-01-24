<script>
	import Icon from "./icon/icon.svelte";
	import { Navbar, NavBrand, Avatar, Dropdown, DropdownHeader, DropdownItem, DropdownDivider, DarkMode, Spinner, Button } from "flowbite-svelte";
	import { pb, currentUser } from "src/utils/pocketbase"

	export let loading = false;

	async function signOut() {
		pb?.authStore?.clear()
	}

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
		{#if !$currentUser}
			<Button color="purple" href="Login">Login</Button>
			<Button color="purple" href="SignUp">Sign Up</Button>
		{/if}
		{#if $currentUser}
		<Avatar id="user-drop">
				{$currentUser?.username?.slice(0,2) || ""}
		</Avatar>
			<Dropdown triggeredBy="#user-drop">
			  <DropdownHeader>
				<span class="block text-sm">{$currentUser?.username}</span>
				<span class="block truncate text-sm font-medium">{$currentUser?.email}</span>
			  </DropdownHeader>
			  <DropdownItem>Settings</DropdownItem>
			  <DropdownDivider />
			  <DropdownItem on:click={signOut}>Sign out</DropdownItem>
			</Dropdown>
		{/if}
		<DarkMode
			btnClass="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5" />
	</div>
</Navbar>
