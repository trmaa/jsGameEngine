class Fisicas{
	constructor(g,t,u){
		this.g = g;
		this.t = t;
		this.u = u;
	}
	fell(obj){
		obj.y += this.g*(this.t/300);
	}
	setForce(obj){
		if(wDown){
			if(obj.v-(this.t/300) >= 0){
				obj.y -= obj.v-(this.t/300);
			}
		}
		if(sDown){
			if(obj.v-(this.t/300) >= 0){
				obj.y += obj.v-(this.t/300);
			}
		}
		if(dDown){
			if(obj.v-(this.t/300) >= 0){
				obj.x += obj.v-(this.t/300);
			}
		}
		if(aDown){
			if(obj.v-(this.t/300) >= 0){
				obj.x -= obj.v-(this.t/300);
			}
		} else if(!wDown && !sDown && !dDown && !aDown){
			this.resetime();
		}	
	}
	time(){
		this.t++;
	}
	resetime(){
		this.t = 0;
	}
}

let fisicas = new Fisicas(9.81,0,-5);