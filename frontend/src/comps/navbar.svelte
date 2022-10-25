<script>
	import Hambuger from './icon/hambuger.svelte';
	import Icon from './icon/icon.svelte';
</script>

<!-- TODO -->
<div class="navbar bg-neutral text-neutral-content">
	<div class="navbar-start">
		<div class="dropdown">
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label tabindex="0" class="btn btn-ghost btn-circle">
				<Hambuger />
			</label>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul
				tabindex="0"
				class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
			>
				<li><a href="/todo">TODO</a></li>
			</ul>
		</div>
	</div>
	<div class="navbar-center">
		<a class="btn btn-ghost normal-case text-3xl font-bold" href="/">
			<Icon/>
			<div class="mx-1"/>
			Spielehund
		</a>
	</div>
	<div class="navbar-end">
		<div class="avatar placeholder">
			<div class="bg-secondary-focus text-secondary-content rounded-full w-10">
				<span class="text-1xl">K</span>
			</div>
		</div>
	</div>
</div>
