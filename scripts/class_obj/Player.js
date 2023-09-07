class Player{
	constructor(x,y,w,h,m,v,hp){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.m = m;
		this.v = v;
		this.a = 90;
		this.hp = hp;
		this.delay = 0;
	}
	update(){
		this.move();
		this.die();
	}
	move(){
		
	}
	die(){
		if(this.hp <= 0){
			window.close();
		}
	}
}