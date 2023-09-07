function render(){
	//cls
	print.cls("#aaa");

	//camara.renderTexture(cubo,"sprites/recursos/nosprite.png",1);
	camara.render(cubo,"#0aa",1);
	camara.renderMesh(cubo,"#a0a","#aa0");
}
