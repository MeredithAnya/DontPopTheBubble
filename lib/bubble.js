(function () {
  if (typeof Bubbles === "undefined") {
    window.Bubbles = {};
  }


	var Bubble = Bubbles.Bubble = function(options){
	   this.context = options.ctx;
	   this.pos = options.pos;
	   this.vel = options.vel;
	   this.radius = options.radius;
	   this.color = '#4dd2ff';
	   this.game = options.game;
	   this.spot = [[[0, 0], 0], [[0, 0], 0] [[0, 0], 0],
	   	[[0, 0], 0], [[0, 0], 0]];

	};

	Bubble.prototype.draw = function() {

        var ctx = this.context;
        var image = new Image();

        ctx.fillStyle = '#ff99bb';
        this.spot.forEach(function(spot) {
        	if (spot[1] > 0) {
			ctx.beginPath();
			ctx.arc(
				spot[0][0], spot[0][1], spot[1]/100, 0, 2 * Math.PI, true
			);
			ctx.fill();
			spot[1] -= 50;
        }
        })
        


		ctx.fillStyle = this.color;

		ctx.beginPath();
		ctx.arc(
			this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
		);

		ctx.fill();

        image.src = './assets/blue-bubble.png';
        ctx.drawImage(image, (this.pos[0]-this.radius), (this.pos[1]-this.radius), 2*this.radius, 2*this.radius);
	};
	Bubble.prototype.isCollidedWithSpikes = function() {

		var bubble = this;
		var collided = false;
		this.game.displayedRightSpikes.forEach(function(spike){
			if (spike.isCollidedWithBubble(bubble) && !(bubble.game.left)){
				collided = true;
			}
		});
		this.game.displayedLeftSpikes.forEach(function(spike){
			if (spike.isCollidedWithBubble(bubble) && (bubble.game.left)){
				collided = true;
			}
		});
		if ((this.pos[1] > 540) || (this.pos[1] < 60)){
			collided = true;
		}

		return collided;
	};

	Bubble.prototype.isCollidedWithWall = function() {
		return (this.pos[0] > 560) || (this.pos[0] < 40)
	};

	Bubble.prototype.collideWithWall = function() {
		var currentLevel = this.game.level;
		this.game.left = !(this.game.left);
		this.game.displayedLeftSpikes = this.game.randoLeftSpikes(currentLevel);
		this.game.displayedRightSpikes = this.game.randoRightSpikes(currentLevel);
		this.vel[0] = -this.vel[0];
		this.game.level++;
	};

	Bubble.prototype.collideWithSpikes = function() {
		this.game.over = true;
	};

	Bubble.prototype.isCollidedWithJewel = function(first_argument) {
		var bubble = this;
		return (this.game.jewel.isCollidedWithBubble(bubble));

		
	};
    
    

	Bubble.prototype.move = function() {

	  var newVelocityY = (this.vel[1] + 0.3);
	  this.vel[1] = newVelocityY;
	   
      this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
      // var p = this.pos;
      // this.game.trail.push(p);
      // console.log(this.game.trail);
      
      
      if (this.isCollidedWithWall()){
      	this.collideWithWall();
      }

      if (this.isCollidedWithSpikes()){
      	this.collideWithSpikes();
      }

      if (this.isCollidedWithJewel()){
      	this.game.jewel = this.game.addJewels();
      	this.game.jewelLeft = !this.game.jewelLeft;
      	this.game.gemScore++;
      }
       
	};

	Bubble.prototype.up = function(move) {
		 var p = this.pos;
		 var that = this;
         setTimeout(function() {
         	that.spot[0] = [that.pos, 1000];
         }, 200);
         setTimeout(function() {
         	that.spot[1] = [that.pos, 1100];
         }, 275);
         setTimeout(function() {
         	that.spot[2] = [that.pos, 1200];
         }, 350);
         setTimeout(function() {
         	that.spot[3] = [that.pos, 1300];
         }, 425);
         setTimeout(function() {
         	that.spot[4] = [that.pos, 1400];
         }, 525);
        
		var newVelocityY = -10;
		this.vel[1] = newVelocityY;
	};

})();	