(function () {
  if (typeof Bubbles === "undefined") {
    window.Bubbles = {};
  }

  var Jewel = Bubbles.Jewel = function(options){
	   this.context = options.ctx;
     this.currentPos = options.currentPos;
     this.origin = options.origin;
     this.vel = options.vel;
     this.radius = options.radius;
     this.color = "pink";
     this.game = options.game;

	};

  Jewel.prototype.draw = function() {
   
  	var ctx = this.context;

		// ctx.fillStyle = this.color;

  //   ctx.beginPath();
  //   ctx.arc(
  //     this.currentPos[0], this.currentPos[1], this.radius, 0, 2 * Math.PI, true
  //   );

  //   ctx.fill();
    var image = new Image();

	  
    image.src = './assets/jewel.png';
    ctx.drawImage(image, (this.currentPos[0]-this.radius*1.2), (this.currentPos[1]-this.radius*1.2), 2.4*this.radius, 2.4*this.radius);

  };

  Jewel.prototype.move = function() {
   

    this.currentPos = [this.currentPos[0] + this.vel[0], this.currentPos[1] + this.vel[1]];
    
    
    if (this.currentPos[1] > (this.origin[1] + 10)){
      this.vel[1] = -this.vel[1];
    }
    if (this.currentPos[1] < (this.origin[1] - 10)){
      this.vel[1] = -this.vel[1];
    }

  };

  Jewel.prototype.isCollidedWithBubble = function(bubble) {
  	var bubblePosition = bubble.pos;
  
  	return (Bubbles.Util.dist(bubblePosition, this.currentPos) < 30);
  		
  	
  };




})();