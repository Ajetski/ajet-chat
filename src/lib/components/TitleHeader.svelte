<script lang="ts">
	export let username: string | undefined = undefined;
	export let pfp: string | undefined = undefined;

	let isDropdownOpen = false;
	const handleDropdownClick = () => {
		isDropdownOpen = !isDropdownOpen;
	};
	const handleWindowClick = (e: MouseEvent) => {
		const clickedElement = e.target as HTMLElement;
		if (!clickedElement.classList.contains('dropbtn')) {
			isDropdownOpen = false;
		}
	};
</script>

<svelte:window on:click={handleWindowClick} />
<main>
	<div class="header">
		<div class="flex-container">
			AJET-CHAT
			{#if username && pfp}
				<div class="flex-activity" />
				<div class="flex-item">
					<div class="settings-button">
						<button
							on:click={handleDropdownClick}
							type="button"
							class="dropbtn">
							{username}
						</button>
						<div class="dropdown-menu" class:show={isDropdownOpen}>
							<a class="dropdown-item" href="https://google./com">User Settings</a>
						</div>
					</div>
				</div>

				<div class="flex-item">
					<img src={pfp} alt="pfp" height="32x" />
				</div>
			{/if}
		</div>
	</div>
</main>

<style>
	main {
		height: 100%;
	}
	.header {
		display: block;
		background-color: black;
		height: 100%;
	}
	.dropbtn,
	.flex-container {
		color: var(--light-gray);
		font-weight: 900;
		font-size: 26px;

		display: flex;
		flex-direction: row;

		padding: 8px 30px 0px 30px;
	}
	.flex-activity {
		display: inline-block;
		margin: auto 0px auto auto;
		height: 16px;
		width: 4px;
		border-radius: 50%;
		background-color: var(--green-activity);
	}
	.flex-activity,
	.flex-item {
		padding-left: 12px;
	}
	img {
		border-radius: 50%;
	}
	.dropbtn {
		background-color: unset;

		border: none;
		cursor: pointer;
	}
	.settings-button {
		position: relative;
		display: inline-block;
	}
	.dropdown-menu {
		display: none;
		position: absolute;
		background-color: #f1f1f1;
		min-width: 160px;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
		z-index: 1;
	}
	.show {
		display: block;
	}
	.dropdown-item {
		color: black;
		padding: 12px 16px;
		text-decoration: none;
		display: block;
	}
</style>
