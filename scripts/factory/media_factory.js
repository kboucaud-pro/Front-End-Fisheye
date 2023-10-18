
class mediaFactory {
	constructor(data){

		if (data.video){
			return new Video(data);
		} else if (data.image){
			return new Picture(data);
		}
	}
}