document.write(`<canvas id="canvas"></canvas>`);

class Print{
	constructor(w,h){
		this.cvs = document.querySelector("#canvas");
		this.cvs.width = w;
		this.cvs.height = h;
		this.ctx = this.cvs.getContext("2d");
		this.ctx.imageSmoothingEnabled = false;
		this.ctx.scale(1, 1);
	}
	print(x,y,w,h,c){
		this.ctx.fillStyle = c;
		this.ctx.fillRect(x,y,w,h);
	}
	printext(x,y,msg,font,fs,c){
		this.ctx.fillStyle = c;
		this.ctx.font = `${fs} ${font}`;
		this.ctx.fillText(msg,x,y);
	}
	printimg(src,x,y,w,h,a){
		let sprite = new Image();
		sprite.src = src;
  		this.ctx.save();
  		this.ctx.translate(x, y);
  		this.ctx.rotate((Math.PI / 180) * a);
  		this.ctx.drawImage(sprite,0,0, w, h);
  		this.ctx.restore();
	}
	printsprite(src,res,i,x,y,w,h){
		let sprite = new Image();
		sprite.src = src;
		sprite.onload = () => {
		    this.ctx.drawImage(
		    	sprite,
		    	i*sprite.width/res,0,
		    	sprite.width/res,sprite.height,
		    	x,y,w,h
		    );
		};
	}
	printline(x1,y1,x2,y2,c,w){
		this.ctx.strokeStyle = c
		this.ctx.lineWidth = w;
		this.ctx.beginPath();
		this.ctx.moveTo(x1,y1);
		this.ctx.lineTo(x2,y2);
		this.ctx.stroke();
		this.ctx.closePath();
	}
	gradientel(x1,y1,x2,y2,c){
		let gradiente = this.ctx.createLinearGradient(x1,y1,x2,y2);

		for(let step = 0;step < c.length;step++){
			gradiente.addColorStop(step*1/c.length,c[step]);
		}

		this.ctx.fillStyle = gradiente;
		this.ctx.fillRect(0,0,this.cvs.width,this.cvs.height);
	}
	gradienter(x1,y1,x2,y2,c){
		let gradiente = this.ctx.createRadialGradient(x1,y1,0,x2,y2,1000);

		for(let step = 0;step < c.length;step++){
			gradiente.addColorStop(step*1/c.length,c[step]);
		}

		this.ctx.fillStyle = gradiente;
		this.ctx.fillRect(0,0,this.cvs.width,this.cvs.height);
	}
	animation(carpeta,name,frame,x,y,w,h,a){
		print.print(carpeta+name+frame+".png",x,y,w,h,a);
	}
	cls(c){
		this.ctx.fillStyle = c;
		this.ctx.fillRect(0,0,this.cvs.width,this.cvs.height);
	}
	cartesian(x,m){
		if(m == "w"){
			return x-(this.cvs.width/2);
		}
		if(m == "h"){
			return (this.cvs.height/2)-x;
		}
	}
	descartesian(x,m){
		if(m == "w"){
			return x+(this.cvs.width/2);
		}
		if(m == "h"){
			return (this.cvs.height/2)-x;
		} 
	}
	center(x,m,obj){
		if(m == "w"){
			return this.descartesian(this.cartesian(x,m)-this.cartesian(obj.x,m),m);
		}
		if(m == "h"){
			return this.descartesian(this.cartesian(x,m)-this.cartesian(obj.y,m),m);
		} 
	}
}

let print = new Print(1920,1080);