var fps = 60.0;
var world_x_small = -50;
var world_x_large = 3950.0;
var world_y_small = -50;
var world_y_large = 3950.0;
// for http://stackoverflow.com/questions/24775725/loop-through-childnodes // http://stackoverflow.com/a/24775765
NodeList.prototype.forEach = Array.prototype.forEach
var map_height = 700;
var map_width = 1260;
var map_dx = map_width / (world_x_large - world_x_small);
var map_dy = map_height / (world_y_large - world_y_small);

function load_map(){
	// create a texture from an image path
	map = new PIXI.Container();
	map.position.x = 10.0;
	map.position.y = 10.0;
	map.width = 1260;
	map.height = 700;
	var texture = PIXI.Texture.fromImage('assets/starmap.jpg');
	// create a new Sprite using the texture
	var starmap = new PIXI.Sprite(texture,1260,700);
	starmap.height = 700;
	starmap.width = 1260;

	// load the marker


	map.alpha = 1.0;
	map.addChild(starmap);


	graphics = new PIXI.Graphics();
	graphics.beginFill(0xFF0000);
	graphics.drawCircle(0, 0, 10, 10);


	marker = new PIXI.Container();
	marker.addChild(graphics);
	marker.position.x = 30;
	marker.position.y = 30;
	marker.alpha = 1.0;

	endgrap = new PIXI.Graphics();
	endgrap.beginFill(0x00FF00);
	endgrap.drawRect(0, 0, 20, 20);

	endsquare = new PIXI.Container();
	endsquare.addChild(endgrap);
	endsquare.position.x = 1240;
	endsquare.position.y = 680;
	endsquare.alpha = 1.0;

	map.addChild(marker);
	map.addChild(endsquare);	

	window.stage.addChild(map);
	window.starmap = starmap;
	window.marker = marker;
	window.endsquare = endsquare;
}

function load_landmasses(){

	var land = new PIXI.Container();
	land.position.x = 0.0;
	land.position.y = 0.0;

	add_landmass(land,900,500,300,200);
	add_landmass(land,100,100,300,200);

	window.world.addChild(land);
	//window.land = land
	window.land = land;
	
}

function load_whirlpools(){

	var whirlpools = new PIXI.Container();
	whirlpools.position.x = 0.0;
	whirlpools.position.y = 0.0;
	add_whirlpool(whirlpools,900,100,100,100,1.0,1.0,5.0,2.0,"active");

	window.world.addChild(whirlpools);
	//window.land = land
	window.whirlpools = whirlpools;
	
}


function load_tornados(){

	var tornados = new PIXI.Container();
	tornados.position.x = 0.0;
	tornados.position.y = 0.0;

	add_tornado(tornados,100,600,100,100,0.5,600.0,"up");

	window.world.addChild(tornados);
	//window.land = land
	window.tornados = tornados;
	
}


function checkCollision(threat,dude){
	collide = isIntersecting(threat,dude);
	if (collide == true && threat.scale.x > 0.0) {
		dude.alive = false;
	}
}

function isIntersecting(r1,r2){
	// check intersection with rectangles

	
	var centpoint = new PIXI.Point(0.0,0.0);

	var x = r1.toGlobal(centpoint)["x"];
	var y = r1.toGlobal(centpoint)["y"];
	var dude_x = r2.toGlobal(centpoint)["x"] + r2.vx - (r2.w / 2.0);
	var dude_y = r2.toGlobal(centpoint)["y"] + r2.vy - (r2.h / 2.0) ;
	return !(dude_x > (x + r1.w) || 
           (dude_x + r2.w) < x || 
           dude_y > (y + r1.h) ||
           (dude_y + r2.h) < y);

}


function stopIntersecting(r1,r2){
	// check intersection with rectangles

	var centpoint = new PIXI.Point(0.0,0.0);
	var intersects = isIntersecting(r1,r2);

	if (intersects == true){
		var dude_x = r2.toGlobal(centpoint)["x"] + r2.vx - (r2.w / 2.0);
		var dude_y = r2.toGlobal(centpoint)["y"] + r2.vy - (r2.h / 2.0);
		var x = r1.toGlobal(centpoint)["x"];
		var y = r1.toGlobal(centpoint)["y"];
		if ((dude_x <= (x + r1.w) && (dude_x + r2.w) >= x) == true){
			if ((dude_y <= (y + r1.h) && (dude_y + r2.h) >= y) == true)  {
				return 3;
			} else {
				return 1; // code for x velocity
				};
		};
		if ((dude_y <= (y + r1.h) && (dude_y + r2.h) >= y) == true){
			return 2;
		};

	};
	return 0;
}

