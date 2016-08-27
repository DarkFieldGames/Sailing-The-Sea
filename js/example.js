function load_landmasses(){

	var land = new PIXI.Container();
	land.position.x = 0.0;
	land.position.y = 0.0;

	var land1 = new PIXI.Graphics();

	land1.beginFill(0xFFFF00);

	
	// set the line style to have a width of 5 and set the color to red
	land1.lineStyle(5, 0xFF0000);
	land1.drawRect(1100, 500, 300, 200);
//	land1.setTransform(900, 500, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0)
	land1.position.x = 900;
	land1.position.y = 500;

	// draw a rectangle
	


	land.addChild(land1);

	var land2 = new PIXI.Graphics();

	land1.beginFill(0xFFFF00);

	// set the line style to have a width of 5 and set the color to red
	land1.lineStyle(5, 0xFF0000);

	// draw a rectangle
	land1.drawRect(100, 100, 300, 200);
//	land2.setTransform(300, 200, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0)
	land1.position.x = 100;
	land1.position.y = 100;

	land.addChild(land1);

	window.stage.addChild(land);
	//window.land = land
	land.position.x = 0.0;
	land.position.y = 0.0;
	window.land = land
	
}


function load_dude(){

    var movespeed = 5

    function setup_dude(){

       dude = new PIXI.Sprite(resources.dude.texture);

      // Setup the position
       dude.position.x = 640;
       dude.position.y = 360;

       // set the anchor point
       dude.anchor.x = 0.5;
       dude.anchor.y = 0.5;

       // set the scale
       dude.scale.x = 1.5;
       dude.scale.y = 1.5;

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
  requestAnimationFrame(gameLoop);
  play();
  window.renderer.render(window.stage);
}

function play(){
	// use this to determine what moves etc
	// negative because relative
	window.land.position.x += - window.dude.vx;
	window.land.position.y += - window.dude.vy;
}
