
function costAndLikesTemplate(data) {
    const { totalLikes, cost} = data;

    /**
     * @returns string DOMPart
     */
    function getCostAndLikesCardDOM() {

        const articleDOM = /* html */ 
        `<span class="totalLikes">${totalLikes} <span class="fa-solid fa-heart"></span></span><span class="price">${cost}<span class="fa-solid fa-euro-sign"></span> / jour</span>`;

        return (articleDOM);
    }

    return { totalLikes, cost, getCostAndLikesCardDOM }
}