function load_dude(){

    var movespeed = 600.0 / fps;

    function setup_dude(){

       dude = new PIXI.Sprite(resources.dude.texture);

      // Setup the position
       dude.position.x = 640;
       dude.position.y = 360;

       // set the anchor point
       dude.anchor.x = 0.5;
       dude.anchor.y = 0.5;

       // set the scale
       dude.scale.x = 1.0;
       dude.scale.y = 1.0;
       dude.alpha = 1.0


       dude.w = 100.0 * dude.scale.x;
       dude.h = 75.0 * dude.scale.y;

       dude.position.x = dude.position.x - (dude.w / 2.0);
       dude.position.y = dude.position.y - (dude.h / 2.0);

       dude.alive = true;


       dude.vx = 0;
       dude.vy = 0;

       // Add the bunny to the scene we are building.
       window.stage.addChild(dude);
       window.dude = dude;

       requestAnimationFrame(animate);

       function animate() {
            // start the timer for the next animation loop
            requestAnimationFrame(animate);

            // each frame we spin the bunny around a bit
         //   dude.rotation += 0.01;

            // this is the main render call that makes pixi draw your container and its children.
            window.renderer.render(stage);
        }

      // kick off the animation loop (defined below)
       var left = keyboard(37),
        up = keyboard(38),
        right = keyboard(39),
        down = keyboard(40);

	// map
       var map = keyboard(77);

       window.map = map;
       window.up = up;
       window.down = down;
       window.left = left;
       window.right = right;

       /// hack to render the map .. but then hide it from view
       window.starmap.alpha = 0.0;
       window.marker.alpha = 0.0;
       window.endsquare.alpha = 0.0;



       window.map.press = function () {
				if (window.starmap.alpha == 1.0){
					window.starmap.alpha = 0.0;
					window.dude.alpha = 1.0;
					window.marker.alpha = 0.0;
					window.endsquare.alpha = 0.0;
				} else {
					window.starmap.alpha = 1.0;
					window.dude.alpha = 0.0;
					window.marker.alpha = 1.0;
					window.endsquare.alpha = 1.0;
				};
			};


       window.left.press = function() {
				/// changing direction
				if (window.dude.alive == true) {
					window.dude.scale.x = 1;
					window.dude.vx = -movespeed;
					window.dude.vy = 0.0
				}				
			};

       window.left.release = function() {
		// If the left arrow has been released, and the right arrow isn't down,
		// and the dude is not moving vertically
		// stop the dude
			if (!window.right.isDown && window.dude.vy === 0) {
				window.dude.vx = 0;
				};
			};
	
       window.right.press = function() {
				if (window.dude.alive == true) {
					window.dude.scale.x = -1;
					window.dude.vx = movespeed;
					window.dude.vy = 0;
				}
			};

       window.right.release = function() {
			if (!window.left.isDown && window.dude.vy === 0) {
				window.dude.vx = 0;
				};
			};
	
       window.up.press = function() {
				window.dude.vx = 0;
				window.dude.vy = -movespeed;
			};

       window.up.release = function() {
			if (!window.down.isDown && window.dude.vx === 0) {
				window.dude.vy = 0;
			};
		};


       window.down.press = function() {
				window.dude.vx = 0;
				window.dude.vy = movespeed;
			};

       window.down.release = function() {
			if (!window.down.isUp && window.dude.vx === 0) {
				window.dude.vy = 0;
			};
		}; 

       gameLoop();
   };

   load_landmasses();
   load_whirlpools();
   load_tornados();

   // this loads the dude texture
   load_map();
   PIXI.loader.add("dude","./assets/ship.png").load(setup_dude);
   
      // This creates a texture from a 'dude.png' image.
  
}



