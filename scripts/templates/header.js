
function headerTemplate(data) {
    const { name, portrait, city, country, tagline} = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {

        const articleDOM = /* html */ 
        `<div class="photographer-info">
		<h2>${name}</h2>
        <p class="pg-location">${city}, ${country}</p>
        <p class="pg-tagline">${tagline}</p>
		</div>
		<button class="contact_button" onclick="displayModal()">Contactez-moi</button>
		<img src="${picture}" alt="profile-picture">
		`;

        return (articleDOM);
    }

    return { name, picture, getUserCardDOM }
}