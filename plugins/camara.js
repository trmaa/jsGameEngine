class Camara{
	constructor(){
		this.x = 0;
		this.y = 0;
		this.z = -300;
		this.ax = 90;
		this.ay = 0;
		this.far = 1500;
		this.res = 40
	}
	move(){
		if(wDown){
			this.z += Math.cos(this.ay*Math.PI/180)*10;
			this.x += Math.sin(this.ay*Math.PI/180)*10;
		}
		if(sDown){
			this.z -= Math.cos(this.ay*Math.PI/180)*10;
			this.x -= Math.sin(this.ay*Math.PI/180)*10;
		}
		if(aDown){
			this.z += Math.cos((this.ay+90)*Math.PI/180)*10;
			this.x += Math.sin((this.ay+90)*Math.PI/180)*10;
		}
		if(dDown){
			this.z -= Math.cos((this.ay+90)*Math.PI/180)*10;
			this.x -= Math.sin((this.ay+90)*Math.PI/180)*10;
		}

		if(eDown){
			this.y += 10;
		}
		if(qDown){
			this.y -= 10;
		}

		if(uArrow){
			this.ax -= 1;
		}
		if(dArrow){
			this.ax += 1;
		}
		if(rArrow){
			this.ay -= 1;
		}
		if(lArrow){
			this.ay += 1;
		}

		if(this.ax > 360){
			this.ax -= 360;
		}
		if(this.ax < 0){
			this.ax += 360;
		}

		if(this.ay > 360){
			this.ay -= 360;
		}
		if(this.ay < 0){
			this.ay += 360;
		}

		/*if(!mousemove){
			mouseXinit = mouseX;
			mouseYinit = mouseY;
		} else {
			this.ay -= (mouseX-mouseXinit)*0.1;
			this.ax += (mouseY-mouseYinit)*0.1;
			mousemove = false;
		}*/
	}
	project(x,y,z){
		if(this.translate(x,y,z).z <= -100){
			return {"x":10000000000,"y":10000000000};
		}
		return {
			"x": (print.cvs.width/2)+(this.translate(x,y,z).x*(this.far/this.distance(x,y,z))),
			"y": (print.cvs.height/2)+(this.translate(x,y,z).y*(this.far/this.distance(x,y,z)))
		};
	}
	translate(x,y,z){
		let b = Math.atan2((x-this.x),(z-this.z));
		let a = (this.ay*Math.PI/180)-b;

		let d = Math.sqrt(Math.pow((x-this.x),2)+Math.pow((z-this.z),2));

		let bp = Math.atan2((y-this.y),d);
		let ap = (this.ax*Math.PI/180)+bp;

		return {
			"x":Math.sin(a)*d,
			"y":Math.cos(ap)*this.distance(x,y,z),
			"z":Math.cos(a)*d
		};
	}
	distance(x,y,z){
		return (
			Math.sqrt(
				Math.pow(Math.sqrt(Math.pow((x-this.x),2)+Math.pow((z-this.z),2)),2)+
				Math.pow((y-this.y),2)
			)
		);
	}
	render(obj,c,caras){
		for(let i = 0;i < obj.vertices.length*0.5*caras;i++){
			if(
				this.project(
					obj.vertices[obj.aristas[i][1]][0],
					obj.vertices[obj.aristas[i][1]][1],
					obj.vertices[obj.aristas[i][1]][2]
				).x > print.cvs.width+100000000
				||
				this.project(
					obj.vertices[obj.aristas[i][0]][0],
					obj.vertices[obj.aristas[i][0]][1],
					obj.vertices[obj.aristas[i][0]][2]
				).y > print.cvs.height+100000000
				||
				this.project(
					obj.vertices[obj.aristas[i][1]][0],
					obj.vertices[obj.aristas[i][1]][1],
					obj.vertices[obj.aristas[i][1]][2]
				).x < 0-100000000
				||
				this.project(
					obj.vertices[obj.aristas[i][0]][0],
					obj.vertices[obj.aristas[i][0]][1],
					obj.vertices[obj.aristas[i][0]][2]
				).y < 0-100000000
			){
				continue;
			}
			for(let j = 0;j < this.res;j++){
				print.printline(
					this.project(
						obj.vertices[obj.aristas[i][0]][0],
						obj.vertices[obj.aristas[i][0]][1],
						obj.vertices[obj.aristas[i][0]][2]
					).x - (
						(
							this.project(
								obj.vertices[obj.aristas[i][0]][0],
								obj.vertices[obj.aristas[i][0]][1],
								obj.vertices[obj.aristas[i][0]][2]
							).x - this.project(
								obj.vertices[obj.aristas[i][1]][0],
								obj.vertices[obj.aristas[i][1]][1],
								obj.vertices[obj.aristas[i][1]][2]
							).x
						)/this.res*j
					),
					this.project(
						obj.vertices[obj.aristas[i][0]][0],
						obj.vertices[obj.aristas[i][0]][1],
						obj.vertices[obj.aristas[i][0]][2]
					).y - (
						(
							this.project(
								obj.vertices[obj.aristas[i][0]][0],
								obj.vertices[obj.aristas[i][0]][1],
								obj.vertices[obj.aristas[i][0]][2]
							).y - this.project(
								obj.vertices[obj.aristas[i][1]][0],
								obj.vertices[obj.aristas[i][1]][1],
								obj.vertices[obj.aristas[i][1]][2]
							).y
						)/this.res*j
					),

					this.project(
						obj.vertices[obj.aristas[i][0]][0],
						obj.delta+obj.vertices[obj.aristas[i][0]][1],
						obj.vertices[obj.aristas[i][0]][2]
					).x - (
						(
							this.project(
								obj.vertices[obj.aristas[i][0]][0],
								obj.delta+obj.vertices[obj.aristas[i][0]][1],
								obj.vertices[obj.aristas[i][0]][2]
							).x - this.project(
								obj.vertices[obj.aristas[i][1]][0],
								obj.delta+obj.vertices[obj.aristas[i][1]][1],
								obj.vertices[obj.aristas[i][1]][2]
							).x
						)/this.res*j
					),
					this.project(
						obj.vertices[obj.aristas[i][0]][0],
						obj.delta+obj.vertices[obj.aristas[i][0]][1],
						obj.vertices[obj.aristas[i][0]][2]
					).y - (
						(
							this.project(
								obj.vertices[obj.aristas[i][0]][0],
								obj.delta+obj.vertices[obj.aristas[i][0]][1],
								obj.vertices[obj.aristas[i][0]][2]
							).y - this.project(
								obj.vertices[obj.aristas[i][1]][0],
								obj.delta+obj.vertices[obj.aristas[i][1]][1],
								obj.vertices[obj.aristas[i][1]][2]
							).y
						)/this.res*j
					),
					c,
					(
						-this.project(
							obj.vertices[obj.aristas[i][0]][0],
							obj.vertices[obj.aristas[i][0]][1],
							obj.vertices[obj.aristas[i][0]][2]
						).x + this.project(
							obj.vertices[obj.aristas[i][1]][0],
							obj.vertices[obj.aristas[i][1]][1],
							obj.vertices[obj.aristas[i][1]][2]
						).x
					)/this.res + 10
				);
			}
		}
	}
	renderMesh(obj,c,cb){
		for(let i = 0;i < obj.aristas.length;i++){
			if(
				this.project(
					obj.vertices[obj.aristas[i][1]][0],
					obj.vertices[obj.aristas[i][1]][1],
					obj.vertices[obj.aristas[i][1]][2]
				).x > print.cvs.width+1000
				||
				this.project(
					obj.vertices[obj.aristas[i][0]][0],
					obj.vertices[obj.aristas[i][0]][1],
					obj.vertices[obj.aristas[i][0]][2]
				).y > print.cvs.height+1000
				||
				this.project(
					obj.vertices[obj.aristas[i][1]][0],
					obj.vertices[obj.aristas[i][1]][1],
					obj.vertices[obj.aristas[i][1]][2]
				).x < 0-1000
				||
				this.project(
					obj.vertices[obj.aristas[i][0]][0],
					obj.vertices[obj.aristas[i][0]][1],
					obj.vertices[obj.aristas[i][0]][2]
				).y < 0-1000
			){
				continue;
			}
			print.printline(
				this.project(
					obj.vertices[obj.aristas[i][0]][0],
					obj.vertices[obj.aristas[i][0]][1],
					obj.vertices[obj.aristas[i][0]][2]
				).x,
				this.project(
					obj.vertices[obj.aristas[i][0]][0],
					obj.vertices[obj.aristas[i][0]][1],
					obj.vertices[obj.aristas[i][0]][2]
				).y,

				this.project(
					obj.vertices[obj.aristas[i][1]][0],
					obj.vertices[obj.aristas[i][1]][1],
					obj.vertices[obj.aristas[i][1]][2]
				).x,
				this.project(
					obj.vertices[obj.aristas[i][1]][0],
					obj.vertices[obj.aristas[i][1]][1],
					obj.vertices[obj.aristas[i][1]][2]
				).y,
				c,2
			);
		}

		for(let i = 0;i < obj.vertices.length;i++){
			print.print(
				this.project(obj.vertices[i][0],obj.vertices[i][1],obj.vertices[i][2]).x-5,
				this.project(obj.vertices[i][0],obj.vertices[i][1],obj.vertices[i][2]).y-5,
				10,10,cb
			);
		}
	}
	renderTexture(obj,src,caras){
		for(let i = 0;i < obj.vertices.length*0.5*caras;i++){
			if(
				this.project(
					obj.vertices[obj.aristas[i][1]][0],
					obj.vertices[obj.aristas[i][1]][1],
					obj.vertices[obj.aristas[i][1]][2]
				).x > print.cvs.width+100000000
				||
				this.project(
					obj.vertices[obj.aristas[i][0]][0],
					obj.vertices[obj.aristas[i][0]][1],
					obj.vertices[obj.aristas[i][0]][2]
				).y > print.cvs.height+100000000
				||
				this.project(
					obj.vertices[obj.aristas[i][1]][0],
					obj.vertices[obj.aristas[i][1]][1],
					obj.vertices[obj.aristas[i][1]][2]
				).x < 0-100000000
				||
				this.project(
					obj.vertices[obj.aristas[i][0]][0],
					obj.vertices[obj.aristas[i][0]][1],
					obj.vertices[obj.aristas[i][0]][2]
				).y < 0-100000000
			){
				continue;
			}
			for(let j = 0;j < this.res;j++){
				print.printsprite(
					src,
					this.res,j,
					
					this.project(
						obj.vertices[obj.aristas[i][0]][0],
						obj.vertices[obj.aristas[i][0]][1],
						obj.vertices[obj.aristas[i][0]][2]
					).x - (
						(
							this.project(
								obj.vertices[obj.aristas[i][0]][0],
								obj.vertices[obj.aristas[i][0]][1],
								obj.vertices[obj.aristas[i][0]][2]
							).x - this.project(
								obj.vertices[obj.aristas[i][1]][0],
								obj.vertices[obj.aristas[i][1]][1],
								obj.vertices[obj.aristas[i][1]][2]
							).x
						)/this.res*j
					),
					this.project(
						obj.vertices[obj.aristas[i][0]][0],
						obj.vertices[obj.aristas[i][0]][1],
						obj.vertices[obj.aristas[i][0]][2]
					).y - (
						(
							this.project(
								obj.vertices[obj.aristas[i][0]][0],
								obj.vertices[obj.aristas[i][0]][1],
								obj.vertices[obj.aristas[i][0]][2]
							).y - this.project(
								obj.vertices[obj.aristas[i][1]][0],
								obj.vertices[obj.aristas[i][1]][1],
								obj.vertices[obj.aristas[i][1]][2]
							).y
						)/this.res*j
					),

					(
						-this.project(
							obj.vertices[obj.aristas[i][0]][0],
							obj.vertices[obj.aristas[i][0]][1],
							obj.vertices[obj.aristas[i][0]][2]
						).x + this.project(
							obj.vertices[obj.aristas[i][1]][0],
							obj.vertices[obj.aristas[i][1]][1],
							obj.vertices[obj.aristas[i][1]][2]
						).x
					)/this.res + 10,

					this.project(
						obj.vertices[obj.aristas[i][0]][0],
						obj.delta+obj.vertices[obj.aristas[i][0]][1],
						obj.vertices[obj.aristas[i][0]][2]
					).y - (
						(
							this.project(
								obj.vertices[obj.aristas[i][0]][0],
								obj.delta+obj.vertices[obj.aristas[i][0]][1],
								obj.vertices[obj.aristas[i][0]][2]
							).y - this.project(
								obj.vertices[obj.aristas[i][1]][0],
								obj.delta+obj.vertices[obj.aristas[i][1]][1],
								obj.vertices[obj.aristas[i][1]][2]
							).y
						)/this.res*j
					) - this.project(
						obj.vertices[obj.aristas[i][0]][0],
						obj.vertices[obj.aristas[i][0]][1],
						obj.vertices[obj.aristas[i][0]][2]
					).y - (
						(
							this.project(
								obj.vertices[obj.aristas[i][0]][0],
								obj.delta+obj.vertices[obj.aristas[i][0]][1],
								obj.vertices[obj.aristas[i][0]][2]
							).y - this.project(
								obj.vertices[obj.aristas[i][1]][0],
								obj.delta+obj.vertices[obj.aristas[i][1]][1],
								obj.vertices[obj.aristas[i][1]][2]
							).y
						)/this.res*j
					)
				);
			}
		}
	}
}

let camara = new Camara();