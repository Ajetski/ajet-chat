<main>
	<div class="spinner">
		<div />
		<div />
		<div />
		<div />
	</div>
</main>

<style>
	.spinner {
		width: 11.2px;
		height: 11.2px;
		animation: spinner-o824ag 1s infinite linear;
		display: flex;
		justify-content: center;
	}

	.spinner div {
		position: absolute;
		width: 100%;
		height: 100%;
		background: #474bff;
		border-radius: 50%;
		animation: spinner-vse6n7 1.25s infinite ease;
	}

	.spinner div:nth-child(1) {
		--rotation: 90;
	}

	.spinner div:nth-child(2) {
		--rotation: 180;
	}

	.spinner div:nth-child(3) {
		--rotation: 270;
	}

	.spinner div:nth-child(4) {
		--rotation: 360;
	}

	@keyframes spinner-vse6n7 {
		0%,
		100% {
			transform: rotate(calc(var(--rotation) * 1deg)) translateY(0);
		}

		50% {
			transform: rotate(calc(var(--rotation) * 1deg)) translateY(300%);
		}
	}

	@keyframes spinner-o824ag {
		to {
			transform: rotate(360deg);
		}
	}
</style>
