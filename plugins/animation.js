class Animation{
	constructor(min,max,src,duration){
		this.min = min;
		this.max = max;
		this.step = min;
		this.src = src;
		this.sprite = src+min;
		this.delay = 0;
		this.duration = duration;
	}
	update(){
		if(this.delay >= this.duration){
			if(this.step < this.max){
				this.sprite = this.src+this.step;
				this.step++;
			} else {
				this.srpite = this.src+this.min;
				this.step = this.min;
			}
			this.delay = 0;
		} else {
			this.delay++;
		}
		console.log(this.step)
	}
}