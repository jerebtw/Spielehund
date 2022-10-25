<script lang="ts">
	export let id: string;
	export let src: string;
</script>

<div {id} class="carousel-item relative w-full">
	<img alt="slide" {src} class="w-full" />
	<div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
		<a href="#slide4" class="btn btn-circle">❮</a>
		<a href="#slide2" class="btn btn-circle">❯</a>
	</div>
</div>
