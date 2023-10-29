document.addEventListener("DOMContentLoaded", async () => {
	let results;
	const saleList = document.getElementById("on-sale-list");
	const productList = document.getElementById("product-list");

	const handleError = () => {
		const error = Object.assign(document.createElement("h3"), { innerText: "Unable to get games", style: "color: white" });
		saleList.appendChild(error);
		productList.appendChild(error.cloneNode(true));
		productList.removeChild(productList.getElementsByClassName("lds-dual-ring")[0]);
		saleList.removeChild(saleList.getElementsByClassName("lds-dual-ring")[0]);
	};

	try {
		const response = await fetch("https://www.fadnes.me/wp-json/wc/store/products");
		results = await response.json();
	} catch (e) {
		handleError();
		return;
	}

	if (results.statusCode && results.statusCode !== 200) {
		handleError();
		return;
	}

	for (const item of results) {
		const product = Object.assign(document.createElement("div"), { id: item.id, className: "game-item border" });

		product.appendChild(Object.assign(document.createElement("img"), { src: item.images[0].src, className: "all-games_photos", alt: item.name }));

		product.appendChild(
			Object.assign(document.createElement("a"), {
				href: `/products/game.html?id=${item.id}`,
				innerHTML: `$${item.prices.regular_price}`,
				style: "background: white",
			})
		);

		productList.appendChild(product);
	}

	productList.removeChild(productList.getElementsByClassName("lds-dual-ring")[0]);

	const on_sale = results.filter((item) => item.on_sale);
	for (const item of on_sale) {
		const product = Object.assign(document.createElement("div"), { id: item.id, className: "top-seller-item" });

		product.appendChild(Object.assign(document.createElement("img"), { src: item.images[0].src, alt: item.title }));

		product.appendChild(
			Object.assign(document.createElement("a"), {
				href: `/products/game.html?id=${item.id}`,
				innerHTML: `<s>$${item.prices.regular_price}</s> $${item.prices.sale_price}`,
				className: "top-seller-button",
				style: "background: white",
			})
		);

		saleList.appendChild(product);
	}

	saleList.removeChild(saleList.getElementsByClassName("lds-dual-ring")[0]);
});
