
/**
 * @param {*} data 
 * @returns Media 
 */
function createMedia(data) {
	if (data.video) {
		return new Video(data);
	} else if (data.image) {
		return new Picture(data);
	}
}