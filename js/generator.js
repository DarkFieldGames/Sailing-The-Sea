function add_landmass(land,x,y,w,h){

	var land1 = new PIXI.Container();
	graphics = new PIXI.Graphics();
	graphics.beginFill(0xFFFF00);

	
	// set the line style to have a width of 5 and set the color to red
	graphics.lineStyle(5, 0xFF0000);
	graphics.drawRect(0, 0, 300, 200);

	// add graphics to container
	land1.addChild(graphics)

	land1.position.x = x;
	land1.position.y = y;
	land1.w = w;
	land1.h = h;  // only relevent to this, otherwise  use width and height
	land.addChild(land1);
	
}

function add_whirlpool(whirlpools,x,y,w,h,shrink,grow,big,small){

	// create a texture from an image path
	var texture = PIXI.Texture.fromImage('assets/whirlpool.png');
	// create a new Sprite using the texture
	var wpool = new PIXI.Sprite(texture);

	wpool.position.x = x;
	wpool.position.y = y;
	wpool.w = w;
	wpool.h = h;  // only relevent to this, otherwise  use width and height

	wpool.shrinkrate = shrink; // how long it takes for the whirlpool to shrink
	wpool.growthrate = grow; // how long it takes for the whirlpool to grow (in seconds)
	wpool.big = big; // how long the whirlpool should stay max size for
	wpool.small = small; // how long the whirlpool should shrink for

	whirlpools.addChild(wpool);
	
}
