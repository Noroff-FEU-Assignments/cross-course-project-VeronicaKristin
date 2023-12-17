document.addEventListener("DOMContentLoaded", async () => {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get("id");
	const gameTitle = document.getElementById("game-title");
	const gameDetails = document.getElementById("game-details");

	if (!id) {
		gameTitle.innerHTML = "Game/Product ID not provided";
		return;
	}

	let results;
	try {
		const response = await fetch(`https://api.noroff.dev/api/v1/gamehub/${id}`);
		results = await response.json();
	} catch (e) {
		gameTitle.innerHTML = "Game/Product does not exist";
		return;
	}

	if (results.statusCode && results.statusCode !== 200) {
		gameTitle.innerHTML = "Game/Product does not exist";
		return;
	}

	gameTitle.innerHTML = results.title;

	const gameImage = document.getElementById("game-image");
	gameImage.src = results.image;
	gameImage.alt = `${results.title} Game Image`;

	const gameText = document.getElementById("game-text");
	gameText.innerHTML = results.description;
	gameDetails.className = "elden-ring";
});
