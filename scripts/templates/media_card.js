
function mediaCardTemplate(media) {

	const data = media;

	function getMediaCardDOM() {

		let source = "";

		if (data._image) {
			source = `assets/photographers_pictures/${data._image}`;
		} else if (data._video){
			source = `assets/photographers_pictures/${data._video}`;
		}

		console.log(source);

		let articleDOM = /* html */ `<article class="media-card">`;

		if (data._image) {
			articleDOM += /* html */ `<img src="${source}" alt="${data._title}" class="picture">`;
		} else if (data._video) {
			articleDOM += /* html */ `<video class="video" controls><source src="${source}"></video>`;
		}

		articleDOM += /* html */
		`<div class="info">
		<span class="title">${data._title}</span>
		<span class="like">${data._likes}</span>  <i class="fa-solid fa-heart fa-2xs like-button" liked-id="${data._id}"></i>
		</div>
		</article>
		`;

		return (articleDOM);
	}

	return { getMediaCardDOM }
}