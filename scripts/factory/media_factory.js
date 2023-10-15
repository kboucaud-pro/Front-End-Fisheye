
class mediaFactory {
	constructor(data){
		if (data.video){
			let media = new Video(data);
		} else if (data.image){
			let media = new Picture(data);
		}
	}
}