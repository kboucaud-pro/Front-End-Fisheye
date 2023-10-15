
function mediaCardTemplate(data) {
	const { id, title, image, likes, date, price} = data;

    const picture = `assets/photographers_pictures/${image}`;

    function getMediaCardDOM() {

        const articleDOM = /* html */ 
        `<article class="picture-card">
		<img src="${picture}" alt="${title}" class="picture">
		<div class="info">
		<span class="title">${title}</span>
		<span class="like">${likes}</span>  <i class="fa-solid fa-heart fa-2xs like-button" liked-id="${id}"></i>
		</div>
		</article>
		`;

        return (articleDOM);
    }

    return { getMediaCardDOM }
}