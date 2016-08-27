var crash = false;

function load_landmasses(){

	var land = new PIXI.Container();
	land.position.x = 0.0;
	land.position.y = 0.0;

	var land1 = new PIXI.Container(); 

	graphics = new PIXI.Graphics();

	graphics.beginFill(0xFFFF00);

	
	// set the line style to have a width of 5 and set the color to red
	graphics.lineStyle(5, 0xFF0000);
	graphics.drawRect(0, 0, 300, 200);

	// add graphics to container
	land1.addChild(graphics)

	land1.position.x = 900;
	land1.position.y = 500;
	land1.w = 300;
	land1.h = 200;  // only relevent to this, otherwise  use width and height
	land.addChild(land1);


	var land1 = new PIXI.Container(); 

	graphics = new PIXI.Graphics();
	graphics.beginFill(0xFFFF00);

	// set the line style to have a width of 5 and set the color to red
	graphics.lineStyle(5, 0xFF0000);
	graphics.drawRect(0, 0, 300, 200);

	// add graphics to container
	land1.addChild(graphics);

	land1.position.x = 100;
	land1.position.y = 100;
	land1.w = 300;
	land1.h = 200;

	land.addChild(land1);

	window.stage.addChild(land);
	//window.land = land
	land.position.x = 0.0;
	land.position.y = 0.0;
	window.land = land;
	
}

function isIntersecting(r1,r2){
	// check intersection with rectangles

	
	var centpoint = new PIXI.Point(0.0,0.0);

	console.log("land");
	var x = r1.toGlobal(centpoint)["x"];
	var y = r1.toGlobal(centpoint)["y"];
	var dude_x = r2.toGlobal(centpoint)["x"] + r2.vx;
	var dude_y = r2.toGlobal(centpoint)["y"] + r2.vy;
	console.log(r1.toGlobal(centpoint));
	console.log("you");
	console.log(r2.toGlobal(centpoint));
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
		var dude_x = r2.toGlobal(centpoint)["x"] + r2.vx;
		var dude_y = r2.toGlobal(centpoint)["y"] + r2.vy;
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

    var movespeed = 20.0;

    function setup_dude(){

       dude = new PIXI.Sprite(resources.dude.texture);

      // Setup the position
       dude.position.x = 640;
       dude.position.y = 360;

       // set the anchor point
       dude.anchor.x = 0.0;
       dude.anchor.y = 0.0;

       // set the scale
       dude.scale.x = 1.5;
       dude.scale.y = 1.5;


       dude.w = 50 * dude.scale.x;
       dude.h = 50 * dude.scale.y;

       dude.position.x = dude.position.x - (dude.w / 2.0);
       dude.position.y = dude.position.y - (dude.h / 2.0);


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

       window.up = up;
       window.down = down;
	   window.left = left;
	   window.right = right;


       window.left.press = function() {
				window.dude.vx = -movespeed;
				window.dude.vy = 0;
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
				window.dude.vx = movespeed;
				window.dude.vy = 0;
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
   PIXI.loader.add("dude","./assets/ship.jpg").load(setup_dude);
   
      // This creates a texture from a 'dude.png' image.
  
}



function keyboard(keyCode) {
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
	var fps = 30.0;
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
	if (collided == 0){
		window.land.x += - window.dude.vx;
		window.land.y += - window.dude.vy;
	};

	if (collided == 1){
		window.land.x += 0.0;
		window.land.y += - window.dude.vy;
	};

	if (collided == 2){
		window.land.x += - window.dude.vx;
		window.land.y += 0.0;
	};

	if (collided == 3){
		window.land.x += 0.0;
		window.land.y += 0.0;
	};



	console.log("land all");
	console.log(window.land.x);
	console.log(window.land.y);
}
