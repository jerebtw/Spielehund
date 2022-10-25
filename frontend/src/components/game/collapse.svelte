<script lang="ts">
	export let title: string;
	export let description: string;
</script>

<div class="collapse min-w-[300px]">
	<input type="checkbox" class="peer" />
	<div
		class="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
		{title}
	</div>
	<div
		class="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
		<p>{description}</p>
	</div>
</div>
