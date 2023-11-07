
function costAndLikesTemplate(data) {
    const { totalLikes, cost} = data;

    function getCostAndLikesCardDOM() {

        const articleDOM = /* html */ 
        `<span class="totalLikes">${totalLikes} <i class="fa-solid fa-heart"></i></span><span class="price">${cost}<i class="fa-solid fa-euro-sign"></i> / jour</span>`;

        return (articleDOM);
    }

    return { totalLikes, cost, getCostAndLikesCardDOM }
}