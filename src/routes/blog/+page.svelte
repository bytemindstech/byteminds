<script>
	export let data;
</script>
<br>
<div class="container-fluid">
	<img src="/blogicon.png" alt="" height="60">
<br>
<br>
<ul>
	{#each data.summaries as { slug, title }}
		<li><a href="/blog/{slug}">{title}</a></li>
	{/each}
</ul>

</div>
<style>
	.container {
		background-color: whitesmoke;
	}
	ul li {
		font-weight: 400;
	}
</style>