function keyboard(keyCode) {
	// character controler handler
	var key = {};
	key.code = keyCode;
	key.isDown = false;
	key.isUp = true;
	key.press = undefined;
	key.release = undefined;
	//The `downHandler`
	key.downHandler = function(event) {
	if (event.keyCode === key.code) {
	  if (key.isUp && key.press) key.press();
	  key.isDown = true;
	  key.isUp = false;
	}
	event.preventDefault();
	};
	//The `upHandler`
	key.upHandler = function(event) {
	if (event.keyCode === key.code) {
	  if (key.isDown && key.release) key.release();
	  key.isDown = false;
	  key.isUp = true;
	}
	event.preventDefault();
	};
	//Attach event listeners
	window.addEventListener(
	"keydown", key.downHandler.bind(key), false
	);
	window.addEventListener(
	"keyup", key.upHandler.bind(key), false
	);
	return key;
}



function gameLoop() {
	// for some time in the future http://gamedev.stackexchange.com/questions/1589/when-should-i-use-a-fixed-or-variable-time-step

	setTimeout(function() {
		requestAnimationFrame(gameLoop); 
      		  // ... Code for Drawing the Frame ...
		play();
		window.renderer.render(window.stage);
	}, 1000.0 / fps);

}

function play(){
	// use this to determine what moves etc
	// negative because relative
	var collided;
	// we want to check if the velocity in the said direction will cause a clash afterwards.
	window.land.children.some(function(item){
		collided = stopIntersecting(item,window.dude);
		return collided !== 0;
		
	});

	
	window.whirlpools.children.forEach(function(wpool){
		wpool.animate();
		checkCollision(wpool,window.dude);
	});

	window.tornados.children.forEach(function(tnado){
		tnado.animate();
		checkCollision(tnado,window.dude);
	});



	if (collided == 0 && window.dude.alive == true){
		// world boundaries
		if ((window.world.x <= -world_x_small) && (window.world.x >= -world_x_large)){
			window.world.x += - window.dude.vx;
			window.marker.position.x += window.dude.vx * map_dx;
		} else {
			if (window.world.x <= -world_x_small){
				window.world.x = - world_x_large + 50.0;
				window.marker.position.x = map_width;
			} else {
				window.world.x = 0.0;
				window.marker.position.x = 0.0; // puts marker back in the x = 0 axis
				
			};
		};
		if ((window.world.y <= -world_y_small) && (window.world.y >= -world_y_large)){
			window.world.y += - window.dude.vy;
			window.marker.position.y += window.dude.vy * map_dy;
		} else {
			if (window.world.y <= -world_y_small){
				window.world.y = - world_y_large + 50.0;
				window.marker.position.y = map_height;
			} else {
				window.world.y = 0.0;
				window.marker.position.y = 0.0;
			};
		};
	};

	if (collided == 1 && window.dude.alive == true){
		window.world.x += 0.0;
		window.world.y += - window.dude.vy;
	};

	if (collided == 2 && window.dude.alive == true){
		window.world.x += - window.dude.vx;
		window.world.y += 0.0;
	};

	if (collided == 3 && window.dude.alive == true){
		window.world.x += 0.0;
		window.world.y += 0.0;
	};

	if (window.dude.alive == false){
		window.dude.rotation += (3.0 / fps);
		if (window.dude.scale.x < 0.0){
			window.dude.scale.x = window.dude.scale.x + (1.0 / fps);
			if (window.dude.scale.x > 0.0) {
				window.dude.scale.x = 0.0;
			};
		} else {
			window.dude.scale.x = window.dude.scale.x - (1.0 / fps);
			if (window.dude.scale.x < 0.0) {
				window.dude.scale.x = 0.0;
			};
		};	
		window.dude.scale.y = window.dude.scale.y- (2.0 / fps);
		if (window.dude.scale.y < 0.0){
			window.dude.scale.y = window.dude.scale.y + (1.0 / fps);
			if (window.dude.scale.y > 0.0) {
				window.dude.scale.y = 0.0;
			};
		} else {
			window.dude.scale.y = window.dude.scale.y - (1.0 / fps);
			if (window.dude.scale.y < 0.0) {
				window.dude.scale.y = 0.0;
			};
		};
	};
}
