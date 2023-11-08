
/**
 * @returns {photographers}
 */
async function getPhotographers() {
    const file = await fetch('data/photographers.json');
    const fileContent = await file.json();

    const photographers =  fileContent.photographers;
    return ({
        photographers: photographers
    })
}

/**
 * @param {*} photographers 
 * @returns null
 */
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.innerHTML += userCardDOM;
    });
}

/**
 * @returns null
 */
async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();

