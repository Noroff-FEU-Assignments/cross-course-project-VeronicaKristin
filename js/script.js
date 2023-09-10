async function getData() {
	const response = await fetch("https://api.noroff.dev/api/v1/gamehub");
	const results = await response.json();
	console.log(results);
}

getData();
