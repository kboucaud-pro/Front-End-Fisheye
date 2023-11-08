
/**
 * @returns null
 */
function displayModal() {
    const modal = document.getElementById("contact_modal");
    const modalBackground = document.getElementById("modal-background");
    modalBackground.style.display = "block";
	modal.style.display = "block";
}

/**
 * @returns null
 */
function closeModal() {
    const modal = document.getElementById("contact_modal");
    const modalBackground = document.getElementById("modal-background");
    modalBackground.style.display = "none";
    modal.style.display = "none";
}

/**
 * @returns boolean
 */
function submitForm(){
    const firstName = document.getElementById("modal-first-name").value;
    const lastName = document.getElementById("modal-last-name").value;
    const email = document.getElementById("modal-email").value;
    const message = document.getElementById("modal-message").value;

    console.log(firstName, lastName, email, message);

    return false;
}
