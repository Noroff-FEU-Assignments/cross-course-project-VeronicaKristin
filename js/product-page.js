document.addEventListener("DOMContentLoaded", async () => {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get("id");
	const gameName = document.getElementById("game-title");
	const gameDetails = document.getElementById("game-details");

	if (!id) {
		gameName.innerHTML = "Game/Product ID not provided";
		return;
	}

	let results;
	let response;
	try {
		response = await fetch(`https://www.fadnes.me/wp-json/wc/store/products/${id}`);
		results = await response.json();
	} catch (e) {
		gameName.innerHTML = "Game/Product does not exist";
		return;
	}

	if (response.status && response.status !== 200) {
		gameName.innerHTML = "Game/Product does not exist";
		return;
	}

	gameName.innerHTML = results.name;

	const gameImage = document.getElementById("game-image");
	gameImage.src = results.images[0].src;
	gameImage.alt = `${results.name} Game Image`;

	const gameText = document.getElementById("game-text");
	gameText.innerHTML = results.description;
	gameDetails.className = "elden-ring";
});
