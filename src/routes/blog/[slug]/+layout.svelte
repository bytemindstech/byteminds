<script>
	export let data;
</script>
<div class="layout container-fluid">
	<main class="container">
		<br>
		<slot />
	</main>
	<aside>
		<br>
		<h2>More posts</h2>
		<ul>
			{#each data.summaries as { slug, title }}
				<li>
					<a href="/blog/{slug}">{title}</a>
				</li>
			{/each}
		</ul>
	</aside>
</div>

<style>
	@media (min-width: 640px) {
		.layout {
			display: grid;
			gap: 2em;
			grid-template-columns: 1fr 16em;
		}
	}
	.layout{
		background-color: whitesmoke;
	}
</style>
