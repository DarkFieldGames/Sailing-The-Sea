var fps = 60.0;

function add_landmass(land,x,y,w,h){

	var land1 = new PIXI.Container();
	var texture = PIXI.Texture.fromImage("assets/grass.png");
	var graphics = new PIXI.TilingSprite(texture, w,h);

//	graphics = new PIXI.Graphics();
//	graphics.beginFill(0xFFFF00);

	
	// set the line style to have a width of 5 and set the color to red
//	graphics.lineStyle(5, 0xFF0000);
//	graphics.drawRect(0, 0, 300, 200);

	// add graphics to container
	land1.addChild(graphics)

	land1.position.x = x;
	land1.position.y = y;
	land1.w = w;
	land1.h = h;  // only relevent to this, otherwise  use width and height
	land.addChild(land1);
	
}

function add_whirlpool(whirlpools,x,y,w,h,shrink,grow,big,small,status){

	// whirlpool states = active, grow, shrink, inactive
	// loop between active, shrink, inactive, grow

	function animate(){

		if (this.status == "active") {
			if (this.time > this.big) {
				this.status = "shrink";
				this.time = 0.0;
			};
		};

		if (this.status == "shrink") {
			if (this.time > this.shrinkrate) {
				this.status = "inactive";
				this.time = 0.0;
			} else {
				this.scale.x = this.scale.x - (1.0 / (fps * this.shrinkrate));
				this.scale.y = this.scale.y - (1.0 / (fps * this.shrinkrate));
			};
			if (this.scale.x < 0.0){
				this.scale.x = 0.0;
				this.scale.y = 0.0;
			};
		};

		if (this.status == "inactive") {
			if (this.time > this.small) {
				this.status = "grow";
				this.time = 0.0;
			};
		};

		if (this.status == "grow") {
			if (this.time > this.growthrate) {
				this.status = "active";
				this.time = 0.0;
			} else {
				this.scale.x = this.scale.x + (1.0 / (this.growthrate * fps));
				this.scale.y = this.scale.y + (1.0 / (this.growthrate * fps));
			};
			if (this.scale.x > 1.0){
				this.scale.x = 1.0;
				this.scale.y = 1.0;
			};
		};


		this.time = this.time + (1.0 / fps);
		
	}
		
	// create a texture from an image path
	var texture = PIXI.Texture.fromImage('assets/whirlpool.png');
	// create a new Sprite using the texture
	var wpool = new PIXI.Sprite(texture);

	wpool.position.x = x;
	wpool.position.y = y;
	wpool.anchor.x = 0.5
	wpool.anchor.y = 0.5
	wpool.w = w;
	wpool.h = h;  // only relevent to this, otherwise  use width and height

	wpool.shrinkrate = shrink; // how long it takes for the whirlpool to shrink
	wpool.growthrate = grow; // how long it takes for the whirlpool to grow (in seconds)
	wpool.big = big; // how long the whirlpool should stay max size for
	wpool.small = small; // how long the whirlpool should shrink for
	wpool.status = status;
	wpool.time = 0.0
	wpool.animate = animate

	whirlpools.addChild(wpool);
	
}



function add_tornado(tornados,x,y,w,h,turntime,speed,status){

	// whirlpool states = active, grow, shrink, inactive
	// loop between active, shrink, inactive, grow

	function animate(){
		console.log("animate");
		console.log(this.status);

		var vx_thing = 0.0;
		var vy_thing = 0.0;

		if (this.status == "left") {
			if (this.time > this.turntime) {
				this.status = "right";
				this.time = 0.0;
				vx_thing = 1.0;
			} else {
				vx_thing = -1.0;
			}
		};

		if (this.status == "right") {
			if (this.time > this.turntime) {
				this.status = "left";
				this.time = 0.0;
				vx_thing = -1.0;
			} else {
				vx_thing = 1.0;
			};
		};

		if (this.status == "up") {
			if (this.time > this.turntime) {
				this.status = "down";
				this.time = 0.0;
				vy_thing = 1.0;
			} else {
				vy_thing = -1.0;
			};
		};

		if (this.status == "down") {
			if (this.time > this.turntime) {
				this.status = "up";
				this.time = 0.0;
				vy_thing = -1.0;
			} else {
				vy_thing = 1.0;
			};
		};

		console.log((vx_thing * speed / fps));

		this.x = this.x + (vx_thing * speed / fps);
		this.y = this.y + (vy_thing * speed / fps);

		this.time = this.time + (1.0 / fps);
		
	};
		
	// create a texture from an image path
	var texture = PIXI.Texture.fromImage('assets/tornado.png');
	// create a new Sprite using the texture
	var tnado = new PIXI.Sprite(texture);

	tnado.position.x = x;
	tnado.position.y = y;
	tnado.anchor.x = 0.5;
	tnado.anchor.y = 0.5;
	tnado.w = w;
	tnado.h = h;  // only relevent to this, otherwise  use width and height

	tnado.turntime = turntime; // how long it takes for the whirlpool to shrink
	tnado.status = status;
	tnado.time = 0.0;
	tnado.animate = animate

	tornados.addChild(tnado);
	
}
