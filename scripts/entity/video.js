class Video extends Media {
	constructor(data){
		super(data);

		this._video = data.video;
	}

	getMediaCardDOM(){
		const source = `assets/photographers_pictures/${this._video}`;

		let articleDOM = /* html */ 
		`<article class="media-card">
		<video class="video"><source src="${source}"></video>
		<div class="info">
		<span class="title">${this._title}</span>
		<span class="like">${this._likes}</span>  <i class="fa-solid fa-heart fa-2xs like-button" liked-id="${this._id}"></i>
		</div>
		</article>
		`;

		return (articleDOM);
	}
}