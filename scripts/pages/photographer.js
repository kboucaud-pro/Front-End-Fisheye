//Mettre le code JavaScript lié à la page photographer.html

const urlParameters = new URLSearchParams(window.location.search);

async function getPhotographerById(photographerId) {
	const file = await fetch('data/photographers.json');
	const fileContent = await file.json();

	const photographers = fileContent.photographers;
	const photographer = photographers.find((element) => element.id == photographerId);
	return photographer;
}

async function getPhotographerWork(photographerId) {
	mediaSlideshow = [];
	const file = await fetch('data/photographers.json');
	const fileContent = await file.json();

	const works = fileContent.media;
	let photographerWork = [];
	works.forEach(element => {
		if (element.photographerId == photographerId) {
			element = new mediaFactory(element);
			photographerWork.push(element);
			mediaSlideshow.push({ image: element.image, title: element.title });
		}
	});

	return photographerWork;
}

async function getPhotographerInfo() {
	if (urlParameters.has('photographerId')) {
		const photographerId = urlParameters.get('photographerId');

		const photographer = await getPhotographerById(photographerId);
		const photographerWork = await getPhotographerWork(photographerId);

		return { info: photographer, media: photographerWork }
	}
}

async function displayPhotographerHeader(info) {
	const headerSection = document.querySelector(".photograph-header");

	const headerModel = headerTemplate(info);
	const userCardDOM = headerModel.getUserCardDOM();
	headerSection.innerHTML = userCardDOM;

}

async function displayPhotographerCards(medias) {
	const cardsSection = document.querySelector(".photograph-cards");


	medias.forEach(function (media) {
		const cardModel = mediaCardTemplate(media);

		const cardDOM = cardModel.getMediaCardDOM();
		cardsSection.innerHTML += cardDOM;
	});
}

async function displayData() {

	const photographer = await getPhotographerInfo();

	displayPhotographerHeader(photographer.info);
	displayPhotographerCards(photographer.media);
}

async function pictureLiked(likeButton) {
	if (!likedPictures.includes(likeButton.target.attributes['liked-id'].value)) {
		let likeCount = likeButton.target.previousElementSibling;

		likedPictures.push(likeButton.target.attributes['liked-id'].value);
		likeCount.innerHTML = parseInt(likeCount.innerHTML) + 1;
	}
}

async function pictureZoom(picture) {
	const clickedPicture = picture.target;
	const zoomedPictureArea = document.querySelector('.zoomed-picture');
	const lightbox = document.querySelector('#lightbox');

	//position fixed

	lightbox.style.display = "flex";
	zoomedPictureArea.src = clickedPicture.src;
	zoomedPictureArea.alt = clickedPicture.alt;
}

async function previousSlide(prevButton) {
	const previous = prevButton.target;
	const pictureName = previous.nextElementSibling.alt;

	console.log(pictureName);

	for (let i = 0; i < mediaSlideshow.length; i++) {
		if (mediaSlideshow[i].title == pictureName && i > 0) {
			const zoomedPictureArea = document.querySelector('.zoomed-picture');

			zoomedPictureArea.src = `assets/photographers_pictures/${mediaSlideshow[i - 1].image}`;
			zoomedPictureArea.alt = mediaSlideshow[i - 1].title;
		}
	}
}

async function nextSlide(nextButton) {
	const next = nextButton.target;
	const pictureName = next.previousElementSibling.alt;

	for (let i = 0; i < mediaSlideshow.length; i++) {
		if (mediaSlideshow[i].title == pictureName && i < mediaSlideshow.length) {
			const zoomedPictureArea = document.querySelector('.zoomed-picture');

			zoomedPictureArea.src = `assets/photographers_pictures/${mediaSlideshow[i + 1].image}`;
			zoomedPictureArea.alt = mediaSlideshow[i + 1].title;
		}
	}
}

async function closeLightBox() {
	const lightbox = document.querySelector('#lightbox');

	lightbox.style.display = "none";
}

async function init() {
	await displayData();

	const likeButtons = document.querySelectorAll('.like-button');
	const pictures = document.querySelectorAll('.picture');
	const previousSlideButton = document.querySelector('.previous-slide');
	const nextSlideButton = document.querySelector('.next-slide');
	const closeLightBoxButton = document.querySelector('.close-lightbox');

	likeButtons.forEach(likeButton => likeButton.addEventListener('click', pictureLiked));
	pictures.forEach(picture => picture.addEventListener('click', pictureZoom));
	previousSlideButton.addEventListener('click', previousSlide);
	nextSlideButton.addEventListener('click', nextSlide);
	closeLightBoxButton.addEventListener('click', closeLightBox);
}

let mediaSlideshow = [];
let likedPictures = [];

init();
