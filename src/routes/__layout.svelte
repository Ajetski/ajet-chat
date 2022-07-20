<slot />

<style>
	:global(:root) {
		font-family: proxima-nova;
		color: var(--light-gray);

		--secondary-100: #1b1b23;
		--primary-100: #3e103e;
		--primary-200: #4c284c;
		--light-gray: #c1c1c1;
		--green-activity: #61bc4b;
		--yellow-activity: #f9ff40;
		--red-activity: #ac2929;
	}
	:global(body, html) {
		margin: 0;
		scroll-behavior: smooth;
		height: 100vh;
		background-color: var(--secondary-100);
	}
</style>
