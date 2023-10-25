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
		photographerId = urlParameters.get('photographerId');

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

		const cardDOM = media.getMediaCardDOM();
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

async function mediaZoom(media) {
	const clickedMedia = media.target;
	const zoomedMediaArea = document.querySelector('.zoomed-media');
	const lightbox = document.querySelector('#lightbox');

	//position fixed
	console.log(clickedMedia);

	lightbox.style.display = "flex";
	zoomedMediaArea.src = clickedMedia.src;
	zoomedMediaArea.alt = clickedMedia.alt;
}

async function previousSlide(prevButton) {
	const previous = prevButton.target;
	const pictureName = previous.nextElementSibling.alt;

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

async function sortMedias(option) {
	if (option.originalTarget.classList.contains('active-choice')){
		return ;
	}

	const sortMode = option.originalTarget.attributes['sort-value'].value;
	let photographerWork = await getPhotographerWork(photographerId);

	if ("date" == sortMode) {
		photographerWork.sort(function (a, b) {
			return a._date.localeCompare(b._date);
		});
	} else if ("likes" == sortMode) {
		photographerWork.sort(function (a, b) {
			return b._likes - a._likes;
		});
	} else if ("title" == sortMode) {
		photographerWork.sort(function (a, b) {
			return a._title.localeCompare(b._title);
		});
	}

	const cardsSection = document.querySelector(".photograph-cards");

	cardsSection.innerHTML = "";
	displayPhotographerCards(photographerWork);
	clearOptions(option);
}

async function displaySortOptions(activeOption){
	const list = activeOption.originalTarget.parentNode;
	let options = list.children;

	for (var i = 0; i < options.length; i++) {
		options[i].classList.add('choice-display');
	}
}

async function clearOptions(option){
	let activeOption = option.originalTarget;

	const list = activeOption.parentNode;
	let options = list.children;

	for (var i = 0; i < options.length; i++) {
		options[i].classList.remove('choice-display');
		options[i].classList.remove('active-choice');
	}

	activeOption.classList.add('active-choice');
	activeFilter = document.querySelector('.active-choice');
	activeFilter.addEventListener('click', displaySortOptions);
}

async function init() {
	await displayData();

	const likeButtons = document.querySelectorAll('.like-button');
	const medias = document.querySelectorAll('.media-card');
	const sortOptions = document.querySelectorAll('.sort-option');
	const previousSlideButton = document.querySelector('.previous-slide');
	const nextSlideButton = document.querySelector('.next-slide');
	const closeLightBoxButton = document.querySelector('.close-lightbox');

	likeButtons.forEach(likeButton => likeButton.addEventListener('click', pictureLiked));
	medias.forEach(picture => picture.addEventListener('click', mediaZoom));
	sortOptions.forEach(option => option.addEventListener('click', sortMedias));
	previousSlideButton.addEventListener('click', previousSlide);
	nextSlideButton.addEventListener('click', nextSlide);
	closeLightBoxButton.addEventListener('click', closeLightBox);
	activeFilter.addEventListener('click', displaySortOptions);
}

let mediaSlideshow = [];
let likedPictures = [];
let photographerId = 0;
let activeFilter = document.querySelector('.active-choice');

init();
