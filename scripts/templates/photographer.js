function photographerTemplate(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    /**
     * @returns string DOMPart
     */
    function getUserCardDOM() {

        const articleDOM = /* html */ 
        `<article>
        <a href="photographer.html?photographerId=${id}">
        <img src="${picture}" alt="${name}">
        </a>
        <h2>${name}</h2>
        <p class="pg-location">${city},${country}</p>
        <p class="pg-tagline">${tagline}</p>
        <p class="pg-price">${price}/jour</p>
        </article>`;

        return (articleDOM);
    }
    return { name, picture, getUserCardDOM }
}