class Picture extends Media {

	constructor(data) {
		super(data);

		this._image = data.image;
	}

	getMediaCardDOM(){

		const source = `assets/photographers_pictures/${this._image}`;

		let articleDOM = /* html */ 
		`<article class="media-card">
		<img src="${source}" alt="${this._title}" class="picture">
		<div class="info">
		<span class="title">${this._title}</span>
		<span class="like">${this._likes}</span>  <i class="fa-solid fa-heart fa-2xs like-button" liked-id="${this._id}"></i>
		</div>
		</article>
		`;

		return (articleDOM);
	}
}